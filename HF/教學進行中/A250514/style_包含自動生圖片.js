//功能包含:左右切換,定時輪播,頁籤切換

const imgList = [ //用陣列選取所有的img後 在做迴圈
    './img/01.jpg' , './img/02.jpg' , './img/03.jpg'  //可以用字串的方式選取img的路徑
]
//先設定img的目前順序
let imgNum = 0 

// 讓img自動增長 (有效 但要把其他的註解掉才看的出來)
function addImg() { 
    // 先抓取要修改的dom
    let imgBox = document.querySelector('.carousel_img_scroll')
    // 設定一個空字串 清空原始的img html後 再加入這邊重複產出的
    let imgBoxSpace = ""

    //創造一個for迴圈 讓他只要陣列內有圖片 就一直產出img的html
    for (let i = [0]; i <= imgList.length - 1; i++ ) { 
        let imgContent = '<img src="' + imgList[i] + '" alt="">'
        imgBoxSpace = imgBoxSpace + imgContent
        console.log('圖片陣列內的數量'+ i)
    }

    imgBox.innerHTML = imgBoxSpace //將空字串套入要修改的dom
}
addImg();


// 固定時間輪播 = 固定時間就執行按右箭頭指令
function clockPlus() { 
    if (imgNum < imgList.length - 1) {
        imgNum += 1
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`
    } else { 
        imgNum > imgList.length - 1
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[0]}" alt="">`
        imgNum = 0
    }

    // 按鈕active跟著畫面移動
    let allButtons = document.querySelectorAll('.btn') // querySelectorAll是選取陣列用
    allButtons.forEach(function(btn) {  // 陣列.forEach(function(每一項的暫時變數名) {
        btn.classList.remove('active'); // 對每一項目要做的事情
    })
    allButtons[imgNum].classList.add('active')

}

let clock = setInterval(clockPlus, 4000) // clock因為後面會重新賦值 所以要用let!!!

// 左右切換-往右一直加
function switchPlus() {

    clearInterval(clock)//暫停自動輪播 - 先暫停!!再換圖片 不然會變成先換圖片->定時器也換圖片->暫停

    if (imgNum < imgList.length - 1) {
        imgNum += 1
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`
    } else { 
        imgNum > imgList.length - 1
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[0]}" alt="">`
        imgNum = 0
    }

    // 設定頁籤跟著動
    let allButtons = document.querySelectorAll('.btn') // querySelectorAll是選取陣列用
    allButtons.forEach(function(btn) {  // 陣列.forEach(function(每一項的暫時變數名) {
        btn.classList.remove('active'); // 對每一項目要做的事情
    })
    allButtons[imgNum].classList.add('active')
    // 回復自動輪播
    clock = setInterval(clockPlus, 4000)

}

//往左一直減
function switchDeduct() { 

    clearInterval(clock)//暫停自動輪播

    if (imgNum === 0) {
        imgNum = imgList.length - 1
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`
    } else { 
        imgNum -= 1
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`
    }

    // 設定頁籤跟著動
    let allButtons = document.querySelectorAll('.btn') // querySelectorAll是選取陣列用
    allButtons.forEach(function(btn) {  // 陣列.forEach(function(每一項的暫時變數名) {
        btn.classList.remove('active'); // 對每一項目要做的事情
    })
    allButtons[imgNum].classList.add('active')
    // 回復自動輪播
    clock = setInterval(clockPlus, 4000)
}

