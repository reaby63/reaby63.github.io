// Swiper 元件
let swiperData = {};

// 載入 data.json
async function loadSwiperData() {
    if (Object.keys(swiperData).length) {
        return;
    }
    try {
        const res = await fetch('./js/data.json');
        swiperData = await res.json();
    } catch (err) {
        console.error(
            '讀取 data.json 失敗',
            err
        );
    }
}

// Swiper Template
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

// chunkArray
function chunkArray(array, size) {
    const result = [];
    for (
        let i = 0;
        i < array.length;
        i += size
    ) {
        result.push(
            array.slice(
                i,
                i + size
            )
        );
    }
    return result;
}

// 取得目前 group
function getSlideGroup(swiperEl) {
    // 預設數量
    const defaultGroup =
        Number(
            swiperEl.dataset.slideGroup
        ) || 1;

    // 沒有設定 breakpoint
    if (
        !swiperEl.dataset.slideGroupBreakpoints
    ) {
        return defaultGroup;
    }

    try {
        const breakpoints =
            JSON.parse(
                swiperEl.dataset.slideGroupBreakpoints
            );

        const width =
            window.innerWidth;

        /*
        找出符合目前寬度的 breakpoint
        例如：data-slide-group="6"
        {
            "768": 4,
            "480": 2
        }

        width = 1200
        → 沒有符合
        → 6

        width = 700
        → 700 <= 768
        → 4
        */
        const matchedBreakpoints =
            Object.entries(
                breakpoints
            )
            .map(
                ([breakpoint, group]) => ({
                    breakpoint: Number(breakpoint),
                    group: Number(group)
                })
            )
            .filter(
                item =>
                    width <= item.breakpoint
            )
            .sort(
                (a, b) =>
                    a.breakpoint -
                    b.breakpoint
            );

        console.log(
            '符合的 breakpoint：',
            matchedBreakpoints
        );

        // 沒有符合
        if (
            matchedBreakpoints.length === 0
        ) {
            return defaultGroup;
        }
        // 最接近目前寬度的 breakpoint
        const matched = matchedBreakpoints[0];
        console.log(
            '套用：',
            matched.group
        );
        return (
            matched.group > 0
                ? matched.group
                : defaultGroup
        );

    } catch (error) {
        console.error(
            'data-slide-group-breakpoints 格式錯誤',
            error
        );
        return defaultGroup;
    }
}

// Render Slides
function renderSwiperSlides(swiperEl) {
    const source = swiperEl.dataset.source;
    const key = swiperEl.dataset.key;
    const templateName = swiperEl.dataset.template;
    const slidesData = swiperData[source]?.[key];

    if (!slidesData) {
        console.warn(
            `找不到資料：${source}.${key}`
        );
        return;
    }

    const template = swiperTemplate[templateName];

    if (!template) {
        console.warn(
            `找不到 template：${templateName}`
        );
        return;
    }

    const wrapper =
        swiperEl.querySelector(
            '.swiper-slides'
        );

    if (!wrapper) {
        console.warn(
            '找不到 .swiper-slides'
        );
        return;
    }

    /* 一般模式 一筆資料 -> 一個 swiper-slide */
    if (!swiperEl.dataset.slideGroup) {
        wrapper.innerHTML =
            slidesData
                .map(item => {
                    return `
                        <div class="swiper-slide">
                            ${template(item)}
                        </div>
                    `;
                })
                .join('');

        delete swiperEl.dataset.currentGroup;
        return;
    }

    /* Group 模式 */
    const slideGroup =
        getSlideGroup(swiperEl);
    if (slideGroup < 1) {
        console.warn(
            'data-slide-group 必須大於 0'
        );
        return;
    }

    const groupedData =
        chunkArray(
            slidesData,
            slideGroup
        );

    /*
    一組資料
    ↓
    一個 swiper-slide

    例如 group = 1：

    [A]
    [B]
    [C]

    例如 group = 3：

    [A B C]
    [D E F]
    */
    wrapper.innerHTML =
        groupedData
            .map(group => {
                return `
                    <div class="swiper-slide">
                        ${group
                            .map(item => {
                                return template(item);
                            })
                            .join('')}
                    </div>
                `;
            })
            .join('');
    swiperEl.dataset.currentGroup = slideGroup;

    console.log(
        `Swiper Group：${slideGroup}`,
        `總資料：${slidesData.length}`,
        `總 Slides：${groupedData.length}`
    );
}

