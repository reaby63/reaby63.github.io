<script setup>
import { ref, computed, onMounted } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Pdcard from './PdCard.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const modules = [Pagination];
const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const productGroup = computed(() => curPageData.value.productFirstList || []);

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
    <div v-if="curPageData.productSetting?.title || productGroup?.length" :class="$style.portfolio">
        <div v-if="curPageData.productSetting?.title" :class="$style.title">
            {{ curPageData.productSetting?.title }}
        </div>
        <div v-if="productGroup?.length" :class="$style['scroll-container']">
            <Swiper
                :modules="modules"
                :breakpoints="{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    500: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    }
                }"
                :slides-per-group="1"
                :loop="true"
                :looped-slides="productGroup.length"
                :pagination="productGroup.length > 3 ? { clickable: true } : false"
                :class="[
                    $style.portfolioSwiper,
                    { [$style['no-paddingbottom-3']]: productGroup.length < 3 },
                    { [$style['no-paddingbottom-2']]: productGroup.length < 2 }
                ]"
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
                                :class="$style['img-wrap']"
                            />
                            <VideoLink
                                v-else-if="item.image?.[0]?.type === 'link'"
                                :video-link="item.image?.[0]?.value"
                                :video-type="item.image?.[0]?.community"
                                video-width="162"
                                video-height="130"
                                :class="$style['iframe-wrap']"
                            />
                            <Image v-else :img-src="commonStore.getImg(webID, item.image?.[0]?.value)"/>
                        </ClientOnly>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <Pdcard open="portfolio" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.portfolio {
    color: #fff;
    padding: 30px 37px;
    background: url('/images/biz/B02250226/bg_profolio.png') center / cover no-repeat;
    background-position: center top;
}

.title {
    font-size: 17px;
    margin-bottom: 20px;
}

.item {
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    aspect-ratio: 158 / 97;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        display: flex;
        transition: all 0.3s;
    }
    &:hover {
        img {
            transform: scale(1.05);
        }
    }
}

.portfolioSwiper {
    :global(.swiper-wrapper) {
        padding-bottom: 50px;
    }
    :global(.swiper-pagination) {
        bottom: -6px !important;
    }
    :global(.swiper-pagination-bullet) {
        width: 12px;
        height: 12px;
        background: #cacaca;
        opacity: 1;
    }
    :global(.swiper-pagination-bullet-active) {
        background: #000;
    }
    :global(.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet) ,
    :global(.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet) {
        margin: 0 12px;
    }
    &.no-paddingbottom-3 {
        :global(.swiper-wrapper) {
            padding-bottom: 0;
        }
    }
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

@media (max-width: 500px) {
    .portfolioSwiper {
        &.no-paddingbottom-3 {
            :global(.swiper-wrapper) {
                padding-bottom: 50px;
            }
        }
        &.no-paddingbottom-2 {
            :global(.swiper-wrapper) {
                padding-bottom: 0;
            }
        }
    }
}
</style>
