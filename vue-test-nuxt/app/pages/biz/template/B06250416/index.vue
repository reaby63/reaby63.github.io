<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import QuickAccess from '@/components/QuickAccess.vue';
import Ad from './components/Ad.vue';
import Header from './components/Header.vue';
import About from './components/About.vue';
import Portfolio from './components/Portfolio.vue';
import Comment from './components/Comment.vue';
import Store from './components/Store.vue';
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

// 載入動畫---
const fadeInAbout = ref(null);
const fadeInPortfolio = ref(null);
const fadeInComment = ref(null);
const fadeInStore = ref(null);
const fadeInContact = ref(null);
const hasAnimated = ref([false, false, false, false, false]);

const windowScroll = () => {
    const elementsAn = [
        fadeInAbout.value, fadeInPortfolio.value, fadeInComment.value, fadeInStore.value, fadeInContact.value
    ];
    elementsAn.forEach((el, i) => {
        if (!el || hasAnimated.value[i]) return;
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
        <div :class="$style.ccard">
            <Header />
            <div
                ref="fadeInAbout"
                :class="[
                    { [$style['fadeIn']]: hasAnimated[0] }, $style.resetAn
                ]"
            >
                <About />
            </div>
            <div
                ref="fadeInPortfolio"
                :class="[
                    { [$style['fadeIn']]: hasAnimated[1] }, $style.resetAn
                ]"
            >
                <Portfolio />
            </div>
            <div
                ref="fadeInComment"
                :class="[
                    { [$style['fadeIn']]: hasAnimated[2] }, $style.resetAn
                ]"
            >
                <Comment />
            </div>
            <div
                ref="fadeInStore"
                :class="[
                    { [$style['fadeIn']]: hasAnimated[3] }, $style.resetAn
                ]"
            >
                <Store />
            </div>
            <div
                ref="fadeInContact"
                :class="[
                    { [$style['fadeIn']]: hasAnimated[4] }, $style.resetAn
                ]"
            >
                <Contact />
            </div>
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
                    <img src="/images/biz/B06250416/arrow-totop.svg">
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

.ccard {
    max-width: 640px;
    background-color: #171717;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.to-top {
    margin-right: 10px;
    color: #ffffff;
    background-color: rgba($color: #000000, $alpha: 0.8);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 93px;
    right: calc(50% - 320px);
    transition: all .3s;
    border: solid 1px #FFFFFFCC;
    z-index: 9;
    cursor: pointer;
    padding: 0;
    div {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.3px;
        &:nth-child(2n) {
            margin-left: 0.6px;
            margin-top: 3px;
            margin-bottom: 8px;
        }
    }
    &:hover {
        filter: brightness(1.2);
    }
    img {
        width: 14px;
    }
}

.resetAn {
    opacity: 0;
}

@media (max-width:640px) {
    .to-top {
        right: 14px;
        margin-right: 0;
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
