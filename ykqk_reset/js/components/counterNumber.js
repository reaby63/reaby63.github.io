// 數字動畫 滑到該區塊 數字從0跑到1000+

function initNumberCounter() {

    const counters = document.querySelectorAll(".counter-number");

    if (!counters.length) return;


    function startCounter(el) {

        const target = Number(el.dataset.number);
        const suffix = el.dataset.suffix || "";

        let start = 0;

        const duration = 1500;
        const startTime = performance.now();


        function update(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );


            // easeOut cubic
            const value = Math.floor(
                target * (1 - Math.pow(1 - progress, 3))
            );


            el.textContent = value.toLocaleString() + suffix;


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                el.textContent = target.toLocaleString() + suffix;

            }

        }


        requestAnimationFrame(update);

    }



    const observer = new IntersectionObserver(
        (entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    startCounter(entry.target);

                    // 只執行一次
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.5
        }
    );



    counters.forEach(counter=>{

        observer.observe(counter);

    });

}