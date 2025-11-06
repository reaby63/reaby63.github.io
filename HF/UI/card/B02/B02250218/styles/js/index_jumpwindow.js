// // 彈跳視窗-id類別(一個項目需彈一個指定視窗 可無限增值項目)
// document.addEventListener("DOMContentLoaded", function () {
//     /**
//      * 設定並初始化模態框 (Modal)
//      * @param {string} openBtnId - 觸發打開模態框的按鈕 ID
//      * @param {string} modalId - 模態框的 ID
//      * @param {string} closeBtnId - 觸發關閉模態框的按鈕 ID
//      * @param {string} contentId - 用來顯示載入內容的容器 ID
//      * @param {string} contentUrl - 外部內容的檔案路徑
//      */
//     function setupModal(openBtnId, modalId, closeBtnId, contentId, contentUrl) {
//         const openBtn = document.getElementById(openBtnId); // 取得開啟按鈕
//         const modal = document.getElementById(modalId); // 取得模態框 (Modal)
//         const closeBtn = document.getElementById(closeBtnId); // 取得關閉按鈕
//         const modalContent = document.getElementById(contentId); // 取得顯示外部內容的區塊

//         // 如果元素不存在，就不繼續執行
//         if (!openBtn || !modal || !closeBtn || !modalContent) return;

//         // 點擊按鈕顯示模態框並載入外部內容
//         openBtn.addEventListener("click", function () {

//             // 使用 fetch() 取得外部 HTML 檔案內容
//             fetch(contentUrl)
//                 .then(response => response.text()) // 將回應轉換為文字
//                 .then(data => {
//                     modalContent.innerHTML = data; // 把載入的 HTML 內容放入模態框
//                     modal.style.display = "block"; // 顯示模態框 (但尚未完全顯示)

//                     // 讓 DOM 有足夠時間更新，確保 .modal-content 存在後再執行動畫
//                     setTimeout(function () {
//                         const modalInner = modal.querySelector('.modal-content'); // 取得模態框內的內容
//                         if (modalInner) {
//                             modal.style.opacity = "1"; // 讓整個模態框淡入
//                             modalInner.style.opacity = "1"; // 讓內容淡入
//                             modalInner.style.transform = "translate(-50%, -50%)"; // 讓內容從畫面外滑入
//                         }
//                     }, 50); // 延遲 50 毫秒確保 DOM 更新後才執行動畫

//                     /* 這邊插入ad_slide內容 */
//                     const track = document.querySelector('.adt_carousel_track');
//                     const slides = Array.from(document.querySelectorAll('.adt_slide'));
//                     const prevBtn = document.querySelector('.adt_arrow_l');
//                     const nextBtn = document.querySelector('.adt_arrow_r');
//                     const arrows = document.querySelectorAll('.adt_arrow');  // 取得箭頭
//                     let currentIndex = 0;

//                     // 創建小圓點（可選，未啟用的部分）
//                     const dots = document.querySelectorAll('.dot');

//                     // 更新輪播
//                     function updateCarousel() {
//                         track.style.transform = `translateX(-${currentIndex * 100}%)`;
//                         dots.forEach((dot, index) => {
//                             dot.classList.toggle('active', index === currentIndex);
//                         });
//                         adjustArrowPosition();  // 更新箭頭位置
//                     }

//                     // 轉到指定的 slide
//                     function goToSlide(index) {
//                         currentIndex = index;
//                         updateCarousel();
//                     }

//                     // 前往下一張
//                     nextBtn.addEventListener('click', () => {
//                         currentIndex = (currentIndex + 1) % slides.length;
//                         updateCarousel();
//                     });

//                     // 前往上一張
//                     prevBtn.addEventListener('click', () => {
//                         currentIndex = (currentIndex - 1 + slides.length) % slides.length;
//                         updateCarousel();
//                     });

//                     // 垂直置中調整
//                     function adjustSlideHeight() {
//                         const windowHeight = window.innerHeight; // 取得視窗高度
//                         const windowWidth = window.innerWidth;  // 取得視窗寬度

//                         slides.forEach(slide => {
//                             const adtTopHeight = slide.querySelector('.adt_top').offsetHeight; // 取得 adt_top 的高度
//                             const adtBottomHeight = slide.querySelector('.adt_bottom').offsetHeight; // 取得 adt_bottom 的高度
//                             const totalSlideHeight = adtTopHeight + adtBottomHeight; // 計算總高度

