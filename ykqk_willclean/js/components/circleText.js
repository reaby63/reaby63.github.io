// 文字繞圓圈動畫

function initCircleText() {

    document.querySelectorAll(".circle-text").forEach((circle, index) => {

        if (circle.dataset.init === "true") return;

        circle.dataset.init = "true";


        const text = circle.textContent.trim();

        if (!text) return;


        // ======================
        // 讀取設定
        // ======================

        const radius = Number(circle.dataset.radius) || 120;

        const speed = Number(circle.dataset.speed) || 15;

        const direction = circle.dataset.direction || "normal";

        const hoverPause = circle.dataset.hoverPause !== "false";

        const startAngle = Number(circle.dataset.start) || 0;


        // ======================
        // 清空
        // ======================

        circle.innerHTML = "";


        // ======================
        // SVG
        // ======================

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );


        svg.setAttribute(
            "viewBox",
            "0 0 300 300"
        );


        svg.classList.add("rotate");


        svg.style.animationDuration = `${speed}s`;


        if(direction === "reverse"){

            svg.style.animationDirection = "reverse";

        }



        // ======================
        // Path
        // ======================

        const defs = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "defs"
        );


        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );


        const pathId = `circlePath-${index}`;


        path.setAttribute(
            "id",
            pathId
        );


        path.setAttribute(
            "d",
            `
            M150,150
            m-${radius},0
            a${radius},${radius} 0 1,1 ${radius * 2},0
            a${radius},${radius} 0 1,1 -${radius * 2},0
            `
        );


        defs.appendChild(path);

        svg.appendChild(defs);



        // ======================
        // Text
        // ======================

        const textElement =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            );


        const textPath =
            document.createElementNS(
                "http://www.w3.org/2000/svg",
                "textPath"
            );


        textPath.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "href",
            `#${pathId}`
        );


        textPath.setAttribute(
            "startOffset",
            "0%"
        );


        textPath.textContent = text;


        textElement.appendChild(textPath);


        svg.appendChild(textElement);



        circle.appendChild(svg);



        // ======================
        // 起始角度
        // ======================

        svg.style.transform =
            `rotate(${startAngle}deg)`;



        // ======================
        // Hover 暫停
        // ======================

        if(hoverPause){


            circle.addEventListener(
                "mouseenter",
                ()=>{

                    svg.style.animationPlayState =
                        "paused";

                }
            );


            circle.addEventListener(
                "mouseleave",
                ()=>{

                    svg.style.animationPlayState =
                        "running";

                }
            );

        }


    });

}