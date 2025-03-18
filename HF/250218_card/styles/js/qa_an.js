//點擊quickaccess按鈕-----------
// 先獲取 .quickaccess 和 .quickaccess_in 元素
const quickAccessLink = document.querySelector('a.quickaccess');
const quickAccessIn = document.querySelector('.quickaccess_in');

// 監聽 .quickaccess 的點擊事件
quickAccessLink.addEventListener('click', function(event) {
  event.preventDefault();  // 防止點擊後跳轉

  // 在 .quickaccess_in 上加入 'qa_an' 
  quickAccessIn.classList.toggle('qa_an');
});

// 關閉按鈕-----------
function closeQuickAccess() {
    const quickAccessElement = document.querySelector('.quickaccess_in');
    
    // 添加 class
    quickAccessElement.classList.add('qa_close');
    
    // 5秒後移除該 class
    setTimeout(() => {
        quickAccessElement.classList.remove('qa_close', 'qa_an');
    }, 2000); // 1000 毫秒 = 1 秒
}