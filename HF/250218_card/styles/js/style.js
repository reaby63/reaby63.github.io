// 關注按鈕------------
const button = document.getElementById('toggleButton');
// 當按鈕被點擊時，切換 "active" class
button.addEventListener('click', function() {
    button.classList.toggle('active');
});

// 回到頂部---------------
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// 剛進入頁面先隱藏
window.onload = function() {
    document.getElementById("scrollToTopBtn").style.display = "none"; // 進入頁面時隱藏按鈕
};

// 當頁面滾動時，檢查是否顯示按鈕
window.onscroll = function() {
    if (document.body.scrollTop > 240 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block"; // 顯示按鈕
    } else {
        scrollToTopBtn.style.display = "none"; // 隱藏按鈕
    }
};

// 當按鈕被點擊時，頁面滾動到頂部
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滾動
    });
});

  
  
  
  


  
  
  