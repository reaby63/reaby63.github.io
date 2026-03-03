<script setup>
import { ref, onMounted, useCssModule, onUnmounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import QuickAccess from '@/components/QuickAccess.vue';
import Ad from './components/Ad.vue';
import Portfolio from './components/Portfolio.vue';
import About from './components/About.vue';
import Header from './components/Header.vue';
import Services from './components/Services.vue';
import Contact from './components/Contact.vue';
import Footer from '@/components/Footer.vue';

const $style = useCssModule();
const commonStore = useCommonStore();

// 載入動畫---
const jumpPortfolio = ref(null);
const jumpServices = ref(null);
const jumpContact = ref(null);
const hasAnimated = ref([false, false, false]);

const windowScroll = () => {
    const elementsAn = [
        jumpServices.value,
        jumpPortfolio.value,
        jumpContact.value
    ];
    elementsAn.forEach((el, i) => {
        if (!el || hasAnimated.value[i]) return;
        const elPosition = el.getBoundingClientRect();
        const reset = 100;
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

            <About :class="$style['info-an']" />

            <div
                ref="jumpServices"
                :class="[{ [$style.slideUpFadeIn]: hasAnimated[0] }, $style.resetAn]"
            >
                <Services />
            </div>

            <div
                ref="jumpPortfolio"
                :class="[
                    { [$style.slideUpFadeIn]: hasAnimated[1] }, $style.resetAn]"
            >
                <Portfolio />
            </div>

            <div
                ref="jumpContact"
                :class="[{ [$style.slideUpFadeIn]: hasAnimated[2] }, $style.resetAn]"
            >
                <Contact />
            </div>

            <QuickAccess />
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
                    <img src="/images/biz/B06250411/arrow-totop.svg">
                    <div>
                        TOP
                    </div>
                </button>
            </transition>
            <Ad v-if="commonStore.popupInfo.type === 'ad'" />
            <Footer />
        </div>
    </div>
</template>

<style lang="scss" module>
@use "./scss/all.scss" as *;

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
    margin-right: 10px;
    color: #000000;
    background-color: rgba($color: #ffffff, $alpha: 0.7);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 70px;
    right: calc(50% - 320px);
    transition: all .3s;
    border: solid 2px #000000;
    z-index: 9;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.6px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    div {
        margin-left: 0.6px;
        margin-top: 5px;
        font-weight: 500;
    }

    &:hover {
        opacity: 0.8;
    }

    img {
        width: 14px;
        position: relative;
        top: 3.8px;
    }
}

// 動畫-------
.resetAn {
    opacity: 0;
    transform: translateY(50px);
}

.slideUpFadeIn {
    opacity: 0;
    animation: slideUpFadeIn_big 2s ease forwards;
}

.info-an {
    opacity: 0;
    animation: slideUpFadeIn 2s ease forwards;
    animation-delay: 1s;
}

@media (max-width:640px) {
    .to-top {
        right: 14px;
        margin-right: 0;
    }
}

@media (max-width:450px) {
    .to-top {
        width: 40px;
        height: 40px;
        bottom: 66px;
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
</style>
