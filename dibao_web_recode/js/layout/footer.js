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
                const tpl = document.getElementById('footer-template');

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
                    // btn.href = nav.href; //這邊是跳頁行為
                    btn.href = `#${nav.href}`; // 這是滑動行為寫法

                    // 滑動行為須加下面
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();

                        const target = document.getElementById(nav.href);
                        if (!target) return;

                        const offset = 55; // header 高度
                        const y = target.getBoundingClientRect().top + window.scrollY - offset;

                        window.scrollTo({
                            top: y,
                            behavior: 'smooth'
                        });
                    });
                    btnContainer.appendChild(btn);
                });
            });
    });