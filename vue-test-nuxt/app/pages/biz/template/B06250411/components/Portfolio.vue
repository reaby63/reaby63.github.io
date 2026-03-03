<script setup>
import { ref, computed, onMounted } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Pdcard from './PdCard.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const productGroup = computed(() => curPageData.value.productFirstList || []);

// 輪播按鈕
const prevBtnRef = ref(null);
const nextBtnRef = ref(null);

const navigation = {
    prevEl: null,
    nextEl: null
};

onMounted(() => {
    navigation.prevEl = prevBtnRef.value;
    navigation.nextEl = nextBtnRef.value;
});

// 彈跳視窗
function hasContent(item) {
    const hasForeword = item.foreword && item.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    return hasForeword || hasImage;
}

function openModal(item) {
    if (hasContent(item)) {
        commonStore.actionSetPopupInfo({ type: 'portfolio', value: item });
    }
}
</script>

<template>
    <div v-if="curPageData.productSetting?.titleEn || curPageData.productSetting?.title || productGroup?.length" :class="$style.portfolio">
        <div v-if="curPageData.productSetting?.titleEn || curPageData.productSetting?.title" :class="$style['portfolio-book']">
            <img src="/images/biz/B06250411/profolio_book.png">
        </div>
        <div v-if="curPageData.productSetting?.titleEn || curPageData.productSetting?.title" :class="$style['title-box']">
            <div :class="$style.title">
                <div :class="$style['title-left']">
                    <span>
                        {{ curPageData.productSetting?.titleEn }}
                    </span>
                    <span :class="$style['title-left-line']" />
                </div>
                <div :class="$style['title-right']">
                    <span :class="$style['title-right-line']" />
                    <span>
                        {{ curPageData.productSetting?.title }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="productGroup?.length" :class="$style['scroll-container']">
            <button ref="prevBtnRef" :class="[$style['arrow-btn'],$style['arrow-left']]">
                <img src="/images/biz/B06250411/btn_portfolio_page2.svg">
            </button>
            <Swiper
                :modules="[Navigation]"
                :navigation="navigation"
                :slides-per-view="'auto'"
                :space-between="0"
                :slides-per-group="1"
            >
                <SwiperSlide
                    v-for="(item, index) in productGroup"
                    :key="item.image?.[0]?.value || index"
                    :class="[
                        $style.item,
                        { [$style['disabled']]: !hasContent(item) }
                    ]"
                >
                    <div @click="openModal(item)">
                        <ClientOnly>
                            <Image
                                v-if="item.exhibitImage?.[0]"
                                :img-src="commonStore.getImg(webID, item.exhibitImage?.[0])"
                            />
                            <VideoLink
                                v-else-if="item.image?.[0]?.type === 'link'"
                                :video-link="item.image?.[0]?.value"
                                :video-type="item.image?.[0]?.community"
                                video-width="229"
                                video-height="296"
                                :class="$style['iframe-wrap']"
                            />
                            <Image v-else :img-src="commonStore.getImg(webID, item.image?.[0]?.value)"/>
                        </ClientOnly>
                    </div>
                </SwiperSlide>
            </Swiper>
            <button ref="nextBtnRef" :class="[$style['arrow-btn'],$style['arrow-right']]">
                <img src="/images/biz/B06250411/btn_portfolio_page2.svg">
            </button>
        </div>
        <Pdcard open="portfolio" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.portfolio {
    position: relative;
    z-index: 2;
    padding-top: 35px;
    margin-bottom: 95px;

    &::before {
        content: "";
        display: block;
        background-color: #FFD600;
        border-radius: 20px;
        width: 401px;
        height: 482px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }
}

.portfolio-book {
    position: absolute;
    top: -42px;
    left: 23px;
    img {
        width: 105px;
    }
}

.title-box {
    padding: 0 75px;
}

.title {
    position: relative;
    z-index: 1;
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 35px;
}

.title-left,
.title-right {
    align-items: center;
    display: inline-flex;
    span {
        display: inline-flex;
        font-size: 20px;
        line-height: 1.6;
    }
}

.title-left {
    flex: 1;
    span {
        letter-spacing: 3px;
        font-family: "Freeman", sans-serif;
    }
}

.title-left-line {
    flex: 1;
    height: 1px;
    background-color: #000000;
    margin-left: 30px;
}

