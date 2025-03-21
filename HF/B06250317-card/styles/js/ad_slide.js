
const track = document.querySelector('.adt_carousel_track');
const slides = Array.from(document.querySelectorAll('.adt_slide'));
const prevBtn = document.querySelector('.adt_arrow_l');
const nextBtn = document.querySelector('.adt_arrow_r');
const arrows = document.querySelectorAll('.adt_arrow');  // 取得箭頭
let currentIndex = 0;

// 創建小圓點（可選，未啟用的部分）
const dots = document.querySelectorAll('.dot');

// 更新輪播
function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
    adjustArrowPosition();  // 更新箭頭位置
}

// 轉到指定的 slide
function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

// 前往下一張
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

// 前往上一張
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// 垂直置中調整
function adjustSlideHeight() {
    const windowHeight = window.innerHeight; // 取得視窗高度
    const windowWidth = window.innerWidth;  // 取得視窗寬度

    slides.forEach(slide => {
        const adtTopHeight = slide.querySelector('.adt_top').offsetHeight; // 取得 adt_top 的高度
        const adtBottomHeight = slide.querySelector('.adt_bottom').offsetHeight; // 取得 adt_bottom 的高度
        const totalSlideHeight = adtTopHeight + adtBottomHeight; // 計算總高度

        if (windowWidth < 640) {
            // 當寬度小於 640px 時，檢查 adt_top + adt_bottom 的高度
            if (totalSlideHeight < windowHeight) {
                // 當 adt_top + adt_bottom 的總高度小於視窗高度時，垂直置中
                const slideHeight = slide.offsetHeight;
                slide.style.marginTop = `calc( (100vh - ${slideHeight}px) / 2 )`;
            } else {
                // 若高度大於 100vh，則不設置 top 並設置 height: 100%
                slide.style.marginTop = '';
                slide.style.height = '100%';
            }
        } else {
            if (totalSlideHeight < windowHeight) {
                // 設定最小高度為視窗高度，並且垂直置中
                slide.style.height = "100vh";
                slide.style.display = "flex";
                slide.style.flexDirection = "column";
                slide.style.justifyContent = "center";
                slide.style.alignItems = "center";
                const slideHalfHeight = totalSlideHeight / 2;
                slide.style.top = `calc(30vh - ${slideHalfHeight}px)`;  // 垂直置中
            } else {
                // 恢復原本的高度和顯示方式
                slide.style.height = "auto";
                slide.style.display = "";
                slide.style.justifyContent = "";
                slide.style.alignItems = "";
                slide.style.top = ''; // 清除 top 設定
            }
        }
    });
}

// 調整箭頭的位置
function adjustArrowPosition() {
    const windowHeight = window.innerHeight; // 取得視窗高度
    const currentSlide = slides[currentIndex];
    const adtTopHeight = currentSlide.querySelector('.adt_top').offsetHeight;
    const adtBottomHeight = currentSlide.querySelector('.adt_bottom').offsetHeight;
    const totalSlideHeight = adtTopHeight + adtBottomHeight; // 計算當前 slide 高度

    if (totalSlideHeight < windowHeight) {
        // 當前 slide 高度小於視窗高度時，不再調整箭頭位置
        // 所以這裡不會對箭頭設置 top
    } else {
        // 當前 slide 高度滿足 100vh 時，箭頭居中顯示
        arrows.forEach(arrow => {
            arrow.style.top = `calc(50vh - 14px)`;  // 假設箭頭高度為 50px，調整為視窗中間
        });
    }
}

// 初次加載時調整高度
window.addEventListener("load", () => {
    adjustSlideHeight();
    // 不再調整箭頭的 top
});

// 當視窗大小改變時重新調整
window.addEventListener("resize", () => {
    adjustSlideHeight();
    // 不再調整箭頭的 top
});

