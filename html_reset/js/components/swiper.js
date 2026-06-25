// 1. 載入 JSON 資料
let data = {};
async function loadData() {
    try {
        const res = await fetch('./js/data.json');
        data = await res.json();
    } catch (err) {
        console.error('讀取 data.json 失敗', err);
    }
}

// 2. 將資料生成 swiper slide
function buildSwiper(key) {
    const slidesData = data.banner[key];
    if (!slidesData) return;

    const wrapper = document.getElementById('swiper-slides');
    wrapper.innerHTML = slidesData.map(item => `
        <div class="swiper-slide">
            <div class="swiper-text">
              <h2>${item.title}</h2>
              <img src="${item.icon}" alt="icon" class="slide-icon">
              <p>${item.desc}</p>
            </div>
            <img src="${item.img}" alt="${item.title}">
        </div>
    `).join('');

    // 初始化 Swiper
    new Swiper(".mySwiper", {
      loop: true,
      speed: 1000, // 滑動動畫時間 (毫秒) 1000 = 1秒
      autoplay: {
          delay: 3000, // 幾毫秒換一張 (3000 = 3秒)
          disableOnInteraction: false // 使用者點擊後仍然繼續輪播
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        // 這邊是改數字輪播!
        // type: "bullets",
        // renderBullet: function (index, className) {
        //   console.log("有跑", index);
        //         return `<span class="${className}">${index + 1}</span>`;
        //     },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });
}

// 等資料都到了 再載入頁面
async function initPage() {
    // 先載入 HTML
    const res = await fetch('page/page-home.html');
    const html = await res.text();
    document.getElementById('main-content').innerHTML = html;

    await loadData(); // 再載入資料
    buildSwiper('one'); // 最後才建swiper
}

initPage();