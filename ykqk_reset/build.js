const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const sass = require('sass');

const config = {

    // ==================================================
    // 圖片 CDN 基礎路徑
    //
    // 例如：
    // img/process-pic2.jpg
    //
    // 會輸出成：
    // https://pic03.eapple.com.tw/cyuanmei/process-pic2.jpg
    // ==================================================

    imageBaseUrl:
        'https://pic03.eapple.com.tw/cyuanmei/'

};

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
// SCSS 路徑
// ==================================================

const slicingScssDir = path.join(
    rootDir,
    'styles',
    'scss',
    'slicinguse'
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
// 圖片路徑處理
// ==================================================

function convertImageUrl(url) {

    if (!url) {
        return url;
    }

    url = url.trim();

    // --------------------------------------------------
    // 已經是完整網址 / data URL
    // 不處理
    // --------------------------------------------------

    if (
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('//') ||
        url.startsWith('data:') ||
        url.startsWith('#')
    ) {
        return url;
    }


    // --------------------------------------------------
    // 找 img/ 的位置
    //
    // 例如：
    //
    // ../../../img/process-pic2.jpg
    //
    // 找到：
    //
    // img/process-pic2.jpg
    // --------------------------------------------------

    const imgIndex =
        url.indexOf('img/');


    if (imgIndex === -1) {
        return url;
    }


    const imagePath =
        url.substring(
            imgIndex + 4
        );


    // --------------------------------------------------
    // 組合 CDN 路徑
    // --------------------------------------------------

    return (
        config.imageBaseUrl +
        imagePath
    );

}

// ==================================================
// HTML / CSS 圖片路徑替換
// ==================================================

function replaceImagePaths(html) {

    const $ =
        cheerio.load(
            html,
            {
                decodeEntities: false
            }
        );


    // ==================================================
    // HTML <img src="">
    // ==================================================

    $('img[src]').each(
        function () {

            const img =
                $(this);

            const src =
                img.attr('src');

            const newSrc =
                convertImageUrl(src);

            img.attr(
                'src',
                newSrc
            );

        }
    );


    // ==================================================
    // HTML / CSS 所有 url(...)
    //
    // 例如：
    //
    // background-image:
    // url("../../../img/process-pic2.jpg");
    //
    // ==================================================

    $('style').each(
        function () {

            const style =
                $(this);

            let css =
                style.html() || '';


            css =
                css.replace(
                    /url\(\s*(['"]?)(.*?)\1\s*\)/gi,
                    function (
                        match,
                        quote,
                        url
                    ) {

                        const newUrl =
                            convertImageUrl(url);

                        return `url("${newUrl}")`;

                    }
                );


            style.html(css);

        }
    );


    return $.html();

}


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
// 編譯該頁專用 SCSS
// ==================================================

function buildPageScss(pageFile) {

    // --------------------------------------------------
    // page 檔名
    //
    // index.html
    // about.html
    //
    // 對應：
    //
    // _index.scss
    // _about.scss
    // --------------------------------------------------

    const pageName =
        path.basename(
            pageFile,
            '.html'
        );


    const scssFileName =
        `_${pageName}.scss`;


    const scssPath =
        path.join(
            slicingScssDir,
            scssFileName
        );


    // ==================================================
    // 找不到 SCSS
    // ==================================================

    if (!fs.existsSync(scssPath)) {

        console.warn(
            `⚠ 找不到頁面 SCSS：styles/scss/slicinguse/${scssFileName}`
        );

        return '';

    }


    // ==================================================
    // Sass Compile
    // ==================================================

    try {

        const result =
            sass.compile(
                scssPath,
                {
                    style: 'expanded',
                    sourceMap: false
                }
            );


        console.log(
            `✓ SCSS：slicinguse/${scssFileName}`
        );


        return result.css;

    } catch (error) {

        console.error(
            `✗ SCSS 編譯失敗：${scssFileName}`
        );

        console.error(
            error.message
        );

        return '';

    }

}


// ==================================================
// 將 CSS 塞進 HTML <style>
// ==================================================

function injectPageCss(html, css) {

    const $ =
        cheerio.load(
            html,
            {
                decodeEntities: false
            }
        );


    // ==================================================
    // 移除原本 stylesheet
    //
    // 注意：
    // 這裡只移除你自己的：
    //
    // styles/css/style.css
    //
    // Swiper CDN CSS 不會被移除
    // ==================================================

    $('link[rel="stylesheet"]').each(
        function () {

            const link =
                $(this);

            const href =
                link.attr('href') || '';


            if (
                href.includes(
                    'styles/css/style.css'
                )
            ) {

                link.remove();

            }

        }
    );


    // ==================================================
    // 如果有 CSS
    // ==================================================

    if (css.trim()) {

        const styleTag = `
<style>
/* ==================================================
   Page SCSS
   ================================================== */

${css}

</style>
`;


        $('head').append(
            styleTag
        );

    }


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
// 建立 dist JS 資料夾
// ==================================================

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
    // 取得這一頁的 SCSS
    // ==================================================

    const pageCss =
        buildPageScss(
            file
        );


    // ==================================================
    // 將 CSS 寫入 <style>
    // ==================================================

    let finalHTML =
        $.html();


    finalHTML =
        injectPageCss(
            finalHTML,
            pageCss
        );

    // ==================================================
    // 統一處理圖片路徑
    // ==================================================

    finalHTML =
        replaceImagePaths(
            finalHTML
        );


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
        finalHTML,
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