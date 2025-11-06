
// jq 示意 c_portfolio 滑動效果(手機板可觸控滑動!!)
$(document).ready(function() {
    var startX = 0;                         //紀錄手指剛觸碰螢幕時的X座標
    var endX = 0;                           //手指離開螢幕時的X座標
    var totalItems = $('.cp_list').length;  //紀錄cp_list總共有幾個 (length:這個東西裡面有幾個項目/英文是長度 但在js不是~)
    var currentIndex = 0;                   //設定目前正在看的第幾個區塊

    // 預設第一個按鈕 active
    $('.cp_listmark button').first().addClass('active');

    // 按鈕點擊切換
    $('.cp_listmark button').click(function() {
        currentIndex = $(this).index(); // 目前點的是第幾個按鈕
                                        // this:目前觸發事件的那個元素,這邊是目前點到的按鈕 
                                        // index:取得這個元素在同一組兄弟元素的第幾個,沒括號的指函式本身,後面+()為執行該函式的結果
        updateSlide(currentIndex);      // 呼叫updateSlide
    });

    // 滑動事件
    $('.cp_list').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $('.cp_list').on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        var deltaX = endX - startX;

        if (deltaX > 50 && currentIndex > 0) {
            // 右滑，往上一個
            currentIndex--;
            $('.cp_listmark button').eq(currentIndex).trigger('click');
        } else if (deltaX < -50 && currentIndex < totalItems - 1) {
            // 左滑，往下一個
            currentIndex++;
            $('.cp_listmark button').eq(currentIndex).trigger('click');
        }
    });

    // 更新滑動畫面 + active 樣式 (設定updateSlide的作用)
    function updateSlide(index) {                           //定義一個叫做updateSlide的事件(根據傳入的index來更新按鈕狀態與畫面位置)
        $('.cp_listmark button').removeClass('active');     
        $('.cp_listmark button').eq(index).addClass('active');
        $('.cp_wrapper').css('transform', 'translateX(-' + (index * 100) + '%)'); // 滑動父容器cp_wrapper往左一個cp_list的寬度
    }
    //備註:什麼時候function 事件(){} 的()內需要加東西? -> 如這個函式需要根據外部資料來做事 就需要加入外部資料(A資料,B資料,C資料)
});

// jq 示意 c_environment 滑動效果(手機板可觸控滑動!!)
$(document).ready(function() {
    var startX = 0;                         //紀錄手指剛觸碰螢幕時的X座標
    var endX = 0;                           //手指離開螢幕時的X座標
    var totalItems = $('.en_list').length;  //紀錄cp_list總共有幾個 (length:這個東西裡面有幾個項目/英文是長度 但在js不是~)
    var currentIndex = 0;                   //設定目前正在看的第幾個區塊

    // 預設第一個按鈕 active
    $('.en_listmark button').first().addClass('active');

    // 按鈕點擊切換
    $('.en_listmark button').click(function() {
        currentIndex = $(this).index(); // 目前點的是第幾個按鈕
                                        // this:目前觸發事件的那個元素,這邊是目前點到的按鈕 
                                        // index:取得這個元素在同一組兄弟元素的第幾個,沒括號的指函式本身,後面+()為執行該函式的結果
        updateSlide(currentIndex);      // 呼叫updateSlide
    });

    // 滑動事件
    $('.en_list').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $('.en_list').on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        var deltaX = endX - startX;

        if (deltaX > 50 && currentIndex > 0) {
            // 右滑，往上一個
            currentIndex--;
            $('.en_listmark button').eq(currentIndex).trigger('click');
        } else if (deltaX < -50 && currentIndex < totalItems - 1) {
            // 左滑，往下一個
            currentIndex++;
            $('.en_listmark button').eq(currentIndex).trigger('click');
        }
    });

    // 更新滑動畫面 + active 樣式 (設定updateSlide的作用)
    function updateSlide(index) {                           //定義一個叫做updateSlide的事件(根據傳入的index來更新按鈕狀態與畫面位置)
        $('.en_listmark button').removeClass('active');     
        $('.en_listmark button').eq(index).addClass('active');
        $('.en_wrapper').css('transform', 'translateX(-' + (index * 100) + '%)'); // 滑動父容器cp_wrapper往左一個cp_list的寬度
    }
    //備註:什麼時候function 事件(){} 的()內需要加東西? -> 如這個函式需要根據外部資料來做事 就需要加入外部資料(A資料,B資料,C資料)
});