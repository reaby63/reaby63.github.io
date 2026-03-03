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
    <div v-if="community?.length" :class="[$style['community-wrap'],{[$style['less-than-five']] : community?.length < 5 }]">
        <div ref="prevRef" :class="[$style.arrow, $style['arrow-left']]">
            <img src="/images/biz/B06250319/arrow-l.svg">
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
        <div ref="nextRef" :class="[$style.arrow, $style['arrow-right']]">
            <img src="/images/biz/B06250319/arrow-r.svg">
        </div>
    </div>
</template>
<style lang="scss" module>
.community-wrap {
    width: 290px;
    margin-bottom: 30px;
    display: flex;
    :global(.swiper-button-disabled) {
        opacity: 0.5;
        cursor: initial;
    }
}
.arrow {
    padding: 5px;
    transition: all .2s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        opacity: 0.8;
    }

    img {
        width: 5px;
        height: 10px;
    }

    &.arrow-left {
        margin-right: 25px;
    }

    &.arrow-right {
        margin-left: 25px;
    }
}
.community-swiper-wrap {
    width: calc(100% - 18px - 13px);
}
.community-item {
    box-sizing: border-box;
    width: 35px;
    height: 35px;
    margin: 0 auto;
    padding: 7.5px;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: 50%;
    background-color: #000;
    &:hover {
        opacity: 0.7;
    }
}
.item-img {
    display: block;
    width: 100%;
    height: 100%;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    background-color: #fff;
}

.less-than-five {
    :global(.swiper-wrapper) {
        justify-content: center;
    }
    .arrow {
        display: none;
    }
}

@media (max-width:500px) {
    .arrow {
        &.arrow-right {
            margin-left: 10px;
        }
        &.arrow-left {
            margin-right: 10px;
        }
    }
    .community-wrap {
        width: 225px;
    }
}
</style>
