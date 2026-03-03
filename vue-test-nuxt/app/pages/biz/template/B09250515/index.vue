<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';
import QuickAccess from '@/components/QuickAccess.vue';
import Ad from './components/Ad.vue';
import Link from './components/Link.vue';
import Contact from './components/Contact.vue';
import Portfolio from './components/Portfolio.vue';
import SecPortfolio from './components/SecPortfolio.vue';
import Header from './components/Header.vue';
import About from './components/About.vue';
import Footer from '@/components/Footer.vue';

const commonStore = useCommonStore();
const route = useRoute();
const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});

// Top按鈕---
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

// console.log(commonStore.getPageInfo);
</script>

<template>
    <div :class="$style.ccard">
        <!-- 追蹤 -->
        <!-- <div
            :class="[$style['follow-btn'], { [$style['is-active']]: curFollow }]"
            @click="onChange"
        >
            {{ curFollow ? '已追蹤' : '追蹤' }}
        </div> -->
        <Header />
        <About />
        <Portfolio />
        <SecPortfolio />
        <div :class="$style['phone-upside-down']">
            <!-- 聯絡我們(含地圖邏輯) -->
            <Contact :class="$style.phoneDown" />
            <!-- 優質廠商 -->
            <Link :class="$style.phoneUp" />
        </div>
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
                <img src="/images/biz/B09250515/arrow-totop.svg">
                <div>
                    TOP
                </div>
            </button>
        </transition>
        <!-- 廣告彈窗 -->
        <Ad v-if="commonStore.popupInfo.type === 'ad'" />
    </div>
</template>

<style lang="scss" module>
.follow-btn {
    font-weight: bold;
}

.ccard {
    max-width: 640px;
    background-color: #fff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.phone-upside-down {
    display: flex;
    flex-direction: column; // 桌機原本順序
}

.to-top {
    margin-right: 10px;
    color: #EB1B26F0;
    background-color: rgba($color: #FFFEF2, $alpha: 1);
    border-radius: 50%;
    width: 45px;
    height: 45px;
    position: fixed;
    bottom: 93px;
    right: calc(50% - 320px);
    transition: all .3s;
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
        width: 12px;
    }
}

.footer {
    background-color: #FE7D85;
    padding: 20px 30px;
}

@media (max-width:640px) {
    .to-top {
        right: 14px;
        margin-right: 0;
    }
}

@media (max-width:580px) {
    .phone-upside-down {
        flex-direction: column-reverse; // 手機版交換順序
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
