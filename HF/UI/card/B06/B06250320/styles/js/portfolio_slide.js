
// // 作品展示滑動 內有無數小圖示

// document.addEventListener("DOMContentLoaded", function () {
//     const wrapper = document.querySelector(".cp_wrapper"); // 負責水平移動
//     const listContainer = document.querySelector(".cp_list"); //存放所有a
//     const items = Array.from(listContainer.querySelectorAll("a")); //取得所有a轉陣列
//     const paginationContainer = document.querySelector(".cp_listmark"); //分頁按鈕容器
//     // 定義變數
//     let itemsPerPage = getItemsPerPage(); //每頁要顯示的 <a> 數量，由 getItemsPerPage() 計算
//     let totalPages = Math.ceil(items.length / itemsPerPage);//Math.ceil(總數 / 每頁數量)
//     let currentPage = 0;//當前所在的頁面，預設為第 0 頁（第一頁）
  
//     function getItemsPerPage() {
//       return window.innerWidth <= 500 ? 5 : 5; // 手機版500px 8，電腦版 9
//     }
//     // 更新分頁按鈕
//     function updatePagination() {
//       paginationContainer.innerHTML = "";//清空 paginationContainer，確保不會有舊的按鈕
//       totalPages = Math.ceil(items.length / itemsPerPage);//重新計算 totalPages，確保按鈕數量正確
//       // 建立按鈕
//       for (let i = 0; i < totalPages; i++) {
//         const button = document.createElement("button");
//         button.textContent = i + 1; // 讓按鈕標記從 1 開始
//         if (i === currentPage) button.classList.add("active");
//         button.addEventListener("click", function () {
//           currentPage = i;
//           updateView();
//         });
//         paginationContainer.appendChild(button); //將按鈕加入 paginationContainer
//       }
//     }
//     // 更新畫面
//     function updateView() {
//       const offset = currentPage * 100; // 計算 應該水平移動的距離（單位 %） 
//       wrapper.style.transform = `translateX(-${offset}%)`; //移動 .cp_wrapper
  
//       // 改用 opacity: 0 隱藏前面頁面，並保留當前頁面
//       const lists = wrapper.querySelectorAll(".cp_list");
//       lists.forEach((list, index) => {
//         if (index < currentPage) {
//           list.style.opacity = "0"; // 隱藏前面的頁面
//           list.style.transition = "opacity 0.3s"; // 加入過渡效果
//         } else {
//           list.style.opacity = "1"; // 顯示當前和之後的頁面
//           list.style.transition = "opacity 0.3s"; // 加入過渡效果
//         }
//       });
  
//       // 更新 active 樣式
//       const buttons = paginationContainer.querySelectorAll("button");
//       buttons.forEach((btn, index) => {
//         btn.classList.toggle("active", index === currentPage);
//       });
//     }
//     // 建立新的.cp_list 容器
//     function setupPages() {
//       wrapper.innerHTML = ""; // 清空舊的.cp_list 避免重複內容
//       itemsPerPage = getItemsPerPage();
//       totalPages = Math.ceil(items.length / itemsPerPage);//計算 totalPages
//       //建立.cp_list 容器
//       for (let i = 0; i < totalPages; i++) {
//         const list = document.createElement("div");
//         list.classList.add("cp_list");
        
//         items.slice(i * itemsPerPage, (i + 1) * itemsPerPage).forEach((item) => {
//           list.appendChild(item.cloneNode(true));
//         });
  
//         // 判斷是否是最後一頁，若是，則添加 .cp_list_last 類別
//         if (i === totalPages - 1) {
//           list.classList.add("cp_list_last");
//         }
  
//         wrapper.appendChild(list);
//       }
//       //更新分頁按鈕與畫面
//       updatePagination();
//       updateView();
//     }
//     //監聽視窗大小變化
//     window.addEventListener("resize", function () {
//       setupPages();
//     });
//     //初始化
//     setupPages();
// });
