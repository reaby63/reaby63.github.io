// jq 示意 c_portfolio 滑動效果(手機板可觸控滑動!!)
$(document).ready(function() {
    var startX = 0;                         //紀錄手指剛觸碰螢幕時的X座標
    var endX = 0;                           //手指離開螢幕時的X座標
    var totalItems = $('.cp_list').length;  //紀錄cp_list總共有幾個 (length:這個東西裡面有幾個項目/英文是長度 但在js不是~)
    var currentIndex = 0;                   //設定目前正在看的第幾個區塊
    var isDragging = false;                //滑鼠是否正在拖曳

    // 預設第一個按鈕 active
    $('.cp_listmark button').first().addClass('active');

    // 按鈕點擊切換
    $('.cp_listmark button').click(function() {
        currentIndex = $(this).index(); // 目前點的是第幾個按鈕
                                        // this:目前觸發事件的那個元素,這邊是目前點到的按鈕 
                                        // index:取得這個元素在同一組兄弟元素的第幾個,沒括號的指函式本身,後面+()為執行該函式的結果
        updateSlide(currentIndex);      // 呼叫updateSlide
    });

    // 手機：滑動開始
    $('.cp_list').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX; //紀錄起始X位置
    });

    // 手機：滑動結束
    $('.cp_list').on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX; //紀錄結束X位置
        handleSlide(); // 判斷是否需要切換區塊
    });

    // 電腦：滑鼠按下（準備拖曳）
    $('.cp_list').on('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX; //紀錄起始X位置
    });

    // 電腦：滑鼠放開（拖曳結束）
    $(document).on('mouseup', function(e) {
        if (isDragging) {
            endX = e.clientX; //紀錄結束X位置
            isDragging = false;
            handleSlide(); // 判斷是否需要切換區塊
        }
    });

    // 根據滑動距離決定是否切換區塊
    function handleSlide() {
        var deltaX = endX - startX;

        if (deltaX > 50 && currentIndex > 0) {
            // 右滑（或往右拖），切到上一個
            currentIndex--;
            $('.cp_listmark button').eq(currentIndex).trigger('click');
        } else if (deltaX < -50 && currentIndex < totalItems - 1) {
            // 左滑（或往左拖），切到下一個
            currentIndex++;
            $('.cp_listmark button').eq(currentIndex).trigger('click');
        }
    }


    // 更新滑動畫面 + active 樣式 (設定updateSlide的作用)
    function updateSlide(index) {                           //定義一個叫做updateSlide的事件(根據傳入的index來更新按鈕狀態與畫面位置)
        $('.cp_listmark button').removeClass('active');     
        $('.cp_listmark button').eq(index).addClass('active');
        $('.cp_wrapper').css('transform', 'translateX(-' + (index * 100) + '%)'); // 滑動父容器cp_wrapper往左一個cp_list的寬度
    }
    //備註:什麼時候function 事件(){} 的()內需要加東西? -> 如這個函式需要根據外部資料來做事 就需要加入外部資料(A資料,B資料,C資料)
});





$(document).ready(function () {
    
    // 點擊 cp_serch後 cp_serch_box滑出 再點擊就收回

    $('.select_btn').click(function(){
        $('.select_list').slideToggle();
        $('.select_btn_arrow img').toggleClass('scaleY');
    })

    $('.select_list button').click(function(){
        $('.select_list').slideUp(); // 收起選單
        $('.select_btn_arrow img').removeClass('scaleY'); // 還原箭頭
    });


    // 滑鼠滑入滑出 加上animate
    $('.banner_arrow').hover(
        function () {
            const $el = $(this);          // DOM 元素轉成 jQuery 物件
            $el.removeClass('banner_arrow-out');  // 先將舊的動畫移除 避免class疊加
            void $el[0].offsetWidth;      // $el[0] 是 jQuery裡的第一個DOM元素,因為offsetWidth是原生屬性，必須對DOM用，不能對jQuery物件用; 
                                        // offsetWidth 是 DOM 元素的寬度（px）, 是一個「會觸發瀏覽器計算 layout」的屬性
                                        // 以上會強制觸發重繪（重新載入 DOM）
            $el.addClass('banner_arrow-in');
        },
        // 滑鼠移開時，會自動執行這段（= mouseleave）
        function () {
            const $el = $(this);
            $el.removeClass('banner_arrow-in');
            void $el[0].offsetWidth; // 同樣，確保動畫能重新執行
            $el.addClass('banner_arrow-out');
        }
    );


    // banner右下角箭頭 點擊後個人資料能滑到頂端
    //.on('click', ...) 是綁定點擊事件的標準方式
    $('.banner_arrow').on('click', function (e) {
        e.preventDefault(); //阻止a的預設行為

        const id = $(this).data('id'); // 取得被點擊的a上的data-id 的屬性內容 (取1 取2 ...)
        const $target = $('#area' + id); //取得要滑動目標的id 可以area1 area2

        // 當點擊事件發生後 目標id區域滑到畫面最上方
        if ($target.length) { //確認目標區塊存在才繼續
        const targetTop = $target.offset().top;

        $('html, body').animate({
            scrollTop: targetTop
        }, 800);
        }
    });
    
})


// 滑動到指定區域後套上進場class
$(document).ready(function() {
    // 你要監聽的元素 + 套用的 class
    const elementsToObserve = [
    // { selector: '.c_serve , .c_contact , .c_portfolio', className: 'jumpInOnly_an' },
    { selector: '.c_portfolio , .c_comment , .c_store , .c_contact', className: 'fadeIn' }
    ];
  // 建立 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const $el = $(entry.target);          // 轉成 jQuery 物件
          const className = $el.data('class');  // 拿出 data-class 值
          $el.addClass(className);              // 加上動畫 class
          observer.unobserve(entry.target);     // 停止監聽（只觸發一次）
        }
      });
    }, { threshold: 0 }); // 當元素進入畫面 10% 時觸發
  
    // 註冊每個要觀察的元素
    elementsToObserve.forEach(item => {
        const $elements = $(item.selector); // 找到對應的所有元素

        if ($elements.length > 0) {
            $elements.each(function () {
                $(this).data('class', item.className); // 存進每個元素的 data
                observer.observe(this);                // 觀察每一個元素
            });
        }
    });
  });