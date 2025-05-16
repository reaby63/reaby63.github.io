//功能包含:左右切換,定時輪播,頁籤切換

const imgList = [ //用陣列選取所有的img後 在做迴圈
    './img/01.jpg' , './img/02.jpg' , './img/03.jpg'  //可以用字串的方式選取img的路徑
]
//先設定img的目前順序
let imgNum = 0 
//要滑動的距離
const imgWidth = window.innerWidth

// 左右切換-往右滑一張圖片的距離
function switchPlus() {

    if (imgNum < imgList.length - 1) {
        imgNum += 1
        console.log('if' + imgNum )
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`
    } else { 
        imgNum > imgList.length - 1
        console.log('elseB'+ imgNum )
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[0]}" alt="">`
        imgNum = 0
    }

}

//往左滑
function switchDeduct() { 

    if (imgNum === 0) {
        imgNum = imgList.length - 1
        console.log('if' + imgNum )
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`
    } else { 
        console.log('elseB'+ imgNum )
        imgNum -= 1
        console.log('elseA'+ imgNum )
        document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[imgNum]}" alt="">`
    }

}


// 固定時間輪播 = 固定時間就執行按右箭頭指令
// setInterval(switchPlus, 3000);


// 頁籤切換
// function pageOne() { 
//     document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[0]}" alt="">`
// }
// function pageTwo() { 
//     document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[1]}" alt="">`
// }
// function pageThree() { 
//     document.getElementById('carousel_img_scroll').innerHTML = `<img src="${imgList[2]}" alt="">`
// }



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

