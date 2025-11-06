/* 這邊插入ad_slide內容 */
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

                    