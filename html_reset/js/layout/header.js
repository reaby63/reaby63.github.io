// 套資料
fetch('layout/Header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('header').innerHTML = html;

        // header JS 渲染資料
        const header = document.querySelector('.header');
        fetch('js/data.json')
            .then(r => r.json())
            .then(data => {
                const siteVars = data.site; // 共用資料 先撈出
                const headerData = data.header;
                const navData = data.header.nav;
                const tpl = document.getElementById('header-template').content.cloneNode(true);

                tpl.querySelector('.h_title img').src =
                    replaceVars(headerData.logo, siteVars);
                tpl.querySelector('.h_title span').textContent =
                    replaceVars(headerData.title, siteVars); // 共用資料 套共用函式就能抓出同名資料

                // nav 按鈕
                const btnContainer = tpl.querySelector('.nav');
                btnContainer.innerHTML = ''; // 清空原本 button
                navData.forEach(nav => {
                    const btn = document.createElement('a');
                    btn.textContent = nav.title;
                    btnContainer.appendChild(btn);
                    btn.href = nav.href;
                    btn.textContent = nav.title;
                    btn.dataPage = nav.dataPage;
                });

                header.appendChild(tpl);

                // 滾動後header縮小 動態效果
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {   // 滾動超過 50px
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            });
    });

