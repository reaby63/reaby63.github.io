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
                    src="/images/biz/B09250825/btn_close.svg"
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
                        v-for="(item) in commonStore.getPageInfo.adInfo"
                        :key="item.id"
                    >
                        <div :class="$style['title-wrap']">
                            <div v-if="item?.adTitle" :class="$style['title-text']">
                                {{ item?.adTitle }}
                            </div>
                            <div v-if="item?.adYear || item?.adDate" :class="$style['text-date']">
                                {{ item?.adYear }}<span v-if="item?.adYear && item?.adDate">/</span>{{ item?.adDate }}
                            </div>
                        </div>
                        <div v-if="item.adImage[0]" :class="$style['img-wrap']">
                            <ClientOnly>
                                <Image
                                    :img-src="commonStore.getImg(commonStore.userInfo.webID, item.adImage[0])"
                                    :has-zoom="true"
                                    :class="$style['img-style']"
                                />
                            </ClientOnly>
                        </div>
                        <Text
                            v-if="item?.adContent"
                            :class="$style['text-content']"
                            :text="item?.adContent"
                        />
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
    padding: 59px 15px;
    background: #F7F2E9;
}

.close-img {
    display: block;
    width: 20px;
    height: 20px;
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
    height: 341px;
    margin: 0 24px;
    .img-style {
        img {
            background-color: transparent;
        }
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.title-wrap {
    color: #5E5338;
    font-size: 15px;
    line-height: 28px;
    letter-spacing: 1.5px;
    margin: 0 24px;
    margin-bottom: 19px;
    display: flex;
    justify-content: space-between;
    div {
        display: inline-block;
        vertical-align: top;
    }
    .title-text {
        width: calc( 100% - 10em );
        font-weight: 600;
    }
    .text-date {
        width: 9em;
        font-weight: 500;
        text-align: right;
    }
}

.text-content {
    margin: 0 24px;
    color: #5E5338;
    font-size: 15px;
    line-height: 28px;
    letter-spacing: 1.5px;
}

.adSwiper {
    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        background-image: url('/images/biz/B09250825/ad_arrow.svg');
        background-size: cover;
        background-position: top;
        width: 12.7px;
        height: 14.7px;
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

@media( max-width:640px ) {
    .img-wrap {
        max-height: 341px;
        height: auto;
    }
}
</style>
