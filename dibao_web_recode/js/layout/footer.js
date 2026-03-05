fetch('layout/Footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;

        // Footer JS 渲染資料
        const footer = document.querySelector('.footer');
        fetch('js/data.json')
            .then(r => r.json())
            .then(data => {
                const siteVars = data.site; // 共用資料 先撈出
                const footerData = data.footer;
                const navData = data.header.nav;
                const tpl = document.getElementById('footer-template').content.cloneNode(true);

                tpl.querySelector('.f_logo img').src =
                    replaceVars(footerData.logo, siteVars);
                tpl.querySelector('.f_title').textContent =
                    replaceVars(footerData.title, siteVars); // 共用資料 套共用函式就能抓出同名資料
                tpl.querySelector('.f_en_title').textContent =
                    footerData.en_title;

                // nav 按鈕
                const btnContainer = tpl.querySelector('.f_nav_btn');
                btnContainer.innerHTML = ''; // 清空原本 button
                navData.forEach(nav => {
                    const btn = document.createElement('button');
                    btn.textContent = nav.title;
                    btnContainer.appendChild(btn);
                });

                footer.appendChild(tpl);
            });
    });