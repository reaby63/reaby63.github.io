<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCommunity } from '@/composables/useCommunity';

const modules = [Navigation];
const prevRef = ref(null);
const nextRef = ref(null);
const {
    community,
    imgUrl,
    goPage
} = useCommunity({
    ig: '/images/biz/B06250319/ig.svg'
});
</script>

<template>
    <div v-if="community?.length" :class="$style['community-wrap']">
        <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : community?.length < 5 }]">
            <img src="/images/biz/B09250515/social_arrow.svg">
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
            <img src="/images/biz/B09250515/social_arrow.svg">
        </div>
    </div>
</template>

<style lang="scss" module>
// 社群套件
.community-wrap {
    width: 200px;
    display: flex;
    align-items: center;
    margin-top: 18px;
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
    width: 13.82px;
    height: 13.82px;
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
    width: calc(100% - 24.18px);
}

.community-item {
    box-sizing: border-box;
    width: 24.18px;
    height: 24.18px;
    margin: 0 auto;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: 5.53px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EB1B26F0;
    &:hover {
        background-color: #FF8000;
    }
}

.item-img {
    display: block;
    width: 13.82px;
    height: 13.82px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    position: relative;
    transition: all 0.2s;
    background-color: #FBEFD8;
}

.swiper-next {
    composes: arrow-btn;
    width: 13.82px;
    height: 13.82px;
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
