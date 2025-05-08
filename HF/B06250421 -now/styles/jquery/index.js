
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
    { selector: '.c_photo ', className: 'c_photo_an' },
    { selector: '.c_info ', className: 'c_info_an' },
    { selector: '.c_serve , .c_contact , .c_portfolio', className: 'jumpInOnly_an' }
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