.title-right {
    width: calc(100% - 401px + 75px);
    color: #ffffff;
    span {
        letter-spacing: 2px;
    }
}

.title-right-line {
    flex: 1;
    height: 1px;
    background-color: #ffffff;
    margin-right: 30px;
}

.scroll-container {
    position: relative;
    width: 100%;
    height: 365px;
    user-select: none;
    overflow: hidden;

    :global(.swiper-button-disabled) {
        cursor: default;
        pointer-events: none;
        background-color: transparent;
        img {
            border-right: 2px solid #ffffff;
            padding-right: 2px;
        }
        &:hover {
            animation: none;
        }
    }
}

.item {
    display: inline-block;
    width: 233px;
    vertical-align: top;
    margin-left: 27px;

    &:first-child {
        margin-left: 75px;
    }

    &:last-child {
        margin-right: 23px;
    }

    >div {
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
        height: 300px;
        border-radius: 0 20px 0 20px;
        border: 2px solid #000;
        transition: all 0.2s;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            max-width: 229px;
            max-height: 296px;
            aspect-ratio: 229 / 296;
            transition: all 0.2s;
            object-fit: cover;
        }

        &:hover {
            border: 4px solid #000;

            img {
                transform: scale(1.05);
            }
        }
    }

    &.disabled {
        >div {
            cursor: initial;
            &:hover {
                border: 2px solid #000;

                img {
                    transform: scale(1);
                }
            }
        }
    }
}

.arrow-btn {
    position: absolute;
    bottom: 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 10;
    user-select: none;
    background-color: transparent;
    border: 0;

    img {
        width: 19px;
        height: 13px;
    }
}

.arrow-left {
    right: 135px;
    transform: scaleX(-1);
    &:hover {
        animation: wiggle_left_right 1.5s ease-in-out infinite;
    }
}

.arrow-right {
    right: 62px;
    &:hover {
        animation: wiggle_right_left 1.5s ease-in-out infinite;
    }
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

@media (max-width:600px) {
    .portfolio {
        &::before {
            width: 345px;
        }
    }
    .title-right {
        width: calc(100% - 345px + 75px);
    }
}

@media (max-width:553px) {
    .portfolio {
        &::before {
            width: 316px;
        }
    }
    .title-right {
        width: calc(100% - 316px + 75px);
    }
}

@media (max-width:520px) {
  .portfolio {
        &::before {
        width: 303px;
        }
  }
  .title-right {
        width: calc(100% - 303px + 75px);
  }
}

@media (max-width:501px) {
    .portfolio {
        &::before {
            width: 270px;
            height: 471px;
        }
    }
    .title-right {
        width: calc(100% - 270px + 56px);
    }
    .title-left,
    .title-right {
        span {
            font-size: 16px;
        }
    }
    .portfolio {
        margin-bottom: 66px;
    }
    .title {
        margin-bottom: 30px;
    }
    .title-left span {
        &:last-child {
            margin-left: 5px;
        }
    }
    .title-right span {
        &:first-child {
            margin-right: 5px;
        }
    }
    .title-box {
        padding: 0 56px;
    }
    .item {
        &:first-child {
            margin-left: 56px;
        }
    }
    .arrow-right {
        right: 56px;
    }
    .arrow-left {
        right: 114px;
    }
    .portfolio-book {
        top: -53px;
        left: 13px;
    }
}

@media (max-width:430px) {
    .portfolio {
        &:before {
            width: 225px;
        }
    }
    .title-right {
        width: calc(100% - 225px + 56px);
    }
}

@media (max-width:364px) {
    .portfolio {
        &::before {
            width: 201px;
        }
    }
    .title-right {
        width: calc(100% - 201px + 56px);
    }
}

@media (max-width:356px) {
    .arrow-left {
        right: 102px;
    }
}

@media (max-width:338px) {
    .portfolio {
        &:before {
            width: 189px;
        }
    }
    .title-right {
        width: calc(100% - 189px + 56px);
    }
}

@media (max-width:330px) {
    .portfolio {
        &::before {
            width: 208px;
        }
    }
    .title-box {
        padding: 0 25px;
    }
    .title-right {
        width: calc(100% - 208px + 25px);
    }
    .item {
        &:first-child{
            margin-left: 25px;
        }
    }
    .arrow-right {
        right: 25px;
    }
    .arrow-left {
        right: 72px;
    }
}
</style>
