<script setup>
import { ref, computed } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';
import Text from '@/pages/biz/components/Text.vue';

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});
const commonStore = useCommonStore();
const emits = defineEmits(['update:visible']);
const modules = [Navigation, Pagination];

// 輪播tag
const currentIndex = ref(0);
const isShow = ref(true);

const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const pdInfoList = computed(() => props.data.image || []);

function onSlideChange(swiper) {
    currentIndex.value = swiper.activeIndex;
}

function onClose() {
    isShow.value = false;

    // 錯開關閉時間，使動畫可執行，勿刪
    setTimeout(() => {
        emits('update:visible', false);
    }, 500);
}
</script>

<template>
    <Popup v-model:visible="isShow" @close="onClose">
        <div :class="$style['pd-modal-overlay']" @click.self="onClose">
            <div :class="$style['pd-modal-content']">
                <button :class="$style.close" @click="onClose">
                    <img src="/images/biz/B08250527/cross_btn.svg">
                </button>
                <div :class="$style['scrollBar-y']">
                    <div :class="$style['pd-title']">
                        {{ curPageData.productSetting?.subTitle }}
                    </div>
                    <div :class="$style['swiper-wrap']">
                        <Swiper
                            v-if="data?.image"
                            :modules="modules"
                            :loop="true"
                            :navigation="{
                                prevEl: `.${$style['swiper-button-prev']}`,
                                nextEl: `.${$style['swiper-button-next']}`
                            }"
                            :class="$style.pdSwiper"
                            :pagination="{
                                el: `.${$style['swiper-pagination']}`,
                                clickable: true,
                                dynamicBullets: true
                            }"
                            autoplay
                            @slide-change="onSlideChange"
                        >
                            <SwiperSlide
                                v-for="(img, index) in data.image"
                                :key="index"
                                :class="$style['pd-img-box']"
                            >
                                <div :class="$style['pd-img']">
                                    <ClientOnly>
                                        <VideoLink
                                            v-if="img.type === 'link'"
                                            :video-link="img.value"
                                            :video-type="img.community"
                                            video-height="280"
                                            :class="$style['iframe-wrap']"
                                        />
                                        <Image
                                            v-else
                                            :img-src="commonStore.getImg(webID, img.value)"
                                            :has-zoom="true"
                                        />
                                    </ClientOnly>
                                </div>
                            </SwiperSlide>
                            <div :class="$style['pd-tag']">
                                {{ currentIndex + 1 }} / {{ pdInfoList?.length }}
                            </div>
                        </Swiper>
                        <div :class="[$style['adt-arrow'], $style['swiper-button-prev']]" />
                        <div :class="[$style['adt-arrow'], $style['swiper-button-next']]" />
                        <div :class="$style['swiper-pagination']" />
                    </div>
                    <Text
                        v-if="data.foreword"
                        :class="$style['pd-text']"
                        :text="data.foreword"
                    />
                </div>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.pd-modal-overlay {
    display: flex;
    justify-content: center;
    max-height: 100dvh;
    align-items: center;
}

.pd-modal-content {
    background: #ffffff;
    padding: 40px;
    border-radius: 4px;
    width: 100%;
    max-width: 640px;
    position: relative;
    height: auto;
    max-height: 100dvh;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    img {
        width: 100%;
    }
}

.close {
    padding: 0;
    position: absolute;
    top: 15px;
    right: 15px;
    transition: all 0.3s;
    z-index: 9;
    &:hover {
        opacity: 0.8;
    }
}

.scrollBar-y {
    .swiper-wrap {
        .swiper-pagination {
            margin: 17px auto 0;
            transform: none;

            // 中間的點點
            &:global(.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic),
            &:global(.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic) {
                height: 5px;
                z-index: 999;
            }

            &:global(.swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet),
            &:global(.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet) {
                margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 2px);
            }

            :global(.swiper-pagination-bullet) {
                width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 7px));
                height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 5px));
            }

            :global(.swiper-pagination-bullet-active) {
                width: 8px;
                height: 5px;
                background-color: #A39689;
                border-radius: 10px;
                margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 3px) !important;
            }
        }
    }
}

.pd-title {
    margin-bottom: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 4px;
    line-height: 22px;
}

.pd-img-box {
    position: relative;
}

.pd-img {
    border-radius: 20px 20px 4px 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #DFDFDF;
    aspect-ratio: 558 / 278;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain !important;
    }
}

.iframe-wrap {
    width: 100%;
    height: 100%;
    border: none;
}

// 輪播套件
.swiper-wrap {
    position: relative;

    &:hover {
        .adt-arrow {
            opacity: 1;

            &:global(.swiper-button-disabled) {
                opacity: 0.35;
            }
        }

        .pd-tag {
            opacity: 1;
        }
    }
}

.pd-tag {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #ffffff;
    transition: all 0.3s;
    background-color: #221D1ACC;
    border-radius: 8px;
    padding: 5px 8px;
    font-size: 12px;
    font-weight: 330;
    font-family: "MiSans TC", Arial, sans-serif;
    z-index: 1;
    opacity: 0;
}

.adt-arrow {
    opacity: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    bottom: 37px;
    transition: all 0.3s;
    border: 1px solid #dfdfdf;
    border-radius: 50%;
    cursor: pointer;
    color: transparent;
    background-color: #fff;

    &.swiper-button-prev {
        transform: rotate(180deg);
        left: 15px;
    }

    &.swiper-button-next {
        right: 15px;
    }

    &::after {
        content: '';
        width: 22px;
        height: 22px;
        mask: url('/images/biz/B08250527/ad_arrow.svg') 50% 50% no-repeat;
        mask-size: cover;
        background-color: #221d1a;
    }

    &:hover {
        background-color: #a39689;

        &:after {
            background-color: #fff;
        }
    }
}

.pd-text {
    color: #221D1AB2;
    text-align: center;
    font-size: 16px;
    font-weight: 330;
    letter-spacing: 2px;
    line-height: 28px;
    margin-top: 10px;
    padding: 10px;
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
    font-family: "MiSans TC", Arial, sans-serif;
}

@media (max-width:640px) {
    .pd-modal-content {
        width: 100vw;
    }

    .swiper-pagination {
        &:global(.swiper-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic),
        &:global(.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic) {
            bottom: -15px;
        }
    }

    .pd-tag {
        opacity: 1;
    }
}
</style>
