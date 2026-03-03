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
            <button :class="$style.close" @click="onClose">
                <img src="/images/biz/B09250825/btn_close.svg">
            </button>
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
                                    video-height="370"
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
                <p
                    v-if="pdInfo.foreword"
                    :class="$style['pd-text']"
                    v-html="pdInfo.foreword"
                />
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.pd-modal-content {
    display: flex;
    background: #FFF8EA;
    padding: 64px 13px;
    max-width: 640px;
    max-height: 100dvh;
    position: relative;
    box-sizing: border-box;
    overscroll-behavior: contain;

    img {
        width: 100%;
    }
}

.close {
    padding: 0;
    position: absolute;
    top: 24px;
    right: 16px;
    transition: all 0.3s;
    z-index: 9;
    background-color: transparent;

    img {
        width: 21px;
        height: 21px;
    }

    &:hover {
        opacity: 0.8;
    }
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
    color: #5E5338;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 1.5px;
    line-height: 28px;
    margin: 0 40px;
    margin-top: 25px;
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
        background-image: url("/images/biz/B09250825/ad_arrow.svg");
        background-size: cover;
        background-position: top;
        width: 12.7px;
        height: 14.7px;
        color: transparent;
        margin-top: 0px;
    }

    :global(.swiper-button-next) {
        right: 0;
        transform: rotate(180deg);
    }

    :global(.swiper-button-prev) {
        left: 0;
    }

    .pd-img {
        margin: 0 24px;
        overflow: hidden;
        line-height: 0;
        aspect-ratio: 532 / 348;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: transparent;
        }
    }
}

@media (max-width:640px) {
    .pd-modal-content {
        padding: 10vw 2vw;
        width: 100vw;
    }

    .pdSwiper .pd-img {
        margin: 0 4vw;
        height: auto;
    }

    .pd-text {
        margin: 25px 6vw 0;
    }
}

@media (max-width:400px) {
    .pd-modal-content {
        padding: 15vw 2vw;
    }
}
</style>
