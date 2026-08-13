const cmpScrollX = (() => {

    const defaults = {

        // ==============================
        // DOM
        // ==============================

        root: '.cmp-scrollX',

        viewport: '.cmp-scrollX__viewport',

        track: '.cmp-scrollX__track',

        item: '.cmp-scrollX__item',

        prev: '.cmp-scrollX__prev',

        next: '.cmp-scrollX__next',

        // 自訂 Scrollbar
        scrollbar: '.cmp-scrollX__scrollbar',

        scrollbarThumb: '.cmp-scrollX__thumb',


        // ==============================
        // 滑鼠拖曳
        // ==============================

        dragSpeed: 1.5,


        // ==============================
        // 滑動模式
        //
        // item  = 一次移動一個 item
        // fixed = 一次固定距離
        // ==============================

        scrollMode: 'item',

        // fixed 模式使用
        scrollSpeed: 300,


        // ==============================
        // Class
        // ==============================

        disabledClass: 'is-disabled',

        draggingClass: 'is-dragging',

        scrollbarDraggingClass: 'is-dragging',


        // ==============================
        // Callback
        // ==============================

        callback: null

    };


    // ==================================================
    // 初始化
    // ==================================================

    function init(options = {}) {

        const settings = {
            ...defaults,
            ...options
        };


        const elements =
            document.querySelectorAll(
                settings.root
            );


        if (!elements.length) {
            return;
        }


        elements.forEach((root) => {

            // ==============================
            // 防止重複初始化
            // ==============================

            if (
                root.dataset.cmpScrollx ===
                'initialized'
            ) {
                return;
            }


            const viewport =
                root.querySelector(
                    settings.viewport
                );


            if (!viewport) {
                return;
            }


            // ==============================
            // 綁定功能
            // ==============================

            bindWheel(
                viewport
            );


            bindDrag(
                viewport,
                settings
            );


            bindButtons(
                root,
                viewport,
                settings
            );


            bindScrollState(
                root,
                viewport,
                settings
            );


            bindScrollbar(
                root,
                viewport,
                settings
            );


            // ==============================
            // 初始化狀態
            // ==============================

            updateScrollState(
                root,
                viewport,
                settings
            );


            updateScrollbar(
                root,
                viewport,
                settings
            );


            // ==============================
            // 記錄已初始化
            // ==============================

            root.dataset.cmpScrollx =
                'initialized';

        });

    }


    // ==================================================
    // 滑鼠滾輪 → 橫向捲動
    // ==================================================

    function bindWheel(el) {

        el.addEventListener(
            'wheel',
            (e) => {

                if (e.deltaY === 0) {
                    return;
                }


                const currentScroll =
                    el.scrollLeft;


                const maxScroll =
                    Math.max(
                        0,
                        el.scrollWidth -
                        el.clientWidth
                    );


                // ==============================
                // 左邊界
                // ==============================

                const isAtLeftBoundary =
                    currentScroll <= 0 &&
                    e.deltaY < 0;


                // ==============================
                // 右邊界
                // ==============================

                const isAtRightBoundary =
                    currentScroll >=
                    maxScroll - 1 &&
                    e.deltaY > 0;


                // 到達邊界
                // 交回瀏覽器正常上下滾動
                if (
                    isAtLeftBoundary ||
                    isAtRightBoundary
                ) {
                    return;
                }


                // ==============================
                // 滾輪轉橫向
                // ==============================

                e.preventDefault();


                el.scrollLeft =
                    currentScroll +
                    e.deltaY;

            },
            {
                passive: false
            }
        );

    }


    // ==================================================
    // 滑鼠拖曳內容
    // ==================================================

    function bindDrag(
        el,
        settings
    ) {

        let isDown = false;

        let startX = 0;

        let scrollLeft = 0;


        // ==============================
        // Mouse Down
        // ==============================

        el.addEventListener(
            'mousedown',
            (e) => {

                // 只接受左鍵
                if (e.button !== 0) {
                    return;
                }


                isDown = true;


                el.classList.add(
                    settings.draggingClass
                );


                startX =
                    e.pageX -
                    el.offsetLeft;


                scrollLeft =
                    el.scrollLeft;

            }
        );


        // ==============================
        // Mouse Leave
        // ==============================

        el.addEventListener(
            'mouseleave',
            stopDrag
        );


        // ==============================
        // Mouse Up
        // ==============================

        el.addEventListener(
            'mouseup',
            stopDrag
        );


        // ==============================
        // Mouse Move
        // ==============================

        el.addEventListener(
            'mousemove',
            (e) => {

                if (!isDown) {
                    return;
                }


                e.preventDefault();


                const x =
                    e.pageX -
                    el.offsetLeft;


                const walk =
                    (x - startX) *
                    settings.dragSpeed;


                el.scrollLeft =
                    scrollLeft -
                    walk;

            }
        );


        // ==============================
        // Stop
        // ==============================

        function stopDrag() {

            if (!isDown) {
                return;
            }


            isDown = false;


            el.classList.remove(
                settings.draggingClass
            );

        }

    }


    // ==================================================
    // Prev / Next
    // ==================================================

    function bindButtons(
        root,
        viewport,
        settings
    ) {

        const prevButton =
            root.querySelector(
                settings.prev
            );


        const nextButton =
            root.querySelector(
                settings.next
            );


        // ==============================
        // Prev
        // ==============================

        if (prevButton) {

            prevButton.addEventListener(
                'click',
                () => {

                    if (
                        prevButton.classList.contains(
                            settings.disabledClass
                        )
                    ) {
                        return;
                    }


                    scrollPrev(
                        root,
                        viewport,
                        settings
                    );

                }
            );

        }


        // ==============================
        // Next
        // ==============================

        if (nextButton) {

            nextButton.addEventListener(
                'click',
                () => {

                    if (
                        nextButton.classList.contains(
                            settings.disabledClass
                        )
                    ) {
                        return;
                    }


                    scrollNext(
                        root,
                        viewport,
                        settings
                    );

                }
            );

        }

    }


    // ==================================================
    // Scroll 監聽
    // ==================================================

    function bindScrollState(
        root,
        viewport,
        settings
    ) {

        viewport.addEventListener(
            'scroll',
            () => {

                updateScrollState(
                    root,
                    viewport,
                    settings
                );


                updateScrollbar(
                    root,
                    viewport,
                    settings
                );

            }
        );

    }


    // ==================================================
    // 更新 Prev / Next 狀態
    // ==================================================

    function updateScrollState(
        root,
        viewport,
        settings
    ) {

        const currentScroll =
            viewport.scrollLeft;


        const maxScroll =
            Math.max(
                0,
                viewport.scrollWidth -
                viewport.clientWidth
            );


        // ==============================
        // 最左邊
        // ==============================

        const isStart =
            currentScroll <= 0;


        // ==============================
        // 最右邊
        // ==============================

        const isEnd =
            maxScroll <= 0 ||
            currentScroll >=
            maxScroll - 1;


        const prevButton =
            root.querySelector(
                settings.prev
            );


        const nextButton =
            root.querySelector(
                settings.next
            );


        // ==============================
        // Prev
        // ==============================

        if (prevButton) {

            prevButton.classList.toggle(
                settings.disabledClass,
                isStart
            );

        }


        // ==============================
        // Next
        // ==============================

        if (nextButton) {

            nextButton.classList.toggle(
                settings.disabledClass,
                isEnd
            );

        }


        // ==============================
        // Callback
        // ==============================

        if (
            typeof settings.callback ===
            'function'
        ) {

            settings.callback({

                root,

                viewport,

                'is-start': isStart,

                'is-end': isEnd

            });

        }

    }


    // ==================================================
    // 取得 Item 滑動距離
    // ==================================================

    function getScrollDistance(
        root,
        viewport,
        settings
    ) {

        // ==============================
        // Fixed
        // ==============================

        if (
            settings.scrollMode ===
            'fixed'
        ) {

            return settings.scrollSpeed;

        }


        // ==============================
        // Item
        // ==============================

        const item =
            root.querySelector(
                settings.item
            );


        const track =
            root.querySelector(
                settings.track
            );


        if (!item || !track) {
            return 0;
        }


        // ==============================
        // 取得 gap
        // ==============================

        const trackStyle =
            window.getComputedStyle(
                track
            );


        const gap =
            parseFloat(
                trackStyle.columnGap
            ) || 0;


        // ==============================
        // Item + gap
        // ==============================

        return (
            item.offsetWidth +
            gap
        );

    }


    // ==================================================
    // Next
    // ==================================================

    function scrollNext(
        root,
        viewport,
        settings
    ) {

        let distance =
            getScrollDistance(
                root,
                viewport,
                settings
            );


        if (distance <= 0) {
            return;
        }


        // ==============================
        // 剩餘距離
        // ==============================

        const remaining =
            viewport.scrollWidth -
            viewport.clientWidth -
            viewport.scrollLeft;


        // ==============================
        // 不超過最右邊
        // ==============================

        distance =
            Math.min(
                distance,
                remaining
            );


        if (distance <= 0) {
            return;
        }


        // ==============================
        // 平滑捲動
        // ==============================

        viewport.scrollBy({

            left: distance,

            behavior: 'smooth'

        });

    }


    // ==================================================
    // Prev
    // ==================================================

    function scrollPrev(
        root,
        viewport,
        settings
    ) {

        let distance =
            getScrollDistance(
                root,
                viewport,
                settings
            );


        if (distance <= 0) {
            return;
        }


        // ==============================
        // 不超過最左邊
        // ==============================

        distance =
            Math.min(
                distance,
                viewport.scrollLeft
            );


        if (distance <= 0) {
            return;
        }


        // ==============================
        // 平滑捲動
        // ==============================

        viewport.scrollBy({

            left: -distance,

            behavior: 'smooth'

        });

    }


    // ==================================================
    // Scrollbar
    // ==================================================

    function bindScrollbar(
        root,
        viewport,
        settings
    ) {

        const scrollbar =
            root.querySelector(
                settings.scrollbar
            );


        const thumb =
            root.querySelector(
                settings.scrollbarThumb
            );


        // ==============================
        // 沒有 Scrollbar
        // ==============================

        if (!scrollbar || !thumb) {
            return;
        }


        let isDragging = false;

        let startX = 0;

        let startLeft = 0;


        // ==============================
        // Thumb Mouse Down
        // ==============================

        thumb.addEventListener(
            'mousedown',
            (e) => {

                if (e.button !== 0) {
                    return;
                }


                e.preventDefault();


                isDragging = true;


                startX = e.clientX;


                startLeft =
                    thumb.offsetLeft;


                thumb.classList.add(
                    settings.scrollbarDraggingClass
                );


                scrollbar.classList.add(
                    settings.scrollbarDraggingClass
                );

            }
        );


        // ==============================
        // Mouse Move
        // ==============================

        document.addEventListener(
            'mousemove',
            (e) => {

                if (!isDragging) {
                    return;
                }


                e.preventDefault();


                const delta =
                    e.clientX -
                    startX;


                const scrollbarWidth =
                    scrollbar.clientWidth;


                const thumbWidth =
                    thumb.offsetWidth;


                const maxThumbLeft =
                    scrollbarWidth -
                    thumbWidth;


                if (maxThumbLeft <= 0) {
                    return;
                }


                let newLeft =
                    startLeft +
                    delta;


                // ==============================
                // 限制 Thumb 範圍
                // ==============================

                newLeft =
                    Math.max(
                        0,
                        Math.min(
                            newLeft,
                            maxThumbLeft
                        )
                    );


                // ==============================
                // Thumb 百分比
                // ==============================

                const ratio =
                    newLeft /
                    maxThumbLeft;


                // ==============================
                // 對應 ScrollLeft
                // ==============================

                const maxScroll =
                    viewport.scrollWidth -
                    viewport.clientWidth;


                viewport.scrollLeft =
                    ratio *
                    maxScroll;

            }
        );


        // ==============================
        // Mouse Up
        // ==============================

        document.addEventListener(
            'mouseup',
            stopScrollbarDrag
        );


        function stopScrollbarDrag() {

            if (!isDragging) {
                return;
            }


            isDragging = false;


            thumb.classList.remove(
                settings.scrollbarDraggingClass
            );


            scrollbar.classList.remove(
                settings.scrollbarDraggingClass
            );

        }


        // ==============================
        // 點擊 Scrollbar 軌道
        // ==============================

        scrollbar.addEventListener(
            'click',
            (e) => {

                // 點到 Thumb 本身不處理
                if (
                    e.target === thumb ||
                    thumb.contains(e.target)
                ) {
                    return;
                }


                const rect =
                    scrollbar.getBoundingClientRect();


                const clickX =
                    e.clientX -
                    rect.left;


                const thumbWidth =
                    thumb.offsetWidth;


                const maxThumbLeft =
                    scrollbar.clientWidth -
                    thumbWidth;


                if (maxThumbLeft <= 0) {
                    return;
                }


                let newLeft =
                    clickX -
                    thumbWidth / 2;


                newLeft =
                    Math.max(
                        0,
                        Math.min(
                            newLeft,
                            maxThumbLeft
                        )
                    );


                const ratio =
                    newLeft /
                    maxThumbLeft;


                const maxScroll =
                    viewport.scrollWidth -
                    viewport.clientWidth;


                viewport.scrollTo({

                    left:
                        ratio *
                        maxScroll,

                    behavior: 'smooth'

                });

            }
        );

    }


    // ==================================================
    // 更新 Scrollbar
    // ==================================================

    function updateScrollbar(
        root,
        viewport,
        settings
    ) {

        const scrollbar =
            root.querySelector(
                settings.scrollbar
            );


        const thumb =
            root.querySelector(
                settings.scrollbarThumb
            );


        // ==============================
        // Scrollbar 是選配
        // ==============================

        if (!scrollbar || !thumb) {
            return;
        }


        const viewportWidth =
            viewport.clientWidth;


        const contentWidth =
            viewport.scrollWidth;


        // ==============================
        // 沒有 overflow
        // ==============================

        if (
            contentWidth <=
            viewportWidth
        ) {

            scrollbar.classList.add(
                'is-hidden'
            );

            thumb.style.width = '100%';

            thumb.style.transform =
                'translateX(0)';

            return;

        }


        scrollbar.classList.remove(
            'is-hidden'
        );


        // ==============================
        // Thumb 比例
        // ==============================

        const ratio =
            viewportWidth /
            contentWidth;


        // ==============================
        // Thumb 寬度
        // ==============================

        const scrollbarWidth =
            scrollbar.clientWidth;


        let thumbWidth =
            scrollbarWidth *
            ratio;


        // ==============================
        // 最小 Thumb 寬度
        // ==============================

        const minThumbWidth = 30;


        thumbWidth =
            Math.max(
                thumbWidth,
                minThumbWidth
            );


        // 不超過 Scrollbar
        thumbWidth =
            Math.min(
                thumbWidth,
                scrollbarWidth
            );


        thumb.style.width =
            `${thumbWidth}px`;


        // ==============================
        // Scroll 百分比
        // ==============================

        const maxScroll =
            contentWidth -
            viewportWidth;


        const scrollRatio =
            viewport.scrollLeft /
            maxScroll;


        // ==============================
        // Thumb 可移動距離
        // ==============================

        const maxThumbLeft =
            scrollbarWidth -
            thumbWidth;


        const thumbLeft =
            scrollRatio *
            maxThumbLeft;


        // ==============================
        // 移動 Thumb
        // ==============================

        thumb.style.transform =
            `translateX(${thumbLeft}px)`;

    }


    // ==================================================
    // Public API
    // ==================================================
    return {
        init
    };
})();