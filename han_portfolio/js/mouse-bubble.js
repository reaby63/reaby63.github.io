const container = document.getElementById('bubble-container');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// 只記錄滑鼠位置
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 每秒生成一顆
setInterval(() => {

    const bubble = document.createElement('div');

    bubble.classList.add('bubble');

    const size = Math.random() * 8 + 12;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    bubble.style.left =
        `${mouseX + (Math.random() * 30 - 15)}px`;

    bubble.style.top =
        `${mouseY + (Math.random() * 30 - 15)}px`;

    bubble.style.setProperty(
        '--x-offset',
        `${Math.random() * 20 - 10}px`
    );

    container.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    }, 4000);

}, 500);