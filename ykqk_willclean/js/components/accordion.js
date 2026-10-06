// 手風琴元件
function initAccordion() {

    $(document)
        .off('click.accordion')
        .on('click.accordion', '.accordion-title', function () {

            const item = $(this).closest('.accordion-item');
            const accordion = item.closest('.accordion');
            const content = item.find('.accordion-content');

            // 是否允許同時展開多個
            const multiple = accordion.data('multiple');

            // 已經打開 -> 收起
            if (item.hasClass('active')) {

                content.stop(true, true).slideUp(300);
                item.removeClass('active');

                return;
            }

            // 不允許同時展開
            if (!multiple) {

                accordion.find('.accordion-content').stop(true, true).slideUp(300);
                accordion.find('.accordion-item').removeClass('active');

            }

            // 打開目前項目
            content.stop(true, true).slideDown(300);
            item.addClass('active');

        });

}