//                             if (windowWidth < 640) {
//                                 // 當寬度小於 640px 時，檢查 adt_top + adt_bottom 的高度
//                                 if (totalSlideHeight < windowHeight) {
//                                     // 當 adt_top + adt_bottom 的總高度小於視窗高度時，垂直置中
//                                     const slideHeight = slide.offsetHeight;
//                                     slide.style.marginTop = `calc( (100vh - ${slideHeight}px) / 2 )`;
//                                 } else {
//                                     // 若高度大於 100vh，則不設置 top 並設置 height: 100%
//                                     slide.style.marginTop = '';
//                                     slide.style.height = '100%';
//                                 }
//                             } else {
//                                 if (totalSlideHeight < windowHeight) {
//                                     // 設定最小高度為視窗高度，並且垂直置中
//                                     slide.style.height = "100vh";
//                                     slide.style.display = "flex";
//                                     slide.style.flexDirection = "column";
//                                     slide.style.justifyContent = "center";
//                                     slide.style.alignItems = "center";
//                                     const slideHalfHeight = totalSlideHeight / 2;
//                                     slide.style.top = `calc(30vh - ${slideHalfHeight}px)`;  // 垂直置中
//                                 } else {
//                                     // 恢復原本的高度和顯示方式
//                                     slide.style.height = "auto";
//                                     slide.style.display = "";
//                                     slide.style.justifyContent = "";
//                                     slide.style.alignItems = "";
//                                     slide.style.top = ''; // 清除 top 設定
//                                 }
//                             }
//                         });
//                     }

//                     // 調整箭頭的位置
//                     function adjustArrowPosition() {
//                         const windowHeight = window.innerHeight; // 取得視窗高度
//                         const currentSlide = slides[currentIndex];
//                         const adtTopHeight = currentSlide.querySelector('.adt_top').offsetHeight;
//                         const adtBottomHeight = currentSlide.querySelector('.adt_bottom').offsetHeight;
//                         const totalSlideHeight = adtTopHeight + adtBottomHeight; // 計算當前 slide 高度

//                         if (totalSlideHeight < windowHeight) {
//                             // 當前 slide 高度小於視窗高度時，不再調整箭頭位置
//                             // 所以這裡不會對箭頭設置 top
//                         } else {
//                             // 當前 slide 高度滿足 100vh 時，箭頭居中顯示
//                             arrows.forEach(arrow => {
//                                 arrow.style.top = `calc(50vh - 14px)`;  // 假設箭頭高度為 50px，調整為視窗中間
//                             });
//                         }
//                     }

//                     // 初次加載時調整高度
//                     window.addEventListener("load", () => {
//                         adjustSlideHeight();
//                         // 不再調整箭頭的 top
//                     });

//                     // 當視窗大小改變時重新調整
//                     window.addEventListener("resize", () => {
//                         adjustSlideHeight();
//                         // 不再調整箭頭的 top
//                     });

//                 })
//                 .catch(error => console.error('Error loading content:', error)); // 錯誤處理
//         });

//         // 點擊關閉按鈕隱藏模態框
//         closeBtn.addEventListener("click", function () {
//             closeModal(modal);
//         });

//         // 點擊模態框外部關閉模態框
//         window.addEventListener("click", function (event) {
//             if (event.target === modal) { // 只有點擊到模態框外部才關閉
//                 closeModal(modal);
//             }
//         });
//     }

//     /**
//      * 隱藏並關閉模態框
//      * @param {HTMLElement} modal - 要關閉的模態框元素
//      */
//     function closeModal(modal) {
//         modal.style.opacity = "0"; // 讓整個模態框淡出
//         const modalInner = modal.querySelector('.modal-content'); // 取得模態框內的內容
//         if (modalInner) {
//             modalInner.style.opacity = "0"; // 讓內容淡出
//             modalInner.style.transform = "translate(-50%, 5%)"; // 讓內容往下滑動消失
//         }

//         // 設定延遲，確保動畫結束後才隱藏模態框
//         setTimeout(function () {
//             modal.style.display = "none"; // 隱藏模態框
//         }, 800); // 800 毫秒與 CSS 動畫時間同步
//     }

//     // 初始化模態框 1
//     setupModal("openModal1", "modal1", "closeModal1", "modal1Content", "advertising_detail.html");

//     // 初始化模態框 2
//     // setupModal("openModal2", "modal2", "closeModal2", "modal2Content", "photo_detail.html");
// });
