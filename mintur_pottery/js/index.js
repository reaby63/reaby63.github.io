
// 增加了onclick="addClass()" 點擊後 套了該id的部分增加class

// function addClass() {
//     document.getElementById("targetDiv").classList.toggle("menu_active");
// }


// 增加了onclick="toggleClasses()" 點擊一次 增加calssA 再點一次 增加classB (並移除classA)
let clickCount = 0;

function toggleClasses() {
    let div = document.getElementById("targetDiv");
    
    if (clickCount % 2 === 0) {
        div.classList.remove("menu_active_over");
        div.classList.add("menu_active");
    } else {
        div.classList.remove("menu_active");
        div.classList.add("menu_active_over");
    }
    
    clickCount++;
}



