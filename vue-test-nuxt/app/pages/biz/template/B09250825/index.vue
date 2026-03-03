<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';
import QuickAccess from '@/components/QuickAccess.vue';
import Ad from './components/Ad.vue';
import Contact from './components/Contact.vue';
import Banner from './components/Banner.vue';
import Header from './components/Header.vue';
import About from './components/About.vue';
import Portfolio from './components/Portfolio.vue';
import SecPortfolio from './components/SecPortfolio.vue';

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

const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// 載入動畫---
const fadeinBanner = ref(null);
const fadeinHeader = ref(null);
const fadeinAbout = ref(null);
const fadeinPortfolio = ref(null);
const fadeinSecPortfolio = ref(null);
const fadeinContact = ref(null);
const hasAnimated = ref([false, false, false]);

const windowScroll = () => {
    const elementsAn = [
        fadeinBanner.value, fadeinHeader.value, fadeinAbout.value, fadeinPortfolio.value,
        fadeinSecPortfolio.value , fadeinContact.value
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
            <!-- 追蹤 -->
            <!-- <div
                :class="[$style['follow-btn'], { [$style['is-active']]: curFollow }]"
                @click="onChange"
            >
                {{ curFollow ? '已追蹤' : '追蹤' }}
            </div> -->
            <div
                ref="fadeinBanner"
                :class="[
                    { [$style['fadein-an']]: hasAnimated[0] }, $style.resetAn
                ]"
            >
                <Banner />
            </div>
            <div
                ref="fadeinHeader"
                :class="[
                    { [$style['fadein-an']]: hasAnimated[1] }, $style.resetAn
                ]"
            >
                <Header />
            </div>
            <div
                ref="fadeinAbout"
                :class="[
                    { [$style['fadein-an']]: hasAnimated[2] }, $style.resetAn
                ]"
            >
                <About />
            </div>
            <div
                ref="fadeinPortfolio"
                :class="[
                    { [$style['fadein-an']]: hasAnimated[3] }, $style.resetAn
                ]"
            >
                <Portfolio />
            </div>
            <div
                ref="fadeinSecPortfolio"
                :class="[
                    { [$style['fadein-an']]: hasAnimated[4] }, $style.resetAn
                ]"
            >
                <SecPortfolio />
            </div>
            <div
                ref="fadeinContact"
                :class="[
                    { [$style['fadein-an']]: hasAnimated[5] }, $style.resetAn
                ]"
            >
                <!-- 聯絡我們(含地圖邏輯) -->
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
                    <img src="/images/biz/B09250825/arrow-totop.svg">
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
    margin-right: 13px;
    color: #5E5338;
    background-color: rgba($color: #ffffff, $alpha: 1);
    border-radius: 50%;
    width: 38px;
    height: 38px;
    position: fixed;
    bottom: 70px;
    right: calc(50% - 320px);
    transition: all .3s;
    z-index: 9;
    font-size: 8.6px;
    font-weight: 700;
    letter-spacing: 0.4px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    font-family: 'Noto Sans TC', sans-serif;

    div {
        margin-left: 0.4px;
        margin-top: 3px;
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

// 動畫
.resetAn {
    opacity: 0;
    background-color: #FCF7EE;
}

.fadein-an {
    animation: fadeIn 1s ease-in-out forwards;
    background-color: transparent;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
