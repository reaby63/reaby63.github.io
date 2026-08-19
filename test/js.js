
$(document).ready(function() {
    $('.open-modal').on('click', function () {
        $('.modal').addClass('active');
    });

    $('.modal-close').on('click', function () {
        $('.modal').removeClass('active');
    });

    $('.modal').on('click', function (e) {
        if ($(e.target).is('.modal')) {
            $('.modal').removeClass('active');
        }
    });
});


// js練習
const array = [ 1, 2, 3, 4, 5];

for ( let i = 0 ; i < array.length ; i ++ ){
    console.log(array[i]);
}