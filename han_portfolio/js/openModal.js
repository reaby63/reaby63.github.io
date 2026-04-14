// 彈窗用JQ
$(document).ready(function(){

    // 點擊打開 modal（只需要一個！）
    $(document).on('click', '.open-modal', function(e){
        e.preventDefault();

        const file = $(this).data('modal');

        // 鎖住背景滾動
        $('body').css('overflow', 'hidden');

        // 載入整個 modal
        $('#modal_container').load(file, function(){
            const $modal = $('#modal_container').find('.modal');

            // 先顯示（但不動畫）
            $modal.show();

            // 下一幀再加 class（讓動畫吃得到）
            setTimeout(() => {
                $modal.addClass('is-open');
            }, 20);
        });
    });

    // 共用關閉
    function closeModal(){
        const $modal = $('.modal');

        // 先切換成關閉狀態
        $modal.removeClass('is-open').addClass('is-close');

        // 等動畫結束再移除
        setTimeout(() => {
            $('#modal_container').html('');
            $('body').css('overflow', '');
        }, 300); // 這個要跟 CSS 動畫時間一致！
    }

    // 點擊 X 關閉
    $(document).on('click', '.modal_close', function(){
        closeModal();
    });

    // 點擊背景關閉
    $(document).on('click', '.modal', function(e){
        if($(e.target).hasClass('modal')){
            closeModal();
        }
    });

    // ESC 關閉
    $(document).keyup(function(e){
        if(e.key === "Escape"){
            closeModal();
        }
    });

});