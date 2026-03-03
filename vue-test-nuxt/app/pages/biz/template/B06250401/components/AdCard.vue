<script setup>
import { ref, computed } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';
import Text from '@/pages/biz/components/Text.vue';

const modules = [Navigation];
const commonStore = useCommonStore();

const isShow = ref(true);

const webID = computed(() => commonStore.userInfo?.webID || '');

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
            <button :class="$style.close" @click="onClose">
                <img src="/images/biz/B06250401/cross_btn.svg">
            </button>
            <div v-if="commonStore.getPageInfo.adInfo.length" :class="$style['scrollBar-y']">
                <Swiper
                    :modules="modules"
                    :loop="true"
                    :navigation="true"
                    :auto-height="true"
                    :class="$style.adSwiper"
                >
                    <SwiperSlide
                        v-for="ad in commonStore.getPageInfo.adInfo"
                        :key="ad.id"
                        :class="$style['ad-self']"
                    >
                        <div v-if="ad.adImage?.length" :class="$style['ad-img-box']">
                            <div :class="$style['ad-img']">
                                <ClientOnly>
                                    <Image
                                        :img-src="commonStore.getImg(webID, ad?.adImage[0])"
                                        :has-zoom="true"
                                        :class="$style['img']"
                                    />
                                </ClientOnly>
                            </div>
                        </div>
                        <div v-if="ad?.adTitle" :class="$style['ad-title']">
                            {{ ad?.adTitle }}
                        </div>
                        <Text
                            v-if="ad.adContent"
                            :class="$style['ad-content']"
                            :text="ad.adContent"
                        />
                        <div v-if="ad?.adYear || ad?.adDate" :class="$style['ad-date']">
                            {{ ad?.adYear }}<span v-if="ad?.adYear && ad?.adDate">/</span>{{ ad?.adDate }}
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.ad-modal-content {
    background: white;
    padding: 76px 35px;
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

.close {
    padding: 0;
    position: absolute;
    top: 20px;
    right: 20px;
    transition: all 0.3s;
    z-index: 9;
    &:hover {
        opacity: 0.8;
    }
}

.scrollBar_y{
    width: 100%;
}

// 輪播
.ad-img {
    margin: 0 41px;
    line-height: 0;
    height: 530px;
    .img {
        img {
            width: 100%;
            object-fit: contain;
            height: 100%;
        }
    }
}

.ad-title {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.5px;
    margin: 32px 41px;
    margin-bottom: 8px;
    line-height: 27px;
}

.ad-content {
    margin: 0 41px;
    line-height: 28px;
    letter-spacing: 2px;
    color: #221D1AB2;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 20px;
    word-break: break-word;
    text-align: justify;
}

.ad-date {
    color: #1E1E1ECC;
    font-weight: 600;
    margin-bottom: 30px;
    letter-spacing: 1px;
    margin: 0 41px;
}

.adSwiper {
    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        background-image: url('/images/biz/B06250401/ad_arrow.svg');
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

@media (max-width:640px) {

    .ad-modal-content {
        padding: 11vw 3vw;
        width: 100vw;
        height: 80%;
    }

    .ad-img {
        margin: 0 6vw;
        height: 83vw;
    }

    .ad-title {
        margin: 32px 6vw;
        margin-bottom: 8px;
    }

    .ad-content {
        margin: 0 6vw;
        margin-bottom: 20px;
    }

    .ad-date {
        margin: 0 6vw;
    }

    .adSwiper {
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
            top: 42vw;
        }
    }
}

@media (max-width:400px) {

    .ad-modal-content {
        padding: 15vw 3vw;
    }

}
</style>
