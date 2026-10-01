// Modal 元件

// 初始化
function initModal() {

    $(document)

        // 打開 Modal
        .off('click.modalOpen')
        .on('click.modalOpen', '.open-modal', function (e) {

            e.preventDefault();

            // 已有 Modal 就不重複開
            if ($('#modal_container').children().length) return;

            const file = $(this).data('modal');

            openModal(file);

        })

        // 點 X 關閉
        .off('click.modalClose')
        .on('click.modalClose', '.modal_close', function () {

            closeModal();

        })

        // 點背景關閉
        .off('click.modalBackground')
        .on('click.modalBackground', '.modal', function (e) {

            if ($(e.target).hasClass('modal')) {

                closeModal();

            }

        });

    // ESC 關閉
    $(document)

        .off('keyup.modal')

        .on('keyup.modal', function (e) {

            if (e.key === "Escape") {

                closeModal();

            }

        });

}


// 打開 Modal
function openModal(file) {

    $('body').addClass('modal-open');

    $('#modal_container').load(file, function (response, status) {

        if (status === "error") {

            console.error(`Modal 載入失敗：${file}`);

            $('body').removeClass('modal-open');

            return;

        }

        const $modal = $('#modal_container').find('.modal');

        $modal.show();

        requestAnimationFrame(() => {

            $modal.addClass('is-open');

        });

    });

}


// 關閉 Modal
function closeModal() {

    const $modal = $('.modal');

    if (!$modal.length) return;

    // 如果禁止關閉
    if ($modal.data('close') === false) return;

    $modal.removeClass('is-open').addClass('is-close');

    $modal.one('transitionend animationend', function () {

        $('#modal_container').empty();

        $('body').removeClass('modal-open');

    });

}