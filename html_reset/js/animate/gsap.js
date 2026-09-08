// function initGsap() {

//     gsap.registerPlugin(ScrollTrigger);

//     gsap.to('.box', { // 目標元素
//         x: 300, // 位置
//         duration: 1, // 秒
//         scrollTrigger:  ".box2", // 觸發的元素
//     });

//     gsap.to('.box', { // 目標元素
//         x: 300, // 位置
//         duration: 1, // 秒
//         scrollTrigger:  {
//             trigger: ".box2", // 觸發的元素
//             start: "top center", // 觸發的起始位置 "top 30%"
//             end: "bottom center", // 觸發的結束位置
//             scrub: true, // 平滑過渡
//             markers: true, // 顯示標記
//             toggleClasses: "active", // 觸發時添加的 class
//             toggleActions: "play pause resume reset", // 進入 離開 進入在離開 離開再回來
//             // reverse 反向播放 , restart 從頭播放 , play 播放 , pause 暫停 , resume 繼續播放 , reset 回到初始狀態, none 不做任何動作
//         }
//     });

//     gsap.to('.box', { // 目標元素
//         x: 300, // 位置
//         duration: 1, // 秒
//         scrollTrigger:  {
//             trigger: ".box2",
//             start: "top center",
//             end: "bottom center",
//             scrub: true,
//             markers: false,
//             toggleClasses: "active",
//             toggleActions: "play none none none",
//             scrub: true, // 跟著卷軸動 可以寫秒數 3 比較平滑
//             pin: true, // 固定元素 也可以寫".box2"會以該元素為固定點
//         }
//     });

// }

function initGsap() {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=1800",
            scrub: 1,
            pin: true
        }
    });

    tl
    // ① 圓球放大
    .to(".ball", {
        scale: 6,
        duration: 1
    })

    // ② 圓球旋轉 + 移動
    .to(".ball", {
        x: 400,
        rotation: 360,
        duration: 1
    })

    // ③ 文字消失
    .to(".hero__content", {
        y: -150,
        opacity: 0,
        duration: .5
    }, "<")

    // ④ 圓球縮小
    .to(".ball", {
        scale: 1.5,
        x: 0,
        duration: 1
    })

    // ⑤ 下一個標題出現
    .from(".next h2", {
        y: 150,
        opacity: 0,
        duration: 1
    });
}