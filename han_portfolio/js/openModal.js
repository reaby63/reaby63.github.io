// 彈窗用JQ
$(document).ready(function(){

    // 點擊打開 modal
    $('.open-modal').click(function(e){
        e.preventDefault();

        const file = $(this).data('modal');

        // 鎖住背景滾動
        $('body').css('overflow', 'hidden');

        // 有空改成 加class .is-open .is-close ...
        $('#modal').fadeIn(200, function(){
            $(this).addClass('show');
        });

        $('#modal_body').html('<p style="text-align:center;">Loading...</p>');
        $('#modal_body').load(file);
    });

    // 點擊 X 關閉
    $(document).on('click', '.modal_close', function(){
        $('#modal').fadeOut();
        $('body').css('overflow', '');
    });

    // 點擊背景關閉
    $('#modal').click(function(e){
        if(e.target.id === 'modal'){
            $(this).fadeOut();
            $('body').css('overflow', '');
        }
    });

    // ESC 關閉
    $(document).keyup(function(e){
        if(e.key === "Escape"){
            closeModal();
        }
    });

    function closeModal(){
        $('#modal').removeClass('show');
        $('#modal').fadeOut(200);
        $('body').css('overflow', ''); // 還原body滾動

        // 清空內容-避免殘留
        $('#modal_body').html('');
    }

});