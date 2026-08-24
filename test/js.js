
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



// 只是把陣列每個東西拿出來
for ( const i of array ) {
    console.log(i);
}

array.forEach((i)=>{
    console.log(i);
})

array.push(6); // 出來會是[ 1, 2, 3, 4, 5, 6] 加東西!
array.pop(); // 出來會是[ 1, 2, 3, 4] 刪最後一個



// map 產生新陣列
const num = [1, 2, 3];

const newNum = num.map((i) => {
    return i * 2;
});

console.log(newNum); // [2, 4, 6]



// filter 篩選
const number = [5, 12, 8, 20, 3];

const result = number.filter((i)=>{
    return i > 10;
});

console.log(result);


