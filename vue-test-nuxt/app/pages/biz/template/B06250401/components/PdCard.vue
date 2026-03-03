<script setup>
import { ref, computed } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
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

const modules = [Navigation];
const emits = defineEmits(['update:visible']);
const commonStore = useCommonStore();

const isShow = ref(true);

const webID = computed(() => commonStore.userInfo?.webID || '');

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
                    <img src="/images/biz/B06250401/cross_btn.svg" alt="">
                </button>
                <div :class="$style['scrollBar-y']">
                    <Swiper
                        v-if="data?.image"
                        :modules="modules"
                        :loop="true"
                        :navigation="true"
                        :class="$style.pdSwiper"
                    >
                        <SwiperSlide
                            v-for="(img, index) in data?.image"
                            :key="index"
                            :class="$style['pd-img-box']"
                        >
                            <div :class="$style['pd-img']">
                                <ClientOnly>
                                    <VideoLink
                                        v-if="img.type === 'link'"
                                        :video-link="img.value"
                                        :video-type="img.community"
                                        video-height="520"
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
                    </Swiper>
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
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.pd-modal-content {
    background: white;
    padding: 76px 35px;
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
    top: 20px;
    right: 20px;
    transition: all 0.3s;
    z-index: 9;
    img {
        width: 20px;
        height: 20px;
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
    color: #1E1E1ECC;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0.5px;
    line-height: 1.8;
    margin: 0 41px;
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
    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        background-image: url(/images/biz/B06250401/ad_arrow.svg);
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
    margin: 0 41px;
    border-radius: 20px;
    overflow: hidden;
    line-height: 0;
    max-width: 488px;
    max-height: 520px;
    aspect-ratio: 488 / 520;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain !important;
    }
}

@media (max-width:640px) {
    .pd-modal-content {
        padding: 12vw 6vw;
        width: 100vw;
    }
    .pd-img {
        margin: 0 6vw;
    }
    .pd-text {
        margin: 25px 6vw 0;
    }
}

@media (max-width:400px) {
    .pd-modal-content {
        padding: 15vw 7vw;
    }
    .pd-text {
        margin: 25px 7vw 0;
    }
}
</style>
