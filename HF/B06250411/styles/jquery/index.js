// 滑動到指定區域後套上進場class
$(document).ready(function() {
    // 你要監聽的元素 + 套用的 class
    const elementsToObserve = [
    { selector: '.c_info ', className: 'c_info_an' },
    { selector: '.c_serve , .c_contact , .c_portfolio', className: 'slideUpFadeIn' }
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


  // 剛開始的文字一個一個往上進入
  $(function () {
    $('.animate-text h6').each(function (index) {  // 加入 index 來區分每一行
      const text = $(this).text();
      const chars = text.split('');
      const wrapped = chars.map((char, i) => {
        const delay = (i * 0.05).toFixed(2); // 每字延遲 0.05 秒
        return `<span style="animation-delay: ${delay}s">${char}</span>`;
      }).join('');
      
      // 增加對第二行的延遲
      const lineDelay = index * 1.2;  // 第二行延遲 0.5 秒
      $(this).html(wrapped);
  
      // 設置每行的總體延遲
      $(this).find('span').each(function () {
        const currentDelay = parseFloat($(this).css('animation-delay')) + lineDelay;
        $(this).css('animation-delay', `${currentDelay}s`);
      });

      // ✅ 文字處理完後再顯示
      $(this).css('visibility', 'visible');
    });
  });


//延遲banner圖出現 - 解決第一次載入時banner會先閃一下的狀態
$(document).ready(function () {
  // 等待所有圖片載入完成後
  $('img.later_look').each(function () {
    var $img = $(this);

    // 初始時設定 visibility 為 hidden
    $img.css('visibility', 'hidden');
    $img.css('opacity', '0');

    // 延遲 0.2 秒後將 visibility 改為 visible
    setTimeout(function () {
      $img.css('visibility', 'visible');
      $img.css('opacity', '1');
    }, 200); // 0.2秒延遲
  });
});



  // banner右下角箭頭 點擊後個人資料能滑到頂端
  $(function () {
    //.on('click', ...) 是綁定點擊事件的標準方式
    $('.c_banner_arrow').on('click', function (e) {
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
  });