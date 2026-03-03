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
            <button :class="$style.close" @click="onClose" />
            <div :class="$style['scrollBar-y']">
                <Swiper
                    v-if="pdInfo?.image"
                    :modules="[Navigation]"
                    :loop="true"
                    :navigation="true"
                    :class="$style.pdSwiper"
                >
                    <SwiperSlide
                        v-for="(img, index) in pdInfo?.image"
                        :key="index"
                        :class="$style['pd-img-box']"
                    >
                        <div :class="$style['pd-img']">
                            <ClientOnly>
                                <VideoLink
                                    v-if="img.type === 'link'"
                                    :video-link="img.value"
                                    :video-type="img.community"
                                    video-height="277"
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

.scrollBar-y {
    overflow-y: auto;
    scrollbar-width: none;
    max-height: 100vh;
    overscroll-behavior: contain;
    width: 100%;
}

.pd-modal-content {
    background: #383838;
    padding: 47px 25px;
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
    top: 12px;
    right: 12px;
    transition: all 0.3s;
    z-index: 9;
    height: 25px;
    width: 29px;
    background-color: #383838;
    border: 0px;
    cursor: pointer;

    &::before ,
    &::after {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        background-color: #84816e;
        border-radius: 5px;
        height: 32px;
        top: -4px;
        right: 12px;
    }

    &::before {
        transform: rotate(48deg);
    }

    &::after {
        transform: rotate(-48deg);
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
    color: #fff;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.5px;
    line-height: 1.8;
    margin: 0 31px;
    margin-top: 23px;
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
    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        background-image: url(/images/biz/B02250318/ad_arrow.svg);
        background-size: cover;
        background-position: top;
        width: 15px;
        height: 30px;
        color: transparent;
        top: calc(50% + 10px);
    }
    :global(.swiper-button-next) {
        right: 0;
    }
    :global(.swiper-button-prev) {
        left: 0;
        transform: rotate(180deg);
    }
}

.pd-img {
    margin: 0 30px;
    overflow: hidden;
    line-height: 0;
    height: 277px;
    img {
        width: 100%;
        height: 100%;
        background-color: #383838 !important;
        object-fit: contain !important;
    }
}

@media (max-width:640px) {
    .pd-modal-content {
        padding: 12vw 4vw;
        width: 100vw;
    }
    .pd-img {
        margin: 0 6vw;
        height: 44vw;
    }
    .pd-text {
        margin: 25px 6vw 0;
    }

    .pdSwiper {
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
            width: 9px;
            height: 18px;
        }
    }
}

@media (max-width:400px) {
    .pd-modal-content {
        padding: 12vw 4vw;
    }
    .pd-text {
        margin: 25px 4vw 0;
    }
}
</style>
