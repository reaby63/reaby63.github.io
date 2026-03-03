<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCommunity } from '@/composables/useCommunity';
import { Navigation } from 'swiper/modules';

const modules = [Navigation];
const prevRef = ref(null);
const nextRef = ref(null);
const {
    community,
    imgUrl,
    goPage
} = useCommunity({
    ig: '/images/biz/B06250401/ig.svg',
});
</script>

<template>
    <div v-if="community?.length" :class="$style['community-wrap']">
        <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : community?.length < 5 }]">
            <img src="/images/biz/B09250825/community-arrow.svg">
        </div>
        <Swiper
            :class="$style['community-swiper-wrap']"
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
        <div ref="nextRef" :class="[$style['swiper-next'], {[$style['without-arrow']] : community?.length < 5 }]">
            <img src="/images/biz/B09250825/community-arrow.svg">
        </div>
    </div>
</template>

<style lang="scss" module>
// 社群套件
.community-wrap {
    width: 216px;
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
        opacity: 0.5;
        cursor: initial;
    }
}

.swiper-prev {
    composes: arrow-btn;
    height: 30px;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    img {
        position: relative;
        left: 0.8px;
    }
    &.without-arrow {
        display: none;
    }
}

.community-swiper-wrap {
    width: calc(100% - 36px);
}

.community-item {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    margin: 0 auto;
    padding: 6px;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5E5338;
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
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    img {
        position: relative;
        left: 0.6px;
    }
    &.without-arrow {
        display: none;
    }
}
</style>
