<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import QuickAccess from '@/components/QuickAccess.vue';
import Ad from './components/Ad.vue';
import About from './components/About.vue';
import Portfolio from './components/Portfolio.vue';
import Contact from './components/Contact.vue';
import Footer from '@/components/Footer.vue';

const commonStore = useCommonStore();

// Top按鈕---
const btnTop = ref(null);
const showBtnTop = ref(false);
const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

onMounted(() => {
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        showBtnTop.value = scrollHeight > 200;
    });
});

// 載入動畫---
const fadeinAbout = ref(null);
const fadeinPortfolio = ref(null);
const fadeinContact = ref(null);
const hasAnimated = ref([false, false, false]);

const windowScroll = () => {
    const elementsAn = [
        fadeinAbout.value, fadeinPortfolio.value, fadeinContact.value
    ];
    elementsAn.forEach((el, i) => {
        if (!el || hasAnimated.value[i]) return;
        const elPosition = el.getBoundingClientRect();
        const reset = -100;
        if (elPosition.top < window.innerHeight + reset) {
            hasAnimated.value[i] = true;
        }
    });
};

onMounted(() => {
    window.addEventListener('scroll', windowScroll);
    windowScroll();
});

onUnmounted(() => {
    window.removeEventListener('scroll', windowScroll);
});
</script>

<template>
    <div :class="$style.bg">
        <div :class="$style.ccard">
            <div
                ref="fadeinAbout"
                :class="[
                    { [$style['fadein-an']]: hasAnimated[0] }, $style.resetAn
                ]"
            >
                <About />
            </div>
            <div
                ref="fadeinPortfolio"
                :class="[
                    { [$style['fadein-an']]: hasAnimated[1] }, $style.resetAn
                ]"
            >
                <Portfolio />
            </div>
            <div
                ref="fadeinContact"
                :class="[
                    { [$style['fadein-an']]: hasAnimated[2] }, $style.resetAn
                ]"
            >
                <Contact />
            </div>
            <Footer :class="$style.footer" />
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
                />
            </transition>
            <!-- 廣告彈窗 -->
            <Ad v-if="commonStore.popupInfo.type === 'ad'" />
        </div>
    </div>
</template>

<style lang="scss" module>
@use "./scss/all.scss" as *;

.footer {
    background-color: #000;
    padding: 25px 37px;
}

.follow-btn {
    font-weight: bold;
}

.to-top {
    margin-right: 30px;
    background-color: #0D99FF;
    border-radius: 75px 75px 10px 75px;
    width: 48px;
    height: 48px;
    position: fixed;
    bottom: 60px;
    right: calc(50% - 320px);
    transition: all .3s;
    box-shadow: 0px 1.5px 0px 0px rgba(255, 255, 255, 0.08) inset, 0px 0px 1.5px 0px rgba(255, 255, 255, 0.35) inset, 0px 15px 36px 0px rgba(0, 0, 0, 0.45), 0px 4.5px 7.5px 0px rgba(0, 0, 0, 0.35);
    z-index: 9;
    border: 0;
    cursor: pointer;
    animation: totopOut 0.2s ease-in-out forwards;
    padding: 0;

    &::before{
        content: "";
        display: block;
        background-image: url('/images/biz/B08250401/chevron-up-small.svg');
        width: 48px;
        height: 48px;
        z-index: 999999;
        background-size: contain;
        position: relative;
        top: -3px;
        left: 1px;
        animation: totopOut 0.3s ease-in-out forwards;
    }

    &:hover {
        animation: totopIn 0.4s ease-in-out forwards;
        &::before {
            animation: totopIn 0.4s ease-in-out forwards;
        }
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
