<script setup>
import { ref, onMounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import QuickAccess from '@/components/QuickAccess.vue';
import Ad from './components/Ad.vue';
import Header from './components/Header.vue';
import About from './components/About.vue';
import Portfolio from './components/Portfolio.vue';
import Environment from './components/Environment.vue';
import Contact from './components/Contact.vue';
import Service from './components/Service.vue';

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
            <Header />
            <About />
            <Portfolio />
            <Service />
            <Environment />
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
                    <div :class="$style['to-top-text']">
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

.follow-btn {
    font-weight: bold;
}

button {
    cursor: pointer;
    background-color: transparent;
    border: 0;
}

.to-top {
    z-index: 999;
    margin-right: 9px;
    color: #ffffff;
    background-color: rgba(31, 31, 31, 0.77);
    border-radius: 50%;
    width: 43px;
    height: 44px;
    position: fixed;
    bottom: 78px;
    right: calc(50% - 320px);
    transition: all .3s;
    z-index: 9;
    font-size: 12px;
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

@media (max-width:640px) {
    .to-top {
        right: 14px;
        margin-right: 0;
    }
}
</style>
