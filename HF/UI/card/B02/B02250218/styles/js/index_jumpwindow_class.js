// // 彈跳視窗-class類別(多個項目需彈跳同一個視窗)

// document.addEventListener("DOMContentLoaded", function () {
//     // 取得所有的 openModal2 按鈕
//     let modalBtns = document.querySelectorAll(".openModal2");

//     // 遍歷所有按鈕並為每一個按鈕加上點擊事件
//     modalBtns.forEach(btn => {
//         btn.addEventListener("click", function (event) {
//             event.preventDefault();

//             // 取得對應的 modal 和 modalContent
//             let modal = document.getElementById("modal2");
//             let modalContent = document.getElementById("modal2Content");
//             if (!modal || !modalContent) return;

//             // 顯示模態框
//             modal.style.display = "block";

//             // 使用 fetch() 加載外部 HTML
//             fetch("photo_detail.html")
//                 .then(response => response.text())
//                 .then(html => {
//                     modalContent.innerHTML = html;
//                     // 顯示模態框並加上淡入動畫
//                     setTimeout(function () {
//                         const modalInner = modal.querySelector('.modal-content');
//                         if (modalInner) {
//                             modal.style.opacity = "1";
//                             modalInner.style.opacity = "1";
//                             modalInner.style.transform = "translate(-50%, -50%)";
//                         }
//                     }, 50);
//                 })
//                 .catch(error => console.error("載入 HTML 失敗:", error));
//         });
//     });

//     // 關閉模態框的按鈕
//     let closeModal = document.getElementById("closeModal2");
//     if (closeModal) {
//         closeModal.addEventListener("click", function () {
//             // 這裡將 modal 作為參數傳遞給 closeModalFunction
//             let modal = document.getElementById("modal2");
//             closeModalFunction(modal);
//         });
//     }

//     // 點擊外部區域時，隱藏模態框
//     window.addEventListener("click", function (event) {
//         let modal = document.getElementById("modal2");
//         if (event.target === modal) {
//             closeModalFunction(modal);
//         }
//     });

//     // 關閉模態框的功能，帶有淡出效果
//     function closeModalFunction(modal) {
//         if (!modal) return; // 確保 modal 不為 null

//         modal.style.opacity = "0";
//         const modalInner = modal.querySelector('.modal-content');
//         if (modalInner) {
//             modalInner.style.opacity = "0";
//             modalInner.style.transform = "translate(-50%, 5%)";
//         }

//         setTimeout(function () {
//             modal.style.display = "none";
//         }, 800); // 等待動畫結束後隱藏模態框
//     }
// });



// document.addEventListener("DOMContentLoaded", function () {
//     // 初始化模態框 1
//     setupModal("openModal1", "modal1", "closeModal1", "modal1Content", "advertising_detail.html");

//     // 初始化模態框 2
//     setupModal("openModal2", "modal2", "closeModal2", "modal2Content", "photo_detail.html");
// });
