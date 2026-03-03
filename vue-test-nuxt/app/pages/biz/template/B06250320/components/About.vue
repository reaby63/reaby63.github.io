<script setup>
import { ref, computed } from 'vue';
import Text from '@/pages/biz/components/Text.vue';
import { useCommonStore } from '@/stores/common';
import { useRoute } from 'vue-router';
import { useFollow } from '@/composables/useFollow.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCommunity } from '@/composables/useCommunity';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const route = useRoute();
const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});

// 社群元件套件
const modules = [Navigation];
const prevRef = ref(null);
const nextRef = ref(null);

const {
    community,
    imgUrl,
    goPage
} = useCommunity({
    ig: '/images/biz/B06250401/ig.svg'
});
</script>

<template>
    <div :class="$style.info">
        <div :class="$style.top">
            <div :class="$style['top-left']">
                <div :class="$style['top-img']">
                    <ClientOnly>
                        <Image
                            v-if="webID&&curPageData.basic.image?.[0]"
                            :img-src="commonStore.getImg(webID, curPageData.basic.image?.[0])"
                            :has-zoom="true"
                        />
                        <img v-else src="/images/biz/B06250320/no-image.png">
                    </ClientOnly>
                </div>
            </div>
            <div :class="$style['top-right']">
                <!-- 追蹤 -->
                <!-- <div
                    :class="[$style['follow-btn'], { [$style['is-active']]: curFollow }]"
                    @click="onChange"
                >
                    <span>{{ curFollow ? '已追蹤' : '追蹤' }}</span>
                </div> -->
                <div v-if="curPageData.basic.info?.name || curPageData.basic.info?.enName" :class="$style.name">
                    {{ curPageData.basic.info?.name }}<span>{{ curPageData.basic.info?.enName }}</span>
                </div>
                <p v-if="curPageData.basic.info?.profession" :class="$style.tag">
                    <span>
                        {{ curPageData.basic.info?.profession }}
                    </span>
                </p>
                <Text
                    v-if="curPageData.introduce?.resume"
                    :class="$style.in"
                    :text="curPageData.introduce?.resume"
                />
            </div>
        </div>
        <div :class="$style.bottom">
            <div v-if="community.length" :class="$style['community-wrap']">
                <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : community.length < 5 }]">
                    <img src="/images/biz/B06250320/arrow-r.svg">
                </div>
                <Swiper
                    :class="[$style['community-swiper-wrap'], {[$style['align-center']] : community.length < 4 }]"
                    :modules="modules"
                    :slides-per-view="4"
                    :navigation="{
                        prevEl: prevRef,
                        nextEl: nextRef
                    }"
                >
                    <SwiperSlide v-for="(item, index) in community" :key="index">
                        <div :class="$style['community-item']" @click="goPage(item)">
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
                    <img src="/images/biz/B06250320/arrow-r.svg">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.follow-btn {
    background-color: rgba($color: #000000, $alpha: 0.6);
    border-radius: 25px;
    width: 110px;
    font-size: 14px;
    color: #d2d7db;
    height: 40px;
    transition: all .2s;
    border: solid 1px #858585;
    position: absolute;
    top: -179px;
    right: -50px;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    &::before {
        content: url('/images/biz/B06250401/heart-line.svg');
        display: inline-block;
        width: 20px;
        position: relative;
        top: 2px;
        margin-right: 9px;
        line-height: 1;
        margin-left: -5px;
    }
    &.active {
        &::before {
            content: url('/images/biz/B06250401/heart.svg');
            top: 2px;
        }
    }
}

.info {
    margin-bottom: 70px;
    position: relative;
}

.top {
    display: flex;
}

.top-left {
    display: inline-block;
}

.top-img {
    width: 256px;
    height: 256px;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    aspect-ratio: 256 / 256;
    img {
        height: 100%;
        width: 100%;
    }
}

.top-right {
    display: inline-block;
    width: calc(100% - 256px - 35px);
    margin-left: 35px;
}

.name,
.tag,
.in {
    letter-spacing: 0.5px;
}

.name {
    font-size: 24px;
    margin-bottom: 5px;
    font-family: "Noto Sans TC", Arial , sans-serif;
    font-weight: 600;
    color: #1E1E1E;
    text-shadow: 0.1px 0 0 currentColor, -0.1px 0 0 currentColor;
    line-height: 35px;
    span {
        font-weight: 600;
        display: inline-block;
        margin-left: 10px;
        letter-spacing: 0.5px;
    }
}

.tag,
.in {
    font-size: 15px;
    color: rgba($color: #1E1E1E, $alpha: 0.8);
}

.in {
    line-height: 1.8em;
    text-align: justify;
}

.tag {
    margin-bottom: 30px;
    line-height: 22px;
    span {
        display: inline-block;
        font-weight: 300;
        letter-spacing: 0.5px;
    }
}

// 社群套件
.community-wrap {
    width: 256px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 285px;
    left: 0;
}

.community-swiper-wrap {
    width: 100%;
    margin: 0;
    &.align-center {
        :global(.swiper-wrapper) {
            justify-content: center;
        }
    }
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

.swiper-prev {
    composes: arrow-btn;
    width: 27px;
    height: 30px;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    img {
        position: relative;
        left: 0.8px;
        width: 5px;
        height: 10px;
    }
    &.without-arrow {
        display: none;
    }
}

.community-item {
    box-sizing: border-box;
    width: 35px;
    height: 35px;
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
        opacity: 0.8;
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
    composes: arrow-btn;
    width: 27px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    img {
        position: relative;
        left: 0.6px;
        width: 5px;
        height: 10px;
    }
    &.without-arrow {
        display: none;
    }
}

@media (max-width: 550px) {
    .top-right {
        margin-left: 15px;
    }
}

@media (max-width: 500px) {
    .follow-btn {
        width: 50px;
        top: 0;
        right: 0;
        opacity: 0;
        animation: fadeInSlideUp 1s ease-in-out forwards;
        span {
            display: none;
        }
        &::before {
            margin: 0;
        }
    }
    .info {
        margin-bottom: 40px;
    }
    // .name {
    //     width: calc(100% - 55px);
    // }
    .top {
        display: block;
        margin-bottom: 25px;
    }
    .top-right {
        position: relative;
    }
    .top-right,
    .top-left {
        display: block;
        width: 100%;
        margin-left: 0px;
    }
    .top-img {
        width: 100%;
        overflow: hidden;
        height: auto;
        max-height: 93vw;
    }
    .tag {
        margin-bottom: 15px;
    }
    .community-wrap {
        position: initial;
    }
    .bottom {
        display: flex;
        justify-content: center;
    }
}

@media (max-width: 385px) {
    .community-wrap {
        width: 229px;
    }
}
</style>
