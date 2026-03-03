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
            <div :class="$style['close-btn']" @click="onClose">
                <img
                    :class="$style['close-img']"
                    src="/images/biz/B06250320/cross_btn.svg"
                >
            </div>
            <div v-if="commonStore.getPageInfo.adInfo.length" :class="$style['body-wrap']">
                <Swiper
                    :modules="[Navigation]"
                    :loop="true"
                    :navigation="true"
                    :auto-height="true"
                    :class="$style.adSwiper"
                >
                    <SwiperSlide
                        v-for="item in commonStore.getPageInfo.adInfo"
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
                                {{ item?.adYear }}<span v-if="item?.adYear && item?.adDate">/</span>{{ item?.adDate }}
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
    background: #fff;
}

.close-img {
    display: block;
    width: 100%;
}

.close-btn {
    position: absolute;
    z-index: 9;
    top: 20px;
    right: 20px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover{
        opacity: 0.8;
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
        }
    }
}

.text-wrap {
    height: 100%;
}

.title-text {
    line-height: 27px;
    margin: 32px 41px 8px;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.5px;
}

.text-content {
    line-height: 28px;
    margin: 0 41px 20px;
    text-align: justify;
    letter-spacing: 2px;
    font-weight: 400;
    word-break: break-word;
    color: rgba(34, 29, 26, 0.7);
}

.text-date {
    margin: 0 41px 30px;
    font-weight: 600;
    letter-spacing: 1px;
    color: rgba(30, 30, 30, 0.8);
}

.adSwiper {
    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        background-image: url('/images/biz/B06250320/ad_arrow.svg');
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
