<script setup>
import { ref, computed, useCssModule, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const $style = useCssModule();
const route = useRoute();

// 追蹤觸發
const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});

// 載入時的文字動態
const lines = commonStore.getPageInfo?.introduce?.title?.split('\n') || [];

const isAnimated = ref(false);

const generateChars = (text, index) => {
    const chars = text.split('');
    const lineDelay = index * 1.2;
    return chars.map((char, i) => ({
        char: char === ' ' ? '\u00A0' : char,
        delay: ((i * 0.05) + lineDelay).toFixed(2)
    }));
};

onMounted(() => {
    isAnimated.value = true;
});

// 小箭頭功能
const bannerRef = ref(null);
const toHead = () => {
    if (!bannerRef.value) return;

    const bannerBottom = bannerRef.value.offsetTop + bannerRef.value.offsetHeight;

    window.scrollTo({
        top: bannerBottom,
        behavior: 'smooth'
    });
};
</script>

<template>
    <div ref="bannerRef" :class="$style.banner">
        <!-- <div
            :class="[$style['follow-btn'], { [$style['is-active']]: curFollow }]"
            @click="onChange"
        >
            <span>{{ curFollow ? '已追蹤' : '追蹤' }}</span>
        </div> -->
        <ClientOnly>
            <div :class="$style['banner-img']">
                <img v-if="curPageData.introduce?.introduceImg?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.introduceImg?.[0])">
                <img v-else src="/images/biz/B06250411/pic_banner.png">
            </div>
        </ClientOnly>
        <div :class="$style['banner-title']">
            <h6
                v-for="(line, lineIndex) in lines"
                :key="lineIndex"
                :class="{ visible: isAnimated }"
            >
                <span
                    v-for="(c, charIndex) in generateChars(line, lineIndex)"
                    :key="charIndex"
                    :style="{ animationDelay: `${c.delay}s` }"
                >
                    {{ c.char }}
                </span>
            </h6>
        </div>
        <a :class="$style['banner-arrow']" @click="toHead">
            <img src="/images/biz/B06250411/btn_banner_scroll.svg">
        </a>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.follow-btn {
    background-color: rgba($color: #000000, $alpha: 1);
    border-radius: 25px;
    padding-top: 9px;
    padding-bottom: 12px;
    width: 110px;
    font-size: 14px;
    color: #d2d7db;
    height: 40px;
    transition: all .2s;
    border: solid 1px #858585;
    letter-spacing: 0.5px;
    position: absolute;
    top: 16px;
    right: 14px;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-sizing: border-box;

    span {
        position: relative;
        top: 2px;
    }

    &:hover {
        background-color: rgba($color: #000000, $alpha: 0.6);
    }

    &::before {
        content: url('/images/biz/B06250411/heart-line.svg');
        display: inline-block;
        width: 20px;
        position: relative;
        top: 3px;
        margin-right: 12px;
        line-height: 14px;
    }

    &.is-active {
        &::before {
            content: url('/images/biz/B06250411/heart.svg');
        }
    }
}

.banner {
    position: relative;
    margin: 34px;
    margin-bottom: 38px;
}

.banner-img {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0 30px 0 30px;
    margin-bottom: 15px;
    position: relative;
    overflow: hidden;
    aspect-ratio: 569 / 230;

    &::before {
        content: "";
        display: block;
        width: 100%;
        height: 230px;
        position: absolute;
        bottom: 0;
        background-image: url('/images/biz/B06250411/banner_mask.svg');
        background-size: cover;
        background-position: bottom;
        animation: bannerSize 5.5s ease forwards;
    }

    img {
        height: 100%;
        object-fit: cover;
        border-radius: 0 30px 0 30px;
        width: 100%;
    }
}

.banner-title h6 {
    display: block;
    margin-top: 0;
    margin-bottom: -4px;
    font-weight: 400;
    font-size: 40px;
    letter-spacing: 2px;
    font-family: "Limelight", sans-serif;
    color: #FFFFFF;

    &:last-child {
        margin-bottom: 0;
    }

    &.visible {
        visibility: visible;
    }

    span {
        line-height: 1.6;
        display: inline-block;
        opacity: 0;
        transform: translate3d(0, 20px, 0);
        animation: slideUpFadeIn 0.5s forwards;
    }
}

.banner-arrow {
    position: absolute;
    bottom: 22px;
    right: 0;
    animation: wiggle_up_down 2.5s ease-in-out infinite;
    line-height: 0;

    img {
        opacity: 0;
        width: 14px;
        animation: later_block 3s ease forwards;
    }
}

@media (max-width:500px) {
    .banner-title {
        h6 {
            font-size: 32px;
        }
    }
}
</style>
