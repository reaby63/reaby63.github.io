<script setup>
import { ref, onMounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import QuickAccess from '@/components/QuickAccess.vue';
import Ad from './components/Ad.vue';
import About from './components/About.vue';
import Serve from './components/Serve.vue';
import Portfolio from './components/Portfolio.vue';
import Contact from './components/Contact.vue';

const commonStore = useCommonStore();

// Top按鈕---
const btnTop = ref(null);
const showBtnTop = ref(false);

onMounted(() => {
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        showBtnTop.value = scrollHeight > 200;
    });
});

const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
</script>

<template>
    <div :class="$style.bg">
        <div :class="$style.ccard">
            <About />
            <Serve />
            <Portfolio />
            <Contact />
            <!-- 快速瀏覽元件 -->
            <QuickAccess />
            <!-- GoTop -->
            <!-- <GoTop /> -->
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
                    <div>
                        <img src="/images/biz/B02250313/arrow-totop.svg">
                    </div>
                    <div>
                        TOP
                    </div>
                </button>
            </transition>
            <!-- 廣告彈窗 -->
            <Ad v-if="commonStore.popupInfo.type === 'ad'" />
        </div>
    </div>
</template>

<style lang="scss" module>
@use "./scss/all.scss" as *;

.ccard{
    max-width: 640px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.to-top {
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    width: 43px;
    height: 44px;
    position: fixed;
    transition: all .3s;
    z-index: 9;
    font-size: 12px;
    border: 0px;
    cursor: pointer;
    right: 14px;
    margin-right: 0;
    bottom: 30px;
    padding: 0;

    &:hover {
        opacity: 0.8;
    }

    img {
        width: 20px;
        margin-bottom: 3.225px;
    }
}

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

@media (min-width:640px) {
    .to-top {
        margin-right: 9px;
        bottom: 78px;
        right: calc(50% - 320px);
    }
}
</style>
