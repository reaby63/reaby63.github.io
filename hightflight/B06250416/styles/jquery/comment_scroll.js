
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
    const containerCenter = $scrollContent.width() / 2;
    const scrollLeft = $scrollContent.scrollLeft();

    let closestItem = null;
    let closestDistance = Infinity;
    let closestIndex = 0; // 👈 新增變數：記錄索引

    $items.each(function (index) {
      const $item = $(this);
      const itemLeft = $item.position().left + scrollLeft;
      const itemCenter = itemLeft + $item.outerWidth() / 2;
      const distanceToCenter = Math.abs(itemCenter - (scrollLeft + containerCenter));

      if (distanceToCenter < closestDistance) {
        closestDistance = distanceToCenter;
        closestItem = $item;
        closestIndex = index; // 👈 同步更新 index
      }
    });

    if (closestItem) {
      const itemLeft = closestItem.position().left + scrollLeft;
      const itemCenter = itemLeft + closestItem.outerWidth() / 2;
      const newScrollLeft = itemCenter - containerCenter;

      $scrollContent.animate({ scrollLeft: newScrollLeft }, 200);

      currentIndex = closestIndex; // ✅ 修正：同步更新 currentIndex
    }
  }


  // 🌀 自動輪播設定
  let autoScrollTimer = null;
  let currentIndex = 0; // 目前的項目索引

  // ⏱️ 調整這兩個值來控制速度與間隔
  const autoScrollInterval = 4000; // 每隔多久滾動一次（毫秒）→ 3000ms = 3秒
  const scrollDuration = 1000;      // 滾動動畫時間（毫秒）

  function startAutoScroll() {
    stopAutoScroll(); // 避免重複啟動

    autoScrollTimer = setInterval(() => {
      currentIndex++;

      if (currentIndex >= $items.length) {
        currentIndex = 0; // 到最後一個就從頭來
      }

      scrollToItem(currentIndex);
    }, autoScrollInterval);
  }

  function stopAutoScroll() {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  }

  // 📍根據索引滾動到對應 item 並置中
  function scrollToItem(index) {
    const $targetItem = $items.eq(index);
    const containerCenter = $scrollContent.width() / 2;
    const scrollLeft = $scrollContent.scrollLeft();
    const itemLeft = $targetItem.position().left + scrollLeft;
    const itemCenter = itemLeft + $targetItem.outerWidth() / 2;
    const newScrollLeft = itemCenter - containerCenter;

    $scrollContent.animate({ scrollLeft: newScrollLeft }, scrollDuration);
  }

  // 🧠 使用者拖曳/滑動時暫停輪播，放開後再啟動
  $scrollContent.on('mousedown touchstart', stopAutoScroll);
  $scrollContent.on('mouseup touchend touchcancel', function () {
    setTimeout(startAutoScroll, 1000); // 放開後延遲 1 秒再開始輪播
  });

  // ✅ 啟動輪播
  startAutoScroll();


});
  

