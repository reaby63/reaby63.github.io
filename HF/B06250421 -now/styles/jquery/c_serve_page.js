// 服務項目的滑動功能
$(function () {
    // 設定初始顯示的 tab 是從第 0 個開始（第一個 tab）
    let scrollIndex = 0;

    // 更新 tabs 欄位的位置，讓頁籤可以左右滑動
    function updateTabScroll() {
        const tabWidth = $('.tab').outerWidth(true); // 每個 tab 的寬度（包含 margin）
        
        // 將整個 .tabs 往左位移 scrollIndex 個 tab 的寬度
        // 例如 scrollIndex=1 就會往左移動一個 tab 的寬度
        $('.tabs').css('transform', 'translateX(' + (-scrollIndex * tabWidth) + 'px)'); //+號是js連接字串使用 js會自動把+後面的字當作字串 (-號是因為往左滑 因為通常是往右滑)

        // 更新左右箭頭按鈕的啟用/禁用狀態
        updateButtonState();
    }

    // 根據 scrollIndex 狀態，決定左右按鈕要不要 disable
    function updateButtonState() {
        const tabCount = $('.tab').length;                 // 總共有幾個 tab
        const containerWidth = $('.tabs-container').width(); // 容器的寬度
        const tabWidth = $('.tab').outerWidth(true);       // 每個 tab 的寬度
        const visibleCount = Math.floor(containerWidth / tabWidth); // 可視範圍內最多顯示幾個 tab

        // 如果已經滑到最左邊了，就讓左邊按鈕 disable
        if (scrollIndex <= 0) {
            $('.nav-left').addClass('disabled');
        } else {
            $('.nav-left').removeClass('disabled');
        }

        // 如果已經滑到最右邊了，就讓右邊按鈕 disable
        if (scrollIndex >= tabCount - visibleCount) {
            $('.nav-right').addClass('disabled');
        } else {
            $('.nav-right').removeClass('disabled');
        }
    }

    // 點擊 tab 時，切換內容
    $('.tab').click(function () {
        if ($(this).hasClass('active')) return; // 如果點的是目前已經是 active 的 tab，就不動作

        $('.tab').removeClass('active');        // 先移除全部 tab 的 active 樣式
        $(this).addClass('active');             // 再把目前點到的 tab 加上 active 樣式

        const key = $(this).data('content');    // 取得 data-content 的值（例如 "content2"）

        // 把目前顯示的內容淡出，再顯示新的內容
        $('.tab-panel.active').fadeOut(200, function () {
            $(this).removeClass('active'); // 隱藏後移除 active

            // 找到要顯示的新內容，並淡入 + 加上 active 樣式
            const target = $('.tab-panel[data-content="' + key + '"]');
            target.fadeIn(300).addClass('active');
        });
    });

    // 點擊左邊按鈕時，往左滑動一格 tab
    $('.nav-left').click(function () {
        if ($(this).hasClass('disabled')) return; // 如果按鈕已禁用就不處理

        if (scrollIndex > 0) {
            scrollIndex--;         // scrollIndex 減少（往前一格）
            updateTabScroll();     // 更新 tabs 的位置
        }
    });

    // 點擊右邊按鈕時，往右滑動一格 tab
    $('.nav-right').click(function () {
        if ($(this).hasClass('disabled')) return; // 如果按鈕已禁用就不處理

        const tabCount = $('.tab').length;                 // 總共有幾個 tab
        const containerWidth = $('.tabs-container').width(); // 容器寬度
        const tabWidth = $('.tab').outerWidth(true);       // 每個 tab 的寬度
        const visibleCount = Math.floor(containerWidth / tabWidth); // 可視範圍內最多顯示幾個 tab

        if (scrollIndex < tabCount - visibleCount) {
            scrollIndex++;         // scrollIndex 增加（往後一格）
            updateTabScroll();     // 更新 tabs 的位置
        }
    });

    // 當視窗尺寸改變時，要重新計算 scrollIndex 與按鈕狀態
    $(window).resize(function () {
        scrollIndex = 0;          // 畫面變小或變大時，先歸零位置
        updateTabScroll();        // 重新調整頁籤位置與按鈕
    });

    // 初始畫面載入時，設定左右按鈕狀態
    updateButtonState();
});
