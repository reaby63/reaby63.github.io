
//首頁banner輪播背景大圖////

  document.addEventListener('DOMContentLoaded', function () {
    const carouselItems = document.querySelectorAll('.carousel01-item');
    let currentIndex = 0;

    function showNextItem() {
      // 淡出當前圖片
      carouselItems[currentIndex].classList.remove('active');

      // 計算下一張圖片的索引
      currentIndex = (currentIndex + 1) % carouselItems.length;

      // 淡入下一張圖片
      carouselItems[currentIndex].classList.add('active');

      // 重新觸發縮放動畫
      resetAnimation(carouselItems[currentIndex]);
    }

    // 重新觸發動畫的函數
    function resetAnimation(element) {
      element.style.animation = 'none'; // 移除動畫
      void element.offsetWidth; // 觸發重繪
      element.style.animation = 'zoom 15s linear infinite'; // 重新添加動畫
    }

    // 初始顯示第一張圖片
    carouselItems[currentIndex].classList.add('active');

    // 設定輪播間隔時間（需大於過渡時間）
    setInterval(showNextItem, 12000);
  });


//首頁輪播背景大圖結束////














//banner優惠訊息區塊展開關閉////

  function togglePopup() {
    const popupWindow = document.querySelector('.popup-window');
    const plusSign = document.querySelector('.plus-sign');

    if (popupWindow.classList.contains('active')) {
      closePopup();
    } else {
      popupWindow.classList.add('active');
      plusSign.classList.add('active');
    }
  }

  function closePopup() {
    const popupWindow = document.querySelector('.popup-window');
    const plusSign = document.querySelector('.plus-sign');

    popupWindow.classList.add('closing'); // 啟動關閉動畫
    setTimeout(() => {
      popupWindow.classList.remove('active', 'closing'); // 動畫結束後移除 active
      plusSign.classList.remove('active'); // 移除 plusSign 的 active 狀態
    }, 1500); // 時間與 CSS 一致
  }


//banner優惠訊息區塊展開關閉結束////















//banner優惠訊息區塊彈跳視窗功能////


  const detailContents = [
    `<img src="images/index/index_035.jpg" alt="77折優惠">
      <span class="">2024/10/1</span>
      <h2>雙十一優惠77折，讓您擁有獨特風格！立即預約，體驗專業設計！</h2>
       <p>即日起至11月底，預約享【七折優惠】！無論是染髮、燙髮、修剪，還是護髮，專業造型師為你量身打造，讓你散發最亮眼的魅力<br>
優惠時間有限，快來預約，讓你的美麗等不及！

</p>
       `,

    `<img src="images/index/index_035.jpg" alt="77折優惠">
      <span class="">2024/10/1</span>
      <h2>雙十一優惠77折，讓您擁有獨特風格！立即預約，體驗專業設計！1111</h2>
       <p>即日起至11月底，預約享【七折優惠】！無論是染髮、燙髮、修剪，還是護髮，專業造型師為你量身打造，讓你散發最亮眼的魅力<br>
優惠時間有限，快來預約，讓你的美麗等不及！

</p>`,

    `<img src="images/index/index_035.jpg" alt="77折優惠">
      <span class="">2024/10/1</span>
      <h2>雙十一優惠77折，讓您擁有獨特風格！立即預約，體驗專業設計！22222</h2>
       <p>即日起至11月底，預約享【七折優惠】！無論是染髮、燙髮、修剪，還是護髮，專業造型師為你量身打造，讓你散發最亮眼的魅力<br>
優惠時間有限，快來預約，讓你的美麗等不及！

</p>`
  ];

  // 打開詳細視窗並更新內容
  // 記錄滾動位置
  // 打開詳細視窗並更新內容
  function openDetailPopup(event, index) {
    event.preventDefault();

    const popup = document.getElementById('detailPopup');
    const overlay = document.querySelector('.overlay');
    const popupBody = document.querySelector('.detail-popup .detail-popup-body');

    // 更新內容
    popupBody.innerHTML = detailContents[index];

    // 禁止背景滾動
    document.body.style.overflow = 'hidden';

    // 顯示遮罩層
    overlay.style.display = 'block';

    // 顯示並添加動畫
    popup.style.display = 'block';
    setTimeout(() => {
      popup.classList.add('active');
      overlay.classList.add('active');
    }, 10); // 延遲讓 CSS transition 生效
  }

  // 關閉詳細視窗
  function closeDetailPopup() {
    const popup = document.getElementById('detailPopup');
    const overlay = document.querySelector('.overlay');

    // 移除動畫類別
    popup.classList.remove('active');
    overlay.classList.remove('active');

    // 動畫結束後隱藏
    setTimeout(() => {
      popup.style.display = 'none';
      overlay.style.display = 'none';

      // 恢復背景滾動
      document.body.style.overflow = '';
    }, 300); // 時間應與 CSS transition 相同
  }

