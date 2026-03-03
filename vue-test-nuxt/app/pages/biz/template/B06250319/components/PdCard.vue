<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();
const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    }
});
const emit = defineEmits(['close']);
const isShow = ref(true);

function onClose() {
    isShow.value = false;

    // 錯開關閉時間，使動畫可執行，勿刪
    setTimeout(() => {
        emit('close');
    }, 500);
}
</script>

<template>
    <Popup v-model:visible="isShow" @close="onClose">
        <div :class="$style['pd-card']">
            <div :class="$style['pd-card-center']">
                <div :class="$style.cross">
                    <button @click="onClose" />
                </div>
                <div :class="$style.pd">
                    <div v-if="info.image?.length" :class="$style['pd-top']">
                        <Swiper
                            :modules="[Navigation]"
                            :slides-per-view="1"
                            :loop="true"
                            :navigation="{
                                prevEl: `.${$style['swiper-button-prev']}`,
                                nextEl: `.${$style['swiper-button-next']}`
                            }"
                            style="width: 100%; height: 100%;"
                        >
                            <SwiperSlide
                                v-for="(img, idx) in info.image"
                                :key="idx"
                                :class="$style.slide"
                            >
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
                        v-if="info.foreword"
                        :class="$style['pd-bottom']"
                        :text="info.foreword"
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
    overflow: hidden;
    margin: auto;
}

.pd-card-center {
    padding: 77px 0;
    width: 100%;
    position: relative;
    background-color: #ffffff;
}

.cross {
    padding: 20px 24px;
    position: absolute;
    top: 0;
    right: 0;

    button {
        position: relative;
        height: 23px;
        display: inline-block;
        transition: all 0.3s;
        width: 22px;
        cursor: pointer;

        &::before,
        &::after {
            content: "";
            display: block;
            position: absolute;
            width: 1px;
            background-color: #000000;
            border-radius: 5px;
            height: 28px;
            top: -4px;
            right: 12px;
        }

        &::before {
            transform: rotate(45deg);
        }

        &::after {
            transform: rotate(-45deg);
        }
    }
}

.iframe-wrap {
    width: 100%;
    height: 100%;
    border: none;
}

.pd {
    padding: 0 76px;
    max-height: calc(100dvh - 154px);
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;

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
}

.pd-top {
    width: 100%;
    aspect-ratio: 488 / 350;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        background-color: #ccc;
        object-fit: contain !important;
    }
}

.adt-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.adt-arrow {
    &.left {
        left: -76px;
    }
}

.adt-arrow {
    &.right {
        right: -76px;
    }
}

.pd-bottom {
    margin-top: 25px;
    color: #1E1E1E;
    font-size: 15px;
    line-height: 1.8;
    letter-spacing: 0.5px;
    font-weight: 400;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;
    span {
        display: block;
        margin-bottom: 1;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

@media (max-width:500px) {
    .pd-top {
        max-height: 50vh;
        height: auto;
    }

    .pd-card-center {
        padding: 77px 0 45px 0;
    }
    .pd {
        padding: 0 24px;
        max-height: calc(100dvh - 45px - 77px);
    }
}
</style>
