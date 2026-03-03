<script setup>
import { computed, useCssModule } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import Pdcard from './Pdcard.vue';
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

const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productFirstList || [];
    for (let i = 0; i < list.length; i += 8) {
        group.push(list.slice(i, i + 8));
    }
    return group;
});

function imgClass(list, index) {
    return {
        [$style['img-wrap']]: true,
        [$style[`img-item-${index}`]]: true,
        [$style.disable]: !list[index]?.image?.length && !list[index]?.foreword
    };
}
// 彈跳視窗
function openModal(item) {
    const hasForeword = item.foreword && item.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    if (hasForeword || hasImage) {
        commonStore.actionSetPopupInfo({ type: 'pdcard', value: item });
    }
}
</script>

<template>
    <div :class="[$style.portfolio, {[$style.pb]: !curPageData.serve?.length || curPageData.serveSetting?.title || curPageData.serveContent?.content}]">
        <div v-if="curPageData.productSetting?.title" :class="$style.title">
            <span>
                {{ curPageData.productSetting?.title }}
            </span>
        </div>
        <div v-if="productGroup.length" :class="$style.contain">
            <Swiper
                :pagination="pagination"
                :modules="modules"
                :loop="true"
                :auto-height="true"
                :class="$style.portfolioSwiper"
            >
                <SwiperSlide
                    v-for="(groupBox, groupNum) in productGroup"
                    :key="groupNum"
                    :class="$style['portfolio-list']"
                >
                    <div :class="$style['top-wrap']">
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
                                    video-height="295"
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
                                        video-height="89"
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
                                        video-height="89"
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
                    </div>
                    <div :class="$style['bottom-wrap']">
                        <div v-if="groupBox[4]" :class="imgClass(groupBox, 4)" @click="openModal(groupBox[4])">
                            <ClientOnly>
                                <Image
                                    v-if="groupBox[4]?.exhibitImage?.[0]"
                                    :class="[$style['product-img'], $style['product-img-4']]"
                                    :img-src="commonStore.getImg(webID, groupBox[4]?.exhibitImage?.[0])"
                                />
                                <VideoLink
                                    v-else-if="groupBox[4]?.image[0]?.type === 'link'"
                                    :video-link="groupBox[4]?.image[0]?.value"
                                    :video-type="groupBox[4]?.image[0]?.community"
                                    video-width="91"
                                    video-height="63"
                                    :class="[$style['iframe-wrap'], $style['product-img-4']]"
                                />
                                <Image
                                    v-else
                                    :class="[$style['product-img'], $style['product-img-4']]"
                                    :img-src="commonStore.getImg(webID, groupBox[4]?.image[0]?.value)"
                                />
                            </ClientOnly>
                        </div>
                        <div v-if="groupBox[5]" :class="imgClass(groupBox, 5)" @click="openModal(groupBox[5])">
                            <ClientOnly>
                                <Image
                                    v-if="groupBox[5]?.exhibitImage?.[0]"
                                    :class="[$style['product-img'], $style['product-img-5']]"
                                    :img-src="commonStore.getImg(webID, groupBox[5]?.exhibitImage?.[0])"
                                />
                                <VideoLink
                                    v-else-if="groupBox[5]?.image[0]?.type === 'link'"
                                    :video-link="groupBox[5]?.image[0]?.value"
                                    :video-type="groupBox[5]?.image[0]?.community"
                                    video-width="91"
                                    video-height="63"
                                    :class="[$style['iframe-wrap'], $style['product-img-5']]"
                                />
                                <Image
                                    v-else
                                    :class="[$style['product-img'], $style['product-img-5']]"
                                    :img-src="commonStore.getImg(webID, groupBox[5]?.image[0]?.value)"
                                />
                            </ClientOnly>
                        </div>
                        <div v-if="groupBox[6]" :class="imgClass(groupBox, 6)" @click="openModal(groupBox[6])">
                            <ClientOnly>
                                <Image
                                    v-if="groupBox[6]?.exhibitImage?.[0]"
                                    :class="[$style['product-img'], $style['product-img-6']]"
                                    :img-src="commonStore.getImg(webID, groupBox[6]?.exhibitImage?.[0])"
                                />
                                <VideoLink
                                    v-else-if="groupBox[6]?.image[0]?.type === 'link'"
                                    :video-link="groupBox[6]?.image[0]?.value"
                                    :video-type="groupBox[6]?.image[0]?.community"
                                    video-width="91"
                                    video-height="63"
                                    :class="[$style['iframe-wrap'], $style['product-img-6']]"
                                />
                                <Image
                                    v-else
                                    :class="[$style['product-img'], $style['product-img-6']]"
                                    :img-src="commonStore.getImg(webID, groupBox[6]?.image[0]?.value)"
                                />
                            </ClientOnly>
                        </div>
                        <div v-if="groupBox[7]" :class="imgClass(groupBox, 7)" @click="openModal(groupBox[7])">
                            <ClientOnly>
                                <Image
                                    v-if="groupBox[7]?.exhibitImage?.[0]"
                                    :class="[$style['product-img'], $style['product-img-7']]"
                                    :img-src="commonStore.getImg(webID, groupBox[7]?.exhibitImage?.[0])"
                                />
                                <VideoLink
                                    v-else-if="groupBox[7]?.image[0]?.type === 'link'"
                                    :video-link="groupBox[7]?.image[0]?.value"
                                    :video-type="groupBox[7]?.image[0]?.community"
                                    video-width="91"
                                    video-height="63"
                                    :class="[$style['iframe-wrap'], $style['product-img-7']]"
                                />
                                <Image
                                    v-else
                                    :class="[$style['product-img'], $style['product-img-7']]"
                                    :img-src="commonStore.getImg(webID, groupBox[7]?.image[0]?.value)"
                                />
                            </ClientOnly>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <Pdcard open="pdcard" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.portfolio {
    background-image: url('/images/biz/B02250313/bg_02.jpg');
    background-size: cover;
    background-position: top;
    padding: 22px 35px;
    position: relative;
    &::before {
        content: "";
        display: block;
        width: 100%;
        height: 22px;
        position: absolute;
        background-image: url('/images/biz/B02250313/bg_02_top.jpg');
        background-size: cover;
        background-position: top;
        top: -21px;
        left: 0;
    }
    &.pb {
        padding-bottom: 40px;
    }
}

