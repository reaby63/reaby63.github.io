<script setup>
import { ref, computed, useCssModule } from 'vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Image from '@/components/Image.vue';
import Text from '@/pages/biz/components/Text.vue';

const modules = [Navigation, Pagination];
const $style = useCssModule();
const commonStore = useCommonStore();

// 輪播tag
const currentIndex = ref(0);
const isShow = ref(true);

const webID = computed(() => commonStore.userInfo?.webID || '');

function onClose() {
    isShow.value = false;

    // 錯開關閉時間，使動畫可執行，勿刪
    setTimeout(() => {
        commonStore.actionSetPopupInfo({ type: '', value: {} });
    }, 500);
}

function onSlideChange(swiper) {
    currentIndex.value = swiper.realIndex;
}
</script>

<template>
    <Popup v-model:visible="isShow" @close="onClose">
        <div :class="$style['ad-modal-content']">
            <button :class="$style.close" @click="onClose">
                <img src="/images/biz/B08250527/cross_btn.svg">
            </button>
            <div :class="$style['scrollBar-y']">
                <Swiper
                    :modules="modules"
                    :loop="true"
                    :navigation="true"
                    :auto-height="true"
                    :class="$style.adSwiper"
                    :pagination="{
                        dynamicBullets: true,
                    }"
                    @slide-change="onSlideChange"
                >
                    <SwiperSlide
                        v-for="ad in commonStore.popupInfo.value"
                        :key="ad.id"
                        :class="$style['ad-self']"
                    >
                        <div v-if="ad?.adYear || ad?.adDate" :class="$style['ad-date']">
                            {{ ad?.adYear }}<span v-if="ad?.adYear && ad?.adDate"> / </span>{{ ad?.adDate }}
                        </div>
                        <div v-if="ad?.adTitle" :class="$style['ad-title']">
                            {{ ad?.adTitle }}
                        </div>
                        <div v-if="ad?.adImage[0]" :class="$style['ad-img-range']">
                            <div :class="$style['ad-img']">
                                <ClientOnly>
                                    <Image
                                        :img-src="commonStore.getImg(webID, ad?.adImage[0])"
                                        :has-zoom="true"
                                    />
                                </ClientOnly>
                            </div>
                        </div>
                        <Text
                            v-if="ad.adContent"
                            :class="$style['ad-content']"
                            :text="ad.adContent"
                        />
                    </SwiperSlide>
                    <div :class="$style['ad-tag']">
                        {{ currentIndex + 1 }} / {{ commonStore.popupInfo.value.length }}
                    </div>
                </Swiper>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.ad-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    z-index: 99999;
}

.ad-modal-content {
    background: white;
    padding: 40px;
    border-radius: 4px;
    width: 100%;
    max-width: 640px;
    position: relative;
    max-height: 100dvh;
    min-height: auto;
    box-sizing: border-box;
    display: flex;
    img {
        width: 100%;
    }
}

.close {
    padding: 0;
    position: absolute;
    top: 15px;
    right: 15px;
    transition: all 0.3s;
    z-index: 9;
    &:hover {
        opacity: 0.8;
    }
}

// 輪播
.adSwiper {
    position: relative;
    .ad-tag {
        position: absolute;
        top: calc(15px + 19px + 22px + 60px);
        right: 15px;
        color: #ffffff;
        background-color: #221D1ACC;
        border-radius: 8px;
        padding: 5px 8px;
        font-size: 12px;
        font-weight: 330;
        font-family: "MiSans TC", Arial, sans-serif;
        z-index: 1;
        opacity: 0;
        transition: all 0.3s;
    }

    .ad-date {
        color: #947F73;
        font-weight: 330;
        font-family: "MiSans TC", Arial, sans-serif;
        text-align: center;
        margin-bottom: 30px;
        letter-spacing: 1px;
        font-size: 14px;
    }

    .ad-title {
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 4px;
        margin-bottom: 30px;
    }

    .ad-img {
        border-radius: 20px 20px 4px 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px #DFDFDF;
        box-sizing: border-box;
        height: 280px;
        overflow: hidden;
        img {
            height: 100%;
            object-fit: contain;
        }
    }

    .ad-content {
        margin-top: 52px;
        padding: 10px;
        line-height: 28px;
        letter-spacing: 2px;
        color: #221D1AB2;
        text-align: center;
        font-weight: 330;
        overflow-wrap: break-word;
        word-break: break-word;
        word-wrap: break-word;
        font-family: "MiSans TC", Arial, sans-serif;
    }

    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
        top: calc(280px + 19px + 22px + 60px - 30px);
        width: 36px;
        height: 36px;
        background-color: #FFFFFF;
        border-radius: 50%;
        border: solid 1px #DFDFDF;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        color: transparent;
        opacity: 0;

        &:after {
            line-height: 0;
            width: 22px;
            height: 22px;
            mask: url('/images/biz/B08250527/ad_arrow.svg') no-repeat center;
            mask-size: cover;
            background-color: #221D1A;
        }

        &:hover {
            background-color: #A39689;

            &:after {
                background-color: #FFFFFF;
            }
        }
    }

    &:hover {
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
            opacity: 1;

            &:global(.swiper-button-disabled) {
                opacity: 0.35;
            }
        }

        .ad-tag {
            opacity: 1;
        }
    }

    :global(.swiper-button-prev) {
        transform: rotate(180deg);
        left: 15px;
    }

    :global(.swiper-button-next) {
        right: 15px;
    }
    // 中間的點點
    :global(.swiper-horizontal) > :global(.swiper-pagination-bullets):global(.swiper-pagination-bullets-dynamic),
    :global(.swiper-pagination-horizontal):global(.swiper-pagination-bullets):global(.swiper-pagination-bullets-dynamic) {
        position: absolute;
        top: calc(280px + 19px + 22px + 60px + 15px);
        z-index: 999;
    }

    :global(.swiper-horizontal) > :global(.swiper-pagination-bullets) :global(.swiper-pagination-bullet),
    :global(.swiper-pagination-horizontal):global(.swiper-pagination-bullets) :global(.swiper-pagination-bullet) {
        margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 2px);
    }

    :global(.swiper-pagination-bullet) {
        width: var(--swiper-pagination-bullet-width, var(--swiper-pagination-bullet-size, 7px));
        height: var(--swiper-pagination-bullet-height, var(--swiper-pagination-bullet-size, 5px));
    }

    :global(.swiper-pagination-bullet-active) {
        width: 8px;
        height: 5px;
        background-color: #A39689;
        border-radius: 10px;
        margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 3px) !important;
    }
}

@media (max-width:640px) {

    .adSwiper {
        .ad-img {
            height: 44vw;
        }

        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
            top: calc(44vw + 19px + 22px + 60px - 32px);
        }

        :global(.swiper-horizontal) > :global(.swiper-pagination-bullets):global(.swiper-pagination-bullets-dynamic),
        :global(.swiper-pagination-horizontal):global(.swiper-pagination-bullets):global(.swiper-pagination-bullets-dynamic) {
            top: calc(44vw + 19px + 22px + 60px + 15px);
        }

        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
            opacity: 1;
            :global(.swiper-button-disabled){
                opacity: 0.35;
            }
        }
    }
}
</style>
