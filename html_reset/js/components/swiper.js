// Swiper 元件

let swiperData = {};
let swiperInstances = [];

// 載入 data.json（只讀一次）
async function loadSwiperData() {
    if (Object.keys(swiperData).length > 0) return;
    try {
        const res = await fetch('./js/data.json');
        swiperData = await res.json();
    } catch (err) {
        console.error('讀取 data.json 失敗', err);
    }
}

// 初始化 Swiper
async function initSwiper() {

    const swiperEls = document.querySelectorAll('.swiper');

    if (!swiperEls.length) return;

    await loadSwiperData();

    swiperEls.forEach(swiperEl => {

        // 資料來源
        const source = swiperEl.dataset.source || 'banner';

        // 資料名稱
        const key = swiperEl.dataset.key || 'one';

        buildSwiper(
            swiperEl,
            source,
            key
        );
    });
}

// 陣列分組 data-slide-group使用的
function chunkArray(array, size){

    const result = [];

    for(let i = 0; i < array.length; i += size){

        result.push(
            array.slice(i, i + size)
        );

    }

    return result;
}

// 建立 Swiper
function buildSwiper(swiperEl, source, key) {

    // 取得資料
    const slidesData = swiperData[source]?.[key];

    if (!slidesData) {
        console.warn(
            `找不到資料：${source}.${key}`
        );
        return;
    }

    const wrapper = swiperEl.querySelector('.swiper-slides');

    if (!wrapper) return;

    // 生成 slide 依照套用模板
    const swiperTemplate = {
        // data-template 套用 banner
        banner(item){
            return `
            <div class="swiper-slide">
                <div class="swiper-text">
                    <h2>${item.title || ''}</h2>
                    ${
                        item.icon 
                        ? 
                        `<img src="${item.icon}" 
                            alt="icon" 
                            class="slide-icon">`
                        :
                        ''
                    }
                    <p>${item.desc || ''}</p>
                </div>
                ${
                    item.img
                    ?
                    `<img src="${item.img}" 
                        alt="${item.title || ''}">`
                    :
                    ''
                }
            </div>`;
        },
        // data-template 套用 product 假設是使用 data-slide-group 模式
        product(item){

            // 判斷是不是 data-slide-group 模式
            const items = Array.isArray(item) ? item : [item];

            return `
            <div class="swiper-slide">

                <div class="product-group">

                    ${items.map(item => `
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
                                <img src="${item.img}" alt="">
                            </div>

                        </div>
                    `).join("")}

                </div>

            </div>
        `;
        }
    };

    const template = swiperTemplate[swiperEl.dataset.template];

    const slideGroup = Number(swiperEl.dataset.slideGroup) || 0;

    if(slideGroup){
        const groupedData = chunkArray(slidesData, slideGroup);
        wrapper.innerHTML = groupedData
            .map(template)
            .join("");

    }else{
        wrapper.innerHTML = slidesData
            .map(template)
            .join("");
    }

    // Swiper 設定
    const swiperOption = {
        loop: swiperEl.dataset.loop !== "false",
        effect: swiperEl.dataset.effect || "slide",
        speed: Number(swiperEl.dataset.speed) || 1000,
        // 有data-slide-group時 slidesPerView永遠:1
        slidesPerView:
        swiperEl.dataset.slideGroup
            ? 1
            : (
                swiperEl.dataset.slidesPerView === "auto"
                    ? "auto"
                    : Number(swiperEl.dataset.slidesPerView) || 1
            ),
        spaceBetween: Number(swiperEl.dataset.spaceBetween) || 0,
    };

    // effect - fade
    if(swiperOption.effect === "fade"){
        swiperOption.fadeEffect = {
            crossFade:true
        };
    }

    // effect - cube
    if(swiperOption.effect === "cube"){
        swiperOption.cubeEffect = {
            shadow:false,
            slideShadows:false
        };
    }

    // effect - coverflow
    if(swiperOption.effect === "coverflow"){
        swiperOption.coverflowEffect = {
            rotate:20,
            stretch:0,
            depth:100,
            modifier:1,
            slideShadows:false
        };
    }

    // autoplay
    if(
        swiperEl.dataset.autoplay !== "false"
    ){
        swiperOption.autoplay = {
            delay:
            Number(swiperEl.dataset.delay) || 3000,
            
            disableOnInteraction:false
        };
    }

    // pagination
    const paginationType = swiperEl.dataset.pagination || "false";

    if (paginationType !== "false") {

        swiperOption.pagination = {
            el: swiperEl.querySelector(".swiper-pagination")
        };

        switch (paginationType) {

            // 小圓點（預設）
            case "bullet":
                swiperOption.pagination.clickable = true;
                break;

            // 數字 1 / 5
            case "fraction":
                swiperOption.pagination.type = "fraction";
                break;

            // 進度條
            case "progressbar":
                swiperOption.pagination.type = "progressbar";
                break;

            // 1 2 3 4
            case "number":
                swiperOption.pagination.clickable = true;

                swiperOption.pagination.renderBullet = function(index, className) {

                    return `
                        <span class="${className}">
                            ${index + 1}
                        </span>
                    `;

                };

                break;

            // 沒寫就當 bullet
            default:
                swiperOption.pagination.clickable = true;
                break;
        }

    }

    // scrollbar
    if (
        swiperEl.dataset.scrollbar === "true"
    ){
        swiperOption.scrollbar = {
            el: swiperEl.querySelector(".swiper-scrollbar"),
            draggable: true,
            dragSize: "auto",
            hide: false
        };
    }


    // navigation
    if(
        swiperEl.dataset.navigation === "true"
    ){
        swiperOption.navigation = {
            nextEl:
            swiperEl.querySelector(
                ".swiper-button-next"
            ),
            prevEl:
            swiperEl.querySelector(
                ".swiper-button-prev"
            )
        };
    }

    // RWD Breakpoints
    if (
        !swiperEl.dataset.slideGroup &&
        swiperEl.dataset.breakpoints
    ) {

        try {

            const breakpointData =
                JSON.parse(
                    swiperEl.dataset.breakpoints
                );

            swiperOption.breakpoints = {};

            Object.entries(breakpointData).forEach(
                ([breakpoint, config]) => {

                    // 如果只寫數字
                    if (
                        typeof config === "number" ||
                        config === "auto"
                    ) {

                        swiperOption.breakpoints[
                            breakpoint
                        ] = {
                            slidesPerView:
                                config === "auto"
                                    ? "auto"
                                    : config
                        };

                        return;
                    }


                    // 如果寫完整設定
                    swiperOption.breakpoints[
                        breakpoint
                    ] = {

                        slidesPerView:
                            config.slidesPerView === "auto"
                                ? "auto"
                                : Number(
                                    config.slidesPerView
                                ) || 1,

                        ...(config.spaceBetween !== undefined
                            ? {
                                spaceBetween:
                                    Number(
                                        config.spaceBetween
                                    ) || 0
                            }
                            : {})

                    };

                }
            );

        } catch (error) {

            console.error(
                "Swiper data-breakpoints 格式錯誤",
                error
            );

        }

    }


    // 建立 Swiper
    const instance = new Swiper(
        swiperEl,
        swiperOption
    );
    swiperInstances.push(instance);

}