<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();

const isShow = ref(true);

function onClose() {
    isShow.value = false;

    // 錯開關閉時間，使動畫可執行，勿刪
    setTimeout(() => {
        commonStore.actionSetPopupInfo({ type: '', value: {} });
    }, 500);
}
</script>

<template>
    <Popup v-model:visible="isShow" @close="onClose">
        <div :class="$style['ad-popup-wrap']">
            <div :class="$style.close">
                <button @click="onClose" />
            </div>
            <div v-if="commonStore.getPageInfo.adInfo.length" :class="$style['body-wrap']">
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
                        <div v-if="item.adImage[0]" :class="$style['img-wrap']">
                            <ClientOnly>
                                <Image
                                    :img-src="commonStore.getImg(commonStore.userInfo.webID, item.adImage[0])"
                                    :has-zoom="true"
                                    :class="$style['img']"
                                />
                            </ClientOnly>
                        </div>
                        <div :class="$style['text-wrap']">
                            <div v-if="item?.adTitle" :class="$style['title-text']">
                                {{ item?.adTitle }}
                            </div>
                            <Text
                                v-if="item.adContent"
                                :class="$style['text-content']"
                                :text="item.adContent"
                            />
                            <div v-if="item?.adYear || item?.adDate" :class="$style['text-date']">
                                {{ item?.adYear }}/{{ item?.adDate }}
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
.ad-popup-wrap {
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 100%;
    max-width: 640px;
    max-height: 100dvh;
    padding: 76px 35px;
    background: #000;
    border: 1px solid #353535;
}

.close {
    padding: 20px;
    text-align: right;
    position: absolute;
    top: -1px;
    right: 0;
    z-index: 999;

    button {
        position: relative;
        height: 20px;
        display: inline-block;
        transition: all 0.3s;
        width: 20px;
        background-color: transparent;
        border: none;
        cursor: pointer;

        &::before,
        &::after {
            content: "";
            display: block;
            position: absolute;
            width: 1px;
            background-color: #fff;
            border-radius: 5px;
            height: 24px;
            top: -1px;
            right: 8px;
        }

        &::before {
            transform: rotate(45deg);
        }

        &::after {
            transform: rotate(-45deg);
        }

        &:hover {
            opacity: 0.8;
        }
    }
}

.body-wrap {
    overflow-y: auto;
    height: auto;
    scrollbar-width: none;
    min-height: auto;
    max-height: 100%;
    width: 100%;
}

// 輪播
.img-wrap {
    line-height: 0;
    height: 530px;
    margin: 0 41px;
    .img {
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: #000;
        }
    }
}

.text-wrap {
    overflow-y: auto;
    height: 100%;
    scrollbar-width: none;
}

.title-text {
    line-height: 27px;
    margin: 32px 41px 8px;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.5px;
    color: #FFF;
}

.text-content {
    line-height: 28px;
    margin: 0 41px 20px;
    text-align: justify;
    letter-spacing: 2px;
    font-weight: 400;
    word-break: break-word;
    color: rgba(255, 255, 255, 0.80);
}

.text-date {
    margin: 0 41px 30px;
    font-weight: 600;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.80);
}

// 箭頭
.adSwiper {
    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        background-image: url('/images/biz/B08250401/ad_arrow.svg');
        background-size: cover;
        background-position: top;
        width: 15px;
        height: 30px;
        color: transparent;
    }

    :global(.swiper-button-next) {
        right: 0;
    }

    :global(.swiper-button-prev) {
        left: 0;
        transform: rotate(180deg);
    }
}
</style>
