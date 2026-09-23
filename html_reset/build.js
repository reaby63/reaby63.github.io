const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');


// ==================================================
// Template Engine
// ==================================================

const {
    replaceVars
} = require('./js/template.js');


// ==================================================
// 基本路徑
// ==================================================

const rootDir = __dirname;

const dataPath = path.join(
    rootDir,
    'data.json'
);

const indexPath = path.join(
    rootDir,
    'index.html'
);

const pageDir = path.join(
    rootDir,
    'page'
);

const distDir = path.join(
    rootDir,
    'dist'
);


// ==================================================
// 讀取 data.json
// ==================================================

const data = JSON.parse(
    fs.readFileSync(
        dataPath,
        'utf8'
    )
);


// ==================================================
// Swiper Template
// ==================================================

const swiperTemplate = {

    // ==================================================
    // Banner
    // ==================================================

    banner(item) {

        return `
            <div class="swiper-slide">

                <div class="swiper-text">

                    <h2>
                        ${item.title || ''}
                    </h2>

                    ${
                        item.icon
                            ?
                            `
                                <img
                                    src="${item.icon}"
                                    alt="icon"
                                    class="slide-icon"
                                >
                            `
                            :
                            ''
                    }

                    <p>
                        ${item.desc || ''}
                    </p>

                </div>

                ${
                    item.img
                        ?
                        `
                            <img
                                src="${item.img}"
                                alt="${item.title || ''}"
                            >
                        `
                        :
                        ''
                }

            </div>
        `;

    },


    // ==================================================
    // Product
    // ==================================================

    product(item) {

        return `
            <div class="swiper-slide">

                <div class="product-group">

                    <div class="ps--slide">

                        <div class="ps-text">

                            <div class="ps-title">
                                ${item.title || ''}
                            </div>

                            <div class="ps-desc">
                                ${item.desc || ''}
                            </div>

                            <div class="ps-btn">
                                <button>
                                    See More
                                </button>
                            </div>

                        </div>

                        <div class="ps-img">

                            <img
                                src="${item.img || ''}"
                                alt=""
                            >

                        </div>

                    </div>

                </div>

            </div>
        `;

    }

};


// ==================================================
// Build Swiper
// ==================================================

function buildSwipers(html) {

    const $ = cheerio.load(
        html,
        {
            decodeEntities: false
        }
    );


    $('.swiper').each(function () {

        const swiper = $(this);


        // ==================================================
        // 取得 Swiper 設定
        // ==================================================

        const source =
            swiper.attr('data-source');

        const key =
            swiper.attr('data-key');

        const templateName =
            swiper.attr('data-template');


        // ==================================================
        // 取得 data.json 資料
        // ==================================================

        const slidesData =
            data[source]?.[key];


        if (!Array.isArray(slidesData)) {

            console.warn(
                `⚠ 找不到 Swiper 資料：${source}.${key}`
            );

            return;

        }


        // ==================================================
        // 找 Template
        // ==================================================

        const template =
            swiperTemplate[templateName];


        if (!template) {

            console.warn(
                `⚠ 找不到 Swiper Template：${templateName}`
            );

            return;

        }


        // ==================================================
        // 找 swiper wrapper
        // ==================================================

        const wrapper =
            swiper
                .find('.swiper-slides')
                .first();


        if (!wrapper.length) {

            console.warn(
                '⚠ 找不到 .swiper-slides'
            );

            return;

        }


        // ==================================================
        // slide group
        // ==================================================

        const group =
            Number(
                swiper.attr('data-slide-group')
            ) || 1;


        // ==================================================
        // 分組
        // ==================================================

        const groupedData = [];


        for (
            let i = 0;
            i < slidesData.length;
            i += group
        ) {

            groupedData.push(
                slidesData.slice(
                    i,
                    i + group
                )
            );

        }


        // ==================================================
        // 產生 HTML
        // ==================================================

        let slidesHTML = '';


        groupedData.forEach(groupItems => {

            groupItems.forEach(item => {

                slidesHTML +=
                    template(item);

            });

        });


        // ==================================================
        // 寫入 HTML
        // ==================================================

        wrapper.html(
            slidesHTML
        );


        console.log(
            `✓ Swiper：${source}.${key}`
        );

    });


    return $.html();

}


// ==================================================
// 建立 dist
// ==================================================

if (fs.existsSync(distDir)) {

    fs.rmSync(
        distDir,
        {
            recursive: true,
            force: true
        }
    );

}


fs.mkdirSync(
    distDir,
    {
        recursive: true
    }
);


// ==================================================
// 建立 dist 資料夾
// ==================================================

const distCssDir =
    path.join(
        distDir,
        'css'
    );


const distJsDir =
    path.join(
        distDir,
        'js'
    );


const distComponentsDir =
    path.join(
        distJsDir,
        'components'
    );


fs.mkdirSync(
    distCssDir,
    {
        recursive: true
    }
);


fs.mkdirSync(
    distJsDir,
    {
        recursive: true
    }
);


fs.mkdirSync(
    distComponentsDir,
    {
        recursive: true
    }
);


// ==================================================
// 複製 CSS
// ==================================================

const cssSource =
    path.join(
        rootDir,
        'styles',
        'css',
        'style.css'
    );


const cssDestination =
    path.join(
        distCssDir,
        'style.css'
    );


if (fs.existsSync(cssSource)) {

    fs.copyFileSync(
        cssSource,
        cssDestination
    );

    console.log(
        '✓ CSS：style.css'
    );

} else {

    console.warn(
        '⚠ 找不到 styles/css/style.css'
    );

}