//banner優惠訊息區塊彈跳視窗功能結束////















//banner優惠訊息區塊消息左右輪播功能////
  let currentIndex = 0;
  const slides = document.querySelectorAll('.popup-detail__list');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        slide.classList.remove('prev', 'next');
      } else if (i < index) {
        slide.classList.add('prev');
        slide.classList.remove('active', 'next');
      } else {
        slide.classList.add('next');
        slide.classList.remove('active', 'prev');
      }
    });
  }

  function updateSlide(direction) {
    if (direction === 'prev') {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    } else if (direction === 'next') {
      currentIndex = (currentIndex + 1) % slides.length;
    }
    showSlide(currentIndex);
  }

  function prevSlide(event) {
    event.preventDefault();
    updateSlide('prev');
  }

  function nextSlide(event) {
    event.preventDefault();
    updateSlide('next');
  }

  // 初始顯示第一個幻燈片
  document.addEventListener('DOMContentLoaded', () => {
    showSlide(0);
  });


//banner優惠訊息區塊消息左右輪播功能結束////













//Hot News輪播與彈跳功能////
  document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.querySelector(".news-box__content"); // 滑動的整個區塊
    const pages = document.querySelectorAll(".news-box__list");
    const totalPages = pages.length;
    let currentPage = 1;

    const prevButton = document.querySelector(".prev-page");
    const nextButton = document.querySelector(".next-page");
    const pageButtons = document.querySelectorAll(".page-number");

    // 判斷設備類型（電腦版或手機版）
    function isDesktop() {
      return window.innerWidth >= 768; // 假設 768px 以上是電腦版
    }

    // 計算總頁數
    function calculateTotalPages() {
      return isDesktop() ? Math.ceil(totalPages / 3) : totalPages;
    }
    function calculateOffset() {
      const itemsPerPage = isDesktop() ? 3 : 1; // 電腦版每頁 3 個，手機版每頁 1 個
      return (currentPage - 1) * 100 / itemsPerPage * (isDesktop() ? 3 : 1);
    }
    function updateDisplay() {
      const totalDisplayPages = calculateTotalPages();
      const offset = calculateOffset();
      newsContainer.style.transition = "transform 0.5s ease-in-out";
      newsContainer.style.transform = `translateX(-${offset}%)`;

      //  使用 classList.toggle 來變更按鈕狀態
      prevButton.classList.toggle("disabled", currentPage === 1);
      nextButton.classList.toggle("disabled", currentPage === totalDisplayPages);

      // 更新頁碼按鈕狀態
      pageButtons.forEach(btn => {
        const pageNumber = parseInt(btn.dataset.page);
        btn.classList.toggle("disabled", pageNumber > totalDisplayPages);
      });

      // 高亮當前頁面按鈕
      pageButtons.forEach(btn => btn.classList.remove("page-active"));
      const activeButton = document.querySelector(`.page-number[data-page="${currentPage}"]`);
      if (activeButton) {
        activeButton.classList.add("page-active");
      }
    }
    // 頁碼按鈕點擊事件
    pageButtons.forEach(btn => {
      btn.addEventListener("click", function () {
        if (!btn.disabled) {
          currentPage = parseInt(this.dataset.page);
          updateDisplay();
        }
      });
    });

    // 上一頁按鈕
    prevButton.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        updateDisplay();
      }
    });

    // 下一頁按鈕
    nextButton.addEventListener("click", function () {
      const totalDisplayPages = calculateTotalPages();
      if (currentPage < totalDisplayPages) {
        currentPage++;
        updateDisplay();
      }
    });

    // 初始化
    updateDisplay();

    // 監聽窗口大小變化，動態調整
    window.addEventListener("resize", function () {
      currentPage = 1; // 重置為第一頁
      updateDisplay();
    });

    // 彈跳視窗功能
    const popupOverlay = document.getElementById("popupOverlay");
    const popupContent = document.querySelector(".popup-content"); // 內部彈出框
    const popupClose = document.getElementById("popupClose");

    document.querySelectorAll(".best-mask").forEach(mask => {
      mask.addEventListener("click", function (e) {
        e.preventDefault();
        popupOverlay.style.display = "flex";

        // 小延遲後添加 active 類別，觸發動畫
        setTimeout(() => {
          popupOverlay.classList.add("active");
          popupContent.classList.add("active");
        }, 10);

        // 禁止背景滾動
        document.body.style.overflow = "hidden";
      });
    });

    function closePopup() {
      popupOverlay.classList.remove("active");
      popupContent.classList.remove("active");

      // 動畫結束後隱藏
      setTimeout(() => {
        popupOverlay.style.display = "none";
      }, 300);

      // 恢復背景滾動
      document.body.style.overflow = "";
    }

    popupClose.addEventListener("click", closePopup);

    popupOverlay.addEventListener("click", function (e) {
      if (e.target === popupOverlay) {
        closePopup();
      }
    });
  });

