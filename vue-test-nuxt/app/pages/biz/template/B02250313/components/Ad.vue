<script setup>
import { computed } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();

const isShow = computed({
    get: () => commonStore.popupInfo?.type === 'ad',
    set: (val) => {
        if (!val) {
            commonStore.actionSetPopupInfo({ type: '', value: {} });
        }
    }
});

function onClose() {
    isShow.value = false;

    // 錯開關閉時間，使動畫可執行，勿刪
    setTimeout(() => {
        commonStore.actionSetPopupInfo({ type: '', value: {} });
    }, 500);
}
</script>

<template>
    <Popup
        v-if="isShow"
        v-model:visible="isShow"
        @close="onClose"
    >
        <div :class="$style['ad-popup-wrap']">
            <div :class="$style['close-btn']" @click="onClose" />
            <div :class="$style['scrollBar-y']">
                <Swiper
                    :modules="[Navigation]"
                    :navigation="true"
                    :loop="true"
                    :auto-height="true"
                    :class="$style.adSwiper"
                >
                    <SwiperSlide
                        v-for="(item) in commonStore.getPageInfo.adInfo"
                        :key="item.id"
                    >
                        <div :class="$style['text-date']">
                            <div :class="$style['text-date-box']">
                                <div v-if="item?.adDate">
                                    {{ item?.adDate }}
                                </div>
                                <div v-if="item?.adYear">
                                    {{ item?.adYear }}
                                </div>
                            </div>
                        </div>
                        <div v-if="item.adImage[0]" :class="$style['img-wrap']">
                            <ClientOnly>
                                <Image
                                    :img-src="commonStore.getImg(commonStore.userInfo.webID, item.adImage[0])"
                                    :has-zoom="true"
                                    :class="$style['img']"
                                />
                            </ClientOnly>
                        </div>
                        <div v-if="item?.adTitle || item?.adContent" :class="$style['text-wrap']">
                            <div v-if="item?.adTitle" :class="$style['title-text']">
                                {{ item?.adTitle }}
                            </div>
                            <Text
                                v-if="item.adContent"
                                :class="$style['text-content']"
                                :text="item.adContent"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.ad-popup-wrap {
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 100%;
    max-width: 640px;
    max-height: 100vh;
    padding: 24px 18px;
    background: #fff;
}

.close-btn {
    padding: 0;
    position: absolute;
    top: 12px;
    right: 12px;
    transition: all 0.3s;
    z-index: 9;
    height: 25px;
    width: 29px;
    cursor: pointer;

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

// 輪播
.img-wrap {
    line-height: 0;
    height: 490px;
    margin: 0 30px;
    height: 76vw;
    .img {
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}

.title-text {
    line-height: 30px;
    margin: 18px 30px 2px;
    font-size: 20px;
    color: #2b2b2b;
}

.text-content {
    line-height: 36px;
    margin: 0 30px 20px;
    text-align: justify;
    word-break: break-word;
    color: #2b2b2b;
    font-size: 15px;
}

.text-date {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 15px;
    padding-right: 30px;
}

.text-date-box {
    color: #fff;
    background-color: #bdbdbd;
    padding: 10px 16px;
    font-family: "Playfair Display", sans-serif;
    font-size: 20px;
    line-height: 24.44px;
    text-align: center;
}

// 輪播
.adSwiper {
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
}

@media (min-width:640px) {
    .img-wrap {
        height: 490px;
    }
}
</style>
