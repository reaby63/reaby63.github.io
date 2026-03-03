<script setup>
import { ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Pdcard from './PdCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore?.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');

// 輪播套件
function renderBullet(index, className) {
    return `<span class="${className}">${index + 1}</span>`;
}

const pagination = {
    clickable: true,
    renderBullet
};

const modules = [Pagination];

// 彈跳視窗
const showModal = ref(false);
const selectedItem = ref({});

function openModal(item) {
    const hasForeword = item?.foreword && item?.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    if (hasForeword || hasImage) {
        selectedItem.value = item;
        showModal.value = true;
    }
}

// 作品列表分組---
const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productFirstList || []; //作品資料放這 在這邊取要+.value
    for (let i = 0; i < list.length; i += 6) {
        group.push(list.slice(i, i + 6));
    }
    return group;
});

</script>

<template>
    <div
        v-if="curPageData.productFirstList?.length"
        :class="[$style.portfolio, { [$style['one-line']]: curPageData.productFirstList?.length < 3 }]"
    >
        <div :class="$style.title">
            <div :class="$style['info-title']">
                作品展示<span :class="$style['title-en']">Portfolio</span>
            </div>
        </div>
        <div :class="$style.contain">
            <Swiper
                :pagination="pagination"
                :modules="modules"
                :auto-height="true"
                :class="[$style.portfolioSwiper, 'swiperFor_b06250401']"
            >
                <SwiperSlide
                    v-for="(groupBox, groupNum) in productGroup"
                    :key="groupNum"
                    :class="$style.list"
                >
                    <div
                        v-for="(item, index) in groupBox"
                        :key="item.image?.[0].value || index"
                        :class="[$style['list-a'], { [$style.hasHover]: item.image?.length > 0 || item.foreword }]"
                        @click="openModal(item)"
                    >
                        <div :class="$style['list-span']">
                            <ClientOnly>
                                <Image
                                    v-if="item.exhibitImage?.[0]"
                                    :img-src="commonStore.getImg(webID, item.exhibitImage?.[0])"
                                    :class="$style['list-img']"
                                />
                                <VideoLink
                                    v-else-if="item.image?.[0]?.type === 'link'"
                                    :video-link="item.image?.[0]?.value"
                                    :video-type="item.image?.[0]?.community"
                                    video-width="186"
                                    video-height="253"
                                    :class="[$style['iframe-wrap'], $style['list-img']]"
                                />
                                <Image v-else :img-src="commonStore.getImg(webID, item.image?.[0]?.value)" :class="$style['list-img']"/>
                            </ClientOnly>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
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

button {
    cursor: pointer;
    background-color: transparent;
    border: 0px;
}
.portfolio {
    position: relative;
    z-index: 2;
    padding-bottom: 1.5px;
    &::before {
        content: "";
        display: block;
        width: 299px;
        height: 669px;
        background-image: url(/images/biz/B06250401/porfolio_bg.png);
        background-size: 100% 100%;
        background-position: top;
        position: absolute;
        left: -2px;
        bottom: 5px;
    }

    &.one-line {
        &::before {
            bottom: -190px;
        }
    }
}

.title {
    text-align: right;
    margin-right: 76px;
    margin-bottom: 39px;
}

.info-title {
    color: #464646;
    border-color: #333333;
    text-shadow:
    -1px -1px 0 #ffffff,
    1px -1px 0 #ffffff,
    -1px  1px 0 #ffffff,
    1px  1px 0 #ffffff;
}
.info-en {
    color: #333333;
}

.contain {
    overflow: hidden;
    margin: 0 105px;
    margin-right: 91px;
    z-index: 2;
    position: relative;
}

.list {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex: 0 0 100%; // 讓每頁剛好佔滿容器
    flex-wrap: wrap;
}
.list-a {
    box-sizing: border-box;
    position: relative;
    width: calc( (100% - 50px) / 2 );
    margin-right: 34px;
    margin-bottom: 13px;

    &:after {
        content: "";
        display: none;
        width: 69px;
        height: 66px;
        background-image: url(/images/biz/B06250401/hover_portfolio_phone.png);
        background-size: cover;
        background-position: top;
        position: absolute;
        right: -15px;
        bottom: -14px;
        opacity: 0;
        transform: scale(0.5) translateY(100px);
    }
    &:nth-child(2n) {
        margin-right: 0;
    }
    &:nth-child(6n),
    &:nth-child(6n+5) {
        margin-bottom: 0;
    }
    &.hasHover {
        cursor: pointer;
        &:hover {
            &::after {
                display: block;
                opacity: 1;
                transform: scale(0) translateY(100px);
                animation: jumpIn 0.6s ease-out forwards;
            }
            span {
                overflow: hidden;
                img {
                    transform:scale(1.1);
                }
            }
        }
    }
}
.list-span {
    width: 100%;
    height: 100%;
    max-width: 192px;
    max-height: 259px;
    aspect-ratio: 192 / 259;
    overflow: hidden;
    border-radius: 20px;
    border: solid 3px #333;
    box-sizing: border-box;
    background-color: #fff;
}
.list-img {
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    img {
        object-fit: cover;
        height: 100%;
        width: 100%;
    }
}

.listmark {
    text-align: center;
    margin-top: 30px;
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

@media (max-width:570px) {
    .contain {
        margin: 0 65px;
        margin-right: 51px;
    }
}

@media (max-width:500px) {
    .portfolio {
        &:before {
            width: 232px;
            height: 524px;
            left: -12px;
            bottom: 64px;
        }
    }
    .title {
        margin-right: 29px;
        margin-bottom: 30px;
    }
    .contain {
        margin: 0 34px;
        margin-right: 20px;
    }
    .list-a {
        &::after {
            width: 56px;
            height: 54px;
            background-image: url('/images/biz/B06250401/hover_portfolio_phone.png');
        }
    }
    .list-span {
        height: 230px;
    }
    .listmark {
        margin-right: 14px;
        margin-top: 20px;
    }
}

@media (max-width:430px) {
    .list-span {
        height: 200px;
    }
}

@media (max-width:375px) {
    .list-span {
        height: 186px;
    }
}

@media (max-width:345px) {
    .list-span {
        height: 160px;
    }
    .portfolio:before {
        bottom: 30px;
    }
}

// 輪播套件
.portfolioSwiper {
    width: 100%;
    height: auto;
    :global(.swiper-wrapper) {
        min-height: 372px;
    }
}

:global(.swiperFor_b06250401 .swiper-pagination) {
    position: initial;
    margin-top: 13px;
    width: calc(100% - 14px);
}

:global(.swiperFor_b06250401 .swiper-pagination-bullet) {
    transition: all .3s;
    color: #ffffff;
    width: 32px;
    height: 33px;
    background-image: url(/images/biz/B06250401/button_off.svg);
    background-size: cover;
    background-position: top;
    background-color: transparent;
    margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 15px) !important;
    border-radius: var(--swiper-pagination-bullet-border-radius, initial);
    opacity: var(--swiper-pagination-bullet-inactive-opacity, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.8;
    }
}

:global(.swiperFor_b06250401 .swiper-pagination-bullet.swiper-pagination-bullet-active) {
    cursor: initial;
    color: #333333;
    background-image: url(/images/biz/B06250401/button_on.svg);
    &:hover {
        opacity: 1;
    }
}

</style>