//Hot News輪播與彈跳功能結束////















//Our Team照片作品輪播及彈跳視窗////


document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  const modalText = document.getElementById('modal-text');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  let currentIndex = 0;
  let images = [];
  let texts = [];

  function openModal() {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    updateModalContent();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  function updateModalContent() {
    modalImage.src = images[currentIndex];
    modalText.textContent = texts[currentIndex];
    updateButtons();
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === images.length - 1;
  }

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentIndex > 0) {
      currentIndex--;
      updateModalContent();
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentIndex < images.length - 1) {
      currentIndex++;
      updateModalContent();
    }
  });

  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // **處理 .team-box__picture 內的 img**
  document.querySelectorAll('.team-box__picture').forEach((section) => {
    const imgs = section.querySelectorAll('img');

    imgs.forEach((img, index) => {
      img.addEventListener('click', (e) => {
        e.preventDefault();
        images = Array.from(imgs).map((img) => img.src);
        texts = Array.from(imgs).map((img) => img.alt || "No description");
        currentIndex = index;
        openModal();
      });
    });
  });

  // **處理 .photo-popup__box .photo-popup__list a**
  document.querySelectorAll('.photo-popup__box .photo-popup__list a').forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      images = Array.from(document.querySelectorAll('.photo-popup__box .photo-popup__list a')).map((a) => a.getAttribute('data-image'));
      texts = Array.from(document.querySelectorAll('.photo-popup__box .photo-popup__list a')).map((a) => a.getAttribute('data-text') || "No description");
      currentIndex = index;
      openModal();
    });
  });
});

//Our Team照片作品輪播及彈跳視窗結束////















//Contact Us 換頁與頁碼功能////
  document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page-number01"); // 選擇新的頁碼 class
    const prevPage = document.querySelector(".page-btn--style01"); // PREVIOUS PAGE
    const nextPage = document.querySelector(".next-page01"); // NEXT PAGE
    const contents = document.querySelectorAll(".contact__content"); // 輪播的內容區塊
    let currentPage = 1; // 目前顯示的頁碼
    const totalPages = contents.length; // 根據內容區塊數量設定總頁數

    // 確保不顯示不必要的頁碼
    pages.forEach(page => {
      if (parseInt(page.dataset.page) > totalPages) {
        page.style.display = 'none'; // 隱藏超出範圍的頁碼
      }
    });

    function showPage(page) {
      if (page < 1 || page > totalPages) return; // 防止超出範圍

      // 移除所有頁碼的 active 狀態
      pages.forEach(p => p.classList.remove("page-active01"));
      contents.forEach(c => c.classList.remove("active01", "fade-in01")); // 先移除動畫 class

      // 設定當前頁碼的 active 狀態
      document.querySelector(`.page-number01[data-page="${page}"]`).classList.add("page-active01");

      // 加入動畫 class
      contents[page - 1].classList.add("active01", "fade-in01");

      // 更新當前頁碼
      currentPage = page;

      // 控制 PREVIOUS 和 NEXT 按鈕是否可點擊
      prevPage.classList.toggle("disabled", currentPage === 1 || totalPages === 1);
      nextPage.classList.toggle("disabled", currentPage === totalPages || totalPages === 1);
    }

    // 點擊數字頁碼
    pages.forEach(page => {
      page.addEventListener("click", function (event) {
        event.preventDefault(); // 阻止默認的超鏈接行為
        showPage(parseInt(this.dataset.page)); // 設定頁碼
      });
    });

    // 點擊上一頁
    prevPage.addEventListener("click", function (event) {
      event.preventDefault(); // 阻止默認的超鏈接行為
      if (currentPage > 1) showPage(currentPage - 1);
    });

    // 點擊下一頁
    nextPage.addEventListener("click", function (event) {
      event.preventDefault(); // 阻止默認的超鏈接行為
      if (currentPage < totalPages) showPage(currentPage + 1);
    });

    // 預設顯示第一頁
    showPage(currentPage);
  });


