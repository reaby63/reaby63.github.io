// // 取得所需元素
// const quickAccessLink = document.querySelector('a.quickaccess');
// const quickAccessIn = document.querySelector('.quickaccess_in');
// const scrollToTopBtn = document.querySelector('#scrollToTopBtn');  // 取得 .to_top 按鈕

// // 監聽 .quickaccess 的點擊事件
// quickAccessLink.addEventListener('click', function(event) {
//   event.preventDefault();  // 防止點擊後跳轉

//   // 在 .quickaccess_in 上加入 'qa_an' 
//   quickAccessIn.classList.toggle('qa_an');

//   // 隱藏 .to_top 按鈕並加上淡出效果
//   scrollToTopBtn.style.transition = 'opacity 0.5s, visibility 0.5s';
//   scrollToTopBtn.style.opacity = '0';
//   scrollToTopBtn.style.visibility = 'hidden';  // 使用 visibility 隱藏按鈕
// });

// // 關閉按鈕-----------
// // 監聽關閉按鈕
// function closeQuickAccess() {
//     const quickAccessElement = document.querySelector('.quickaccess_in');
    
//     // 添加 class
//     quickAccessElement.classList.add('qa_close');
    
//     // 1秒後移除該 class
//     setTimeout(() => {
//         quickAccessElement.classList.remove('qa_close', 'qa_an');
//     }, 1000); // 1000 毫秒 = 1 秒

//     // 當關閉 .quickaccess_in 時，顯示 .to_top 按鈕並加上淡入效果
//     scrollToTopBtn.style.visibility = 'visible';  // 改為使用 visibility 顯示
//     setTimeout(() => {
//       scrollToTopBtn.style.transition = 'opacity 0.5s';
//       scrollToTopBtn.style.opacity = '1';  // 漸漸顯示
//     }, 10);  // 確保先顯示，然後再進行動畫
// }
