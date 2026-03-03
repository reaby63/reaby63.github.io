<script setup>
import { ref, computed, onMounted, useCssModule, onUnmounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import Header from './components/Header.vue';
import Portfolio from './components/Portfolio.vue';
import Services from './components/Services.vue';
import AdCard from './components/AdCard.vue';
import Link from './components/Link.vue';
import Footer from '@/components/Footer.vue';
import QuickAccess from '@/components/QuickAccess.vue';

const $style = useCssModule();
const commonStore = useCommonStore();
// 追蹤
defineEmits(['get-info']);

const curPageData = computed(() => commonStore.getPageInfo);

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

// 載入動畫---
const jumpAbout = ref(null);
const jumpPortfolio = ref(null);
const jumpServices = ref(null);
const jumpContact = ref(null);
const jumpLink = ref(null);
const hasAnimated = ref([false, false, false, false, false]);

const windowScroll = () => {
    const elementsAn = [
        jumpAbout.value, jumpPortfolio.value, jumpServices.value, jumpContact.value, jumpLink.value
    ];
    elementsAn.forEach((el, i) => {
        if (!el) return;
        const elPosition = el.getBoundingClientRect();
        const reset = 100;
        if (elPosition.top < window.innerHeight + reset) {
            hasAnimated.value[i] = true;
        }
        if (elPosition.bottom < 10 || elPosition.top > window.innerHeight - 10) {
            hasAnimated.value[i] = false;
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
        <div :class="$style.card">
            <Header />
            <div
                ref="jumpAbout"
                :class="[
                    { [$style['jumpInOnly-an']]: hasAnimated[0] }, $style.resetAn
                ]"
            >
                <About />
            </div>
            <div
                ref="jumpPortfolio"
                :class="[{ [$style['jumpInOnly-an']]: hasAnimated[1] }, $style['portfolio-zindex']]"
            >
                <Portfolio />
            </div>
            <div
                ref="jumpServices"
                :class="[{ [$style['jumpInOnly-an']]: hasAnimated[2] }, $style.resetAn]"
            >
                <Services />
            </div>
            <div
                ref="jumpContact"
                :class="[{ [$style['jumpInOnly-an']]: hasAnimated[3] }, $style.resetAn]"
            >
                <Contact />
            </div>
            <div
                ref="jumpLink"
                :class="[{ [$style['jumpInOnly-an']]: hasAnimated[4] }, $style.resetAn]"
            >
                <Link />
                <Footer :class="$style.footer" />
            </div>
            <QuickAccess />
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
                    <img src="/images/biz/B06250401/arrow-totop.svg">
                    <div>
                        TOP
                    </div>
                </button>
            </transition>
        </div>
        <!-- AD彈跳視窗 -->
        <AdCard v-if="commonStore.popupInfo.type === 'ad'" />
    </div>
</template>

<style lang="scss" module>
@use "./scss/all.scss" as *;

button {
    cursor: pointer;
    background-color: transparent;
    border: 0px;
}

.card {
    max-width: 640px;
    background-color: #519DF4;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    line-height: 1.6;
}

.footer {
    padding: 0 34px 21px;
}

:global(.popup-wrap) {
    z-index: 999999;
}

:global(.swiper-wrap) {
    z-index: 999999;
}

.to-top {
    margin-right: 10px;
    color: #519DF4;
    background-color: rgba($color: #ffffff, $alpha: 0.8);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 68px;
    right: calc(50% - 320px);
    transition: all .3s;
    border: solid 1px #FFFFFFCC;
    z-index: 999;
    font-size: $font_size_XS;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 0;
    div {
        margin-left: 0.05em;
        margin-top: 5px;
        position: relative;
        top: -4px;
    }
    &:hover {
        opacity: 0.8;
    }
    img {
        width: 14px;
        position: relative;
        top: -1.2px;
    }
}

// 動畫原始設定 先拿掉
.resetAn {
    opacity: 0;
    transform: translateY(100px);
}

.portfolio-zindex {
    position: relative;
    z-index: 2;
    opacity: 0;
    transform: translateY(100px);
}

// 套用動畫class
.jumpInOnly-an {
    animation: jumpInOnly 1s ease-in-out forwards;
    animation-delay: 0.3s;
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

@media (max-width:450px) {
    .to-top {
        width: 40px;
        height: 40px;
        bottom: 66px;
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
