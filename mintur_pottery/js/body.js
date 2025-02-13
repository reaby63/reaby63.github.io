// // 頁面資料對應表：這是為了方便管理每個頁面需要的內容（圖片、標題、文本等）
// const pageData = {
//     "about.html": {
//         headerImg: "img/banner02.png", // 頁面標題圖片
//         headerTitle: "以陶傳承 · 療癒心靈",        // 標題
//         headerText: "茗陶故事", // 內容
//     },
//     "food.html": {
//         headerImg: "img/banner03.png",
//         headerTitle: "有機菜品 · 特色名產",
//         headerText: "茗陶美食",
//     },
//     "reserve.html": {
//         headerImg: "img/banner04.png",
//         headerTitle: "體驗陶藝 · 充實生活",
//         headerText: "陶藝預約",
//     },
//     "new.html": {
//         headerImg: "img/banner05.png",
//         headerTitle: "各式活動 · 豐富體驗",
//         headerText: "最新消息",
//     },
//     "product.html": {
//         headerImg: "img/banner06.png",
//         headerTitle: "堅持手工 · 歡迎客製",
//         headerText: "茗陶藝品",
//     },
//     "index.html": { // 首頁的 header 資料
//         headerImg: "img/banner01.png",
//         headerTitle: "陶藝 · 創作 · 心靈",
//         headerText: "茗陶 ．窯",
//     }
// };

// // loadPage 函式：用來動態載入頁面內容
// function loadPage(event, page) {
//     event.preventDefault(); // 阻止默認的頁面跳轉，改為動態更新

//     // 確保 page 變數不是 undefined 並有對應的內容，如果沒有對應頁面，回退到首頁
//     if (!page || !pageData[page]) {
//         page = "index.html";  // 如果沒有找到對應的頁面，預設回首頁
//     }
    
//     console.log("loadPage 函式已執行", page); // 檢查是否有執行

//     // 透過 Fetch API 載入頁面內容
//     fetch(page) 
//         .then(response => response.text())  // 轉換為文本格式
//         .then(html => {
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(html, "text/html");
            
//             // 只抓取 <main> 內容，不更新外圍結構
//             const mainContent = doc.querySelector("main");  // 查找 <main> 區塊

//             // 若找到 <main> 內容，更新頁面內容
//             if (mainContent) {
//                 document.getElementById("content").innerHTML = mainContent.innerHTML;
//             } else {
//                 console.error("找不到 <main> 標籤的內容！");
//             }

//             // 更新 header 圖片、標題與內容，根據頁面資料表
//             if (pageData[page]) {
//                 document.getElementById("header-img").src = pageData[page].headerImg; // 更新圖片
//                 document.querySelector("header h6").textContent = pageData[page].headerTitle; // 更新標題
//                 document.querySelector("header p").textContent = pageData[page].headerText; // 更新內容
//             }

//             // 移除已經存在的淡入效果
//             const header = document.querySelector("header");
//             header.classList.remove("fade-in");

//             // 強制觸發重新計算動畫
//             void header.offsetWidth; // 強制刷新
//             header.classList.add("fade-in");

//             // 更新網址，並推送狀態至歷史紀錄
//             history.pushState({ page: page }, "", page);
//         })
//         .catch(error => console.error("載入頁面時出錯:", error));
// }

// // onpopstate 事件處理：當使用者按下瀏覽器的返回或前進時，會觸發此事件
// window.onpopstate = function(event) {
//     console.log("onpopstate 觸發", event.state); // 確認事件是否有觸發

//     // 確保 event.state 中有頁面資料
//     if (event.state && event.state.page) {
//         fetch(event.state.page)  // 根據 state.page 載入對應頁面
//             .then(response => response.text()) 
//             .then(html => {
//                 console.log("載入的 HTML 內容：", html); // 檢查載入的 HTML 內容
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(html, "text/html");
//                 const mainContent = doc.querySelector("main");
//                 if (mainContent) {
//                     document.getElementById("content").innerHTML = mainContent.innerHTML; // 更新內容區塊
//                 } else {
//                     console.error("找不到 <main> 標籤的內容！");
//                 }

//                 // 根據 history 推送的頁面資料更新 header
//                 if (pageData[event.state.page]) {
//                     document.getElementById("header-img").src = pageData[event.state.page].headerImg;
//                     document.querySelector("header h6").textContent = pageData[event.state.page].headerTitle;
//                     document.querySelector("header p").textContent = pageData[event.state.page].headerText;
//                 }
//             })
//             .catch(error => console.error("載入頁面失敗:", error));
//     } else {
//         // 若沒有 event.state (即返回首頁)，手動載入首頁內容
//         console.log("返回首頁，手動載入首頁內容");

//         // 恢復首頁圖片、標題與內容
//         document.getElementById("header-img").src = pageData["index.html"].headerImg;
//         document.querySelector("header h6").textContent = pageData["index.html"].headerTitle;
//         document.querySelector("header p").textContent = pageData["index.html"].headerText;

//         // 移除已經存在的淡入效果
//         const header = document.querySelector("header");
//         header.classList.remove("fade-in");

//         // 強制觸發重新計算動畫
//         // 設置為 "none"，然後再重新添加 "fade-in" 類別，這樣就能確保動畫從頭開始
//         void header.offsetWidth; // 強制刷新
//         header.classList.add("fade-in");

//         // 載入首頁內容
//         fetch('index.html')
//             .then(response => response.text())
//             .then(html => {
//                 const parser = new DOMParser();
//                 const doc = parser.parseFromString(html, "text/html");
//                 const mainContent = doc.querySelector("main");
//                 if (mainContent) {
//                     document.getElementById("content").innerHTML = mainContent.innerHTML; // 更新首頁內容
//                 } else {
//                     console.error("找不到 <main> 標籤的內容！");
//                 }
//             })
//             .catch(error => console.error("載入首頁時出錯:", error));
//     }
// };

// // 頁面載入時，檢查當前頁面是否是預設頁面或其他，並載入內容
// document.addEventListener("DOMContentLoaded", function () {
//     let currentPage = window.location.pathname.split("/").pop(); // 取得當前 URL 的頁面名稱

//     // 初次載入頁面時，根據當前頁面載入對應內容
//     if (!currentPage || currentPage === "index.html") {
//         loadPage(null, "index.html"); // 如果是首頁，載入首頁內容
//     } else if (pageData[currentPage]) {
//         loadPage(null, currentPage); // 如果是其他頁面，載入對應內容
//     }
// });


// 往下滾動後nav加class
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".nav");
    if (window.scrollY > 400) {
        navbar.classList.add("scrolled"); // 滑動超過 50px 就加背景
    } else {
        navbar.classList.remove("scrolled");
    }
});

// css的寫法
// .nav {
//     position: fixed;
//     top: 0;
//     width: 100%;
//     transition: background-color 0.3s ease-in-out;
// }

// .nav.scrolled {
//     background-color: rgba(255, 255, 255, 0.9); /* 滑動後的背景色 */
//     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
// }
