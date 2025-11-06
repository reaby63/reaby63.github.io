/*
1. 可以輸入自己想要說的話發到留言板內
2. 留言板內只有添加訊息的時候要有動畫，讓使用者知道是最新消息
3. 網頁關閉後再打開，應該要可以看到之前存進去的訊息
4. 訊息要從舊排到新，且要儲存發送時間 */

let textarea = document.querySelector('#textarea')
let dialogBox = document.querySelector('.dialog_box')
let storeText = "" // 儲存文字
let storeTime = "" // 儲存時間 先給空字串
let dataAll = []  // 空陣列 給data迴圈後存放資料用

// 取出之前有儲存過的資料 localStorage.getItem('finalData')的意思是'看到finalData' 所以可以拿來當條件使用!!!
if (localStorage.getItem('finalData')) { 
    let finalDataArray = localStorage.getItem('finalData') // 拿出localStorage內的字串 (不設定只會看到字串 並不會塞入innerHTML)
    dataAll = JSON.parse(finalDataArray) // 將字串轉為陣列 一樣要設定變數 不然只是看到這個值 沒辦法用 (塞入準備好的空陣列)
    
    dialogBox.innerHTML = dataAll.join("") // 把上面的變數取出來用(塞入innerHTML) 因為是陣列 一樣要加入join("") 不然會有,

    // 將有包含.new的部分刪除
    // let documentNew = document.querySelectorAll('.new') // 選取所有包含new的class
    // documentNew.forEach(element => {  // 對每一個抓出來的 .new 做操作
    //     element.classList.remove('new') // 移除 class：element.classList.remove('new')
    // });
}
// forEach另一種寫法
/* documentNew.forEach(function (element) { 

}) */


// 使滾動條保持在底部設定
const dialogScroll = document.querySelector('.top')
dialogScroll.scrollTop = dialogScroll.scrollHeight
        

// 將textarea內的值取出來 也是用input
textarea.addEventListener('input', () => {
    storeText = textarea.value.trimStart()
    // console.log('textarea'+textarea.value); // 獲取最新的值
});

// 點擊enter後事件 : 將textarea內的文字儲存進localStorage 要有個迴圈
textarea.addEventListener('keydown', function (point) {

    if (textarea && textarea.value.length > 0) { // 判斷textarea內是否有文字 有才執行

        if (point.key === 'Enter' && !point.shiftKey) { // 預設是enter+shift換行 這行是enter+不要shift讓他送出 
            point.preventDefault();// 阻止換行 因為要做送出的動作!!
            textarea.value = ''//清空輸入框內的內容

            const timeNow = new Date();// 建立當前時間(因為是要在keydown觸發後建立時間)
            let storeTime = `${timeNow.getHours()} : ${timeNow.getMinutes()}` // 儲存時間
            
            // 更新陣列
            let cleanText = storeText.replaceAll('\n', '<br>'); // 將textarea內預設換行的\n換成<br> 要用replaceAll 用replace只會換第一行
            let data = [{
                time: storeTime,
                content: cleanText
            }]
            let allText = "" // 儲存迴圈文字 
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
            dialogScroll.scrollTop = dialogScroll.scrollHeight
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
        const timeNow = new Date();// 建立當前時間(因為是要在keydown觸發後建立時間)
        let storeTime = `${timeNow.getHours()} : ${timeNow.getMinutes()}` // 儲存時間
        textarea.value = ''//清空輸入框內的內容

        // 更新陣列
        let cleanText = storeText.replaceAll('\n', '<br>'); // 將textarea內預設換行的\n換成<br> 要用replaceAll 用replace只會換第一行
        let data = [{
            time: storeTime,
            content: cleanText
        }]
        let allText = "" // 儲存迴圈文字 
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
        dialogScroll.scrollTop = dialogScroll.scrollHeight

        localStorage.setItem('finalData', JSON.stringify(dataAll)) // 將dataAll轉為字串並儲存 更新網頁不消失

    }
    
})

// 做清除留言用
let clearAll = document.querySelector('.clear_all')

clearAll.addEventListener('click', () => { 
    localStorage.clear(); //清除所有資料用
    location.reload(); //讓畫面重新整理
})


// // 判斷是否有文字 如果有才能輸出 沒有就跳出alert
// function textareaHasText(textarea) { 
//     if (textarea && textarea.value.length < 0) { 

//     }
// }