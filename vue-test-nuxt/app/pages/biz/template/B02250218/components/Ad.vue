<script setup>
import { ref } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';
import Text from '@/pages/biz/components/Text.vue';

const emit = defineEmits(['close']);
const commonStore = useCommonStore();
const modules = [Navigation];

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
        <div :class="$style['ad-modal-content']">
            <div :class="$style.close">
                <button @click="onClose" />
            </div>
            <div :class="$style['scrollBar-y']">
                <Swiper
                    :modules="modules"
                    :loop="true"
                    :navigation="true"
                    :auto-height="true"
                    :class="$style.adSwiper"
                >
                    <SwiperSlide
                        v-for="(item, idx) in commonStore.popupInfo.value"
                        :key="idx"
                        :class="$style.slide"
                    >
                        <div :class="$style['ad-date']">
                            <span v-if="item.adDate || item.adYear" :class="$style['ad-date-box']">
                                <span v-if="item.adDate" :class="$style['ad-date-box-in']">
                                    {{ item.adDate }}
                                </span>
                                <span v-if="item.adYear" :class="$style['ad-date-box-in']">
                                    {{ item.adYear }}
                                </span>
                            </span>
                        </div>
                        <div v-if="item.adImage[0]" :class="$style['ad-img']">
                            <ClientOnly>
                                <Image
                                    :img-src="commonStore.getImg(commonStore.userInfo.webID, item.adImage[0])"
                                    :has-zoom="true"
                                    :class="$style['img']"
                                />
                            </ClientOnly>
                        </div>
                        <div :class="$style['ad-content-scroll']">
                            <h6 v-if="item.adTitle" :class="$style['ad-content-title']">
                                {{ item.adTitle }}
                            </h6>
                            <Text
                                v-if="item.adContent"
                                :class="$style['ad-content']"
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

.scrollBar-y {
  overflow-y: auto;
  height: auto;
  scrollbar-width: none;
  min-height: auto;
  max-height: 100%;
}

.close {
    padding: 14px;
    padding-bottom: 16px;
    text-align: right;
    position: absolute;
    top: -1px;
    right: 0;
    z-index: 999;

    button {
        position: relative;
        height: 25px;
        display: inline-block;
        transition: all 0.3s;
        width: 29px;
        background-color: transparent;
        border: none;
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

        &:hover {
            opacity: 0.8;
        }
    }
}

.ad-modal-content {
    background: white;
    padding: 27px 25px;
    padding-bottom: 47px;
    width: 100%;
    max-width: 640px;
    max-height: 100dvh;
    min-height: auto;
    box-sizing: border-box;
    position: relative;
    display: flex;

    img {
        width: 100%;
    }
}

// 輪播
.ad-img {
    overflow: hidden;
    height: 513px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 37px;
    .img {
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}

.ad-content-scroll {
    margin: 0 37px;
    padding-top: 30px;
    color: #2b2b2b;
    font-size: 15px;
    line-height: 36px;
    display: flex;
    flex-wrap: wrap;
}

.ad-content-title {
    font-size: 20px;
    line-height: 1.5;
    margin: 0 0 10px 0;
    width: 100%;
    font-weight: 400;
}

.ad-date {
    display: flex;
    justify-content: end;
    padding-bottom: 15px;
    margin-right: 37px;
}

.ad-date-box {
    display: inline-block;
    background-color: #141414;
    padding: 12px 18px;
}

.ad-date-box-in {
    display: block;
    color: #ffffff;
    font-family: "Playfair Display", sans-serif;
    font-weight: 400;
    font-size: 20px;
    text-align: center;
    line-height: 24.44px;
}

.ad-content {
    word-break: break-word;
    text-align: justify;
}

.adSwiper {
    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        background-image: url('/images/biz/B02250218/btn_pageaArrow.svg');
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

@media (max-width: 640px) {
    .ad-date {
        margin-right: 6vw;
    }

    .ad-img {
        margin: 0 6vw;
        height: 80vw;
    }

    .ad-content-scroll {
        margin: 0 6vw;
    }

    .ad-modal-content {
        padding: 27px 4vw;
        padding-bottom: 47px;
    }
}

@media (max-width:410px) {

    .ad-modal-content {
        padding: 47px 4vw;
    }

}
</style>
