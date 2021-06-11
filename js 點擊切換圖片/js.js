
//點擊圖片換圖片～

var myImage = document.querySelector('img');

//定義一個叫 myImage 的變數，他的值 是一個被抓取出的字串 'img'


myImage.onclick = function(){
//當 myImage 被點擊時...
	let mySrc = myImage.getAttribute('src');
	//設定一個參數(?)叫mySrc，代表抓取html內 有src的元素
	if (mySrc === 'img/0909.jpg') {
		myImage.setAttribute('src','img/0909-02.png');
	}
	else if (mySrc === 'img/0909-02.png') {
		myImage.setAttribute('src','img/0909-03.jpg');
	}
	else{
		myImage.setAttribute('src','img/0909.jpg');
	}
} 


//-------------------------------------------------



var myButton = document.getElementById('btn');
var myHeading = document.querySelector('h1');
// 取得新按鈕、新標題 並將資料儲存在設定的變數裡



//--



function setUserName(){
	let myName = prompt('請輸入你的名字');
	// 產生對話視窗的函式 prompt()，類似alert()，但會要求使用者輸入訊息，
	// 並在使用者點擊確認後，將內容儲存在一個變數裡
	localStorage.setItem('name', myName);
	//呼叫一個叫localStorage的API
	//setItem('名字', myName) -> 儲存名字為'名字'值為myName的變量
	myHeading.innerHTML = '哈囉哈囉' + myName;
	//將一個字串跟使用者的名字指定給標題(myHeading)的 innerHTML 特性
}
//加入客製化的歡迎訊息




//--


//if-else 會在程式一開始被讀取的時候就被啟用，稱為初始化程式碼：
if (!localStorage.getItem('name')) {
	//使用負邏輯運算來判斷 如果‘沒有’name這個值...
	setUserName();
	//則執行setUserName()，並創造name
} else {
//如果有了 ex.使用者已經在上一次造訪網頁時就設定過了
	let storedName = localStorage.getItem('name');
	//則使用 getItem() 來取得儲存的名字...
	myHeading.innerHTML = '哈囉哈囉' + storedName;
	//並將標題的innerHTML特性 加上一個字串＋使用者名字(storedName)
}



//--


//把以下的 onclick 事件處理器跟按鈕綁定
myButton.onclick = function(){
	setUserName();
	//每次點選按鈕時就會執行 setUserName()。允許使用者透過點選那個按鈕來重新設定一個新的名字
}


// 現在當您造訪這個網頁時，她會詢問您的名字，並且給您一個客製化過的歡迎訊息。
//在這之後，您也可以隨時透過點選那個按鈕來更改名字。
//順帶一提，因為這組客製化過的訊息是存在 localStorage 裡的，所以即使您將網頁關起來，她還是會保留著，
//所以當您下次開啟這個網頁時，這段客製化的訊息依然會出現！



//--