.title {
    color: #ffffff;
    margin-left: 9px;
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 1.2s;
    font-size: 20px;
    margin-bottom: 20px;
    line-height: 22.75px;

    span {
        font-family: "Iansui", sans-serif;
    }
}

.contain {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 1.2s;
    overflow: hidden;
}

.portfolio-list {
    display: flex;
    flex-wrap: wrap;
}

.top-wrap {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 11px;
}

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

.img-item-4,
.img-item-5,
.img-item-6,
.img-item-7 {
    width: calc((100% - 33px) / 4);
    max-width: 134px;
    max-height: 95px;
}

.product-img {
    display: block;
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 0.3s ease-in-out;
    img {
        object-fit: cover;
        height: 100%;
    }
}

.product-img-0 {
    max-width: 353px;
    max-height: 381px;
    aspect-ratio: 353 / 381;
}

.product-img-1 {
    max-width: 353px;
    max-height: 244px;
    aspect-ratio: 353 / 244;
}

.product-img-2,
.product-img-3 {
    max-width: 168px;
    max-height: 117px;
    aspect-ratio: 168 / 117;
}

.product-img-4,
.product-img-5,
.product-img-6,
.product-img-7 {
    max-width: 128px;
    max-height: 89px;
    aspect-ratio: 128 / 89;
}

.bottom-wrap {
    display: flex;
    gap: 11px;
    margin-top: 16px;
    width: 100%;
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

// 頁籤
.portfolioSwiper {
    padding-bottom: 42px;
    :global(.swiper-pagination) {
        bottom: -5px;
    }
    :global(.swiper-pagination-bullet) {
        width: 11px;
        height: 11px;
        background-color: #bbbbbb;
        opacity: 1;
        margin: 0 13px !important;
    }
    :global(.swiper-pagination-bullet-active) {
        background-color: #28566a;
    }
}

@media (min-width: 430px) {
    .right-wrap {
        width: calc((100% - 11px) / 2);
    }

    .img-item-0 {
        width: calc((100% - 11px) / 2);
        max-width: 280px;
        max-height: 302px;
    }

    .img-item-1 {
        max-width: 280px;
        max-height: 196px;
    }

    .img-item-2,
    .img-item-3,
    .img-item-4,
    .img-item-5,
    .img-item-6,
    .img-item-7 {
        max-width: 134px;
        max-height: 95px;
    }

    .product-img-0 {
        max-width: 274px;
        max-height: 296px;
    }

    .product-img-1 {
        max-width: 274px;
        max-height: 190px;
    }

    .product-img-2,
    .product-img-3 {
        max-width: 128px;
        max-height: 89px;
    }
}
</style>
