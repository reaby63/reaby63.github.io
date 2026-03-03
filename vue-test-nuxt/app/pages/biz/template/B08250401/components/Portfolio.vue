<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, FreeMode } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Pdcard from './Pdcard.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productFirstList || [];
    for (let i = 0; i < list.length; i += 2) {
        group.push(list.slice(i, i + 2));
    }
    return group;
});

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

const dragSize = computed(() => {
    if (windowWidth.value < 400) {
        return 80;
    }
    return 110;
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
    <div v-if="productGroup?.length" :class="$style['scroll-container']">
        <div :class="$style.top">
            <div :class="$style['portfolio-title']">
                <div :class="$style.h6">
                    {{ curPageData.productSetting?.titleEn || 'Portfolio' }}
                </div>
                <div :class="$style.h5">
                    {{ curPageData.productSetting?.title || '我的作品' }}
                </div>
            </div>
            <div :class="$style['portfolio-scroll']">
                <div :class="$style['custom-swiper-scrollbar']" />
            </div>
        </div>
        <Swiper
            :modules="[Scrollbar, FreeMode]"
            :slides-per-view="'auto'"
            :space-between="0"
            :free-mode="true"
            :scrollbar="{
                el: `.${$style['custom-swiper-scrollbar']}`,
                draggable: true,
                dragSize: dragSize
            }"
            :direction="'horizontal'"
            :class="$style['portfolio-swiper']"
        >
            <SwiperSlide
                v-for="(groupBox, groupNum) in productGroup"
                :key="groupNum"
                :class="$style['portfolio-list']"
            >
                <div :class="$style['product-self']">
                    <template v-if="groupNum % 2 === 0">
                        <div
                            v-if="groupBox[0]"
                            :class="[$style['img-box-bg'], { [$style.disable]: !groupBox[0]?.image?.length }]"
                            @click="openModal(groupBox[0])"
                        >
                            <span :class="$style['hover-top']" />
                            <span :class="$style['img-box']">
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[0]?.exhibitImage?.[0]"
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[0]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[0]?.image[0]?.value"
                                        :video-type="groupBox[0]?.image[0]?.community"
                                        video-width="193"
                                        video-height="238"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.image[0]?.value)"
                                    />
                                </ClientOnly>
                            </span>
                            <span :class="$style['hover-bottom']" />
                        </div>
                        <div
                            v-if="groupBox[1]"
                            :class="[$style['img-box-sm'], { [$style.disable]: !groupBox[1]?.image?.length }]"
                            @click="openModal(groupBox[1])"
                        >
                            <span :class="$style['hover-top']" />
                            <span :class="$style['img-box']">
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[1]?.exhibitImage?.[0]"
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[1]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[1]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[1]?.image[0]?.value"
                                        :video-type="groupBox[1]?.image[0]?.community"
                                        video-width="193"
                                        video-height="178"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[1]?.image[0]?.value)"
                                    />
                                </ClientOnly>
                            </span>
                            <span :class="$style['hover-bottom']" />
                        </div>
                    </template>
                    <template v-else>
                        <div
                            v-if="groupBox[0]"
                            :class="[$style['img-box-sm'], { [$style.disable]: !groupBox[0]?.image?.length }]"
                            @click="openModal(groupBox[0])"
                        >
                            <span :class="$style['hover-top']" />
                            <span :class="$style['img-box']">
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[0]?.exhibitImage?.[0]"
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[0]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[0]?.image[0]?.value"
                                        :video-type="groupBox[0]?.image[0]?.community"
                                        video-width="193"
                                        video-height="178"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.image[0]?.value)"
                                    />
                                </ClientOnly>
                            </span>
                            <span :class="$style['hover-bottom']" />
                        </div>
                        <div
                            v-if="groupBox[1]"
                            :class="[$style['img-box-bg'], { [$style.disable]: !groupBox[1]?.image?.length }]"
                            @click="openModal(groupBox[1])"
                        >
                            <span :class="$style['hover-top']" />
                            <span :class="$style['img-box']">
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[1]?.exhibitImage?.[0]"
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[1]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[1]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[1]?.image[0]?.value"
                                        :video-type="groupBox[1]?.image[0]?.community"
                                        video-width="193"
                                        video-height="238"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[1]?.image[0]?.value)"
                                    />
                                </ClientOnly>
                            </span>
                            <span :class="$style['hover-bottom']" />
                        </div>
                    </template>
                </div>
            </SwiperSlide>
        </Swiper>
        <Pdcard open="portfolio" />
    </div>
</template>

<style lang="scss" module>

