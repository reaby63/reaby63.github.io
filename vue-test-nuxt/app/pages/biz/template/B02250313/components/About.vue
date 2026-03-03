<script setup>
import { ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import Text from '@/pages/biz/components/Text.vue';
import { useCommunity } from '@/composables/useCommunity';
import Image from '@/components/Image.vue';
const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const modules = [Navigation];

// 社群元件套件
const prevRef = ref(null);
const nextRef = ref(null);
const {
    community,
    imgUrl,
    goPage
} = useCommunity();
</script>

<template>
    <div
        v-if="curPageData.basic?.image?.[0] ||
            curPageData.basic?.info?.name ||
            curPageData.basic?.info?.profession ||
            curPageData.introduce?.resume ||
            curPageData.community?.length"
        :class="$style.info"
    >
        <div :class="$style['info-in']">
            <div :class="$style.top">
                <div v-if="curPageData.basic?.image?.[0]" :class="$style['top-left']">
                    <ClientOnly>
                        <Image
                            :img-src="commonStore.getImg(webID, curPageData.basic?.image?.[0])"
                            :has-zoom="true"
                        />
                    </ClientOnly>
                </div>
                <div :class="$style['top-right']">
                    <h6 v-if="curPageData.basic?.info?.name">
                        {{ curPageData.basic?.info?.name }}
                    </h6>
                    <p v-if="curPageData.basic?.info?.profession">
                        ─ {{ curPageData.basic?.info?.profession }}
                    </p>
                </div>
            </div>
            <div :class="$style.down">
                <Text
                    v-if="curPageData.introduce?.resume"
                    :class="$style.p"
                    :text="curPageData.introduce?.resume"
                />
                <div :class="$style['social-place']">
                    <div v-if="community.length" :class="$style['community-wrap']">
                        <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : community.length < 5 }]">
                            <img src="/images/biz/B02250313/arrow-r.svg">
                        </div>
                        <Swiper
                            :class="[$style['community-swiper-wrap'], {[$style['align-left']] : community.length < 5}]"
                            :modules="modules"
                            :slides-per-view="4"
                            :navigation="{
                                prevEl: prevRef,
                                nextEl: nextRef
                            }"
                        >
                            <SwiperSlide v-for="(item, index) in community" :key="index">
                                <div
                                    :class="$style['community-item']"
                                    @click="goPage(item)"
                                >
                                    <div
                                        :class="[$style['item-img'], $style[`is-${item.key}`]]"
                                        :style="{
                                            'mask-image': `url(${item.maskUrl})`
                                        }"
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div ref="nextRef" :class="[$style['swiper-next'], {[$style['without-arrow']] : community.length < 5 }]">
                            <img src="/images/biz/B02250313/arrow-r.svg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.info {
    background-image: url('/images/biz/B02250313/bg_01.jpg');
    background-size: cover; /* 寬度100%，高度50% */
    background-position: top; /* 讓背景對齊上方 */
    position: relative;
    color: #434343;
    &::before {
        content: "";
        display: block;
        width: 100%;
        height: 29px;
        position: absolute;
        background-image: url('/images/biz/B02250313/bg_01_top.png');
        background-size: cover;
        background-position: top;
        top: -21px;
    }
}

.info-in {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 0.5s;
    padding: 16px 35px;
    padding-bottom: 43px;
}

.top {
    display: flex;
    align-items: center;
    margin-bottom: 13px;
}

.top-left {
    width: 102px;
    height: 102px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    img {
        height: 100%;
        width: 100%;
    }
}

.top-right {
    width: calc(100% - 102px);
    margin-top: 9px;
    h6,
    p {
        margin: 0;
        margin-left: 12px;
    }
    h6 {
        font-weight: 400;
        font-size:22px;
        color: #204665;
        font-family: "Iansui", sans-serif;
        letter-spacing: 1.1px;
        margin-bottom: 10px;
        line-height: 25px;
    }
    p {
        font-size: 15px;
        color: #6f6f6f;
        font-weight: 600;
        line-height: 23px;
    }
}

.down {
    font-size: 15px;
    line-height: 30px;
    padding-left: 9px;
    padding-right: 6px;
    .p {
        margin-bottom: 20px;
        letter-spacing: 0.73px;
    }
}

// 社群套件
.community-wrap {
    width: 250px;
    display: flex;
    align-items: center;
}

.arrow-btn {
    display: block;
    width: 9px;
    height: 15px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }

    &:global(.swiper-button-disabled) {
        opacity: 0.7;
        cursor: initial;
    }
}

.swiper-prev,
.swiper-next {
    composes: arrow-btn;
    width: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-sizing: border-box;
    img {
        position: relative;
        width: 100%;
    }
    &.without-arrow {
        display: none;
    }
}

.swiper-prev {
    transform: rotateY(180deg);
    margin-right: 17px;
    img {
        left: 0.8px;
    }
}

.community-swiper-wrap {
    width: 100%;
    max-width: 216px;
    margin-left: 0;
    &.align-left {
        margin-left: -12px;
    }
}

.community-item {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    padding: 6px;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    &:hover {
        opacity: 0.7;
    }
}

.item-img {
    display: block;
    width: 20px;
    height: 20px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    position: relative;
    transition: all 0.2s;
    background-color: #fff;
}

.swiper-next {
    margin-left: 17px;
    img {
        left: 0.6px;
    }
}
</style>
