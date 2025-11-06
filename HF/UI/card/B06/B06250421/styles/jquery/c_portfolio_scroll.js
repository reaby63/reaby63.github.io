
$(function () {
    const $scrollContent = $('.scroll-content');   // 可水平滾動的外層容器
    const $container = $('.scroll-container');     // 整體容器（包含按鈕）
    const $innerContent = $('.inner-content');     // 所有項目包裝容器
    const $btnLeft = $('.arrow-left');             // 左箭頭按鈕
    const $btnRight = $('.arrow-right');           // 右箭頭按鈕
    const $items = $('.item');                     // 所有可切換項目

    let isDraggingContent = false;
    let startX = 0;
    let scrollStart = 0;

    // 預設第一個項目 active
    $items.removeClass('item_resize').first().addClass('item_resize');

    // 點擊項目時設為 active
    $items.on('click', function () {
        $items.removeClass('item_resize');
        $(this).addClass('item_resize');
    });

    // 更新箭頭狀態
    function updateArrowStatus() {
        const scrollLeft = $scrollContent.scrollLeft();
        const containerWidth = $container.width();
        const contentWidth = $innerContent.outerWidth();

        $btnLeft.toggleClass('btn_fin', scrollLeft <= 0);
        $btnRight.toggleClass('btn_fin', scrollLeft + containerWidth >= contentWidth - 2);
    }

    // 找出第一個完整顯示的項目
    function highlightVisibleItem() {
        $items.removeClass('item_resize');
        const containerWidth = $container.width();
        $items.each(function () {
            const itemLeft = $(this).position().left;
            const itemRight = itemLeft + $(this).outerWidth(true);
            if (itemLeft >= 0 && itemRight <= containerWidth) {
                $(this).addClass('item_resize');
                return false;
            }
        });
    }

    // 切換項目
    function scrollByItem(direction) {
        const $currentItem = $('.item_resize');
        let targetIndex = $items.index($currentItem) + direction;

        if (targetIndex < 0) targetIndex = 0;
        if (targetIndex >= $items.length) targetIndex = $items.length - 1;

        const $targetItem = $items.eq(targetIndex);

        if ($(window).width() <= 639) {
            // ✅ 手機版：直接滾動到目標項目
            $currentItem.addClass('p-fade-out');
            $targetItem.addClass('p-fade-in');

            const scrollTo = $targetItem.position().left + $scrollContent.scrollLeft();
            $scrollContent.scrollLeft(scrollTo);
            updateArrowStatus();

            setTimeout(() => {
                $currentItem.removeClass('p-fade-out');
                $targetItem.removeClass('p-fade-in').addClass('item_resize');
                $items.not($targetItem).removeClass('item_resize');
            }, 1000);

        } else {
            // ✅ 桌面版：項目置中
            const targetOffset = $targetItem.position().left + $scrollContent.scrollLeft();
            const scrollTo = targetOffset - ($container.width() - $targetItem.outerWidth(true)) / 2;

            $scrollContent.stop().animate({ scrollLeft: scrollTo }, 300, function () {
                $items.removeClass('item_resize');
                $targetItem.addClass('item_resize');
                updateArrowStatus();
            });
        }
    }

    // 左右箭頭點擊
    $btnLeft.on('click', function () {
        scrollByItem(-1);
    });
    $btnRight.on('click', function () {
        scrollByItem(1);
    });

    // 滑鼠拖曳
    $scrollContent.on('mousedown', function (e) {
        isDraggingContent = true;
        startX = e.pageX;
        scrollStart = $scrollContent.scrollLeft();
        e.preventDefault();
    });

    $(document).on('mousemove', function (e) {
        if (!isDraggingContent) return;
        const delta = e.pageX - startX;
        $scrollContent.scrollLeft(scrollStart - delta);
    });

    $(document).on('mouseup', function () {
        isDraggingContent = false;
    });

    // 觸控拖曳（手機）
    $scrollContent.on('touchstart', function (e) {
        if (e.originalEvent.touches.length === 1) {
            isDraggingContent = true;
            startX = e.originalEvent.touches[0].pageX;
            scrollStart = $scrollContent.scrollLeft();
        }
    });

    $scrollContent.on('touchmove', function (e) {
        if (!isDraggingContent) return;
        const delta = e.originalEvent.touches[0].pageX - startX;
        $scrollContent.scrollLeft(scrollStart - delta);
    });

    $scrollContent.on('touchend touchcancel', function () {
        isDraggingContent = false;
    });

    // ✅ 修正：手機版滾動時正確套用 item_resize
    $scrollContent.on('scroll', function () {
        updateArrowStatus();

        if ($(window).width() <= 639) {
            const containerWidth = $container.width();

            let found = false;
            $items.each(function () {
                const itemLeft = $(this).position().left;
                const itemRight = itemLeft + $(this).outerWidth(true);

                if (itemLeft >= 0 && itemRight <= containerWidth && !found) {
                    $items.removeClass('item_resize');
                    $(this).addClass('item_resize');
                    found = true;
                }
            });

            // 若沒有完全符合者，就找最靠近左邊的項目
            if (!found) {
                let closestItem = null;
                let minDelta = Infinity;
                $items.each(function () {
                    const itemLeft = $(this).position().left;
                    if (Math.abs(itemLeft) < minDelta) {
                        minDelta = Math.abs(itemLeft);
                        closestItem = $(this);
                    }
                });
                if (closestItem) {
                    $items.removeClass('item_resize');
                    closestItem.addClass('item_resize');
                }
            }
        }
    });

    // resize 時更新箭頭
    $(window).on('resize', updateArrowStatus);

    // 初始時略延遲以確保渲染完成
    setTimeout(() => {
        updateArrowStatus();
        highlightVisibleItem();
    }, 50);
});