.top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 12px 30px 19px 42px;
    .portfolio-title {
        position: relative;
        padding: 12px 18px;
        padding-right: 30px;
        border-radius: 3px 148px 148px 90px;
        border: 3px solid #FAB815;
        background: #FFC21A;
        margin-right: 25px;
        box-shadow: 0px 15px 36px 0px rgba(0, 0, 0, 0.45),
                    0px 4.5px 7.5px 0px rgba(0, 0, 0, 0.35);
        .h6,
        .h5 {
            color: #000000;
        }
        .h6 {
            font-size: 16.5px;
            line-height: 18px;
        }
        .h5 {
            font-size: 21px;
            line-height: 27px;
            font-weight: 900;
            letter-spacing: 0.05em;
        }
        &::before {
            content: "";
            display: block;
            position: absolute;
            top: -28.5px;
            left: -28.5px;
            width: 36px;
            height: 36px;
            background-image: url(/images/biz/B08250401/cursor-black.svg);
            background-size: cover;
            background-position: top;
        }
    }
    .portfolio-scroll {
        flex: 1;
    }
}

.product-self {
    display: inline-flex;
    width: 195px;
    height: auto;
    margin-right: 30px;
    border-radius: 10px;
    flex-wrap: wrap;
    vertical-align: top;
}

.img-box-sm,
.img-box-bg {
    display: block;
    width: 100%;
    cursor: pointer;
    &.disable {
        cursor: initial;
    }
    &:first-child {
        margin-bottom: 30px;
    }
    .img-box {
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: solid 1.5px #555555;
        display: block;
        box-sizing: border-box;
        img {
            height: 100%;
            width: 100%;
        }
    }
    &:hover {
        position: relative;
        .img-box {
            border-color: #0D99FF;
            border-radius: 0;
        }
        .hover-top,
        .hover-bottom {
            &::before,
            &::after {
                content: "";
                display: block;
                border: solid 1.5px #0D99FF;
                background-color: #ffffff;
                width: 5px;
                height: 5px;
                position: absolute;
            }
            &::before {
                left: -2.5px;
            }
            &::after {
                right: -2.5px;
            }
        }
        .hover-top {
            &::before,
            &::after {
                top:-3px;
            }
        }
        .hover-bottom {
            &::before,
            &::after {
                bottom: -2.5px;
            }
        }
    }
}
.img-box-sm {
    .img-box {
        height: 180px;
        aspect-ratio: 195 / 180;
    }
}
.img-box-bg {
    .img-box {
        height: 240px;
        aspect-ratio: 195 / 240;
    }
}

.img-wrap {
    img {
        object-fit: cover;
        background-color: transparent !important;
    }
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

.scroll-container {
    position: relative;
    width: 100%;
    user-select: none;
    overflow: hidden;
    padding-bottom: 37px;
    padding-top: 6px;
    z-index: 2;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.4) 100%);
    :global(.swiper-slide) {
        width: auto;
        padding-top: 3px;
        &:first-child {
            margin-left: 30px;
        }
    }
}

.custom-swiper-scrollbar {
    height: 1.5px;
    background-color: #FCA397;
    margin-bottom: 15px;
    position: relative;
    cursor: pointer;
    &:before,
    &:after {
        content: "";
        display: block;
        position: absolute;
        bottom: -2.25px;
        background-color: #FCA397;
        width: 1.5px;
        height: 6px;
    }

    &:before {
        left: 0;
    }

    &:after {
        right: 0;
    }

    :global(.swiper-scrollbar-drag) {
        background-color: #E03E1A;
        border-radius: 3px;
        transition: all 0.3s;
        height: 24px;
        top: -42px;
        width: 110px !important;
        &:before {
            content: "more work";
            display: inline-block;
            padding: 3px 4px;
            padding-bottom: 5px;
            text-align: center;
            font-size: 16.5px;
            line-height: 1em;
            letter-spacing: 0.05em;
            color: #ffffff;
            margin-left: 2px;
        }
        &:after {
            content: "";
            display: inline-block;
            background-image: url(/images/biz/B08250401/more-work-arrow.svg);
            background-size: cover;
            background-position: top;
            width: 8.5px;
            height: 8.5px;
            position: relative;
            top: -1px;
        }
    }
}

@media (max-width:400px) {
    .top {
        margin: 12px 20px 19px 33px;
        .portfolio-title {
            padding: 8px 11px;
            padding-right: 19px;
            border: 2px solid #FAB815;
            &::before {
                width: 24px;
                height: 24px;
                top: -23.5px;
                left: -21.5px;
            }
            .h6 {
                font-size: 15px;
                margin-bottom: 6px;
                line-height: 14px;
            }
            .h5 {
                font-size: 17px;
                line-height: 18px;
            }
        }
    }
    .scroll-container {
        .swiper-slide {
            &:first-child {
                margin-left: 20px;
            }
        }
    }
    .product-self {
        width: 47vw;
    }
    .img-box-sm {
        .img-box {
            height: auto;
        }
    }
    .img-box-bg {
        .img-box {
            height: auto;
        }
    }

    .custom-swiper-scrollbar {
        margin-bottom: 10px;
        :global(.swiper-scrollbar-drag) {
            height: 20px;
            top: -30px;
            width: 80px !important;
            &:before {
                font-size: 11px;
                margin-left: 1px;
                position: relative;
                top: -1px;
            }
            &:after {
                width: 6.5px;
                height: 6.5px;
                position: relative;
                top: -2px;
            }
        }
    }
}
</style>
