// 如何使用數字 數字的用法
/* 直觀輸入即可使用 */
document.write(6.2);
document.write(-6.2466565);
document.write(6+3);
document.write(6-4);
document.write(6*2);
document.write((6-2)/2);
document.write(6+8*2);

/* 這個就是8/3 取餘數 會=2 */
document.write(8%3);

/* 也可以用變數 */
var number = 6;
document.write(number);

/* 取括號內數的絕對值(絕對值:數字到0的距離) */
var number = -6;
document.write(Math.ads(number));

/* 取括號內 最大的數 相反的話為:Math.min */
var number = 6;
document.write(Math.max(number,8,121,206));

/* 取括號內的數的四捨五入 */
var number = 2.5;
document.write(Math.round(number));

/* 取括號內的數的次方 範例為2的3次方 */
document.write(Math.pow(2,3));

/* 取括號內的數的開根號 */
document.write(Math.sqrt(36));

/* 回傳0~1 隨機一個數字 */
document.write(Math.random());

/* 回傳0~10 隨機一個整數 複合式用法! */
document.write(Math.round(Math.random() * 10));