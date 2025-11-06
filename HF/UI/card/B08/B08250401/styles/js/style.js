
// 可直接註解 畫面正常

 // 取得所需元素 這樣做的目的是獲取需要操作的 DOM 元素，確保可以後續修改它們的樣式或綁定事件
const quickAccessLink = document.querySelector('a.quickaccess');
const quickAccessIn = document.querySelector('.quickaccess_in');
const scrollToTopBtn = document.querySelector('#scrollToTopBtn');  // 取得 .to_top 按鈕
const togetherJump = document.querySelector('.together_jump');

// 監聽 .quickaccess 的點擊事件
quickAccessLink.addEventListener('click', function(event) {
  event.preventDefault();  // 防止點擊後跳轉

  // 在 .quickaccess_in 上加入 'qa_an' 
  quickAccessIn.classList.toggle('qa_an');

  // 在 .together_jump 上加上 .jump_out（並移除 .jump_in，避免重疊）
  togetherJump.classList.add('jump_out');
  togetherJump.classList.remove('jump_in');

  // 在quickaccess上加jump_out 
  quickAccessLink.classList.add('jump_out');
  quickAccessLink.classList.remove('jump_in');

});

// 關閉按鈕-----------
// 監聽關閉按鈕
function closeQuickAccess() {
    const quickAccessElement = document.querySelector('.quickaccess_in');
    
    // 添加 class
    quickAccessElement.classList.add('qa_close');
    
    // 在 .together_jump 上移除 .jump_out，加入 .jump_in
    togetherJump.classList.remove('jump_out');
    togetherJump.classList.add('jump_in');

    // 在quickaccess上加jump_in
    quickAccessLink.classList.remove('jump_out');
    quickAccessLink.classList.add('jump_in');

    // 1秒後移除該 class
    setTimeout(() => {
        quickAccessElement.classList.remove('qa_close', 'qa_an');
    }, 800); // 1000 毫秒 = 1 秒

}




