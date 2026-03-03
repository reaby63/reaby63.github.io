<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCommunity } from '@/composables/useCommunity';

const modules = [Navigation];

const props = defineProps({
    previewCount: {
        type: Number,
        default: 4
    },
    templateId: {
        type: String,
        default: ''
    }
});

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
        <!-- 自定義箭頭 -->
        <div ref="prevRef" :class="$style['swiper-wrap']">
            <slot name="prevRef">
                <div :class="$style['swiper-prev']" />
            </slot>
        </div>
        <Swiper
            :class="[
                $style['community-swiper-wrap'],
                { [$style['is-center']]: community?.length < previewCount }
            ]"
            :modules="modules"
            :slides-per-view="previewCount"
            :navigation="{
                prevEl: prevRef,
                nextEl: nextRef
            }"
        >
            <SwiperSlide
                v-for="(item, index) in community"
                :key="index"
            >
                <div
                    :class="$style['community-item']"
                    :style="{'background-color': '#ccc'}"
                    @click="goPage(item)"
                >
                    <div
                        :class="[
                            $style['item-img'],
                            $style[`is-${item.key}`]]"
                        :style="{
                            'mask-image': `url(${item.maskUrl})`
                        }"
                    />
                </div>
            </SwiperSlide>
        </Swiper>
        <div ref="nextRef" :class="$style['swiper-wrap']">
            <slot name="nextRef">
                <div :class="$style['swiper-next']" />
            </slot>
        </div>
    </div>
</template>

<style lang="scss" module>
.community-wrap {
    width: 230px;

    :global(.swiper-button-disabled) {
        cursor: initial;
        opacity: 0.5;
    }
}

.swiper-wrap {
    cursor: pointer;
}

.arrow-btn {
    display: block;
    width: 6px;
    height: 10px;
    transition: all 0.2s;

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
    background: url('/images/biz/B06250317/arrow-l.svg') no-repeat;
    background-size: 5px 10px;
    background-position: center;
    padding: 5px;
    margin-right: 24px;
}

.community-swiper-wrap {
    width: 100%;
    max-width: 290px;
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
    background-color: #000;
}

.swiper-next {
    composes: arrow-btn;
    background: url('/images/biz/B06250317/arrow-r.svg') no-repeat;
    background-size: 5px 10px;
    background-position: center;
    padding: 5px;
    margin-left: 24px;
}

@media (max-width:500px) {
    .community-swiper-wrap {
        &.is-center {
            :global(.swiper-wrapper) {
                justify-content: center !important;
            }
        }
    }
}
</style>
