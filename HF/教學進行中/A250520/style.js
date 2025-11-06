/*
1. 可以輸入自己想要說的話發到留言板內
2. 留言板內只有添加訊息的時候要有動畫，讓使用者知道是最新消息
3. 網頁關閉後再打開，應該要可以看到之前存進去的訊息
4. 訊息要從舊排到新，且要儲存發送時間 */

let textarea = document.querySelector('#textarea')
let dialogBox = document.querySelector('.dialog_box')
let storeText = "" // 儲存文字
const timeNow = new Date();// 建立當前時間
let storeTime = `${timeNow.getHours()} : ${timeNow.getMinutes()}` // 儲存時間
let dataAll = []  // 空陣列 給data迴圈後存放資料用

// 更新陣列用的共用function
function updateData() { 
    // 更新陣列
    let cleanText = storeText.replaceAll('\n', '<br>'); // 將textarea內預設換行的\n換成<br> 要用replaceAll 用replace只會換第一行

    // 要先判斷有沒有值 再push進去!!!
    if ( cleanText.length > 0 ) { 
        dataAll.push({ // push內可以放陣列 也不用再寫迴圈 就只要有資料他就會push進來了 所以最後儲存資料要存dataAll
        time: storeTime,
        content: cleanText
        }) 
    }
    let allText =
            `<div class="dialog">
                <div class="time">
                    08:28
                </div>
                <div class="text">
                    內容
                </div>
            </div>` // 儲存下面輪迴用的文字部分 原始資料可以放這邊~

    dataAll.forEach(function (i) { 
        allText +=
            `<div class="dialog">
                <div class="time">
                    ${i.time}
                </div>
                <div class="text">
                    ${i.content}
                </div>
            </div>`
    })
    dialogBox.innerHTML = allText // 將資料印出在html上

}

// 取出之前有儲存過的資料 localStorage.getItem('finalData')的意思是'看到finalData' 所以可以拿來當條件使用!!!
if (localStorage.getItem('finalData')) {
    let finalDataArray = localStorage.getItem('finalData') // 拿出localStorage內的字串 (不設定只會看到字串 並不會塞入innerHTML)
    dataAll = JSON.parse(finalDataArray) // 將字串轉為陣列 一樣要設定變數 不然只是看到這個值 沒辦法用 (塞入準備好的空陣列)
    
    updateData(); // 更新innerHTML
}

// 使滾動條保持在底部設定
const dialogScroll = document.querySelector('.top')
dialogScroll.scrollTop = dialogScroll.scrollHeight
        
// 將textarea內的值取出來 也是用input
textarea.addEventListener('input', () => {
    storeText = textarea.value.trimStart() // trimStart() 用來移除字串開頭的空白字元 (當然還有移除字串後的空白 巴拉巴拉)
    // console.log('textarea'+textarea.value); // 獲取最新的值
});

// 點擊enter後事件 : 將textarea內的文字儲存進localStorage 要有個迴圈
textarea.addEventListener('keydown', function (point) {

    if (textarea && textarea.value.length > 0) { // 判斷textarea內是否有文字 有才執行

        if (point.key === 'Enter' && !point.shiftKey) { // 預設是enter+shift換行 這行是enter+不要shift讓他送出
            point.preventDefault();// 阻止換行 因為要做送出的動作!!
            textarea.value = ''//清空輸入框內的內容
            
            updateData(); // 更新innerHTML
            dialogScroll.scrollTop = dialogScroll.scrollHeight // 將卷軸滑到最底部
        }
        localStorage.setItem('finalData', JSON.stringify(dataAll)) // 將dataAll轉為字串並儲存 更新網頁不消失
        
    } else if (point.key === 'Enter') {
        point.preventDefault();
        // 發現當設定了有文字按enter才輸出後 變成第一下按enter會自動換行 所以加這個阻止換行判斷
    }
    
})

// 當按下按鈕也可以執行
let sendBtn = document.querySelector('.send')
sendBtn.addEventListener('click', () => {
    if (textarea && textarea.value.length > 0) { // 判斷如果有內容再執行以下事件
        textarea.value = ''//清空輸入框內的內容
      
        updateData(); // 更新innerHTML
        dialogScroll.scrollTop = dialogScroll.scrollHeight // 將卷軸滑到最底部
        localStorage.setItem('finalData', JSON.stringify(dataAll)) // 將dataAll轉為字串並儲存 更新網頁不消失
    }
})

// 做清除留言用
let clearAll = document.querySelector('.clear_all')

clearAll.addEventListener('click', () => {
    localStorage.clear(); //清除所有資料用
    location.reload(); //讓畫面重新整理
})
