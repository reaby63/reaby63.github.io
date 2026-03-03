<script setup>
import { computed, useCssModule } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';
import Text from '@/pages/biz/components/Text.vue';

const $style = useCssModule();
const commonStore = useCommonStore();
const pdInfo = computed(() => commonStore.popupInfo.value);
const props = defineProps({
    open: {
        type: String,
        required: true
    }
});

const isShow = computed(() => commonStore.popupInfo.type === props.open);

function onClose() {
    commonStore.actionSetPopupInfo({ type: '', value: {} });
}
</script>

<template>
    <Popup
        v-if="isShow"
        :visible="true"
        @close="onClose"
    >
        <div :class="$style['pd-modal-content']">
            <div :class="$style.cross">
                <button :class="$style.close" @click="onClose" />
            </div>
            <div :class="$style['scrollBar-y']">
                <Swiper
                    v-if="pdInfo.image"
                    :modules="[Navigation]"
                    :navigation="true"
                    :loop="true"
                    :class="$style.pdSwiper"
                >
                    <SwiperSlide
                        v-for="(img) in pdInfo.image"
                        :key="img"
                        :class="$style['pd-img-box']"
                    >
                        <div :class="$style['pd-img']">
                            <ClientOnly>
                                <VideoLink
                                    v-if="img.type === 'link'"
                                    :video-link="img.value"
                                    :video-type="img.community"
                                    video-height="320"
                                    :class="$style['iframe-wrap']"
                                />
                                <Image
                                    v-else
                                    :img-src="commonStore.getImg(commonStore.userInfo.webID, img.value)"
                                    :has-zoom="true"
                                />
                            </ClientOnly>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <Text
                    v-if="pdInfo.foreword"
                    :class="$style['pd-text']"
                    :text="pdInfo.foreword"
                />
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.pd-modal-content {
    background-color: #3C3C3C;
    overflow: hidden;
    border-radius: 18px;
    max-width: 640px;
    max-height: 100dvh;
    position: relative;
    box-sizing: border-box;
    overscroll-behavior: contain;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3490196078),
                0 20px 48px 0 rgba(0, 0, 0, 0.4509803922),
                0 0 2px 0 rgba(255, 255, 255, 0.3490196078) inset,
                0 2px 0 0 rgba(255, 255, 255, 0.0784313725) inset;
    img {
        width: 100%;
    }
}

.cross {
    text-align: right;
    padding: 12px 16px;
    border-bottom: 2px solid #555555;
}

.close {
    transition: all 0.3s;
    width: 36px;
    height: 36px;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    &::after,
    &::before {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        background-color: #ffffff;
        border-radius: 5px;
        height: 28px;
        top: 17.5px;
        right: 33px;
        color: #E6E6E6;
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
    }

    &:hover {
        opacity: 0.8;
    }
}

.scrollBar-y {
    padding: 40px;
    box-sizing: border-box;
}

.pd-title {
    margin-bottom: 30px;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 4px;
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
}

.pd-text {
    color: #fff;
    font-size: 15px;
    font-weight: 330;
    letter-spacing: 0.5px;
    line-height: 1.8;
    margin: 0 41px;
    margin-top: 24px;
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
    text-align: justify;
}

.iframe-wrap {
    width: 100%;
    height: 100%;
    border: none;
}

// 輪播
.pdSwiper {
    .swiper-wrapper {
        align-items: center;
    }

    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        background-image: url("/images/biz/B08250401/ad_arrow.svg");
        background-size: cover;
        background-position: top;
        width: 15px;
        height: 30px;
        color: transparent;
    }

    :global(.swiper-button-next) {
        right: 0;
    }

    :global(.swiper-button-prev) {
        left: 0;
        transform: rotate(180deg);
    }

    .pd-img {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        height: 320px;
        width: initial;
        border-radius: 4px;
        border: 1.5px solid #555555;
        margin: 0 41px;
        aspect-ratio: 475.07 / 320;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain !important;
        }
    }
}

@media (max-width:640px) {
    .pd-modal-content {
        width: 100vw;
    }

    .pdSwiper .pd-img {
        margin: 0 6vw;
        height: auto;
    }

    .pd-text {
        margin: 25px 6vw 0;
    }

    .scrollBar-y {
        padding: 5vw;
    }
}
</style>
