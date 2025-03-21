
// 作品展示滑動 內有無數小圖示

document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".cp_wrapper");
    const listContainer = document.querySelector(".cp_list");
    const items = Array.from(listContainer.querySelectorAll("a"));
    const paginationContainer = document.querySelector(".cp_listmark");
  
    let itemsPerPage = getItemsPerPage();
    let totalPages = Math.ceil(items.length / itemsPerPage);
    let currentPage = 0;
  
    function getItemsPerPage() {
      return window.innerWidth <= 375 ? 8 : 9; // 手機版 8，電腦版 9
    }
  
    function updatePagination() {
      paginationContainer.innerHTML = "";
      totalPages = Math.ceil(items.length / itemsPerPage);
  
      for (let i = 0; i < totalPages; i++) {
        const button = document.createElement("button");
        if (i === currentPage) button.classList.add("active");
        button.addEventListener("click", function () {
          currentPage = i;
          updateView();
        });
        paginationContainer.appendChild(button);
      }
    }
  
    function updateView() {
      const offset = currentPage * 100; // 移動整個 .cp_wrapper
      wrapper.style.transform = `translateX(-${offset}%)`;
  
      // 改用 opacity: 0 隱藏前面頁面，並保留當前頁面
      const lists = wrapper.querySelectorAll(".cp_list");
      lists.forEach((list, index) => {
        if (index < currentPage) {
          list.style.opacity = "0"; // 隱藏前面的頁面
          list.style.transition = "opacity 0.3s"; // 加入過渡效果
        } else {
          list.style.opacity = "1"; // 顯示當前和之後的頁面
          list.style.transition = "opacity 0.3s"; // 加入過渡效果
        }
      });
  
      // 更新 active 樣式
      const buttons = paginationContainer.querySelectorAll("button");
      buttons.forEach((btn, index) => {
        btn.classList.toggle("active", index === currentPage);
      });
    }
  
    function setupPages() {
      wrapper.innerHTML = ""; // 清空舊的 `.cp_list`
      itemsPerPage = getItemsPerPage();
      totalPages = Math.ceil(items.length / itemsPerPage);
  
      for (let i = 0; i < totalPages; i++) {
        const list = document.createElement("div");
        list.classList.add("cp_list");
  
        items.slice(i * itemsPerPage, (i + 1) * itemsPerPage).forEach((item) => {
          list.appendChild(item.cloneNode(true));
        });
  
        // 判斷是否是最後一頁，若是，則添加 .cp_list_last 類別
        if (i === totalPages - 1) {
          list.classList.add("cp_list_last");
        }
  
        wrapper.appendChild(list);
      }
  
      updatePagination();
      updateView();
    }
  
    window.addEventListener("resize", function () {
      setupPages();
    });
  
    setupPages();
});
