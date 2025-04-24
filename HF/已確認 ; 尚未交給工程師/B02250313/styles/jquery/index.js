// jq 示意 c_portfolio 滑動效果
$(document).ready(function() {
    // 預設顯示第一個 cp_list 和第一個按鈕加 active
    $('.cp_listmark button').first().addClass('active');

    // 按鈕點擊事件
    $('.cp_listmark button').click(function() {
        var index = $(this).index(); // 判斷當前按鈕在哪個div
        var currentDiv = $('.cp_list').eq(index); // 獲取對應的 div
        var currentButton = $(this); // 當前按鈕

        // 更新按鈕的 active 狀態
        $('.cp_listmark button').removeClass('active');
        currentButton.addClass('active');

        // 滑動父容器 cp_wrapper 左移一個 cp_list 的寬度
        $('.cp_wrapper').css('transform', 'translateX(-' + (index * 100) + '%)');

    });
});

// c_environment 滑動
$(document).ready(function() {
    // 預設顯示第一個 en_list 和第一個按鈕加 active
    $('.en_listmark button').first().addClass('active');

    // 按鈕點擊事件
    $('.en_listmark button').click(function() {
        var index = $(this).index(); // 判斷當前按鈕在哪個div
        var currentDiv = $('.en_list').eq(index); // 獲取對應的 div
        var currentButton = $(this); // 當前按鈕

        // 更新按鈕的 active 狀態
        $('.en_listmark button').removeClass('active');
        currentButton.addClass('active');

        // 滑動父容器 en_wrapper 左移一個 en_list 的寬度
        $('.en_wrapper').css('transform', 'translateX(-' + (index * 100) + '%)');

    });
});