<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import PdCard from './PdCard.vue';
import Text from '@/pages/biz/components/Text.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');

const modules = [Pagination];

const pagination = {
    clickable: true
};

const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productFirstList || [];
    for (let i = 0; i < list.length; i += 3) {
        group.push(list.slice(i, i + 3));
    }
    return group;
});

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
    <div :class="$style.portfolio">
        <div :class="$style['portfolio-img']">
            <img src="/images/biz/B02250318/bg_02_top.svg">
        </div>
        <div v-if="productGroup?.length || curPageData.productSetting?.title || curPageData.productSetting?.titleEn || curPageData.productSetting?.foreword" :class="$style['portfolio-in']">
            <div v-if="curPageData.productSetting?.title || curPageData.productSetting?.titleEn" :class="$style.title">
                <span>{{ curPageData.productSetting?.title }}</span><span :class="$style['titile-en']">{{ curPageData.productSetting?.titleEn }}</span>
            </div>
            <Text
                v-if="curPageData.productSetting?.foreword"
                :class="$style['title-p']"
                :text="curPageData.productSetting?.foreword"
            />
            <div v-if="productGroup?.length" :class="$style.contain">
                <Swiper
                    :pagination="pagination"
                    :modules="modules"
                    :loop="true"
                    :class="$style.portfolioSwiper"
                >
                    <SwiperSlide
                        v-for="(groupBox, groupNum) in productGroup"
                        :key="groupNum"
                        :class="$style['portfolio-list']"
                    >
                        <div :class="$style.left">
                            <div
                                v-if="groupBox[0]"
                                :class="[$style['img-box'], { [$style.disable]: !groupBox[0]?.image?.length && !groupBox[0]?.foreword }]"
                                @click="openModal(groupBox[0])"
                            >
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[0]?.exhibitImage?.[0]"
                                        :class="$style['product-img']"
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[0].image?.[0]?.type === 'link'"
                                        :video-link="groupBox[0].image?.[0]?.value"
                                        :video-type="groupBox[0].image?.[0]?.community"
                                        video-width="232"
                                        video-height="315"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.image[0]?.value)"
                                        :class="$style['product-img']"
                                    />
                                </ClientOnly>
                            </div>
                        </div>
                        <div :class="$style.right">
                            <div
                                v-if="groupBox[1]"
                                :class="[$style['img-box'], { [$style.disable]: !groupBox[1]?.image?.length && !groupBox[1]?.foreword }]"
                                @click="openModal(groupBox[1])"
                            >
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[1]?.exhibitImage?.[0]"
                                        :class="$style['product-img']"
                                        :img-src="commonStore.getImg(webID, groupBox[1]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[1].image?.[0]?.type === 'link'"
                                        :video-link="groupBox[1].image?.[0]?.value"
                                        :video-type="groupBox[1].image?.[0]?.community"
                                        video-width="290"
                                        video-height="149"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(webID, groupBox[1]?.image[0]?.value)"
                                        :class="$style['product-img']"
                                    />
                                </ClientOnly>
                            </div>
                            <div
                                v-if="groupBox[2]"
                                :class="[$style['img-box'], { [$style.disable]: !groupBox[2]?.image?.length && !groupBox[2]?.foreword }]"
                                @click="openModal(groupBox[2])"
                            >
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[2]?.exhibitImage?.[0]"
                                        :class="$style['product-img']"
                                        :img-src="commonStore.getImg(webID, groupBox[2]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[2].image?.[0]?.type === 'link'"
                                        :video-link="groupBox[2].image?.[0]?.value"
                                        :video-type="groupBox[2].image?.[0]?.community"
                                        video-width="290"
                                        video-height="149"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(webID, groupBox[2]?.image[0]?.value)"
                                        :class="$style['product-img']"
                                    />
                                </ClientOnly>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <PdCard open="pdcard" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.portfolio {
    position: relative;
    background-color: #5B5B5B;
}

.portfolio-img {
    width: 100%;
    height: 34px;
    position: absolute;
    top: -33px;
    left: 0;
    width: -webkit-fill-available;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.portfolio-in {
    padding: 26px 35px;
    padding-bottom: 59px;
    overflow: hidden;
    background-color: #5B5B5B;
    opacity: 0;
    transform: translateY(50px);
    animation: fadeInSlideUp 2s ease-in-out forwards;
    animation-delay: 0.5s;
}

.title {
    color: #ffffff;
    &::before,
    &::after {
        background-color: #868686;
    }
}

.title-p {
    margin-bottom: 26px;
}

.contain {
    overflow: hidden;
}

.img-box {
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    img {
        width: 100%;
        height: 100%;
        transform:scale(1);
        transition: transform 0.3s ease-in-out;
        object-fit: cover;
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
    .product-img {
        width: 100%;
        img {
            background-color: transparent;
        }
    }
}

.portfolio-list {
    display: flex;
    flex-wrap: wrap;
}

.left {
    margin-right: 17px;
    margin-bottom: 9px;
    width: 43%;
    .img-box {
        height: auto;
        aspect-ratio: 232.19 / 315;
    }
}

.right {
    width: calc( 57% - 17px );
    .img-box {
        margin-bottom: 17px;
        height: auto;
        aspect-ratio: 290.79 / 148.99;
        &:last-child {
            margin-bottom: 0;
        }
    }
}

// 頁籤
.portfolioSwiper {
    padding-bottom: 42px;
    :global(.swiper-pagination-bullet) {
        width: 9px;
        height: 9px;
        background-color: #9b9b9b;
        opacity: 1;
        margin: 0 10.5px !important;
    }
    :global(.swiper-pagination-bullet-active) {
        background-color: #f2c812;
        cursor: initial;
    }
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

@media (min-width:640px) {
    .left {
        .img-box {
            height: 315px;
        }
    }

    .right {
        .img-box {
            height: 149px;
        }
    }
}

@media (min-width:475px) {
    .portfolio-in {
        padding: 21px 50px;
        padding-bottom: 56px;
    }
}
</style>
