fetch('layout/Footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer').innerHTML = html;

        // Footer JS 渲染資料
        const footer = document.querySelector('.footer');
        fetch('js/data.json')
            .then(r => r.json())
            .then(data => {
                const footerData = data.footer;
                const tpl = document.getElementById('footer-template').content.cloneNode(true);

                tpl.querySelector('.logo img').src = footerData.logo;
                tpl.querySelector('.title').textContent = footerData.title;
                tpl.querySelector('.en_title').textContent = footerData.en_title;

                footer.appendChild(tpl);
            });
    });