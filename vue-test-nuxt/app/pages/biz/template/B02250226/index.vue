<script setup>
import { ref, computed, onMounted, useCssModule, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';
import QuickAccess from '@/components/QuickAccess.vue';
import GoTop from '@/components/GoTop.vue';
import Ad from './components/Ad.vue';
import About from './components/About.vue';
import Link from './components/Link.vue';
import Portfolio from './components/Portfolio.vue';
import Company from './components/Company.vue';
import Serve from './components/Serve.vue';

const commonStore = useCommonStore();
const route = useRoute();
const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});

// Top按鈕---
const btnTop = ref(null);
const showBtnTop = ref(false);
onMounted(() => {
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        showBtnTop.value = scrollHeight > 200;
    });
});

// 滑動至頂部
const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
</script>

<template>
    <div :class="$style.bg">
        <div :class="$style.card">
            <!-- 追蹤 -->
            <!-- <div
                :class="[$style['follow-btn'], { [$style['is-active']]: curFollow }]"
                @click="onChange"
            >
                {{ curFollow ? '已追蹤' : '追蹤' }}
            </div> -->
            <About />
            <Serve />
            <Portfolio />
            <Company />
            <!-- 優質廠商 -->
            <Link />
            <!-- 快速瀏覽元件 -->
            <QuickAccess />
            <!-- GoTop -->
            <transition
                :enter-active-class="$style['topBtnFade-enter-active']"
                :leave-active-class="$style['topBtnFade-leave-active']"
                :enter-from-class="$style['topBtnFade-enter-from']"
                :leave-from-class="$style['topBtnFade-leave-from']"
                :enter-to-class="$style['topBtnFade-enter-to']"
                :leave-to-class="$style['topBtnFade-leave-to']"
                name="topBtnFade"
            >
                <button
                    v-show="showBtnTop"
                    ref="btnTop"
                    :class="$style['to-top']"
                    @click="toTop"
                >
                    <img src="/images/biz/B02250218/arrow-totop.svg">
                    <div :class="$style['to-top-text']">
                        TOP
                    </div>
                </button>
            </transition>
        </div>
        <!-- 廣告彈窗 -->
        <Ad v-if="commonStore.popupInfo.type === 'ad'" />
    </div>
</template>

<style lang="scss" module>
@use "./scss/all.scss" as *;

.card {
    max-width: 640px;
    background-color: #fff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    line-height: 1.6;
}

.follow-btn {
    font-weight: bold;
}

.to-top {
    z-index: 999;
    border: none;
    margin-right: 9px;
    color: #ffffff;
    background-color: #1f1f1f;
    font-size: 13px;
    border-radius: 50%;
    padding: 7px 8px;
    position: fixed;
    bottom: 78px;
    right: calc(50% - 320px);
    transition: all 0.3s;
    cursor: pointer;
    opacity: 0.77;
    &:hover {
        opacity: 0.8;
    }
    img {
        width: 20px;
        display: block;
        margin: 0 auto 3.225px auto;
    }
}

.to-top-text {
    transform: translateY(-1px);
}

@media (max-width:640px) {
    .to-top {
        right: 14px;
        margin-right: 0;
    }

    .card {
        position: relative;
    }
}

// top按鈕 淡入淡出
.topBtnFade-enter-active,
.topBtnFade-leave-active {
    transition: opacity 0.3s ease;
}
.topBtnFade-enter-from,
.topBtnFade-leave-to {
    opacity: 0;
}
.topBtnFade-enter-to,
.topBtnFade-leave-from {
    opacity: 1;
}
</style>
