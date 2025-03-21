// rm內 點擊go展開div---------------
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".rm_list_content button");
  
    buttons.forEach(button => {
      button.addEventListener("click", function () {
        const rmListItem = this.closest(".rm_list_content"); // 找到最近的 .rm_list_content
        if (!rmListItem) return;
  
        const openList = rmListItem.nextElementSibling; // 找到 .rm_list_content 的下一個元素
        if (!openList || !openList.classList.contains("open_list")) return; // 確保是 .opne_list
  
        openList.classList.toggle("active"); // 切換顯示/隱藏
      });
    });
  });