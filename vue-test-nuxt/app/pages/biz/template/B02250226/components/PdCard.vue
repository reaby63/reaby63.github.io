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
        <div :class="$style['pd-card']">
            <div :class="$style['pd-card-center']">
                <div :class="$style.cross">
                    <button @click="onClose" />
                </div>
                <div :class="$style.pd">
                    <div v-if="pdInfo.image" :class="$style['pd-top']">
                        <Swiper
                            :modules="[Navigation]"
                            :loop="true"
                            :slides-per-view="1"
                            :navigation="{
                                prevEl: `.${$style['swiper-button-prev']}`,
                                nextEl: `.${$style['swiper-button-next']}`
                            }"
                        >
                            <SwiperSlide
                                v-for="(item, index) in pdInfo.image"
                                :key="index"
                                :class="$style.slide"
                            >
                                <ClientOnly>
                                    <VideoLink
                                        v-if="item.type === 'link'"
                                        :video-link="item.value"
                                        :video-type="item.community"
                                        video-height="500"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(commonStore.userInfo.webID, item.value)"
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
@use "../scss/all.scss" as *;

.pd-card {
    max-width: 640px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    z-index: 2;
    margin: auto;
}

.pd-card-center {
    position: relative;
    background-color: #ffffff;
    padding: 37px 0;
    max-height: calc(100dvh - 74px);
}

.cross {
    position: absolute;
    top: 6.5px;
    right: 9px;

    button {
        position: relative;
        height: 25px;
        display: inline-block;
        transition: all 0.3s;
        width: 29px;
        border: none;
        background-color: transparent;
        cursor: pointer;

        &::before,
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

        &::before {
            transform: rotate(48deg);
        }

        &::after {
            transform: rotate(-48deg);
        }
    }
}

.iframe-wrap {
    width: 100%;
    height: 100%;
    border: none;
}

.pd {
    padding: 0 36px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    max-height: calc(100dvh - 74px);
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

.pd-top {
    position: relative;
}

.slide {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 568 / 513;
    flex-shrink: 0;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain !important;
    }
}

.adt-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &.left {
        left: -48px;
    }

    &.right {
        right: -48px;
    }
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

    &::after,
    &::before {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        background-color: #000000;
        border-radius: 5px;
        height: 20px;
    }

    &::before {
        transform: rotate(40deg);
        top: 9px;
        left: 30px;
    }

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

.pd-bottom {
    margin-top: 28px;
    color: #2b2b2b;
    font-size: 15px;
    line-height: 36px;
    overflow-y: unset;
    flex-grow: 1;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }
}

</style>

