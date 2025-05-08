$(function () {
    // 抓到各個主要的元素
    const $scrollContent = $('.scroll-content'); // 滾動區域
    const $container = $('.scroll-container');   // 整個包住的容器
    const $innerContent = $('.inner-content');   // 內容物（很多個 item）
    const $btnLeft = $('.arrow-left');           // 左邊箭頭
    const $btnRight = $('.arrow-right');         // 右邊箭頭
    const $items = $('.item');                   // 每個 item 項目

    // 用來記錄拖曳的狀態
    let isDraggingContent = false; // 是否正在拖曳
    let startX = 0;                // 拖曳開始時的 X 座標
    let scrollStart = 0;           // 拖曳開始時 scrollLeft 的位置

    // 預設讓第一個 item 有 .item_resize
    $items.removeClass('item_resize').first().addClass('item_resize');

    // 點擊 item 時，該 item 加上 .item_resize，其他移除
    $items.on('click', function () {
        $items.removeClass('item_resize');
        $(this).addClass('item_resize');
    });

    // 更新左右箭頭的狀態：加上或拿掉 .btn_fin class
    function updateArrowStatus() {
        const scrollLeft = $scrollContent.scrollLeft();         // 現在滾到哪
        const containerWidth = $container.width();              // 容器寬度
        const contentWidth = $innerContent.outerWidth();        // 整個內容寬度（包含 item + margin）

        if (scrollLeft <= 0) { // 如果已經在最左邊
            $btnLeft.addClass('btn_fin'); // 左箭頭加上半透明效果
        } else {
            $btnLeft.removeClass('btn_fin'); // 移除
        }

        if (scrollLeft + containerWidth >= contentWidth - 2) { // 如果滾到最右（加個 -2 保險）
            $btnRight.addClass('btn_fin'); // 右箭頭加上半透明
        } else {
            $btnRight.removeClass('btn_fin'); // 移除
        }
    }

    // 移除所有 .item_resize，並加在第一個「完全進入可視範圍」的 item 上
    function highlightVisibleItem() {
        $items.removeClass('item_resize');
        const containerWidth = $container.width();
        $items.each(function () {
            const itemLeft = $(this).position().left; // 相對於 scrollContent 左邊
            const itemRight = itemLeft + $(this).outerWidth(true);

            // 若 item 完全在可視範圍內，設定為新的 resize 項目
            if (itemLeft >= 0 && itemRight <= containerWidth) {
                $(this).addClass('item_resize');
                return false; // 只處理第一個符合的項目
            }
        });
    }

    // 點擊左右箭頭時，移動一個 item 的寬度
    function scrollByItem(direction) {
        const itemWidth = $items.outerWidth(true);               // 單個 item 的寬度（包含 margin）
        const currentScroll = $scrollContent.scrollLeft();       // 現在滾到哪
        const newScroll = currentScroll + (direction * itemWidth); // 算出新的滾動目標

        // 平滑地動畫滑過去
        $scrollContent.stop().animate({ scrollLeft: newScroll }, 300, function () {
            highlightVisibleItem();     // 滑完後選出新的 .item_resize
            updateArrowStatus();        // 更新箭頭樣式
        });
    }

    // 點左箭頭
    $btnLeft.on('click', function () {
        if (!$(this).hasClass('btn_fin')) { // 如果不是 disabled 才能點
            scrollByItem(-1); // 向左滑一格
        }
    });

    // 點右箭頭
    $btnRight.on('click', function () {
        if (!$(this).hasClass('btn_fin')) { // 如果不是 disabled 才能點
            scrollByItem(1); // 向右滑一格
        }
    });

    // 滑鼠拖曳滑動（電腦用）
    $scrollContent.on('mousedown', function (e) {
        isDraggingContent = true;             // 開始拖曳
        startX = e.pageX;                     // 記住按下去的 X
        scrollStart = $scrollContent.scrollLeft(); // 記住當下的 scrollLeft
        e.preventDefault();                   // 防止文字被選取
    });

    $(document).on('mousemove', function (e) {
        if (!isDraggingContent) return; // 不是在拖就不動作
        const delta = e.pageX - startX; // 算出滑了多少距離
        $scrollContent.scrollLeft(scrollStart - delta); // 根據距離調整 scrollLeft
    });

    $(document).on('mouseup', function () {
        isDraggingContent = false; // 放開滑鼠，結束拖曳
    });

    // 手指觸控拖曳滑動（手機、平板用）
    $scrollContent.on('touchstart', function (e) {
        if (e.originalEvent.touches.length === 1) { // 確保是單指觸控
            isDraggingContent = true; // 開始拖曳
            startX = e.originalEvent.touches[0].pageX; // 記錄手指開始的 X
            scrollStart = $scrollContent.scrollLeft(); // 記錄當下的 scrollLeft
        }
    });

    $scrollContent.on('touchmove', function (e) {
        if (!isDraggingContent) return; // 不是拖曳中就不動作
        const delta = e.originalEvent.touches[0].pageX - startX; // 手指移動的距離
        $scrollContent.scrollLeft(scrollStart - delta); // 根據距離調整 scrollLeft
    });

    $scrollContent.on('touchend touchcancel', function () {
        isDraggingContent = false; // 手指放開，結束拖曳
    });

    // 每次滾動、視窗大小變化，都更新一下箭頭狀態
    $scrollContent.on('scroll', updateArrowStatus);
    $(window).on('resize', updateArrowStatus);

    // 網頁剛載入時也先更新一次
    setTimeout(() => {
        updateArrowStatus();
        highlightVisibleItem(); // 一開始設定 .item_resize
    }, 50);
});
