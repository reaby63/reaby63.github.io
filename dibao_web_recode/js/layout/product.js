// 套資料-記得補!!
fetch('page/page-home.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('product').innerHTML = html;

        // product JS 渲染資料
        const product = document.querySelector('.product');
        fetch('js/data.json')
            .then(r => r.json())
            .then(data => {
                // 我要套資料到id="product"部分
            });

    });

