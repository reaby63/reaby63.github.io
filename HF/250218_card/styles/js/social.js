// 社群按鈕們滑動------------

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".social_icon");
    const icons = Array.from(container.querySelectorAll("a"));
    const leftBtn = document.querySelector(".arrow_l_bt");
    const rightBtn = document.querySelector(".arrow_r_bt");
  
    let visibleCount = getVisibleCount();
    let startIndex = 0;
  
    function getVisibleCount() {
      if (window.innerWidth <= 385) return 2;
      if (window.innerWidth <= 414) return 3;
      return 4;
    }
  
    function updateView(smooth = false) {
      const offset = startIndex * 44; // 每個 icon 50px
      container.style.transition = smooth ? "transform 0.3s ease-in-out" : "none";
      container.style.transform = `translateX(-${offset}px)`;
  
      leftBtn.classList.toggle("btn_fin", startIndex === 0);
      rightBtn.classList.toggle("btn_fin", startIndex + visibleCount >= icons.length);
    }
  
    leftBtn.addEventListener("click", function () {
      if (startIndex > 0) {
        startIndex--;
        updateView(true);
      }
    });
  
    rightBtn.addEventListener("click", function () {
      if (startIndex + visibleCount < icons.length) {
        startIndex++;
        updateView(true);
      }
    });
  
    window.addEventListener("resize", function () {
      visibleCount = getVisibleCount();
      startIndex = 0;
      updateView();
    });
  
    updateView();
  });
  