// 建立 Swiper Option
function getSwiperOption(
    swiperEl
) {
    const option = {
        loop: swiperEl.dataset.loop !== 'false',
        effect: swiperEl.dataset.effect || 'slide',
        speed:
            Number(
                swiperEl.dataset.speed
            ) || 1000,

        /*
            slide-group 模式：

            一個 .swiper-slide
            就是一組資料

            所以永遠 1
        */
        slidesPerView:
            swiperEl.dataset.slideGroup
                ? 1
                :
                (
                    swiperEl.dataset
                        .slidesPerView === 'auto'
                        ? 'auto'
                        :
                        Number(
                            swiperEl.dataset
                                .slidesPerView
                        ) || 1
                ),

        spaceBetween:
            Number(
                swiperEl.dataset
                    .spaceBetween
            ) || 0
    };

    // Effect
    if (
        option.effect === 'fade'
    ) {
        option.fadeEffect = {
            crossFade: true
        };
    }

    if (
        option.effect === 'cube'
    ) {
        option.cubeEffect = {
            shadow: false,
            slideShadows: false
        };
    }

    if (
        option.effect === 'coverflow'
    ) {
        option.coverflowEffect = {
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false
        };
    }

    if (
        option.effect === 'flip'
    ) {
        option.flipEffect = {
            slideShadows: false
        };
    }

    // Autoplay
    if (
        swiperEl.dataset.autoplay !== 'false'
    ) {
        option.autoplay = {
            delay:
                Number(
                    swiperEl.dataset.delay
                ) || 3000,
            disableOnInteraction: false
        };
    }

    // Pagination
    const pagination =
        swiperEl.dataset.pagination || 'false';

    if (
        pagination !== 'false'
    ) {
        option.pagination = {
            el:
                swiperEl.querySelector(
                    '.swiper-pagination'
                )
        };

        switch (pagination) {
            case 'fraction':
                option.pagination.type =
                    'fraction';
                break;

            case 'progressbar':

                option.pagination.type =
                    'progressbar';
                break;

            case 'number':
                option.pagination.clickable =
                    true;
                option.pagination.renderBullet =
                    function (
                        index,
                        className
                    ) {
                        return `
                            <span
                                class="${className}"
                            >
                                ${index + 1}
                            </span>
                        `;
                    };
                break;
            case 'bullet':
            default:
                option.pagination.clickable =
                    true;
                break;
        }
    }

    // Navigation
    if (
        swiperEl.dataset.navigation === 'true'
    ) {
        option.navigation = {
            nextEl:
                swiperEl.querySelector(
                    '.swiper-button-next'
                ),
            prevEl:
                swiperEl.querySelector(
                    '.swiper-button-prev'
                )
        };
    }

    // Scrollbar
    if (
        swiperEl.dataset.scrollbar === 'true'
    ) {
        option.scrollbar = {
            el:
                swiperEl.querySelector(
                    '.swiper-scrollbar'
                ),
            draggable: true,
            dragSize: 'auto',
            hide: false
        };
    }

    // 一般 slidesPerView breakpoint
    if (
        !swiperEl.dataset.slideGroup &&
        swiperEl.dataset.breakpoints &&
        swiperEl.dataset.slidesPerView
    ) {
        const breakpoints =
            swiperEl.dataset.breakpoints
                .split(',')
                .map(Number);

        const views =
            swiperEl.dataset.slidesPerView
                .split(',')
                .map(value => {
                    return value.trim() === 'auto'
                        ? 'auto'
                        : Number(value);
                });

        option.breakpoints = {};

        breakpoints.forEach(
            (
                breakpoint,
                index
            ) => {
                option.breakpoints[
                    breakpoint
                ] = {
                    slidesPerView:
                        views[index] ??
                        views[0]
                };
            }
        );
    }
    return option;
}


// 建立 Swiper
function initSingleSwiper(
    swiperEl
) {

    // 先 Render
    renderSwiperSlides(
        swiperEl
    );

    // 建立
    const instance =
        new Swiper(
            swiperEl,
            getSwiperOption(
                swiperEl
            )
        );

    // 保存 instance
    swiperEl._swiperInstance = instance;
    return instance;
}

// 重新建立單一 Swiper
function rebuildSingleSwiper(
    swiperEl
) {
    const oldSwiper =
        swiperEl._swiperInstance;
    // Destroy
    if (
        oldSwiper &&
        !oldSwiper.destroyed
    ) {
        oldSwiper.destroy(
            true,
            true
        );
    }

    swiperEl._swiperInstance =
        null;

    // 清空舊 slides
    const wrapper =
        swiperEl.querySelector(
            '.swiper-slides'
        );

    if (wrapper) {
        wrapper.innerHTML = '';
    }

    // 重新建立
    initSingleSwiper(
        swiperEl
    );
}

// initSwiper
async function initSwiper() {
    const swiperEls =
        document.querySelectorAll(
            '#main-content .swiper'
        );

    if (!swiperEls.length) {
        return;
    }

    await loadSwiperData();

    swiperEls.forEach(
        swiperEl => {
            initSingleSwiper(
                swiperEl
            );
        }
    );
}

// Resize
let swiperResizeTimer = null;

window.addEventListener(
    'resize',
    function () {
        clearTimeout(
            swiperResizeTimer
        );

        swiperResizeTimer =
            setTimeout(
                function () {
                    const swiperEls =
                        document.querySelectorAll(
                            '#main-content .swiper'
                        );

                    swiperEls.forEach(
                        swiperEl => {
                            // 沒有 group
                            if (
                                !swiperEl.dataset
                                    .slideGroup
                            ) {
                                return;
                            }

                            // 沒有 breakpoint
                            if (
                                !swiperEl.dataset
                                    .slideGroupBreakpoints
                            ) {
                                return;
                            }

                            // 現在應該是多少
                            const newGroup =
                                getSlideGroup(
                                    swiperEl
                                );

                            // 上一次是多少
                            const oldGroup =
                                Number(
                                    swiperEl.dataset
                                        .currentGroup
                                ) || 0;

                            // 沒變
                            if (
                                newGroup === oldGroup
                            ) {
                                return;
                            }
                            // 真的變了
                            rebuildSingleSwiper(
                                swiperEl
                            );
                        }
                    );
                },
                150
            );
    }
);