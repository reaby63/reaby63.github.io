
// 作品集的滑動效果與自訂 scrollbar 行為
// 註解調畫面也不會跑版哦~

$(function () {
  // ===== 1. DOM 元素選取 =====
  const $scrollContent = $('.scroll-content'); // 可橫向滾動的內容區塊
  const $scrollbar = $('.custom-scrollbar.my-scrollbar'); // 自訂的 scrollbar 滑桿
  const $track = $('.scrollbar_box'); // scrollbar 軌道（固定寬度-css設定）
  const $container = $('.scroll-container'); // 外層容器（限制最大寬度）
  const $innerContent = $('.inner-content'); // 真正包含所有 item 的內容（可能超出寬度）

  // ===== 2. 更新 scrollbar 位置與狀態 =====
  function updateScrollbar() {
    const containerWidth = $container.width(); // 可視區寬度（例如 80vw）
    const contentWidth = $innerContent.outerWidth(); // 整個內容寬度（可能超出）
    const maxScrollLeft = contentWidth - containerWidth; // 最大 scrollLeft（可滾動距離）
    const trackWidth = $track.width(); // 軌道寬度
    const scrollLeft = $scrollContent.scrollLeft(); // 目前的橫向滾動位置

    // ===== 如果內容沒超出容器寬度，scrollbar 就沒必要顯示（或無法滾動）=====
    if (contentWidth <= containerWidth) {
      $scrollbar
        .addClass('disabled') // 標記為不能拖拉
        .css({ left: 0 }) // 滑桿歸位
        .removeClass('at-end'); // 一定不會到底，保險移除 class
    } else {
      // ===== 有滾動空間時，開始計算滑桿比例與位置 =====
      const percent = containerWidth / contentWidth; // 可視內容佔全部的比例
      const scrollbarWidth = $scrollbar.outerWidth(); // 目前滑桿寬度（由 CSS 控制）
      const scrollbarLeft = scrollLeft * (trackWidth - scrollbarWidth) / maxScrollLeft; // 算出滑桿對應位置

      $scrollbar
        .removeClass('disabled') // 移除不可拖狀態
        .css({
          '--scrollbar-percent': percent, // 傳給 CSS 控制寬度
          left: scrollbarLeft // 實際位置
        });

      // ===== 判斷是否滑到底（右側），加上 class at-end =====
      if (scrollLeft >= maxScrollLeft - 1) {
        $scrollbar.addClass('at-end');
      } else {
        $scrollbar.removeClass('at-end');
      }
    }
  }

  // 內容滾動時，更新 scrollbar 狀態
  $scrollContent.on('scroll', updateScrollbar);

  // 視窗大小變化時也重新計算
  $(window).on('resize', updateScrollbar);

  // 初始加載完畢稍微延遲，確保 DOM 完整再執行
  setTimeout(updateScrollbar, 50);

  // ===== 3. 滑鼠拖曳 scrollbar 控制內容滑動 =====
  let isDraggingBar = false; // 是否正在拖曳滑桿
  let startX, startScroll; // 滑鼠起始位置與 scrollLeft 起始值

  // 滑鼠按下 scrollbar 開始拖曳
  $scrollbar.on('mousedown', function (e) {
    if ($scrollbar.hasClass('disabled')) return; // 如果無法滾動就不處理

    isDraggingBar = true;
    startX = e.pageX; // 滑鼠點下時的 X 位置
    startScroll = $scrollContent.scrollLeft(); // 當下的 scrollLeft
    e.preventDefault(); // 阻止選取文字等預設行為
    e.stopPropagation(); // 阻止事件往上冒泡
  });

  // 拖曳中，根據滑鼠移動距離來更新 scrollLeft
  $(document).on('mousemove', function (e) {
    if (!isDraggingBar) return;

    const contentWidth = $innerContent.outerWidth();
    const containerWidth = $container.width();
    const trackWidth = $track.width();
    const maxScrollLeft = contentWidth - containerWidth;
    const scrollbarWidth = $scrollbar.outerWidth();
    const delta = e.pageX - startX; // 滑鼠移動距離

    const scrollDelta = delta * maxScrollLeft / (trackWidth - scrollbarWidth);
    $scrollContent.scrollLeft(startScroll + scrollDelta);
  });

  // 滑鼠放開，結束拖曳狀態
  $(document).on('mouseup', function () {
    isDraggingBar = false;
  });

  // ===== 3-1. 手機支援 touch 拖曳 scrollbar =====
  $scrollbar.on('touchstart', function (e) {
    if ($scrollbar.hasClass('disabled')) return;

    isDraggingBar = true;
    startX = e.originalEvent.touches[0].pageX; // 手指位置
    startScroll = $scrollContent.scrollLeft();
    e.preventDefault(); // 防止畫面彈跳
  });

  $(document).on('touchmove', function (e) {
    if (!isDraggingBar) return; // 沒拖就直接離開，不多做事 !是邏輯否定的意思
    // 下面就是只給「拖曳中」的人使用的邏輯
    const contentWidth = $innerContent.outerWidth();
    const containerWidth = $container.width();
    const trackWidth = $track.width();
    const maxScrollLeft = contentWidth - containerWidth;
    const scrollbarWidth = $scrollbar.outerWidth();
    const delta = e.originalEvent.touches[0].pageX - startX;

    const scrollDelta = delta * maxScrollLeft / (trackWidth - scrollbarWidth);
    $scrollContent.scrollLeft(startScroll + scrollDelta);
  });

  $(document).on('touchend', function () {
    isDraggingBar = false;
  });

  // ===== 4. 拖曳 scroll-content 本身滑動（像相簿一樣） =====
  let isDraggingContent = false;
  let contentStartX = 0;
  let scrollStartLeft = 0;

  $scrollContent.on('mousedown', function (e) {
    isDraggingContent = true;
    contentStartX = e.pageX;
    scrollStartLeft = $scrollContent.scrollLeft();
    e.preventDefault();
  });

  $(document).on('mousemove', function (e) {
    if (!isDraggingContent) return;
    const delta = e.pageX - contentStartX;
    $scrollContent.scrollLeft(scrollStartLeft - delta);
  });

  $(document).on('mouseup', function () {
    isDraggingContent = false;
  });

  // ===== 5. 手機支援滑動（橫向）=====
  // 只要在 CSS 裡對 .scroll-content 設定：
  // touch-action: pan-x; 就能啟用橫向滑動

  // ===== 🆕 6. 讓垂直滑動也能正常發生（避免觸控時畫面卡住）=====
  let touchStartX = 0;
  let touchStartY = 0;
  let isScrollingX = false;

  $scrollContent.on('touchstart', function (e) {
    const touch = e.originalEvent.touches[0];
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;
    isScrollingX = false; // 每次重新偵測
  });

  $scrollContent.on('touchmove', function (e) {
    const touch = e.originalEvent.touches[0];
    const deltaX = Math.abs(touch.pageX - touchStartX);
    const deltaY = Math.abs(touch.pageY - touchStartY);

    // 如果是橫向滑動，才阻止畫面上下捲動
    if (!isScrollingX && deltaX > deltaY) {
      isScrollingX = true;
      //e.preventDefault(); // 阻止預設垂直滾動 //ios系統無法左右滑動 先註解掉了
    }
  });
});
