// 滑鼠外觀
const cursor = document.querySelector('#cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll('a, button').forEach(el => {

    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });

});