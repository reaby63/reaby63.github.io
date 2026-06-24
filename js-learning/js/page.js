// 1- 預設首頁
const main = document.getElementById('main-content');
fetch('page/page-home.html') // 進入頁面時預設載入首頁
    .then(res => res.text())
    .then(html => {
        main.innerHTML = html;
    })
    .catch(err => console.error('載入首頁失敗', err));


// 2- 點 nav 切換 main 內容
document.addEventListener('click', e => {
  const link = e.target.closest('[data-page]');
  if (!link) return;

  e.preventDefault(); // 防止頁面跳轉
  const pageFile = `page/${link.dataset.page}.html`;

  fetch(pageFile)
    .then(res => res.text())
    .then(html => {
      document.getElementById('main-content').innerHTML = html;
    })
    .catch(err => console.error(`載入 ${pageFile} 失敗`, err));
});