// ==========================================
// Header 互動功能
// ==========================================

// 漢堡選單
document.addEventListener('click', (e) => {

    const hamburger = e.target.closest('.hamburger');

    if (!hamburger) return;

    const nav = document.querySelector('.nav');

    if (!nav) return;

    nav.classList.toggle('active');

});


// ==========================================
// Header 滾動縮小
// ==========================================

window.addEventListener('scroll', () => {

    const header = document.querySelector('.header');

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add('scrolled');

    } else {

        header.classList.remove('scrolled');

    }

});