//Contact Us 換頁與頁碼功能結束////














//MORE PHOTOS滑動動畫與彈跳功能////

  document.addEventListener("DOMContentLoaded", function () {
    let photoPopupOverlay = document.querySelector(".photo-popup-overlay");
    let pictureBtn = document.querySelector(".photo-picture-btn");
    let closePhotoPopup = document.querySelector(".close-photo-popup");

    // Open the photo popup when button is clicked
    pictureBtn.addEventListener("click", function (e) {
      e.preventDefault();
      photoPopupOverlay.style.display = "flex";

      // 禁止背景滾動
      document.body.style.overflow = "hidden";

      // Trigger the animation
      setTimeout(() => {
        document.querySelector(".photo-popup-content").style.transform = "translateY(0)";
      }, 10);
    });

    // 關閉視窗時，觸發由上往下滑動的關閉動畫
    closePhotoPopup.addEventListener("click", function () {
      // 添加 closing 類別來觸發動畫
      photoPopupOverlay.classList.add("closing");
      document.querySelector(".photo-popup-content").classList.add("closing");

      // 在動畫結束後隱藏元素
      setTimeout(() => {
        photoPopupOverlay.style.display = "none"; // 隱藏視窗
        photoPopupOverlay.classList.remove("closing"); // 移除動畫效果
        document.querySelector(".photo-popup-content").classList.remove("closing");

        // 恢復背景滾動
        document.body.style.overflow = "";
      }, 500); // 與動畫時間匹配
    });

    // 點擊遮罩層關閉彈窗
    photoPopupOverlay.addEventListener("click", function (e) {
      if (e.target === photoPopupOverlay) {
        // 添加 closing 類別來觸發動畫
        photoPopupOverlay.classList.add("closing");
        document.querySelector(".photo-popup-content").classList.add("closing");

        // 在動畫結束後隱藏元素
        setTimeout(() => {
          photoPopupOverlay.style.display = "none"; // 隱藏視窗
          photoPopupOverlay.classList.remove("closing"); // 移除動畫效果
          document.querySelector(".photo-popup-content").classList.remove("closing");

          // 恢復背景滾動
          document.body.style.overflow = "";
        }, 500); // 與動畫時間匹配
      }
    });
  });
//MORE PHOTOS滑動動畫與彈跳功能結束////














