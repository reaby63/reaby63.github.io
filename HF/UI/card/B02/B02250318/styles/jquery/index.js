// jq 示意 c_portfolio 滑動效果
// $(document).ready(function() {
//     // 預設顯示第一個 cp_list 和第一個按鈕加 active
//     $('.cp_listmark button').first().addClass('active');

//     // 按鈕點擊事件
//     $('.cp_listmark button').click(function() {
//         var index = $(this).index(); // 判斷當前按鈕在哪個div
//         var currentDiv = $('.cp_list').eq(index); // 獲取對應的 div
//         var currentButton = $(this); // 當前按鈕

//         // 更新按鈕的 active 狀態
//         $('.cp_listmark button').removeClass('active');
//         currentButton.addClass('active');

//         // 滑動父容器 cp_wrapper 左移一個 cp_list 的寬度
//         $('.cp_wrapper').css('transform', 'translateX(-' + (index * 100) + '%)');

//     });
// });

// jq 示意 c_portfolio 滑動效果(包含觸控左右滑動)
$(document).ready(function() {
  var startX = 0;
  var endX = 0;
  var totalItems = $('.cp_list').length;
  var currentIndex = 0;

  // 預設第一個按鈕 active
  $('.cp_listmark button').first().addClass('active');

  // 按鈕點擊切換
  $('.cp_listmark button').click(function() {
      currentIndex = $(this).index(); // 記住當前 index
      updateSlide(currentIndex);
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

  // 更新滑動畫面 + active 樣式
  function updateSlide(index) {
      $('.cp_listmark button').removeClass('active');
      $('.cp_listmark button').eq(index).addClass('active');
      $('.cp_wrapper').css('transform', 'translateX(-' + (index * 100) + '%)');
  }
});



// 滑動到指定區域後套上進場class

$(document).ready(function() {
    // 你要監聽的元素 + 套用的 class
    const elementsToObserve = [
      { selector: '.serve_self', className: 'each_an' },
      { selector: '#c_portfolio', className: 'fadeIn' },
      { selector: '#c_contact', className: 'fadeIn' }
      
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
  