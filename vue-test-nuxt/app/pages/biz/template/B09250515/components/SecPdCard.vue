<script setup>
import { computed, useCssModule } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';

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
                <img src="/images/biz/B09250515/btn_close.svg">
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
                                <iframe
                                    v-if="img.type === 'link'"
                                    :src="img.value"
                                    :class="$style['iframe-wrap']"
                                    allowfullscreen
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
                    v-if="enInfo.foreword"
                    :class="$style['en-text']"
                    v-html="enInfo.foreword"
                />
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
        width: 21px;
        height: 21px;
    }

    &:hover {
        opacity: 0.8;
    }
}

.en-text {
    color: #000;
    font-size: 15px;
    font-weight: 330;
    letter-spacing: 0.5px;
    line-height: 1.8;
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
.enSwiper {
    .swiper-wrapper {
        align-items: center;
    }

    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        background-image: url("/images/biz/B09250515/ad_arrow.svg");
        background-size: cover;
        background-position: top;
        width: 8px;
        height: 17px;
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
            object-fit: contain;
            background-color: transparent;
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

    .en-text {
        margin: 25px 6vw 0;
    }
}

@media (max-width:400px) {
    .en-modal-content {
        padding: 15vw 2vw;
    }
}
</style>
