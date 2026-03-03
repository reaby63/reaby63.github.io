<script setup>
import { ref, computed, useCssModule } from 'vue';
import { useCommonStore } from '@/stores/common';
import Pdcard from './PdCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Virtual, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const modules = [Virtual, Autoplay];
const $style = useCssModule();
const commonStore = useCommonStore();
//swiper設定
const swiperOptions = {
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        // 起初正播
        reverseDirection: false
    },
    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheel: true,
    speed: 800,
    resistanceRatio: 0
};

const curIndex = ref(0);
const secondIndex = ref(2);
const swiperRef = ref(null);
// 彈跳視窗
const showModal = ref(false);
const selectedItem = ref(null);
//計算浮動塊top
const swiperInstance = ref(null);
// 動畫設定
const direction = ref('');

const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
// 作品列表分組
const productList = computed(() => curPageData.value.productFirstList || []);
// 總點點數量(一次呈現三筆，所以把多的兩筆點點刪掉)
const dotList = computed(() => productList.value.slice(0, productList.value.length - 2));
// Nuxt 待SSR建立後執行
const windowWidth = ref(0);

function updateWindowWidth() {
    windowWidth.value = window.innerWidth;
}

onMounted(() => {
    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
});

function openModal(item) {
    const hasForeword = item.foreword && item.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    if (hasForeword || hasImage) {
        selectedItem.value = item;
        showModal.value = true;
    }
}

function slideClass(index) {
    return {
        [$style['swiper-slide-wrap']]: true,
        [$style['is-second']]: secondIndex.value === index,
        [$style['top-hide-anime']]: direction.value === 'top' && (curIndex.value - 1) === index,
        [$style['top-show-anime']]: direction.value === 'bottom' && curIndex.value === index,
        [$style['bottom-show-anime']]: direction.value === 'top' && secondIndex.value === index,
        [$style['bottom-hide-anime']]: direction.value === 'bottom' && (secondIndex.value + 1) === index
    };
}

// 動畫播放順序
function onChange(swiper) {
    direction.value = curIndex.value > swiper.activeIndex ? 'bottom' : 'top';
    curIndex.value = swiper.activeIndex;
    secondIndex.value = curIndex.value + 2;

    // 到尾巴就反向
    if (curIndex.value === productList.value.length - 3) {
        swiper.params.autoplay.reverseDirection = true;
        swiper.autoplay.stop();
        swiper.autoplay.start();
        return;
    }

    if (curIndex.value === 0) {
        swiper.params.autoplay.reverseDirection = false;
        swiper.autoplay.stop();
        swiper.autoplay.start();
    }
}

function swiperHeight(index) {
    const mobileWidth = windowWidth.value < 640;
    if (secondIndex.value === index) {
        return {
            height: mobileWidth ? '43vw' : '280px'
        };
    }

    return {
        height: mobileWidth ? '37vw' : '240px'
    };
}

function goDot(index) {
    swiperInstance.value.slideTo(index);
}

function onSwiper(swiper) {
    swiperInstance.value = swiper;
}
</script>

<template>
    <div
        v-if="curPageData.productFirstList?.length"
        :class="[
            $style.portfolio,
            { [$style['two-item']]: curPageData.productFirstList?.length === 2 },
            { [$style['one-item']]: curPageData.productFirstList?.length === 1 }]"
    >
        <div :class="$style.por_title">
            <div v-if="curPageData.productSetting?.subTitle" :class="$style.subtitle">
                {{ curPageData.productSetting?.subTitle }}
            </div>
            <div v-if="curPageData.productSetting?.title" :class="$style.title">
                {{ curPageData.productSetting?.title }}
            </div>
        </div>
        <div :class="$style.scroller">
            <!-- slideChange==監聽每次Swiper變化後的動作 -->
            <Swiper
                ref="swiperRef"
                :class="$style['swiper-wrap']"
                :modules="modules"
                v-bind="swiperOptions"
                @slide-change="onChange"
                @swiper="onSwiper"
            >
                <SwiperSlide
                    v-for="(item, index) in productList"
                    :key="item.image?.[0]?.value || index"
                    :class="slideClass(index)"
                    :style="swiperHeight(index)"
                >
                    <div
                        :class="[$style['swiper-slide-content'],{ [$style.disable]: !item.image?.length && !item.foreword }]"
                        @click="openModal(item)"
                    >
                        <ClientOnly>
                            <Image
                                v-if="item.exhibitImage?.[0]"
                                :img-src="commonStore.getImg(webID, item.exhibitImage?.[0])"
                                :class="$style['slide-img']"
                            />
                            <VideoLink
                                v-else-if="item.image?.[0]?.type === 'link'"
                                :video-link="item.image?.[0]?.value"
                                :video-type="item.image?.[0]?.community"
                                video-width="312"
                                video-height="240"
                                :class="[$style['iframe-wrap'], $style['slide-img']]"
                            />
                            <Image v-else :class="$style['slide-img']" :img-src="commonStore.getImg(webID, item.image[0]?.value)"/>
                        </ClientOnly>
                    </div>
                </SwiperSlide>
            </Swiper>
            <!-- 自定義dot位置 建議外層包起來 -->
            <div :class="$style['swiper-pagination-wrapper']">
                <!-- 滑塊動作 實際無法點擊 點到的會是dost -->
                <div
                    :class="$style['nav-dot']"
                    :style="{
                        height: `${100 / dotList.length}%`,
                        top: `${(100 / dotList.length) * curIndex}%`
                    }"
                />
                <!-- 自定義dot位置 -->
                <div
                    v-for="(item, index) in dotList"
                    :key="`dot-btn-${index}`"
                    :class="$style['pagination-btn']"
                    :style="{
                        height: `${100 / dotList.length}%`
                    }"
                    @click="goDot(index)"
                />
            </div>
        </div>
        <!-- PD彈跳視窗 -->
        <Pdcard
            v-if="showModal"
            v-model:visible="showModal"
            :data="selectedItem"
        />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.portfolio {
    padding: 60px 0px;
    background-color: #F8F8F8;
    &.two-item,
    &.one-item {
        .scroller {
            padding-top: 0;
        }
    }
    &.two-item {
        .swiper-wrap {
            height:455px;
        }
    }
    &.one-item {
        .swiper-wrap {
            height:240px;
        }
    }
}

