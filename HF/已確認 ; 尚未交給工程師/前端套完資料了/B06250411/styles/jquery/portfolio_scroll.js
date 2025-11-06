
// 作品滑動效果

$(function () {
    // 抓到各個主要的元素
    const $scrollContent = $('.scroll-content'); // 滾動區域
    const $container = $('.scroll-container');   // 整個包住的容器
    const $innerContent = $('.inner-content');   // 內容物（很多個 item）
    const $btnLeft = $('.arrow-left');            // 左邊箭頭
    const $btnRight = $('.arrow-right');          // 右邊箭頭
    const $items = $('.item');                    // 每個 item 項目
  
    // 用來記錄拖曳的狀態
    let isDraggingContent = false; // 是否正在拖曳
    let startX = 0;                // 拖曳開始時的 X 座標
    let scrollStart = 0;           // 拖曳開始時 scrollLeft 的位置
  
    // 更新左右箭頭的狀態：加上或拿掉 .btn_fin class
    function updateArrowStatus() {
      const scrollLeft = $scrollContent.scrollLeft();         // 現在滾到哪
      const containerWidth = $container.width();              // 容器寬度
      const contentWidth = $innerContent.outerWidth();        // 整個內容寬度（包含 item + margin）
  
      if (scrollLeft <= 0) { // 如果已經在最左邊
        $btnLeft.addClass('btn_fin'); // 左箭頭加上半透明效果
      } else {
        $btnLeft.removeClass('btn_fin'); // 移除
      }
  
      if (scrollLeft + containerWidth >= contentWidth - 2) { // 如果滾到最右（加個 -2 保險）
        $btnRight.addClass('btn_fin'); // 右箭頭加上半透明
      } else {
        $btnRight.removeClass('btn_fin'); // 移除
      }
    }
  
    // 點擊左右箭頭時，移動一個 item 的寬度
    function scrollByItem(direction) {
      const currentScroll = $scrollContent.scrollLeft(); // 目前的 scrollLeft
      let targetScroll = currentScroll;
    
      const itemsArray = $items.toArray(); // 轉為原生陣列方便操作
    
      if (direction > 0) {
        // 向右滑：找第一個 offsetLeft > currentScroll 的 item
        for (let i = 0; i < itemsArray.length; i++) {
          const itemLeft = $(itemsArray[i]).position().left + currentScroll;
          if (itemLeft > currentScroll + 1) { // 加 1 防止卡在邊界
            targetScroll = itemLeft;
            break;
          }
        }
      } else {
        // 向左滑：找最後一個 offsetLeft < currentScroll 的 item
        for (let i = itemsArray.length - 1; i >= 0; i--) {
          const itemLeft = $(itemsArray[i]).position().left + currentScroll;
          if (itemLeft < currentScroll - 1) {
            targetScroll = itemLeft;
            break;
          }
        }
      }
    
      // 平滑動畫滑動
      $scrollContent.stop().animate({ scrollLeft: targetScroll }, 300, updateArrowStatus);
    }
  
    // 點左箭頭
    $btnLeft.on('click', function () {
      if (!$(this).hasClass('btn_fin')) { // 如果不是 disabled 才能點
        scrollByItem(-1); // 向左滑一格
      }
    });
  
    // 點右箭頭
    $btnRight.on('click', function () {
      if (!$(this).hasClass('btn_fin')) { // 如果不是 disabled 才能點
        scrollByItem(1); // 向右滑一格
      }
    });
  
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
      isDraggingContent = false;
    });
  
    // 每次滾動、視窗大小變化，都更新一下箭頭狀態
    $scrollContent.on('scroll', updateArrowStatus);
    $(window).on('resize', updateArrowStatus);
    
    // 網頁剛載入時也先更新一次
    setTimeout(updateArrowStatus, 50);
  });
  