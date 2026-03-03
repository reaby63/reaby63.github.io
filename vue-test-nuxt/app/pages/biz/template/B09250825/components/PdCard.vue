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
const enInfo = computed(() => commonStore.popupInfo.value);
const props = defineProps({
    open: {
        type: String,
        required: true
    }
});

const isShow = computed(() => commonStore.popupInfo.type === props.open);

function onClose() {
    // 錯開關閉時間，使動畫可執行，勿刪
    setTimeout(() => {
        commonStore.actionSetPopupInfo({ type: '', value: {} });
    }, 500);
}
</script>

<template>
    <Popup
        v-if="isShow"
        :visible="true"
        @close="onClose"
    >
        <div :class="$style['en-modal-content']">
            <button :class="$style.close" @click="onClose">
                <img src="/images/biz/B09250825/btn_close.svg">
            </button>
            <div :class="$style['scrollBar-y']">
                <Swiper
                    v-if="enInfo.image"
                    :modules="[Navigation]"
                    :navigation="true"
                    :loop="true"
                    :class="$style.enSwiper"
                >
                    <SwiperSlide
                        v-for="(img) in enInfo.image"
                        :key="img"
                        :class="$style['en-img-box']"
                    >
                        <div :class="$style['en-img']">
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
                <div v-if="enInfo.title" :class="$style['text-area']">
                    <div :class="$style['title']">
                        {{ enInfo.title }}
                    </div>
                    <div v-if="enInfo.subTitle" :class="$style['subtitle']">
                        {{ enInfo.subTitle }}
                    </div>
                    <p
                        v-if="enInfo.foreword"
                        :class="$style['en-text']"
                        v-html="enInfo.foreword"
                    />
                </div>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.en-modal-content {
    display: flex;
    background: #FFF8EA;
    padding: 64px 13px;
    width: 100vw;
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
        width: 20px;
        height: 20px;
    }

    &:hover {
        opacity: 0.8;
    }
}

.text-area {
    margin: 36px 24px 0;
    color: #5E5338;
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
    text-align: justify;
    .title {
        font-size: 17px;
        font-weight: 600;
        line-height: 28px;
        letter-spacing: 1.7px;
        padding-bottom: 12px;
        border-bottom: solid 0.5px #000;
        margin-bottom: 17px;
        margin-right: 17px;
        position: relative;
        &:before {
            content: "";
            display: block;
            width: 17px;
            height: 17px;
            position: absolute;
            right: -16px;
            bottom: -7px;
            border-radius: 50px;
            background-color: transparent;
            background-image: url('/images/biz/B09250825/portfolio-icon.svg');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            z-index: 2;
        }
    }
    .subtitle {
        font-size: 17px;
        font-weight: 700;
        line-height: 28px;
        letter-spacing: 1.36px;
        margin-bottom: 20px;
    }
    .en-text {
        color: #5E5338;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 1.5px;
        line-height: 28px;
    }
}

.iframe-wrap {
    width: 100%;
    height: 100%;
    border: none;
}

// 輪播
.enSwiper {
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

    .en-img {
        margin: 0 24px;
        overflow: hidden;
        line-height: 0;
        aspect-ratio: 532 / 348;

        img {
            display: block;
            width: 100%;
            height: 100%;
            background-color: transparent;
            object-fit: contain;
        }
    }
}

@media (max-width:640px) {
    .en-modal-content {
        padding: 10vw 7vw;
        width: 100vw;
    }

    .enSwiper .en-img {
        margin: 0 6vw;
        height: auto;
    }

    .text-area {
        margin: 25px 6vw 0;
    }
}

@media (max-width:400px) {
    .en-modal-content {
        padding: 15vw 2vw;
    }
}
</style>
