// 剛進入頁面時 讓文字一個一個淡入的動畫

function revealTextBySpan(selector, delayBetween = 50, callback) {
  // 取得要動畫處理的元素
  const el = document.querySelector(selector);
  if (!el) return; // 如果找不到元素就中止

  // 將元素內容以 <br> 拆成多行 並轉成陣列（例如兩段文字分行）
  const parts = el.innerHTML.split('<br>'); // -> [ TIME AND DETAIL , SHAPE EVERYTHING. ]

  // 清空原本的 HTML 內容（避免殘留原始文字）
  el.innerHTML = '';

  // 設定元素為可見（CSS 先設 visibility: hidden）
  el.style.visibility = 'visible';

  const spans = []; // 儲存所有要動畫的 <span>

  // 處理每一行文字 (parts是一個陣列 可以用forEach) , line 是parts內每一個項目的暱稱 目前parts內有兩段文字
  parts.forEach((line) => {
    // 建立一個 div 來包住這一行（取代原本的 <br>）
    const div = document.createElement('div');

    // 將這行文字的每個字都轉成 <span> 
    [...line].forEach(char => {     // 假設 line = "hello" 那[...line]會等於[h,e,l,l,o]
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char; // 空白處理為 &nbsp;
      div.appendChild(span); // 把字加進這行的 div // 參數.appendChild(東西) 就是把東西加入參數內
      spans.push(span);      // 存進統一的動畫陣列中
    });

    // 把這整行 div 加回元素中
    el.appendChild(div);
  });

  // 開始逐字淡入動畫
  spans.forEach((span, index) => {
    setTimeout(() => {
      span.classList.add('show'); // 加上 .show 讓字出現

      // 如果是最後一個字，觸發 callback（例如顯示下一段）
      if (index === spans.length - 1 && typeof callback === 'function') {
        callback();
      }
    }, index * delayBetween); // 每個字延遲出現的時間
  });
}

// 當頁面載入完成後，開始動畫
window.addEventListener('DOMContentLoaded', () => {
  // 先跑上方文字
  revealTextBySpan('.ci_tag_top', 100, () => {
    // 等上方文字跑完，再跑下方文字
    revealTextBySpan('.ci_tag_bottom', 100);
  });
});

