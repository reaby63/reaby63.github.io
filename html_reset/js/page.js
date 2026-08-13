const main = document.getElementById('main-content');

// 載入頁面的事件
function loadPage(pageFile) {

    fetch(pageFile)
        .then(res => res.text())
        .then(html => {

            main.innerHTML = html;

            initComponents(); // 所有元件初始化

        })
        .catch(err => console.error(`載入 ${pageFile} 失敗`, err));

}

// 預設首頁
loadPage('page/page-home.html');

// 點選切換頁面
document.addEventListener('click', e => {

    const link = e.target.closest('[data-page]');
    if (!link) return;

    e.preventDefault();

    loadPage(`page/${link.dataset.page}.html`);

});


// 這邊是元件載入用的
function initComponents() {

    initModal(); // Modal 彈窗元件

    initAccordion(); // 手風琴元件

    initSwiper(); // Swiper 元件

    initMasonry(); // 瀑布流樣式

    initCircleText(); // 圓圈文字

    initTabs(); // Tab 切換元件

    initNumberCounter(); // 數字動畫

    initAnimation(); // 進入動畫
    initTextReveal(); // 文字逐字從上往下淡入進場

    cmpScrollX.init(); // 橫向捲動元件

}