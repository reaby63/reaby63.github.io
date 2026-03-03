<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import About from './components/About.vue';
import Portfolio from './components/Portfolio.vue';
import Services from './components/Services.vue';
import Header from './components/Header.vue';
import Contact from './components/Contact.vue';
import AdCard from './components/AdCard.vue';
import Footer from '@/components/Footer.vue';
import QuickAccess from '@/components/QuickAccess.vue';

// 追蹤
defineEmits(['get-info']);
const commonStore = useCommonStore();

// Top按鈕---
const btnTop = ref(null); // 剛進畫面時先給一個空值 vue取得DOM元素的方式~
const showBtnTop = ref(false); // 剛進畫面時是false 不出現!
// 載入動畫---
const jumpHeader = ref(null);
const jumpAbout = ref(null);
const jumpPortfolio = ref(null);
const jumpServices = ref(null);
const jumpContact = ref(null);
const hasAnimated = ref([false, false, false, false, false]);

const curPageData = computed(() => commonStore.getPageInfo);

// 剛進入頁面先隱藏+超過多少出現
onMounted(() => {
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop; //取得滾動高度
        showBtnTop.value = scrollHeight > 200; // 高度超過就變 true
    });
});

// 滑動至頂部
const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑滾動
    });
};

const windowScroll = () => {
    const elementsAn = [
        jumpHeader.value,jumpAbout.value, jumpPortfolio.value, jumpServices.value, jumpContact.value
    ];

    elementsAn.forEach((el, i) => { // forEach((item, index, array)=>{})
        if (!el || hasAnimated.value[i]) return; // 如果抓不到元素(!是相反) 或是 已經觸發動畫 就終止
        const elPosition = el.getBoundingClientRect(); // getBoundingClientRect()是用來取得元素相對視窗的位置資訊 他會回傳很多物件指令(top/bottom...)
        const reset = -100;
        if (elPosition.top < window.innerHeight + reset) { // 當元素上緣進入視窗-100px
            hasAnimated.value[i] = true; // 單獨讓i這個數字的觸發true!
        }
    });
};

onMounted(() => { // 當畫面渲染完成時 加上scroll事件監聽
    window.addEventListener('scroll', windowScroll);
    windowScroll(); // 初始馬上執行一次
});

onUnmounted(() => {
    window.removeEventListener('scroll', windowScroll);
    // 元件被移除時 把事件移除 以免記憶體外洩 -> 有可能其他頁滾動 這頁也會被觸發到
});
</script>

<template>
    <div :class="$style.bg">
        <div :class="$style.ccard">
            <div
                ref="jumpHeader"
                :class="[
                    { [$style['fadeInUpDelay']]: hasAnimated[0] }, $style.resetAn
                ]"
            >
                <Header @get-info="$emit('get-info')" />
            </div>
            <div
                ref="jumpAbout"
                :class="[
                    { [$style['fadeInUpDelay']]: hasAnimated[1] }, $style.resetAn
                ]"
            >
                <About />
            </div>
            <div
                ref="jumpPortfolio"
                :class="[
                    { [$style['fadeIn']]: hasAnimated[2] }, $style.resetFadeIn
                ]"
            >
                <Portfolio />
            </div>
            <div
                ref="jumpServices"
                :class="[
                    { [$style['fadeIn']]: hasAnimated[3] }, $style.resetFadeIn
                ]"
            >
                <Services />
            </div>
            <div
                ref="jumpContact"
                :class="[
                    { [$style['fadeInUpDelay']]: hasAnimated[4] }, $style.resetAn
                ]"
            >
                <Contact />
            </div>
            <Footer :class="$style.footer" />
            <QuickAccess/>
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
                    <div />
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

.ccard{
    max-width: 640px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.footer {
    color: #221D1A;
    padding: 24px 32px;
}

.to-top {
    margin-right: 10px;
    background-color: rgba($color: #ffffff, $alpha: 0.8);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 63px;
    right: calc(50% - 320px);
    transition: all .3s;
    border: solid 1px #DFDFDF;
    z-index: 999;
    letter-spacing: 0.05em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    div {
        width: 22px;
        height: 22px;
        background-color: #221D1A;
        mask: url('/images/biz/B08250527/top_icon.svg') no-repeat center center;
    }
    &:hover {
        background-color: #A39689;
        border-color: #DFDFDF;
        div{
            background-color: #FFFFFF;
        }
    }
    img {
        width: 100%;
    }
}

@media (max-width:640px) {
    .to-top {
        right: 14px;
        margin-right: 0;
    }

    .ccard {
        position: relative;
    }
}

@media (max-width:450px) {
    .to-top{
        width: 40px;
        height: 40px;
        bottom: 66px;
    }
}

// 原始設定 先拿掉
.resetAn {
    opacity: 0;
    transform: translateY(100px);
}

// 首頁套動畫
.fadeInUpDelay {
    animation: fadeInUp 1.5s ease forwards;
    animation-delay: 0.3s;
}

.fadeIn {
    animation: fadeIn 1.5s ease forwards;
    animation-delay: 0.3s;
}

.resetFadeIn {
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fadeInUp {
    animation: fadeInUp 1s ease forwards;
}

.fadeOutUp {
    animation: fadeOutUp 1s ease forwards;
}

.fadeInDown {
    animation: fadeInDown 1s ease forwards;
}

.fadeOutDown {
    animation: fadeOutDown 1s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOutUp {
    from {
        opacity: 1;
        transform: translateY(-80);
        position: absolute;
        top:0;
    }

    to {
        opacity: 0;
        transform: translateY(-100px);
        position: absolute;
    }
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOutDown {
    from {
        opacity: 1;
        transform: translateY(80);
        position: absolute;
        bottom: 0;
    }

    to {
        opacity: 0;
        transform: translateY(100px);
        position: absolute;
        bottom: 0;
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

