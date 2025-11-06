
// 主題一覽滑動

// 1 - 判斷畫面上有幾個cp_list 就產出幾個頁籤
// 2 - 預設顯示第一張cp_list 也預設第一個頁籤active

// 先取得所有頁面
const pages = document.querySelectorAll('.cp_list')
const wrapper = document.querySelector('.cp_wrapper') //滑動用的
let pageNum = 0 // 預設第0頁
const btnBox = document.querySelector('.cp_listmark') // 拿來放btn的地方

// 使用for迴圈動態產出按鈕 並加上active
for (let i = 0; i < pages.length; i++) {
    const btn = document.createElement('button') // 先動態產出有幾頁就幾個button
    // tab.textContent = `第 ${i + 1} 頁`; 需要文字的再加這行
    btn.dataset.index = i // 幫這個按鈕設定一個 data-index="i" 這樣我才會知道他在哪一頁

    if (i === 0) { 
        btn.classList.add('active') //預設第一頁 第一個頁籤+active
    }

    // 新增事件 點擊的btn+active
    btn.addEventListener('click', function () {
        const index = Number(this.dataset.index) // 知道哪個按鈕被點擊
        // 當再某個DOM元素上綁定事件時 那個被觸發事件的元素就是this

        // 監聽目前點擊第幾頁
        if (index === pageNum) return // 如果點擊的是目前這頁 就不動作

        // 移動整個 wrapper（用 translateX）
        // 把整個 .cp_wrapper 往左平移幾個百分比的寬度 第一頁就0% 第二頁100% 第三頁200% ...
        wrapper.style.transform = `translateX(-${index * 100}%)`

        // 切換按鈕的樣式
        const btnAll = btnBox.querySelectorAll('button')
        btnAll.forEach(btn => btn.classList.remove('active')) //移除所有btn上的active

        this.classList.add('active') //目前點擊的 加上active

        pageNum = index // 更新目前停在的頁面 - 每點擊一次頁籤 就更新pageNum , 頁籤編號不是累加 不用在click內++

    })
    btnBox.appendChild(btn) // 將所有自動產出的btn加入至btnAll
}


// 觸控滑動效果 套別人的...
let startX = 0
let endX = 0

wrapper.addEventListener('touchstart', function (e) {
  startX = e.touches[0].clientX
})

wrapper.addEventListener('touchend', function (e) {
  endX = e.changedTouches[0].clientX
  handleSwipe()
})

function handleSwipe() {
  const diff = endX - startX
  const threshold = 50 // 滑動超過 50px 才觸發頁面切換

  if (Math.abs(diff) > threshold) {
    if (diff < 0 && pageNum < pages.length - 1) {
      // 向左滑（下一頁）
      pageNum++
    } else if (diff > 0 && pageNum > 0) {
      // 向右滑（上一頁）
      pageNum--
    } else {
      return // 邊界不切換
    }

    // 套用頁面位移
    wrapper.style.transform = `translateX(-${pageNum * 100}%)`

    // 更新按鈕 active 樣式
    const btnAll = btnBox.querySelectorAll('button')
    btnAll.forEach(btn => btn.classList.remove('active'))
    btnAll[pageNum].classList.add('active')
  }
}


