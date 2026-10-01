// Tab 切換元件

function initTabs(){

    document.querySelectorAll('.tabs')
    .forEach(tabGroup => {

        // 避免重複初始化
        if(tabGroup.dataset.init === "true") return;

        tabGroup.dataset.init = "true";

        const buttons = tabGroup.querySelectorAll('.tab-button');
        const contents = tabGroup.querySelectorAll('.tab-content');

        if(!buttons.length || !contents.length) return;

        // 預設開啟
        const defaultTab =
        tabGroup.dataset.default || 
        buttons[0].dataset.tab;

        changeTab(
            tabGroup,
            defaultTab
        );

        buttons.forEach(button => {
            button.addEventListener(
                'click',
                ()=>{
                    const target = button.dataset.tab;
                    changeTab(
                        tabGroup,
                        target
                    );
                }
            );
        });
    });
}

function changeTab(tabGroup, target){

    const buttons = tabGroup.querySelectorAll('.tab-button');
    const contents = tabGroup.querySelectorAll('.tab-content');

    buttons.forEach(button=>{
        button.classList.toggle(
            'active',
            button.dataset.tab === target
        );
    });

    contents.forEach(content=>{
        content.classList.toggle(
            'active',
            content.dataset.content === target
        );
    });

}