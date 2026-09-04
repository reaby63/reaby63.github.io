function initGsap() {

    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.box', { // 目標元素
        x: 300, // 位置
        duration: 1, // 秒
        scrollTrigger:  ".box2", // 觸發的元素
    });

    gsap.to('.box', { // 目標元素
        x: 300, // 位置
        duration: 1, // 秒
        scrollTrigger:  {
            trigger: ".box2", // 觸發的元素
            start: "top center", // 觸發的起始位置 "top 30%"
            end: "bottom center", // 觸發的結束位置
            scrub: true, // 平滑過渡
            markers: true, // 顯示標記
            toggleClasses: "active", // 觸發時添加的 class
            toggleActions: "play pause resume reset", // 進入 離開 進入在離開 離開再回來
            // reverse 反向播放 , restart 從頭播放 , play 播放 , pause 暫停 , resume 繼續播放 , reset 回到初始狀態, none 不做任何動作
        }
    });

    gsap.to('.box', { // 目標元素
        x: 300, // 位置
        duration: 1, // 秒
        scrollTrigger:  {
            trigger: ".box2",
            start: "top center",
            end: "bottom center",
            scrub: true,
            markers: true,
            toggleClasses: "active",
            toggleActions: "play none none none",
            scrub: true, // 跟著卷軸動 可以寫秒數 3 比較平滑
            pin: true, // 固定元素 也可以寫".box2"會以該元素為固定點
        }
    });

}