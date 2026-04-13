import { initDropdown } from './selectDropdowns.js';
import { initsocial } from './social.js';

// 載入頁面
const main = document.getElementById('main-content');
fetch('page/page-home.html') // 進入頁面時預設載入首頁
    .then(res => res.text())
    .then(html => {
        main.innerHTML = html;

        initDropdown(); // select 下拉選單使用
        initsocial(); // 社群元件
    })
    .catch(err => console.error('載入首頁失敗', err));
