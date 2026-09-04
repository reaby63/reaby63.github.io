// ========================================
// 一般進場動畫
// ========================================

function initAnimation() {

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            const target = entry.target;


            // ==============================
            // an-once
            // 進入視窗播放一次後停止
            // ==============================

            if (target.classList.contains("an-once")) {

                if (entry.isIntersecting) {

                    target.classList.add("is-active");

                    observer.unobserve(target);

                }

            }


            // ==============================
            // an-repeat
            // 進入播放
            // 離開重置
            // ==============================

            if (target.classList.contains("an-repeat")) {

                if (entry.isIntersecting) {

                    target.classList.add("is-active");

                } else {

                    target.classList.remove("is-active");

                }

            }

        });

    }, {
        threshold: .2
    });


    document
        .querySelectorAll(".an-once, .an-repeat")
        .forEach(el => observer.observe(el));

}



// ========================================
// 文字逐字動畫
// ========================================

function initTextReveal() {


    // ========================================
    // 文字拆字
    // ========================================

    document
        .querySelectorAll(".an-text-reveal")
        .forEach(element => {


            // 避免同一個元素重複拆字
            if (element.dataset.textReady === "true") return;

            element.dataset.textReady = "true";


            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT
            );


            const textNodes = [];


            while (walker.nextNode()) {

                textNodes.push(walker.currentNode);

            }


            let charIndex = 0;


            textNodes.forEach(textNode => {

                const text = textNode.textContent;

                const fragment = document.createDocumentFragment();


                [...text].forEach(char => {


                    // ==============================
                    // 空白
                    // ==============================

                    if (char === " ") {

                        fragment.appendChild(
                            document.createTextNode("\u00A0")
                        );

                        charIndex++;

                        return;

                    }


                    // ==============================
                    // 建立文字 span
                    // ==============================

                    const span = document.createElement("span");

                    span.classList.add("an-text-char");

                    span.textContent = char;


                    // 每個字依序增加 delay
                    span.style.setProperty(
                        "--char-delay",
                        `calc(${charIndex} * var(--an-text-speed, 0.05s))`
                    );


                    fragment.appendChild(span);

                    charIndex++;

                });


                textNode.parentNode.replaceChild(
                    fragment,
                    textNode
                );

            });

        });



    // ========================================
    // Intersection Observer
    // ========================================

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            const target = entry.target;


            // ==============================
            // an-once
            // ==============================

            if (target.classList.contains("an-once")) {

                if (entry.isIntersecting) {

                    target.classList.add("is-active");

                    observer.unobserve(target);

                }

            }


            // ==============================
            // an-repeat
            // ==============================

            if (target.classList.contains("an-repeat")) {

                if (entry.isIntersecting) {

                    target.classList.add("is-active");

                } else {

                    target.classList.remove("is-active");

                }

            }

        });

    }, {
        threshold: .2
    });


    // ========================================
    // 開始監控文字動畫
    // ========================================

    document
        .querySelectorAll(".an-text-reveal.an-once, .an-text-reveal.an-repeat")
        .forEach(el => observer.observe(el));

}