// ==================================================
// 複製 jQuery
// ==================================================

const jquerySource =
    path.join(
        rootDir,
        'js',
        'jquery-3.7.1.min.js'
    );


const jqueryDestination =
    path.join(
        distJsDir,
        'jquery-3.7.1.min.js'
    );


if (fs.existsSync(jquerySource)) {

    fs.copyFileSync(
        jquerySource,
        jqueryDestination
    );

    console.log(
        '✓ JS：jquery-3.7.1.min.js'
    );

} else {

    console.warn(
        '⚠ 找不到 js/jquery-3.7.1.min.js'
    );

}


// ==================================================
// 複製 Swiper JS
// ==================================================

const swiperJsSource =
    path.join(
        rootDir,
        'js',
        'components',
        'swiper.js'
    );


const swiperJsDestination =
    path.join(
        distComponentsDir,
        'swiper.js'
    );


if (fs.existsSync(swiperJsSource)) {

    fs.copyFileSync(
        swiperJsSource,
        swiperJsDestination
    );

    console.log(
        '✓ JS：components/swiper.js'
    );

} else {

    console.warn(
        '⚠ 找不到 js/components/swiper.js'
    );

}


// ==================================================
// 讀取 index.html
// ==================================================

const indexHTML =
    fs.readFileSync(
        indexPath,
        'utf8'
    );


// ==================================================
// 取得所有 page
// ==================================================

const pages =
    fs
        .readdirSync(pageDir)
        .filter(
            file =>
                file.endsWith('.html')
        );


// ==================================================
// Build 每一頁
// ==================================================

pages.forEach(file => {

    console.log(
        `\n================================`
    );

    console.log(
        `開始 Build：${file}`
    );

    console.log(
        `================================`
    );


    // ==================================================
    // 讀取 page HTML
    // ==================================================

    const inputPath =
        path.join(
            pageDir,
            file
        );


    let pageHTML =
        fs.readFileSync(
            inputPath,
            'utf8'
        );


    // ==================================================
    // {{ }} 資料替換
    // ==================================================

    pageHTML =
        replaceVars(
            pageHTML,
            data
        );


    // ==================================================
    // 判斷有沒有使用 Swiper
    // ==================================================

    const hasSwiper =
        pageHTML.includes(
            'class="swiper'
        ) ||
        pageHTML.includes(
            "class='swiper"
        );


    // ==================================================
    // Build Swiper
    // ==================================================

    pageHTML =
        buildSwipers(
            pageHTML
        );


    // ==================================================
    // 載入 index.html
    // ==================================================

    const $ =
        cheerio.load(
            indexHTML,
            {
                decodeEntities: false
            }
        );


    // ==================================================
    // ★ 修正 dist CSS 路徑
    // ==================================================

    $('link[rel="stylesheet"]').each(
        function () {

            const link =
                $(this);

            const href =
                link.attr('href');


            // ==================================================
            // 開發環境：
            // styles/css/style.css
            //
            // dist：
            // css/style.css
            // ==================================================

            if (
                href ===
                'styles/css/style.css'
            ) {

                link.attr(
                    'href',
                    'css/style.css'
                );

            }

        }
    );


    // ==================================================
    // 移除 index.html 原本的資料載入程式
    // ==================================================

    $('head script').each(
        function () {

            const script =
                $(this);


            const content =
                script.html() || '';


            if (
                content.includes(
                    'siteData'
                ) ||
                content.includes(
                    'data.json'
                ) ||
                content.includes(
                    'loadLayouts'
                ) ||
                content.includes(
                    'loadPage'
                )
            ) {

                script.remove();

            }

        }
    );


    // ==================================================
    // 清空 main-content
    // ==================================================

    $('#main-content').html(
        pageHTML
    );


    // ==================================================
    // 移除 index.html 原本所有 body script
    // ==================================================

    $('body > script').remove();


    // ==================================================
    // 加入必要 JS
    // ==================================================


    // --------------------------------------------------
    // jQuery
    // --------------------------------------------------

    if (
        fs.existsSync(
            jqueryDestination
        )
    ) {

        $('body').append(`
            <script
                src="js/jquery-3.7.1.min.js">
            </script>
        `);

    }


    // --------------------------------------------------
    // Swiper
    // --------------------------------------------------

    if (hasSwiper) {

        // ==================================================
        // Swiper CDN
        // ==================================================

        $('body').append(`
            <script
                src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js">
            </script>
        `);


        // ==================================================
        // 自己的 Swiper 初始化 JS
        // ==================================================

        $('body').append(`
            <script
                src="js/components/swiper.js">
            </script>
        `);

    }


    // ==================================================
    // ★ 加入必要 CSS
    // ==================================================
    //
    // 注意：
    //
    // index.html 本身已經有 Swiper CDN CSS
    // 所以這裡不要再 append 一次。
    //
    // ==================================================


    // ==================================================
    // 輸出 HTML
    // ==================================================

    const outputPath =
        path.join(
            distDir,
            file
        );


    fs.writeFileSync(
        outputPath,
        $.html(),
        'utf8'
    );


    console.log(
        `✓ 輸出：dist/${file}`
    );

});


// ==================================================
// Build 完成
// ==================================================

console.log('\n');

console.log(
    '================================'
);

console.log(
    '✓ Build 完成！'
);

console.log(
    '================================'
);