// 頁籤自動增長
function addPage() { 
    // 選取要編輯的 DOM 元素
    let domElement = document.querySelector('.page')
    // 建立一個空字串 先清空內部資料 再將迴圈內資料全都塞進去
    let domElementSpace = ''

    for (let index = [1]; index <= imgList.length ; index++) { 
        //for 裡面的 document 是抓一個 dom，這個dom在for 裡面執行了三次，三次都被設定不同的資料，所以被覆蓋了三次
        //所以不能在for迴圈內放innerHTML
        // document.getElementById('page').innerHTML = `<button onclick="changePage(${[index]})">${[index]}</button>`
        let content = '<button class="btn" onclick="changePage(' + [index] + ')"><div></div></button>'
        domElementSpace = domElementSpace + content //有內容要加上去又不要影響原本的字串 就要使用這個方法
    }

    domElement.innerHTML = domElementSpace
    document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`

}
addPage();

// 頁籤切換-簡化版 index是參數 專門給該function使用的參數
function changePage(index) { 
    imgNum = index - 1;
    document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`

    let allButtons = document.querySelectorAll('.btn') // querySelectorAll是選取陣列用
    // allButtons.classList.remove('active') 所以不能這樣remove
    //要用下方的方式
    allButtons.forEach(function(btn) {  // 陣列.forEach(function(每一項的暫時變數名) {
        btn.classList.remove('active'); // 對每一項目要做的事情
    })
    allButtons[index - 1].classList.add('active')


    clearInterval(clock)
    clock = setInterval(clockPlus, 4000)
}
changePage(1); //預設第一個套上active



// setTimeout使用方式 // setTimeout( 可以放事件/事件名稱 , 幾秒鐘 )
/* setTimeout(function(){
    $('.animate-text').addClass('loading');
  }, 1000); */




// 頁籤切換-我寫的笨方法
/* function pageOne() { 
    document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[0]}" alt="">`
}
function pageTwo() { 
    document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[1]}" alt="">`
}
function pageThree() { 
    document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[2]}" alt="">`
} */



// 01-設定一個變數 陣列包字串(字串是路徑)
// 02- for each
// onclick html tag

// js定時器


/* 型態建立通常是這樣區分

1. string (字串)
=> var a = '1'

2. number (數值)
=> var a = 1

3. boolean (布林)
=> var a = true or false

4. array (陣列)
=> var a = []

5. object (物件)
=> var a = {} */


// 多筆資料 - 可用陣列包住物件的方式寫 裏頭的img,name都是變數 可抓出來使用
/* var sliderList = [
    {
        img: '/img/01.jpg'
        name: '標題一'
    }
    {
        img: '/img/02.jpg'
        name: '標題二'
    }
] */


// 教學用寫法
// imgNum -=1
// document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`

// const imgWidth = window.innerWidth //可見視窗的寬度


//------js定時器--------

/* setTimeout() 爲一定時間後執行一次就結束
setInterval() 爲間隔一定時間，就會重複執行 */


// 左右箭頭合併寫法!!!
function changeImage(type = 'next') {
 let resultIndex = imgNum - 1;

 if (type === 'next') {
  resultIndex = imgNum + 1;
 }

 imgNum = resultIndex < 0 ? imgList.length : resultIndex % imgList.length;
 document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`
 clearInterval(clock)
    clock = setInterval(clockPlus, 4000)
}
/* type 那個參數就是妳左右箭頭要帶的值
像是 右按鈕(switchPlus)就是 changeImage();
左按鈕(switchDeduct)就是 changeImage('prev'); */
// 因為type會被改成prev 那if的式子就不成立了
// -> 用這個寫看看自動長btn 類似function changePage(n+1)



//為什麼頁籤的for迴圈外會需要一個空字串?
function pageBtn() { 
    
    for (i = 0; i < 10; i++) { 
        let content = '<button>'+ [i] +'</button>'
    }

    document.querySelector('.page').innerHTML = content

}
/* 因為 let 你寫在 for 裡面
妳看 for 是不是一個巢狀函式
就像 css 一樣

.xxx-class {
    width: 400px;
}
這個 width 是有辦法影響除了 xxx-class 以外的class嗎
妳目前的寫法 let content 是在 for 裡面宣告的，也就代表你的東西 for 跑完就不存在了

最下面的 docment 妳去把 他抓的 content 印出來 */