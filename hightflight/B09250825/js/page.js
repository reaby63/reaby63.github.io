// 1- 預設首頁
const main = document.getElementById('main-content');
fetch('page/page-home.html') // 進入頁面時預設載入首頁
    .then(res => res.text())
    .then(html => {
        main.innerHTML = html;
    })
    .catch(err => console.error('載入首頁失敗', err));