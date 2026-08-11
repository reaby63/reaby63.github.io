// 滑動到指定區域後套上進場 class
export function initAnimation() {

    const elementsToObserve = [
        {
            selector: '.topBg',
            className: 'fadein_an'
        },
        {
            selector: '.all-bg',
            className: 'fadein_an'
        },
        {
            selector: '.resume',
            className: 'fadein_an'
        },
        {
            selector: '.movie',
            className: 'fadein_an'
        }
    ];

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const item = elementsToObserve.find(item =>
                    entry.target.matches(item.selector)
                );

                if (item) {
                    entry.target.classList.add(item.className);
                }

                // 只執行一次
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0
    });


    // 開始監聽
    elementsToObserve.forEach(item => {

        const elements = document.querySelectorAll(item.selector);

        elements.forEach(element => {
            observer.observe(element);
        });

    });

}