//MORE PHOTOS 頁碼功能////
  document.addEventListener("DOMContentLoaded", function () {
    const popupOverlay = document.querySelector(".photo-popup-overlay");
    const popupBoxes = document.querySelectorAll(".photo-popup__box");
    const popupLists = document.querySelectorAll(".photo-popup__list");

    const pageButtons = document.querySelectorAll(".page-number02");
    const nextPageBtn = document.querySelector(".next-page02");
    const prevPageBtn = document.querySelector(".page-btn--style02");

    let currentPage = 0; // 預設顯示第一個 .photo-popup__box
    const totalPages = popupBoxes.length; // 取得總頁數

    // 開啟彈跳視窗
    popupLists.forEach((list) => {
      list.addEventListener("click", function () {
        popupOverlay.style.display = "block";
        showPage(currentPage); // 顯示當前頁面
      });
    });


    // 顯示指定頁面
    function showPage(index) {
      popupBoxes.forEach((box, i) => {
        box.style.display = i === index ? "flex" : "none";
      });

      // 更新頁碼樣式
      pageButtons.forEach((btn) => btn.classList.remove("page-active01"));
      pageButtons[index].classList.add("page-active01");

      // 更新按鈕狀態（禁用 & 變灰）
      prevPageBtn.disabled = index === 0;
      nextPageBtn.disabled = index === totalPages - 1;

      prevPageBtn.classList.toggle("disabled", index === 0);
      nextPageBtn.classList.toggle("disabled", index === totalPages - 1);
    }

    // 切換頁面（點擊頁碼）
    pageButtons.forEach((button, index) => {
      button.addEventListener("click", function () {
        currentPage = index;
        showPage(currentPage);
      });
    });

    // 下一頁
    nextPageBtn.addEventListener("click", function () {
      if (currentPage < totalPages - 1) {
        currentPage++;
        showPage(currentPage);
      }
    });

    // 上一頁
    prevPageBtn.addEventListener("click", function () {
      if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
      }
    });

    // 預設顯示第一頁
    showPage(currentPage);
  });
//MORE PHOTOS 頁碼功能結束////










//人才招募彈跳功能////

function triggerPanelReveal() {
  const panel = document.getElementById('panelContainer');

  // 記錄滾動位置
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;

  // 顯示視窗
  panel.style.display = 'flex';

  setTimeout(() => {
    panel.classList.add('active');
  }, 10);

  // 只用 overflow 隱藏滾動，而不使用 position: fixed
  document.body.style.overflow = 'hidden';
}

function dismissPanel() {
  const panel = document.getElementById('panelContainer');

  panel.classList.remove('active');

  setTimeout(() => {
    panel.style.display = 'none';

    // 恢復滾動
    document.body.style.overflow = '';
  }, 300);
}

//人才招募彈跳功能結束////













////Our Team 左邊設計師切換功能與店家切換功能/////
  document.addEventListener("DOMContentLoaded", function () {
    const stores = document.querySelectorAll(".team-box__desgin");
    const storeLinks = document.querySelectorAll(".team-story__list a");
    const pictures = document.querySelectorAll(".picture-box-container .team-box__picture");

    function resetTeamIntroduction(store) {
      let introductions = store.querySelectorAll(".team-introduction");
      let noData = store.querySelector(".no-data");
      let firstDesigner = store.querySelector(".team-pic a");

      if (firstDesigner) {
        let firstId = firstDesigner.getAttribute("data-id");
        let found = false;

        introductions.forEach(intro => {
          intro.classList.remove("fade-in", "fade-out");  // Reset animation classes
          if (intro.getAttribute("data-content") === firstId) {
            intro.classList.add("active", "fade-in");
            found = true;
          } else {
            intro.classList.add("fade-out");
            intro.classList.remove("active");
          }
        });

        noData.style.display = found ? "none" : "block";

        // Change the picture with fade effect
        pictures.forEach(pic => {
          pic.classList.remove("fade-in", "fade-out");  // Reset animation classes
          if (pic.getAttribute("data-id") === firstId) {
            pic.classList.add("active", "fade-in");
          } else {
            pic.classList.add("fade-out");
            pic.classList.remove("active");
          }
        });
      }
    }

    // Default display for the first store
    stores.forEach((store, index) => {
      store.classList.toggle("active", index === 0);
      if (index === 0) resetTeamIntroduction(store);
    });

    // Click on designer thumbnail, switch introduction content and picture
    stores.forEach(store => {
      store.querySelectorAll(".team-pic a").forEach(link => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          let targetId = this.getAttribute("data-id");
          let introductions = store.querySelectorAll(".team-introduction");
          let noData = store.querySelector(".no-data");

          let found = false;
          introductions.forEach(intro => {
            intro.classList.remove("fade-in", "fade-out");
            if (intro.getAttribute("data-content") === targetId) {
              intro.classList.add("active", "fade-in");
              found = true;
            } else {
              intro.classList.add("fade-out");
              intro.classList.remove("active");
            }
          });

          noData.style.display = found ? "none" : "block";

          // Switch the picture with fade effect
          pictures.forEach(pic => {
            pic.classList.remove("fade-in", "fade-out");
            if (pic.getAttribute("data-id") === targetId) {
              pic.classList.add("active", "fade-in");
            } else {
              pic.classList.add("fade-out");
              pic.classList.remove("active");
            }
          });
        });
      });
    });

    // Click on store link, switch store content
    storeLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        let storeId = this.getAttribute("data-store");

        stores.forEach(store => {
          if (store.getAttribute("data-store") === storeId) {
            store.classList.add("active", "fade-in");
            resetTeamIntroduction(store);
          } else {
            store.classList.add("fade-out");
            store.classList.remove("active");
          }
        });
      });
    });
  });

