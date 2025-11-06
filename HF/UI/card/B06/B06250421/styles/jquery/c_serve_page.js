// // 服務項目的滑動功能
$(function () {
    let scrollIndex = 0;

    function isMobile() {
        return $(window).width() < 570; // 你可根據需要改這個斷點
    }

    function updateTabScroll() {
        if (!isMobile()) return; // 電腦版不滑動 tabs

        const tabWidth = $('.tab').outerWidth(true);
        $('.tabs').css('transform', 'translateX(' + (-scrollIndex * tabWidth) + 'px)');
    }

    // 新增：切換 tab + 對應內容
    function activateTab(index) {
        const tabs = $('.tab');
        const tabPanels = $('.tab-panel');
        if (index < 0 || index >= tabs.length) return;

        tabs.removeClass('active');
        $(tabs[index]).addClass('active');

        const key = $(tabs[index]).data('content');

        tabPanels.filter('.active').fadeOut(200, function () {
            $(this).removeClass('active');
            const target = $('.tab-panel[data-content="' + key + '"]');
            target.fadeIn(300).addClass('active');
        });
    }

    $('.tab').click(function () {
        if ($(this).hasClass('active')) return;

        const tabs = $('.tab');
        const index = tabs.index(this);
        scrollIndex = index;

        activateTab(index);
        updateTabScroll(); // 在手機時才有效
    });

    $('.nav-left').click(function () {
        const tabCount = $('.tab').length;
        if (scrollIndex > 0) {
            scrollIndex--;
        } else {
            scrollIndex = tabCount - 1; // ✅ 可選：超出時跳到最後一個（可移除）
        }

        activateTab(scrollIndex);
        updateTabScroll();
    });

    $('.nav-right').click(function () {
        const tabCount = $('.tab').length;
        if (scrollIndex < tabCount - 1) {
            scrollIndex++;
        } else {
            scrollIndex = 0; // ✅ 可選：超出時跳到第一個（可移除）
        }

        activateTab(scrollIndex);
        updateTabScroll();
    });

    $(window).resize(function () {
        updateTabScroll();
    });

    // ✅ 初始化：啟用第一個 tab 和內容
    activateTab(scrollIndex);
    updateTabScroll();
});
