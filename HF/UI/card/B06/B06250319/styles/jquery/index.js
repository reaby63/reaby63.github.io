// jq 示意 c_portfolio 滑動效果
// .cp_in 是淡入 , .cp_back 是淡出 , 覺得不舒服可拿掉

$(document).ready(function() {
    // 預設顯示第一個 cp_list 和第一個按鈕加 active
    $('.cp_listmark button').first().addClass('active');
    $('.cp_list').first().addClass('cp_in'); // 第一個 cp_list + cp_in

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

        // 先移除 .cp_in 和 .cp_back 類別，並且重設動畫
        $('.cp_list').removeClass('cp_in cp_back');

        // 加上一點延遲來確保動畫重新觸發
        setTimeout(function() {
            // 给第一個 cp_list + cp_back
            $('.cp_list').eq(0).addClass('cp_back'); // 淡出

            // 移除所有 .active 並給新元素添加 active
            $('.cp_list').removeClass('cp_back');
            // 给目標 cp_list + cp_in
            currentDiv.addClass('cp_in'); // 淡入
        }, 50); // 延遲 50ms，確保動畫會重新觸發
    });
});
