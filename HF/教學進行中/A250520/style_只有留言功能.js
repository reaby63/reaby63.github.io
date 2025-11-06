// 這是input版本~ 比較像給問答機器人使用 最下方有localStorage.getItem的詳細邏輯

let dialogBox = document.querySelector('.dialog_box')
let storeText = document.getElementById('input').value // 儲存文字
let storeTime = "" // 儲存時間 先給空字串
let data = [{      // 
                time: storeTime,
                content: storeText
            }]
let dataAll = []  // 空陣列 給data迴圈後存放資料用

// 將input內的值取出來
input.addEventListener('input', () => {
    storeText = input.value
    localStorage.getItem(storeText) 
    // console.log(input.value); // 獲取最新的值
});

// 點擊enter後事件 : 將input內的文字儲存進localStorage 要有個迴圈
input.addEventListener('keydown', function (point) {
    if (point.key === 'Enter') {
        const timeNow = new Date();// 建立當前時間(因為是要在keydown觸發後建立時間)
        let storeTime = `${timeNow.getHours()} : ${timeNow.getMinutes()}` // 儲存時間
        localStorage.getItem(storeTime, storeText)
        console.log('文字:', storeText, '時間:', storeTime)
        
        // 更新陣列
        let data = [{
            time: storeTime,
            content: storeText
        }]
        function updateData() {
            let dataAmount = data.length // data內的數量
            for (i = 0; i < dataAmount; i++) {
                allText =
                    `<div class="dialog">
                        <div class="time">
                        ` + data[i].time + `
                        </div>
                        <div class="text">
                        ` + data[i].content + `
                        </div>
                    </div>`
            }
        }
        updateData();

        dataAll.push(allText) // 將data內的資料放入空的陣列內保存 每次回圈完都要存所以放外面
        dialogBox.innerHTML = dataAll.join("") // .join("")預設陣列會以,作區隔 用.join("")可以自訂要用什麼區隔
        console.log("測試空陣列內部:" + dataAll)
        // 其他設定
        const dialogScroll = document.querySelector('.top')
        dialogScroll.scrollTop = dialogScroll.scrollHeight // 使滾動條保持在底部
    }
})


// 如果是要點擊按鈕再送出--->
const button = document.getElementById('myButton');
button.addEventListener('click', function () {
    handleInput(); // 可以把點擊後的事情變成一個事件 在這邊觸發
    // 或是
    const inputValue = input.value; // 取得輸入框的值
    // 在這裡處理點擊按鈕後要做的事情
    console.log('你輸入了：', inputValue);
});



// 時間格式 zh-TW是指台灣時間格式 (要把個位數分 ex.5分 轉成 ex.05分 要用到的 但沒成功)
/* const twFormatter = new Intl.DateTimeFormat('zh-TW',{
    timeZone: 'Asia/Taipei',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
}) */

// 其他建立時間的列表
/* const timeNow = new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
}); */
// 時間的列表
/* year: now.getFullYear(),
month: now.getMonth() + 1, // 注意：月份索引從 0 開始
date: now.getDate(),
hours: now.getHours(),
minutes: now.getMinutes(),
seconds: now.getSeconds() */

// let storeText = document.getElementById('input').value // 原為text.target.value
// console.log("儲存的文字:" + storeText)


// localStorage.getItem 就像是:打開冰箱門
/* 思考邏輯
你想做什麼？
➤ 把「過去輸入的留言」重新加回畫面
我問你：你知道資料現在放在哪嗎？（你說存在 localStorage）

localStorage 裡的資料長什麼樣？
➤ 它是純文字字串，不能直接當陣列用
所以我問你：你之前 push 進去的是不是一個陣列？那要怎麼還原它？

為什麼 JSON.parse()？
➤ 因為你原本用 JSON.stringify() 存進去的是陣列轉字串
所以我們討論到：「字串 -> 陣列」這一步就靠 parse()

那 getItem() 是幹嘛？
➤ 拿出你儲存的「字串版本資料」
然後我們一起寫出這樣的程式邏輯：
if (localStorage.getItem('finalData')) {
  let data = localStorage.getItem('finalData')
  dataAll = JSON.parse(data)
  dialogBox.innerHTML = dataAll.join("")
}

為什麼要 .join("")？
➤ 因為你儲存的是一串一串的 HTML 字串，放進陣列裡
為了讓整塊留言串能呈現在網頁上，就把它「接成一整段 HTML」再放入 .innerHTML */

/* 更細微邏輯:
當時我只寫下: localStorage.getItem('finalData')
這樣只是打開冰箱門

➤ 你打開冰箱了，但你要記得「把食材拿出來」（用變數接住）
➤ 還要「加熱料理」（用 JSON.parse() 轉成能用的陣列）
➤ 最後才能「端上桌」（用 .innerHTML = 放到畫面上） */
