// 套資料
fetch('layout/Header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('header').innerHTML = html;

        // 漢堡選單 必須再DOM建立好後再觸發唷
        document.addEventListener('click', (e) => {
            const hamburger = e.target.closest('.hamburger');
            if (!hamburger) return;

            const nav = document.querySelector('.nav');
            nav.classList.toggle('active');
        });

        // header JS 渲染資料
        const header = document.querySelector('.header');
        fetch('js/data.json')
            .then(r => r.json())
            .then(data => {
                const siteVars = data.site; // 共用資料 先撈出
                const headerData = data.header;
                const navData = data.header.nav;
                const tpl = document.getElementById('header-template');

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
                    // btn.href = nav.href; //這邊是跳頁行為
                    btn.href = `#${nav.href}`; // 這是滑動行為寫法
                    btn.dataPage = nav.dataPage;

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

                        // 點了收起選單
                        document.querySelector('.nav').classList.remove('active');
                    });

                    btnContainer.appendChild(btn);
                });

                // 滾動後header縮小 動態效果
                const header = document.querySelector('.header');
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) {   // 滾動超過 50px
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                });
            });

    });

