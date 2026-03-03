<script setup>
import { computed } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';
import Text from '@/pages/biz/components/Text.vue';

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
        <div :class="$style['pd-card']">
            <div :class="$style['pd-card-center']">
                <div :class="$style.cross">
                    <button @click="onClose" />
                </div>
                <div :class="$style.pd">
                    <div v-if="pdInfo.image" :class="$style['pd-top']">
                        <Swiper
                            :modules="[Navigation]"
                            :slides-per-view="1"
                            :loop="true"
                            :navigation="{
                                prevEl: `.${$style['swiper-button-prev']}`,
                                nextEl: `.${$style['swiper-button-next']}`
                            }"
                        >
                            <SwiperSlide
                                v-for="(img, index) in pdInfo.image"
                                :key="index"
                                :class="$style.slide"
                            >
                                <div :class="$style['slide-item']">
                                    <ClientOnly>
                                        <VideoLink
                                            v-if="img.type === 'link'"
                                            :video-link="img.value"
                                            :video-type="img.community"
                                            video-height="350"
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
                        <div :class="[$style['adt-arrow'], $style.left]">
                            <button :class="$style['swiper-button-prev']" />
                        </div>
                        <div :class="[$style['adt-arrow'], $style.right]">
                            <button :class="$style['swiper-button-next']" />
                        </div>
                    </div>
                    <Text
                        v-if="pdInfo.foreword"
                        :class="$style['pd-bottom']"
                        :text="pdInfo.foreword"
                    />
                </div>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>

.pd-card {
    max-width: 640px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    z-index: 99;
    margin: auto;
    overflow-y: auto;
    scrollbar-width: none;
}

.pd-card-center {
    position: relative;
    background-color: #ffffff;
    padding-top: 77px;
    padding-bottom: 115px;
}

.cross {
    padding: 20px 24px;
    position: absolute;
    top: 0;
    right: 0;

    button {
        position: relative;
        height: 23px;
        width: 22px;
        display: inline-block;
        transition: all 0.3s;
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;

        &::before,
        &::after {
            content: "";
            display: block;
            position: absolute;
            width: 1px;
            background-color: #000000;
            border-radius: 5px;
            height: 27px;
            top: -4px;
            right: 10px;
        }

        &::before {
            transform: rotate(45deg);
        }

        &::after {
            transform: rotate(-45deg);
        }
    }
}

.pd {
    height: 100%;
    padding: 0 76px 0 76px;
    box-sizing: border-box;
    max-height: calc(100dvh - 158px);
    overflow-x: hidden;
    overflow-y:auto;
    scrollbar-width: none;
}

.pd-top {
    overflow: visible;
    position: relative;

    img {
        display: block;
        margin: auto;
        width: 100%;
        height: 100%;
        background-color: #000;
        object-fit: contain !important;
    }
}

.slide-item {
    aspect-ratio: 488 / 350;
    width: 100%;
}

.iframe-wrap {
    width: 100%;
    height: 100%;
    border: none;
}

.pd-bottom {
    margin-top: 25px;
    color: #2b2b2b;
    font-size: 15px;
    line-height: 1.8;
    letter-spacing: 0.5px;
    word-wrap: break-word;
}

.adt-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.adt-arrow.left {
    left: -77px;
}

.adt-arrow.right {
    right: -77px;
}

.swiper-button-prev,
.swiper-button-next {
    z-index: 2;
    width: 62px;
    padding: 24px;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: none;
}

.swiper-button-prev,
.swiper-button-next {
    &::before,
    &::after {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        background-color: #000000;
        border-radius: 5px;
        height: 20px;
    }
}

.swiper-button-prev,
.swiper-button-next {
    &::before {
        transform: rotate(40deg);
        top: 9px;
        left: 30px;
    }
}

.swiper-button-prev,
.swiper-button-next {
    &::after {
        transform: rotate(-40deg);
        left: 30px;
    }
}

.swiper-button-next {
    &::before {
        transform: rotate(-40deg);
    }
}

.swiper-button-next {
    &::after {
        transform: rotate(40deg);
    }
}

@media (max-width: 500px) {
    .pd {
        padding: 0 24px;
        max-height: calc(100dvh - 109px);
    }

    .pd-card-center {
        padding-top: 64px;
        padding-bottom: 64px;
    }

    .pd-bottom {
        padding-top: 20px;
    }

    .adt-arrow {
        &.left{
            left: -45px;
        }
    }

    .adt-arrow {
        &.right{
            right: -45px;
        }
    }

    .swiper-button-prev,
    .swiper-button-next {
        transform: scale(0.75);
    }

}
</style>