////Our Team 左邊設計師切換功能與店家切換功能結束/////















////滾動頁面時實現懶加載效果動畫特效/////

  document.addEventListener("DOMContentLoaded", function () {
    // 選取所有需要監控的元素
    const targets = document.querySelectorAll('#main, .price-block , .contact-wrapper');

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');  // 當進入可視範圍時，添加 active 類別
        } else {
          entry.target.classList.remove('active'); // 當離開可視範圍時，移除 active 類別
        }
      });
    }, { threshold: 0.1 });


    targets.forEach(target => observer1.observe(target));

    // 第二個 Observer 監控 news__box展開出現
    const newsBox = document.querySelector(".news__box");

    const observer2 = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            newsBox.classList.add("active"); // 當進入可視範圍時，添加 active 類別
            observer.unobserve(entry.target); // 只觸發一次，避免重複動畫
          }
        });
      },
      {
        threshold: 0.1, // 當 10% 的元素進入視口時觸發動畫
      }
    );

    observer2.observe(newsBox);
  });
////滾動頁面時實現懶加載效果動畫特效結束/////










////按鈕線條懸停功能特效/////

  document.querySelectorAll('.team-story__list').forEach(item => {
    item.addEventListener('click', function () {
      // 移除其他選項的active類別
      document.querySelectorAll('.team-story__list').forEach(li => li.classList.remove('active'));
      // 為當前點選的li添加active類別
      item.classList.add('active');
    });
  });

  // 頁面加載時自動為第一個項目添加active類別
  document.querySelector('.team-story__list').classList.add('active');

////按鈕線條懸停功能特效結束/////










////滾動時的動畫顯示功能特效/////

  document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".fade-in-left , .fade-in-left-news");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          entry.target.classList.remove("hide"); // 進入時移除 hide
        } else {
          entry.target.classList.add("hide"); // 離開時加回 hide
          entry.target.classList.remove("show");
        }
      });
    }, { threshold: 0.3 });

    elements.forEach(el => observer.observe(el));
  });

////滾動時的動畫顯示功能特效結束/////











////BANNER中間大文字特效/////
  document.addEventListener("DOMContentLoaded", function () {
    const bannerTitle = document.querySelector('.banner-title');
    const text = bannerTitle.innerText;
    bannerTitle.innerHTML = '';

    // 將文字拆分為單個字符，並保留空白
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? ' ' : char; // 如果是空白，使用 &nbsp; 保留空白
      span.style.transitionDelay = `${index * 0.05}s`; // 縮短動畫延遲時間
      bannerTitle.appendChild(span);
    });

    // 觸發動畫
    setTimeout(() => {
      bannerTitle.classList.add('js-done');
    }, 400); // 縮短觸發動畫的等待時間
  });

////BANNER中間大文字特效結束/////











//QUICK ACCESSR區塊popup手機版展開與動畫特效功能///

function toggleQuickPopup(event) {
    // 檢查點擊的目標是否是 quick-popup__content 或其子元素
    if (event.target.closest('.quick-popup__content')) {
        return; // 如果是，則不執行任何操作
    }

    const quickAccessM = document.querySelector('.quick-access-m');
    const quickTransformBox = document.querySelector('.quick-transform-box');
    const quickPopup = document.querySelector('.quick-popup');

    // 切換 quick-access-m 的 class
    quickAccessM.classList.toggle('quick-transform');

    // 切換 quick-transform-box 的 class
    quickTransformBox.classList.toggle('quick-transform-box-none');

    // 切換 quick-popup 的顯示狀態
    quickPopup.classList.toggle('active');
}

//QUICK ACCESSR區塊popup手機版展開與動畫特效功能結束///