.por_title {
    margin: 20px 50px;
    margin-right: 0;
    text-align: right;

    .subtitle {
        margin-right: 46px;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 4px;
        color: #947F73;
        margin-bottom: 15px;
        line-height: 22px;
    }

    .title {
        margin-right: 43px;
        font-weight: 500;
        font-size: 32px;
        line-height: 50px;
        letter-spacing: 7px;
    }
}

.scroller {
    position: relative;
    margin-left: 60px;
    padding-top: 100px;
    overflow: hidden;

    .scroll_area {

        .slide_imgBox {
            display: flex;
            align-items: center;
            overflow: hidden;
            border-radius: 20px 0px 0px 4px;
            border-width: 1px 0px 1px 1px;
            border-color: #DFDFDF;
            border-style: solid;
            position: relative;
            height: 240px !important;
            transition: all 0.6s ease;
            cursor: pointer;

            &:hover {
                img {
                    filter: brightness(1.2);
                }
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all 0.5s;
            }
        }
    }
}

.swiper-wrap {
    overflow: hidden;
    height: 654px;
}

.swiper-slide-wrap {
    position: relative;
    height: 280px;

    &.is-second {
        width: 100%;
        margin-top: -74px;

        .swiper-slide-content {
            width: 100%;
        }
    }

    &:global(.swiper-slide-active) {
        z-index: 2;
        height: 240px;
    }

    &:global(.swiper-slide-next) {
        z-index: 1;
        height: 240px;
        margin-top: -32px;

        .swiper-slide-content {
            width: 76.9%;
        }
    }
}

.top-hide-anime {
    animation: fadeHide 0.8s ease forwards;
}

.top-show-anime {
    animation: fadeShow 0.8s ease forwards;
}

.bottom-show-anime {
    animation: fadeShow 1.3s ease forwards;
}

.bottom-hide-anime {
    animation: fadeHide 0.8s ease forwards;

    .swiper-slide-content {
        width: 100%;
        transition: none;
    }
}

.swiper-slide-content {
    float: right;
    width: 53.8%;
    height: 100%;
    transition: width 0.8s ease;
    cursor: pointer;
    &.disable {
        cursor: initial;
    }
}

.slide-img {
    img {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px 0 0 4px;
        border-top: 1px solid #DFDFDF;
        border-bottom: 1px solid #DFDFDF;
        border-left: 1px solid #DFDFDF;
    }
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 20px 0 0 4px;
    border-top: 1px solid #DFDFDF;
    border-bottom: 1px solid #DFDFDF;
    border-left: 1px solid #DFDFDF;
}

@keyframes fadeShow {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeHide {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.swiper-pagination-wrapper {
    position: absolute;
    z-index: 5;
    width: 6px;
    height: 200px;
    top: 100px;
    left: 0;
    cursor: pointer;
}

.nav-dot {
    position: absolute;
    z-index: 3;
    width: 6px;
    top: 0;
    left: 0;
    transition: 0.3s;
    border-radius: 10px;
    background-color: #A39689;
}

.pagination-btn {
    &::before {
        content: '';
        display: block;
        width: 2px;
        height: 100%;
        margin: 0 auto;
        background-color: #dfdfdf;
    }
}

@media (max-width:640px){
    .swiper-wrap {
        height: 100vw;
    }
    .portfolio {
        &.two-item {
            .swiper-wrap {
                height: auto;
            }
            .swiper-slide-wrap {
                height: auto !important;
            }
            .slide-img {
                aspect-ratio: 640/455;
            }
        }
        &.one-item {
            .swiper-wrap {
                height: auto;
            }
            .swiper-slide-wrap {
                height: auto !important;
            }
            .swiper-slide-content {
                aspect-ratio: 446/240;
            }
        }
    }
}

@media (max-width:600px) {
    .scroller {
        margin-left: 30px;

        .scroll_area {
            height: 200px;
        }
    }
    .swiper-wrap {
        height: 99vw;
    }
}

@media (max-width:588px) {
    .swiper-wrap {
        height: 97vw;
    }
}
@media (max-width:520px) {
    .swiper-wrap {
        height: 95vw;
    }
}
@media (max-width:469px) {
    .swiper-wrap {
        height: 93vw;
    }
}
@media (max-width:443px) {
    .swiper-wrap {
        height: 90vw;
    }
    .swiper-pagination-wrapper{
        height: 120px;
    }
}
@media (max-width:390px) {
    .swiper-wrap {
        height: 88vw;
    }
}
@media (max-width:365px) {
    .swiper-wrap {
        height: 86vw;
    }
}
@media (max-width:340px) {
    .swiper-wrap {
        height: 83vw;
    }
}
</style>
