<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import QuickAccess from '@/components/QuickAccess.vue';
import Ad from './components/Ad.vue';
import Link from './components/Link.vue';
import Contact from './components/Contact.vue';
import About from './components/About.vue';
import Portfolio from './components/Portfolio.vue';
import Footer from '@/components/Footer.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');

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
            <div :class="$style.topBg">
                <ClientOnly>
                    <img v-if="curPageData.introduce?.topBgImage?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.topBgImage?.[0])">
                    <img v-else src="/images/biz/B06250320/info_bg.jpg">
                </ClientOnly>
            </div>
            <div :class="$style.container">
                <About />
                <Portfolio />
            </div>
            <Contact />
            <!-- 優質廠商 -->
            <Link />
            <Footer :class="$style.footer" />
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
                    <img src="/images/biz/B06250320/arrow-totop.svg">
                    <div>
                        TOP
                    </div>
                </button>
            </transition>
            <!-- 廣告彈窗 -->
            <Ad v-if="commonStore.popupInfo.type === 'ad'" />
            <div :class="$style.bottomBg">
                <ClientOnly>
                    <img v-if="curPageData.introduce?.bottomBgImage?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.bottomBgImage?.[0])">
                    <img v-else src="/images/biz/B06250320/info_bg.jpg">
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "./scss/all.scss" as *;

.topBg {
    position: absolute;
    top: 0;
    width: 100%;
    aspect-ratio: 640 / 366;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.bottomBg {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 750px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: #00000099;
        width: 100%;
        height: 100%;
    }
}

.ccard {
    max-width: 640px;
    background-color: #fff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    line-height: 1.6;
}

.footer {
    position: relative;
    z-index: 2;
    border-top: 1px solid #fff;
    margin: 0 28px;
    padding: 25px 10px 0;
    padding-bottom: 30px;
}

.to-top {
    margin-right: 9px;
    color: #ffffff;
    background-color: #00000099;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 73px;
    right: calc(50% - 320px);
    transition: all .3s;
    border: solid 1px #858585;
    z-index: 9;
    padding: 0;
    padding-bottom: 11px;
    cursor: pointer;
    div {
        font-size: 12px;
        font-weight: 300;
        letter-spacing: 0.05em;
        margin-left: 0.05em;
        margin-top: 4px;
    }
    &:hover {
        filter: brightness(1.2);
    }
    img {
        width: 14px;
    }
}

.container {
    background-color: #ffffff;
    margin: 158px 26px;
    margin-bottom: 31px;
    box-shadow: 7px 7px 20px rgba(0, 0, 0, 0.4);
    padding: 50px;
    padding-bottom: 35px;
    animation: fadeInSlideUp 1s ease-in-out forwards;
    z-index: 9;
    position: relative;
    min-height: 163px;
}

@media (max-width:640px) {
    .to-top {
        right: 14px;
        margin-right: 0;
        bottom: 17px;
    }
    .ccard {
        position: relative;
        background-size: auto 366px, auto 626px;
        background-position: top, bottom;
        background-repeat: no-repeat, no-repeat;
        overflow: hidden;
        &::after {
            height: 626px;
        }
    }
}

@media (max-width: 500px) {
    .container {
        margin: 48px 28px;
        padding: 35px;
        padding-bottom: 25px;
        margin-bottom: 50px;
    }
}
</style>
