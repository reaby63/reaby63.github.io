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
            <button :class="$style.close" @click="onClose" />
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
                            <VideoLink
                                v-if="img.type === 'link'"
                                :video-link="img.value"
                                :video-type="img.community"
                                video-height="385"
                            />
                            <Image
                                v-else
                                :img-src="commonStore.getImg(commonStore.userInfo.webID, img.value)"
                                :has-zoom="true"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <Text
                    v-if="enInfo.foreword"
                    :class="$style['en-text']"
                    :text="enInfo.foreword"
                />
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.en-modal-content {
    display: flex;
    background: white;
    padding: 7vw 5vw;
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
    top: 12px;
    right: 12px;
    transition: all 0.3s;
    z-index: 9;
    height: 25px;
    width: 29px;

    &::before ,
    &::after {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        background-color: #000000;
        border-radius: 5px;
        height: 32px;
        top: -4px;
        right: 12px;
    }

    &::before{
        transform: rotate(48deg);
    }

    &::after{
        transform: rotate(-48deg);
    }

    &:hover {
        opacity: 0.8;
    }
}

.en-text {
    color: #2b2b2b;
    font-size: 15px;
    line-height: 36px;
    margin: 0 5vw;
    padding-top: 3vw;
    padding-bottom: 3vw;
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
        background-image: url("/images/biz/B02250313/ad_arrow.svg");
        background-size: cover;
        background-position: top;
        width: 15px;
        height: 30px;
        color: transparent;
    }

    :global(.swiper-button-next) {
        right: 0;
        transform: rotate(180deg);
    }

    :global(.swiper-button-prev) {
        left: 0;
    }

    .en-img {
        max-height: 385px;
        aspect-ratio: 514 / 385;
        margin: 0 5vw;
        border: solid 3px #ffffff;
        border-radius: 15px;
        overflow: hidden;
        line-height: 0;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}

@media (min-width:640px) {
    .en-modal-content {
        padding: 47px 30px;
    }

    .enSwiper {
        .en-img {
            margin: 0 30px;
            // height: 385px;
        }
    }

    .en-text {
        margin: 0 30px;
        padding-top: 23px;
        padding-bottom: 23px;
    }
}
</style>
