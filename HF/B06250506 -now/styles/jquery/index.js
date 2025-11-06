
// 點擊 cp_serch後 cp_serch_box滑出 再點擊就收回
$(document).ready(function(){

    $('.cp_serch button , .cp_serch_box .search_list button').click(function(){
        $('.cp_serch_box .search_list').slideToggle();
    })

})



// 滑動到指定區域後套上進場class
$(document).ready(function() {
    // 你要監聽的元素 + 套用的 class
    const elementsToObserve = [
    // { selector: '.c_photo ', className: 'fadeInSlideUp' },
    // { selector: '.c_info ', className: 'c_info_an' },
      {
        selector:
          '.ci_top , .ci_bottom , .c_portfolio .c_title , .c_portfolio .c_contain , .c_store .c_title , .cs_list , .c_contact',
        className: 'fadeInSlideUp'
      }
    ];
  // 建立 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const $el = $(entry.target);          // 轉成 jQuery 物件
          const className = $el.data('class');  // 拿出 data-class 值
          $el.addClass(className);              // 加上動畫 class
          observer.unobserve(entry.target);     // 停止監聽（只觸發一次）
        }
      });
    }, { threshold: 0 }); // 當元素進入畫面 10% 時觸發
  
    // 註冊每個要觀察的元素
    elementsToObserve.forEach(item => {
        const $elements = $(item.selector); // 找到對應的所有元素

        if ($elements.length > 0) {
            $elements.each(function () {
                $(this).data('class', item.className); // 存進每個元素的 data
                observer.observe(this);                // 觀察每一個元素
            });
        }
    });
});
  
// 剛開始的文字一個一個往上進入
$('.banner_text h6').each(function (index) {
  const lineDelay = index * 1.2; // 每行延遲 1.2 秒
  const $this = $(this);
  const originalHTML = $this.html();

  const tempDiv = $('<div>').html(originalHTML);
  let charIndex = 0;

  function wrapNode(node) {
    if (node.nodeType === 3) { // 純文字
      const chars = node.nodeValue.split('');
      return chars.map(char => {
        const delay = ((charIndex * 0.05) + lineDelay).toFixed(2);
        const span = $('<span>').text(char).css('animation-delay', `${delay}s`);
        charIndex++;
        return span[0].outerHTML;
      }).join('');
    } else if (node.nodeType === 1) { // 有標籤的元素，例如 <span class="yellow">
      const inner = Array.from(node.childNodes).map(wrapNode).join('');
      return `<${node.nodeName.toLowerCase()} class="${node.className}">${inner}</${node.nodeName.toLowerCase()}>`;
    }
    return '';
  }

  const wrappedHTML = Array.from(tempDiv[0].childNodes).map(wrapNode).join('');
  $this.html(wrappedHTML);
  $this.css('visibility', 'visible');
});

$('.animate-text').addClass('animated');
