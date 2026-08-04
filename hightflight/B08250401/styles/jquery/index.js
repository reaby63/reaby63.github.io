// jq 示意 c_portfolio 滑動效果(手機板可觸控滑動!!)
// $(document).ready(function() {
//     var startX = 0;                         //紀錄手指剛觸碰螢幕時的X座標
//     var endX = 0;                           //手指離開螢幕時的X座標
//     var totalItems = $('.cp_list').length;  //紀錄cp_list總共有幾個 (length:這個東西裡面有幾個項目/英文是長度 但在js不是~)
//     var currentIndex = 0;                   //設定目前正在看的第幾個區塊

//     // 預設第一個按鈕 active
//     $('.cp_listmark button').first().addClass('active');

//     // 按鈕點擊切換
//     $('.cp_listmark button').click(function() {
//         currentIndex = $(this).index(); // 目前點的是第幾個按鈕
//                                         // this:目前觸發事件的那個元素,這邊是目前點到的按鈕 
//                                         // index:取得這個元素在同一組兄弟元素的第幾個,沒括號的指函式本身,後面+()為執行該函式的結果
//         updateSlide(currentIndex);      // 呼叫updateSlide
//     });

//     // 滑動事件
//     $('.cp_list').on('touchstart', function(e) {
//         startX = e.originalEvent.touches[0].clientX;
//     });

//     $('.cp_list').on('touchend', function(e) {
//         endX = e.originalEvent.changedTouches[0].clientX;
//         var deltaX = endX - startX;

//         if (deltaX > 50 && currentIndex > 0) {
//             // 右滑，往上一個
//             currentIndex--;
//             $('.cp_listmark button').eq(currentIndex).trigger('click');
//         } else if (deltaX < -50 && currentIndex < totalItems - 1) {
//             // 左滑，往下一個
//             currentIndex++;
//             $('.cp_listmark button').eq(currentIndex).trigger('click');
//         }
//     });

//     // 更新滑動畫面 + active 樣式 (設定updateSlide的作用)
//     function updateSlide(index) {                           //定義一個叫做updateSlide的事件(根據傳入的index來更新按鈕狀態與畫面位置)
//         $('.cp_listmark button').removeClass('active');     
//         $('.cp_listmark button').eq(index).addClass('active');
//         $('.cp_wrapper').css('transform', 'translateX(-' + (index * 100) + '%)'); // 滑動父容器cp_wrapper往左一個cp_list的寬度
//     }
//     //備註:什麼時候function 事件(){} 的()內需要加東西? -> 如這個函式需要根據外部資料來做事 就需要加入外部資料(A資料,B資料,C資料)
// });




// 滑動到指定區域後套上進場class
$(document).ready(function() {
    // 你要監聽的元素 + 套用的 class
    const elementsToObserve = [
    // { selector: '.c_photo ', className: 'c_photo_an' },
    { selector: '.c_contact , .c_portfolio , .c_info_bottom , .c_info_top', className: 'fadein_an' }
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


// to_top的所有動態
$(document).ready(function() {
  //滑鼠滑入後套class 滑出後套另一個class 
  $('.to_top').hover(
      // 滑鼠進來時，會自動執行這段（= mouseenter）
      function () {
        const $el = $(this);          // DOM 元素轉成 jQuery 物件
        $el.removeClass('to_top-out');  // 先將舊的動畫移除 避免class疊加
        void $el[0].offsetWidth;      // $el[0] 是 jQuery裡的第一個DOM元素,因為offsetWidth是原生屬性，必須對DOM用，不能對jQuery物件用; 
                                      // offsetWidth 是 DOM 元素的寬度（px）, 是一個「會觸發瀏覽器計算 layout」的屬性
                                      // 以上會強制觸發重繪（重新載入 DOM）
        $el.addClass('to_top-in');
      },
      // 滑鼠移開時，會自動執行這段（= mouseleave）
      function () {
        const $el = $(this);
        $el.removeClass('to_top-in');
        void $el[0].offsetWidth; // 同樣，確保動畫能重新執行
        $el.addClass('to_top-out');
      }
    );

    // to_top滑動功能
    $('.to_top').click(function () {
      let distance = $(window).scrollTop(); // 目前離頂部的距離
      let duration = distance / 2; // 根據距離決定動畫時間，數字越小越快
    
      $('html, body').animate({ scrollTop: 0 }, duration);
    });

    // 滑動到一定高度時 才顯示to_top
    $('.to_top').hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 240) {
        $('.to_top').show();
      } else {
        $('.to_top').hide();
      }
    });
  
})

// 關注按鈕的所有動態
$(document).ready(function() {
  
  // 點擊後加上active
  $('.focus_bt').on('click', function () {
    $(this).toggleClass('active');
  });

  // 滑鼠滑入滑出 加上animate
  $('.focus_bt').hover(
    function () {
      const $el = $(this);          // DOM 元素轉成 jQuery 物件
      $el.removeClass('focus_bt-out');  // 先將舊的動畫移除 避免class疊加
      void $el[0].offsetWidth;      // $el[0] 是 jQuery裡的第一個DOM元素,因為offsetWidth是原生屬性，必須對DOM用，不能對jQuery物件用; 
                                    // offsetWidth 是 DOM 元素的寬度（px）, 是一個「會觸發瀏覽器計算 layout」的屬性
                                    // 以上會強制觸發重繪（重新載入 DOM）
      $el.addClass('focus_bt-in');
    },
    // 滑鼠移開時，會自動執行這段（= mouseleave）
    function () {
      const $el = $(this);
      $el.removeClass('focus_bt-in');
      void $el[0].offsetWidth; // 同樣，確保動畫能重新執行
      $el.addClass('focus_bt-out');
    }
  );

})
