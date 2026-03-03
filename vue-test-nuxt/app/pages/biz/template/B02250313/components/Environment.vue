<script setup>
import { computed, useCssModule } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import Encard from './Encard.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const $style = useCssModule();

const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');

const modules = [Pagination];

const pagination = {
    clickable: true
};

// 作品列表分組---
const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productSecondList || [];
    for (let i = 0; i < list.length; i += 4) {
        group.push(list.slice(i, i + 4));
    }
    return group;
});

// 彈跳視窗
function openModal(item) {
    const hasForeword = item.foreword && item.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    if (hasForeword || hasImage) {
        commonStore.actionSetPopupInfo({ type: 'encard', value: item });
    }
}

function imgClass(list, index) {
    return {
        [$style['img-wrap']]: true,
        [$style[`img-item-${index}`]]: true,
        [$style.disable]: !list[index]?.image?.length && !list[index]?.foreword
    };
}
</script>

<template>
    <div :class="$style.environment">
        <div v-if="curPageData.productSetting.secondTitle" :class="$style.title">
            <span>{{ curPageData.productSetting.secondTitle }}</span>
        </div>
        <div v-if="productGroup.length" :class="$style.contain">
            <Swiper
                :pagination="pagination"
                :modules="modules"
                :loop="true"
                :class="$style.portfolioSwiper"
            >
                <SwiperSlide
                    v-for="(groupBox, groupNum) in productGroup"
                    :key="groupNum"
                    :class="$style['en-list']"
                >
                    <div v-if="groupBox[0]" :class="imgClass(groupBox, 0)" @click="openModal(groupBox[0])">
                        <ClientOnly>
                            <Image
                                v-if="groupBox[0]?.exhibitImage?.[0]"
                                :class="[$style['product-img'], $style['product-img-0']]"
                                :img-src="commonStore.getImg(webID, groupBox[0]?.exhibitImage?.[0])"
                            />
                            <VideoLink
                                v-else-if="groupBox[0]?.image[0]?.type === 'link'"
                                :video-link="groupBox[0]?.image[0]?.value"
                                :video-type="groupBox[0]?.image[0]?.community"
                                video-width="273"
                                video-height="299"
                                :class="[$style['iframe-wrap'], $style['product-img-0']]"
                            />
                            <Image
                                v-else
                                :class="[$style['product-img'], $style['product-img-0']]"
                                :img-src="commonStore.getImg(webID, groupBox[0]?.image[0]?.value)"
                            />
                        </ClientOnly>
                    </div>
                    <div :class="$style['right-wrap']">
                        <div v-if="groupBox[1]" :class="imgClass(groupBox, 1)" @click="openModal(groupBox[1])">
                            <ClientOnly>
                                <Image
                                    v-if="groupBox[1]?.exhibitImage?.[0]"
                                    :class="[$style['product-img'], $style['product-img-1']]"
                                    :img-src="commonStore.getImg(webID, groupBox[1]?.exhibitImage?.[0])"
                                />
                                <VideoLink
                                    v-else-if="groupBox[1]?.image[0]?.type === 'link'"
                                    :video-link="groupBox[1]?.image[0]?.value"
                                    :video-type="groupBox[1]?.image[0]?.community"
                                    video-width="273"
                                    video-height="189"
                                    :class="[$style['iframe-wrap'], $style['product-img-1']]"
                                />
                                <Image
                                    v-else
                                    :class="[$style['product-img'], $style['product-img-1']]"
                                    :img-src="commonStore.getImg(webID, groupBox[1]?.image[0]?.value)"
                                />
                            </ClientOnly>
                        </div>
                        <div v-if="groupBox[2]" :class="imgClass(groupBox, 2)" @click="openModal(groupBox[2])">
                            <ClientOnly>
                                <Image
                                    v-if="groupBox[2]?.exhibitImage?.[0]"
                                    :class="[$style['product-img'], $style['product-img-2']]"
                                    :img-src="commonStore.getImg(webID, groupBox[2]?.exhibitImage?.[0])"
                                />
                                <VideoLink
                                    v-else-if="groupBox[2]?.image[0]?.type === 'link'"
                                    :video-link="groupBox[2]?.image[0]?.value"
                                    :video-type="groupBox[2]?.image[0]?.community"
                                    video-width="128"
                                    video-height="92"
                                    :class="[$style['iframe-wrap'], $style['product-img-2']]"
                                />
                                <Image
                                    v-else
                                    :class="[$style['product-img'], $style['product-img-2']]"
                                    :img-src="commonStore.getImg(webID, groupBox[2]?.image[0]?.value)"
                                />
                            </ClientOnly>
                        </div>
                        <div v-if="groupBox[3]" :class="imgClass(groupBox, 3)" @click="openModal(groupBox[3])">
                            <ClientOnly>
                                <Image
                                    v-if="groupBox[3]?.exhibitImage?.[0]"
                                    :class="[$style['product-img'], $style['product-img-3']]"
                                    :img-src="commonStore.getImg(webID, groupBox[3]?.exhibitImage?.[0])"
                                />
                                <VideoLink
                                    v-else-if="groupBox[3]?.image[0]?.type === 'link'"
                                    :video-link="groupBox[3]?.image[0]?.value"
                                    :video-type="groupBox[3]?.image[0]?.community"
                                    video-width="128"
                                    video-height="92"
                                    :class="[$style['iframe-wrap'], $style['product-img-3']]"
                                />
                                <Image
                                    v-else
                                    :class="[$style['product-img'], $style['product-img-3']]"
                                    :img-src="commonStore.getImg(webID, groupBox[3]?.image[0]?.value)"
                                />
                            </ClientOnly>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <Encard open="encard" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.environment {
    background-image: url('/images/biz/B02250313/bg_03.jpg');
    background-size: cover; /* 寬度100%，高度50% */
    background-position: top; /* 讓背景對齊上方 */
    padding: 20px 35px;
    padding-bottom: 41px;
    position: relative;
    &::before {
        content: "";
        display: block;
        width: 100%;
        height: 20px;
        position: absolute;
        background-image: url('/images/biz/B02250313/bg_03_top.jpg');
        background-position: top;
        top: -20px;
        left: 0;
    }
}

