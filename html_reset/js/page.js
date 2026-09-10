const main = document.getElementById('main-content');

function loadPage(pageName) {

    const pageFile = `page/${pageName}.html`;

    fetch(pageFile)
        .then(res => res.text())
        .then(html => {

            // 套 data.json
            html = replaceVars(html, siteData);

            main.innerHTML = html;

            // 初始化元件
            initComponents();

        })
        .catch(err => {
            console.error(`載入 ${pageFile} 失敗`, err);
        });
}


// 點擊 Header
document.addEventListener('click', e => {

    const link = e.target.closest('[data-page]');

    if (!link) return;

    e.preventDefault();

    loadPage(link.dataset.page);

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

    initGsap(); // GSAP 動畫

}