<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useCommunity } from '@/composables/useCommunity';

const prevRef = ref(null);
const nextRef = ref(null);
const {
    community,
    imgUrl,
    goPage
} = useCommunity();
</script>

<template>
    <div v-if="community?.length" :class="$style['community-wrap']">
        <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : community?.length < 5 }]">
            <img src="/images/biz/B02250226/social_arrow.svg">
        </div>
        <Swiper
            :class="[$style['community-swiper-wrap'],{ [$style['is-center']]: community?.length < 4 }]"
            :modules="[Navigation]"
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
        <div ref="nextRef" :class="[$style['swiper-next'], {[$style['without-arrow']] : community?.length < 5 }]">
            <img src="/images/biz/B02250226/social_arrow.svg">
        </div>
    </div>
</template>

<style lang="scss" module>
// 社群套件
.community-wrap {
    width: 228px;
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
        opacity: 0.4;
        cursor: initial;
    }
}

.swiper-prev {
    composes: arrow-btn;
    width: 25px;
    height: 35px;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    img {
        position: relative;
    }
    &.without-arrow {
        display: none;
    }
}

.community-swiper-wrap {
    width: calc(100% - 40px );
    &.is-center {
        :global(.swiper-wrapper) {
            justify-content: center;
        }
    }
}

.community-item {
    box-sizing: border-box;
    width: 33px;
    height: 33px;
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
    width: 25px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    img {
        position: relative;
    }
    &.without-arrow {
        display: none;
    }
}
</style>