.title {
    margin-left: 9px;
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 1.2s;
    font-size: 20px;
    margin-bottom: 20px;
    line-height: 22.75px;
    color: #434343;
    span {
        font-family: "Iansui", sans-serif;
    }
}

.contain {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 2.8s;
    overflow: hidden;
}

.img-box {
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: solid 3px #ffffff;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: #ffffff;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
        transform: scale(1);
        transition: transform 0.3s ease-in-out;
    }

    &:hover {
        overflow: hidden;

        img {
            transform:scale(1.1);
        }

    }

    &.disable {
        cursor: initial;
    }
}

.en-list {
    display: flex;
    flex-wrap: wrap;
    gap: 11px;
}

.iframe-wrap {
    pointer-events: none;
}

// 修改
.img-wrap {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    border: 3px solid #fff;
    border-radius: 15px;
    cursor: pointer;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        .product-img {
            transform: scale(1.1);
        }
    }

    &.disable {
        cursor: initial;
    }
}

.right-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 11px;
}

.img-item-0 {
    max-width: 359px;
    max-height: 387px;
}

.img-item-1 {
    max-width: 359px;
    max-height: 250px;
}

.img-item-2,
.img-item-3 {
    width: calc((100% - 11px) / 2);
    max-width: 174px;
    max-height: 124px;
}

.product-img {
    display: block;
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    object-fit: cover;
    img {
        object-fit: cover;
        height: 100%;
    }
}

.product-img-0 {
    max-width: 353px;
    max-height: 386px;
    aspect-ratio: 353 / 386;
}

.product-img-1 {
    max-width: 353px;
    max-height: 244px;
    aspect-ratio: 353 / 244;
}

.product-img-2,
.product-img-3 {
    max-width: 168px;
    max-height: 122px;
    aspect-ratio: 168 / 122;
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
}

// 頁籤
.portfolioSwiper {
    padding-bottom: 28px;
    :global(.swiper-pagination) {
        bottom: -1px;
    }
    :global(.swiper-pagination-bullet) {
        width: 11px;
        height: 11px;
        background-color: #bbbbbb;
        opacity: 1;
        margin: 0 13px !important;
    }
    :global(.swiper-pagination-bullet-active) {
        background-color: #607d93;
    }
}

@media (min-width:530px){
    .right-wrap {
        width: calc((100% - 11px) / 2);
    }

    .img-item-0 {
        width: calc((100% - 11px) / 2);
        max-width: 280px;
    }

    .img-item-1 {
        max-width: 280px;
    }

    .img-item-2,
    .img-item-3 {
        max-width: 134px;
    }

    .product-img-0 {
        max-width: 274px;
    }

    .product-img-1 {
        max-width: 274px;
    }

    .product-img-2,
    .product-img-3 {
        max-width: 128px;
    }
}
</style>
