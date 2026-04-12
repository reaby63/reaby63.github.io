// 下拉選單點開收合效果 (多個使用~)
export function initDropdown() {
    // 抓取頁面上所有 dropdown 元件
    const selects = document.querySelectorAll('.select');

    selects.forEach(select => {
        const btn = select.querySelector('.select-btn'); // 按鈕
        const list = select.querySelector('.select-list'); // 下拉選單內容
        const arrow = select.querySelector('.select-btn-arrow'); // 右邊箭頭

        // 點擊按鈕時
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // 記住目前是否開啟
            const isOpen = list.classList.contains('select-open');

            // 關掉全部（包含自己）
            document.querySelectorAll('.select-list').forEach(l => l.classList.remove('select-open'));
            document.querySelectorAll('.select-btn-arrow').forEach(a => a.classList.remove('scaleY'));

            // 如果原本是 "關的" 才打開
            if (!isOpen) {
                list.classList.add('select-open');
                arrow.classList.add('scaleY');
            }
        });
    });

    // 點擊頁面其他地方
    document.addEventListener('click', () => {
        document.querySelectorAll('.select-list').forEach(l => l.classList.remove('select-open'));
        document.querySelectorAll('.select-btn-arrow').forEach(a => a.classList.remove('scaleY'));
    });
}