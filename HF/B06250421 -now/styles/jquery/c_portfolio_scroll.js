

$(function () {
    const $scrollContent = $('.scroll-content');   // 可水平滾動的外層容器
    const $container = $('.scroll-container');     // 整體容器（包含按鈕）
    const $innerContent = $('.inner-content');     // 所有項目包裝容器
    const $btnLeft = $('.arrow-left');             // 左箭頭按鈕
    const $btnRight = $('.arrow-right');           // 右箭頭按鈕
    const $items = $('.item');                     // 所有可切換項目

    let isDraggingContent = false;  // 拖曳中狀態
    let startX = 0;                 // 拖曳開始的 X 軸位置
    let scrollStart = 0;           // 拖曳開始時 scrollLeft 值

    // 預設將第一個項目標示為 active（item_resize）
    $items.removeClass('item_resize').first().addClass('item_resize');

    // 點擊 item 時，設定該項目為 active（item_resize）
    $items.on('click', function () {
        $items.removeClass('item_resize');
        $(this).addClass('item_resize');
    });

    // 更新左右箭頭狀態（是否顯示灰掉）
    function updateArrowStatus() {
        const scrollLeft = $scrollContent.scrollLeft();
        const containerWidth = $container.width();
        const contentWidth = $innerContent.outerWidth();

        if (scrollLeft <= 0) {
            $btnLeft.addClass('btn_fin');   // 左邊到頂 -> 加上停用樣式
        } else {
            $btnLeft.removeClass('btn_fin');
        }

        if (scrollLeft + containerWidth >= contentWidth - 2) {
            $btnRight.addClass('btn_fin');  // 右邊到底 -> 加上停用樣式
        } else {
            $btnRight.removeClass('btn_fin');
        }
    }

    // 將第一個完整顯示在容器內的項目設為 active
    function highlightVisibleItem() {
        $items.removeClass('item_resize');
        const containerWidth = $container.width();
        $items.each(function () {
            const itemLeft = $(this).position().left;
            const itemRight = itemLeft + $(this).outerWidth(true);
            if (itemLeft >= 0 && itemRight <= containerWidth) {
                $(this).addClass('item_resize');
                return false; // 找到第一個符合的就停止
            }
        });
    }

    // 切換項目：根據方向向左（-1）或向右（+1）切換
    function scrollByItem(direction) {
        const $currentItem = $('.item_resize');
        let targetIndex = $items.index($currentItem) + direction;

        // 限制 index 不超出範圍
        if (targetIndex < 0) targetIndex = 0;
        if (targetIndex >= $items.length) targetIndex = $items.length - 1;

        const $targetItem = $items.eq(targetIndex);

        let scrollTo;

        if ($(window).width() <= 639) {
            // ✅ 手機版：每個 item 寬度為 100%，直接跳到指定 index
            const containerWidth = $container.width();
            scrollTo = containerWidth * targetIndex;
        } else {
            // ✅ 桌面版：項目置中顯示
            const targetOffset = $targetItem.position().left + $scrollContent.scrollLeft();
            scrollTo = targetOffset - ($container.width() - $targetItem.outerWidth(true)) / 2;
        }

        // 捲動至目標位置，並更新 active 狀態
        $scrollContent.stop().animate({ scrollLeft: scrollTo }, 300, function () {
            $items.removeClass('item_resize');
            $targetItem.addClass('item_resize');
            updateArrowStatus();
        });
    }

    // 左右箭頭綁定點擊事件
    $btnLeft.on('click', function () {
        scrollByItem(-1);
    });

    $btnRight.on('click', function () {
        scrollByItem(1);
    });

    // ✅ 滑鼠拖曳邏輯
    $scrollContent.on('mousedown', function (e) {
        isDraggingContent = true;
        startX = e.pageX;
        scrollStart = $scrollContent.scrollLeft();
        e.preventDefault(); // 阻止選取文字
    });

    $(document).on('mousemove', function (e) {
        if (!isDraggingContent) return;
        const delta = e.pageX - startX;
        $scrollContent.scrollLeft(scrollStart - delta);
    });

    $(document).on('mouseup', function () {
        isDraggingContent = false;
    });

    // ✅ 觸控拖曳邏輯（手機）
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

    // ✅ 滾動時根據 scrollLeft 判斷當前 item（手機用）
    $scrollContent.on('scroll', function () {
        updateArrowStatus();

        if ($(window).width() <= 639) {
            const containerWidth = $container.width();
            const scrollLeft = $scrollContent.scrollLeft();
            const index = Math.round(scrollLeft / containerWidth);

            $items.removeClass('item_resize');
            $items.eq(index).addClass('item_resize');
        }
    });

    // 視窗大小變化時也更新箭頭狀態
    $(window).on('resize', updateArrowStatus);

    // 初始啟動時稍微延遲，避免畫面尚未完全 render
    setTimeout(() => {
        updateArrowStatus();
        highlightVisibleItem();
    }, 50);
});
