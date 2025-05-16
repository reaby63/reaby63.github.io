

$(document).ready(function () { 
    $('.qa_box_title').click(function () { 
        $(this).next('.qa_box_content').slideToggle();
        // $('.qa_box_content').slideToggle();
    })
})