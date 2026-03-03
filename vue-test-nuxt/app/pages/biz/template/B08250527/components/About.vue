<script setup>
import { ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Text from '@/pages/biz/components/Text.vue';
import { useCommunity } from '@/composables/useCommunity';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
    
// 社群
const modules = [Navigation];
const prevRef = ref(null);
const nextRef = ref(null);
const {
    community,
    imgUrl,
    goPage
} = useCommunity({
    ig: '/images/biz/B08250527/ig.svg',
    fb: '/images/biz/B08250527/fb.svg',
    line: '/images/biz/B08250527/line.svg',
    threads: '/images/biz/B08250527/threads.svg'
});
</script>

<template>
    <div
        v-if="curPageData.basic.info?.profession || curPageData.introduce?.resume || curPageData.community?.length"
        :class="[
            $style.about,
            { [$style['one-community']]: curPageData.community?.length < 2 },
            { [$style['two-community']]: curPageData.community?.length === 2 },
        ]"
    >
        <div :class="$style['about-text']">
            <div v-if="curPageData.basic.info?.profession" :class="$style['about-title']">
                {{ curPageData.basic.info?.profession }}
            </div>
            <Text
                v-if="curPageData.introduce?.resume"
                :class="$style.resume"
                :text="curPageData.introduce?.resume"
            />
        </div>
        <div v-if="community?.length" :class="$style['community-wrap']">
            <!-- 自定義箭頭 -->
            <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : community?.length < 4 }]" />
            <Swiper
                :class="$style['community-swiper-wrap']"
                :modules="modules"
                :slides-per-view="3"
                :navigation="{
                    prevEl: prevRef,
                    nextEl: nextRef
                }"
                direction="vertical"
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
            <div ref="nextRef" :class="[$style['swiper-next'], {[$style['without-arrow']] : community?.length < 4 }]" />
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.about {
    padding-top: 13px;
    margin-left: 60px;
    margin-right: 55px;
    margin-bottom: 60px;
    position: relative;
    min-height: 165px;
    &.one-community {
        min-height: auto;
    }
    &.two-community {
        min-height: 70px;
    }
}
.about-text {
    margin-right: 210px;
    .about-title {
        font-size: 18px;
        letter-spacing: 1px;
        margin-bottom: 15px;
        font-weight: 600;
        line-height: 22px;
    }
    .resume {
        color: #221D1AB2;
        font-weight: 330;
        line-height: 28px;
        letter-spacing: 2px;
        font-family: "MiSans TC", Arial, sans-serif;
    }
}

// 社群套件
.community-wrap {
    height: 190px;
    width: 36px;
    position: absolute;
    top: 0;
    right: 0;
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
        opacity: 0.2;
        cursor: initial;
    }
}

.swiper-prev {
    composes: arrow-btn;
    width: 36px;
    height: 32px;
    background-color: #221D1A;
    mask: url('/images/biz/B08250527/social_arrow.svg') no-repeat center center;
    &.without-arrow {
        display: none;
    }
}

.community-swiper-wrap {
    height: calc(100% - 18px - 13px);
    width: 36px;
    margin: 8px 0;
    >div {
        >div {
            display: flex;
            align-items: center;
        }
    }
}

.community-item {
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    margin: 0 auto;
    padding: 6px;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: 50%;
    background-color: #D7D0C9;

    &:hover {
        background-color: #A39689;
        .item-img {
            background-color: #FFFFFF;
        }
    }
}

.item-img {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    position: relative;
    background-color: #221D1A;
    transition: all 0.2s;
}

.swiper-next {
    composes: arrow-btn;
    width: 36px;
    height: 32px;
    background-color: #221D1A;
    mask: url('/images/biz/B08250527/social_arrow.svg') no-repeat center center;
    transform: rotate(180deg);
    &.without-arrow {
        display: none;
    }
}

@media (max-width:600px) {
    .about-text {
        margin-right: 60px;
    }
}

</style>
