
// 左右滑動效果

$(function () {
    // 抓到各個主要的元素
    const $scrollContent = $('.scroll-content'); // 滾動區域
    const $container = $('.scroll-container');   // 整個包住的容器
    const $innerContent = $('.inner-content');   // 內容物（很多個 item）
    const $items = $('.item');                    // 每個 item 項目
  
    // 用來記錄拖曳的狀態
    let isDraggingContent = false; // 是否正在拖曳
    let startX = 0;                // 拖曳開始時的 X 座標
    let scrollStart = 0;           // 拖曳開始時 scrollLeft 的位置

  
    // 滑鼠拖曳滑動（電腦用）
    $scrollContent.on('mousedown', function (e) {
      isDraggingContent = true;             // 開始拖曳
      startX = e.pageX;                     // 記住按下去的 X
      scrollStart = $scrollContent.scrollLeft(); // 記住按下去當時的 scrollLeft
      e.preventDefault();                   // 防止文字被選取
    });
  
    $(document).on('mousemove', function (e) {
      if (!isDraggingContent) return; // 不是在拖就不動作
      const delta = e.pageX - startX; // 算出滑了多少距離
      $scrollContent.scrollLeft(scrollStart - delta); // 根據距離調整 scrollLeft
    });
  
    $(document).on('mouseup', function () {
      if (isDraggingContent) {
        centerClosestItem(); // 新增功能：拖曳結束，自動對齊最近的 item 到中間
      }
      isDraggingContent = false; // 放開滑鼠，結束拖曳
    });
  
    // 手指觸控拖曳滑動（手機、平板用）
    let touchStartX = 0; // 記錄觸控開始的 X
    let touchStartY = 0; // 記錄觸控開始的 Y
    let isTouchScrolling = false; // 是否正在處理左右滑動
  
    $scrollContent.on('touchstart', function (e) {
      if (e.originalEvent.touches.length === 1) { // 單指觸控
        isDraggingContent = true;
        touchStartX = e.originalEvent.touches[0].pageX; // 開始 X
        touchStartY = e.originalEvent.touches[0].pageY; // 開始 Y
        scrollStart = $scrollContent.scrollLeft();
        isTouchScrolling = false; // 一開始還不知道方向
      }
    });
  
    $scrollContent.on('touchmove', function (e) {
      if (!isDraggingContent) return;
  
      const touchX = e.originalEvent.touches[0].pageX;
      const touchY = e.originalEvent.touches[0].pageY;
      const deltaX = touchX - touchStartX; // 手指水平移動量
      const deltaY = touchY - touchStartY; // 手指垂直移動量
  
      if (!isTouchScrolling) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // 水平移動比較大，表示使用者想橫滑
          isTouchScrolling = true;
          e.preventDefault(); // 阻止預設上下滾動
        } else {
          // 垂直移動比較大，表示使用者想上下滑 → 不處理，交給瀏覽器
          isDraggingContent = false; // 取消我們自己處理的拖曳
          return;
        }
      }
  
      // 如果已經確定是橫向滑動
      $scrollContent.scrollLeft(scrollStart - deltaX);
    });
  
    $scrollContent.on('touchend touchcancel', function () {
      if (isDraggingContent) {
        centerClosestItem(); //新增功能：觸控滑動結束，自動對齊 item 到中間
      }
      isDraggingContent = false;
    });

  // 新增功能：自動對齊最接近中間的 item
  function centerClosestItem() {
    const containerCenter = $scrollContent.width() / 2; // 區域中心點
    const scrollLeft = $scrollContent.scrollLeft(); // 目前 scroll 的位置 / scrollLeft()意思是從容器的最左邊開始 已經滾出去多少px的位置

    let closestItem = null; //先準備一個變數closestItem 但先不放東西進去
    let closestDistance = Infinity; //一開始就把距離設為無限大 只要遇到任何比這個小的距離 就能更新

    //每經過一個items...
    $items.each(function () {
      const $item = $(this);
      const itemLeft = $item.position().left + scrollLeft; // item 左邊相對整個內容的位置
      const itemCenter = itemLeft + $item.outerWidth() / 2;
      const distanceToCenter = Math.abs(itemCenter - (scrollLeft + containerCenter)); //Math.abs( 算出這個項目跟目前畫面中間點的距離(不管左右/正負) 然後存到盤子裡 )
      //Math.abs(...) 會把...內的數字不管正負變成正的 簡稱絕對值

      //發現某個items比我目前記錄的最近距離還要近...
      if (distanceToCenter < closestDistance) { 
        closestDistance = distanceToCenter;
        closestItem = $item; //就把它放進盤子裡 比如ABC三個 經過計算距離最近的是A 就滑A 但滑完後重新計算B距離變更近 那就滑B
      }
    });

    //讓畫面自動捲動到離中心最近的那個item 讓他對其中間 這段就是讓它對其中間用的
    if (closestItem) {
      const itemLeft = closestItem.position().left + scrollLeft;
      const itemCenter = itemLeft + closestItem.outerWidth() / 2;
      const newScrollLeft = itemCenter - containerCenter;

      $scrollContent.animate({ scrollLeft: newScrollLeft }, 200); // 平滑滾動至中心
    }
  }

});
  

