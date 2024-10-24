// 如何使用字串、字串用法
/* 如果要在頁面上呈現 hellow" Mr.White 那中間就要加\ */
var phrase ="hello\" Mr.White";
document.write(phrase.length);

/* var 命名一個變數 / phrase 自己創的變數名稱
document.write 在html上顯示字串 / 變數名.length 回傳字串長度 */
var phrase ="hello Mr.White";
document.write(phrase.length);

/* 將字母都變成大寫toUpperCase , 變小寫toLowerCase */
var phrase ="hello Mr.White";
document.write(phrase.toUpperCase());

/* 回傳字串的第1個字母 但所有數字都是從0開始算起 所以會回傳e */
var phrase ="hello Mr.White";
document.write(phrase.charAt(1));

/* 從字串裡找出我要的字是在第幾個位子 沒有就會回傳-1 有重複就會以第一個為主 */
var phrase ="hello Mr.White";
document.write(phrase.indexOf("h"));

/* 回傳第0至第5(不含5)的字串資料 */
var phrase ="hello Mr.White";
document.write(phrase.substring(0,5));