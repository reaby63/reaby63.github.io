// document.addEventListener("DOMContentLoaded", function () {
//     const track = document.querySelector(".adt_carousel_track");
//     const slides = document.querySelectorAll(".adt_slide");
//     const prevBtn = document.querySelector(".adt_arrow_l");
//     const nextBtn = document.querySelector(".adt_arrow_r");
    
//     let currentIndex = 0;
//     const totalSlides = slides.length;
  
//     function updateSlidePosition() {
//       const slideWidth = slides[0].offsetWidth;
//       track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
//     }
  
//     nextBtn.addEventListener("click", function () {
//       if (currentIndex < totalSlides - 1) {
//         currentIndex++;
//       } else {
//         currentIndex = 0; // 回到第一張
//       }
//       updateSlidePosition();
//     });
  
//     prevBtn.addEventListener("click", function () {
//       if (currentIndex > 0) {
//         currentIndex--;
//       } else {
//         currentIndex = totalSlides - 1; // 回到最後一張
//       }
//       updateSlidePosition();
//     });
  
//     // 確保視窗縮放時仍然適應
//     window.addEventListener("resize", updateSlidePosition);
//   });
  