function initAnimation(){

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            const target = entry.target;

            if(target.classList.contains("an-once")){

                if(entry.isIntersecting){

                    target.classList.add("is-active");

                    observer.unobserve(target);

                }

            }

            if(target.classList.contains("an-repeat")){

                if(entry.isIntersecting){

                    target.classList.add("is-active");

                }else{

                    target.classList.remove("is-active");

                }

            }

        });

    },{
        threshold:.2
    });

    document
        .querySelectorAll(".an-once,.an-repeat")
        .forEach(el=>observer.observe(el));

}



// 文字逐字從上往下淡入進場
function initTextReveal() {
    // 找出所有文字動畫
    document
        .querySelectorAll(".an-text-reveal")
        .forEach(element => {

            // 避免重複拆字
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

                    // 空白
                    if (char === " ") {

                        fragment.appendChild(
                            document.createTextNode("\u00A0")
                        );

                        charIndex++;

                        return;
                    }
                    const span = document.createElement("span");
                    span.classList.add("an-text-char");
                    span.textContent = char;
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


    // Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const target = entry.target;

            // an-once
            if (target.classList.contains("an-once")) {

                if (entry.isIntersecting) {

                    target.classList.add("is-active");

                    observer.unobserve(target);

                }

            }

            // an-repeat
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


    // 開始監控
    document
        .querySelectorAll(".an-text-reveal.an-once, .an-text-reveal.an-repeat")
        .forEach(el => observer.observe(el));

}