<script setup>
import About from './components/About.vue';
import Contact from './components/Contact.vue';
import Header from './components/Header.vue';
import Portfolio from './components/Portfolio.vue';
import Services from './components/Services.vue';
import { ref, computed, onMounted, useCssModule, onUnmounted } from 'vue';
import AdCard from './components/AdCard.vue';

const $style = useCssModule(); // 動態style用的

// 關注
defineEmits(['get-info']);

// AD彈窗
const showModal = ref(false);

// 套資料---
const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    }
});
const curPageData = computed(() => props.userInfo?.pageData || {});
// console.log(curPageData.value); // 快速查看資料內容使用~

// Top按鈕---
const btnTop = ref(null); // 剛進畫面時先給一個空值 vue取得DOM元素的方式~
const showBtnTop = ref(false); // 剛進畫面時是false 不出現!
// 剛進入頁面先隱藏+超過多少出現
onMounted(() => {
    window.addEventListener('scroll', () => {
        // document.documentElement.scrollTop:抓取html元素的滾動高度 / document.body.scrollTop 抓取body元素的滾動高度
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

// qa按鈕---
const qaBox = ref(null);
const qaOn = ref(false);
const qaOff = ref(false);

const qaOpenBtn = () => {
    qaOn.value = !qaOn.value; // 每次按下就切換 true/false
};

const qaCloseBtn = () => {
    qaOff.value = true;
    qaOn.value = false;
    setTimeout(() => {
        qaOff.value = false;
    }, 500);
};

// qa ad按鈕 -> 打開彈窗+關閉qa小視窗
const qaBtnAd = () => {
    showModal.value = true; // 打開彈窗
    qaOff.value = true;
    qaOn.value = false;
    setTimeout(() => {
        qaOff.value = false;
    }, 500);
};

// 載入動畫---
const jumpAbout = ref(null);
const jumpPortfolio = ref(null);
const jumpServices = ref(null);
const jumpContact = ref(null);
const hasAnimated = ref([false, false, false, false]);

const windowScroll = () => {
    const elementsAn = [
        jumpAbout.value, jumpPortfolio.value, jumpServices.value, jumpContact.value
    ];
    elementsAn.forEach((el, i) => { // forEach((item, index, array)=>{})
        if (!el || hasAnimated.value[i]) return; // 如果抓不到元素(!是相反) 或是 已經觸發動畫 就終止
        const elPosition = el.getBoundingClientRect(); // getBoundingClientRect()是用來取得元素相對視窗的位置資訊 他會回傳很多物件指令(top/bottom...)
        const reset = 100;
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
    <div :class="$style.ccard">
        <Header :user-info="props.userInfo" @get-info="$emit('get-info')"/>
        <div
        ref="jumpAbout"
        :class="[
            { [$style['jumpInOnly-an']]: hasAnimated[0] }, $style.resetAn
        ]">
            <About :user-info="props.userInfo"/>
        </div>
        <div
        ref="jumpPortfolio"
        :class="[
            { [$style['jumpInOnly-an']]: hasAnimated[1] }, $style['portfolio-zindex']
        ]">
            <Portfolio :user-info="props.userInfo"/>
        </div>
        <div
        ref="jumpServices"
        :class="[{ [$style['jumpInOnly-an']]: hasAnimated[2] }, $style.resetAn
        ]">
            <Services :user-info="props.userInfo"/>
        </div>
        <div
        ref="jumpContact"
        :class="[{ [$style['jumpInOnly-an']]: hasAnimated[3] }, $style.resetAn
        ]">
            <Contact :user-info="props.userInfo"/>
        </div>
        <a
        :class="$style.quickaccess"
        @click="qaOpenBtn"
        v-if="curPageData.adList.length"
        >
            <span :class="$style.qa_contanin">
                Quick Access
                <img src="/images/biz/B06250401/arrow-qa.svg" alt="">
                <span :class="$style.qa_new">
                    NEW
                </span>
            </span>
        </a>
        <transition name="topBtnFade">
            <button
            :class="$style.to_top"
            @click="toTop"
            ref="btnTop"
            v-show="showBtnTop"
            >
                <img src="/images/biz/B06250401/arrow-totop.svg" alt="">
                <div>
                    TOP
                </div>
            </button>
        </transition>
        <div
        :class="[{[$style['qa_an']]: qaOn}, {[$style['qa_close']]: qaOff}, $style.quickaccess_in]"
        ref="qaBox"
        >
            <div :class="$style.cross" @click="qaCloseBtn">
                <button />
            </div>
            <div :class="$style.qa_title">
                Quick Access
            </div>
            <div :class="$style.qa_btn">
                <button v-if="curPageData.adList.length" @click="qaBtnAd">
                    <img src="/images/biz/B06250401/speaker.svg">廣告訊息
                </button>
                <!-- <button>
                    <img src="/images/biz/B06250401/throng.svg" alt="">招募訊息
                </button> -->
            </div>
        </div>
    </div>
    <!-- AD彈跳視窗 -->
    <AdCard v-model="showModal" :user-info="props.userInfo"/>
</template>

<style lang="scss" module>
@import "./scss/all.scss";
@import "./scss/animate.scss";

button {
    cursor: pointer;
    background-color: transparent;
    border: 0px;
}

.ccard{
    max-width: 640px;
    background-color: #519DF4;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    line-height: 1.6;
}

.to_top {
    margin-right: 10px;
    color: #519DF4;
    background-color: rgba($color: #ffffff, $alpha: 0.8);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 58px;
    right: calc(50% - 320px);
    transition: all .3s;
    border: solid 1px #FFFFFFCC;
    z-index: 99999;
    font-size: $font_size_XS;
    font-weight: 700;
    letter-spacing: 0.05em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    div {
        margin-left: 0.05em;
        margin-top: 5px;
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
    .to_top {
        right: 14px;
        margin-right: 0;
    }
}

@media (max-width:450px) {
    .to_top{
        width: 40px;
        height: 40px;
        bottom: 66px;
    }
}

// 動畫~~~
.qa_an {
    animation: qa_an 1s ease-out forwards;
}

@keyframes qa_an {
    from {
        bottom: -177px;
        opacity: 0;
    }
    to {
        bottom: -1px;
        opacity: 1;
    }
}

.qa_close {
    animation: qa_close 1s ease-out forwards;
}

@keyframes qa_close {
    from {
        bottom: 0px;
        opacity: 1;
    }

    to {
        bottom: -177px;
        opacity: 0;
    }
}

</style>

<!-- top按鈕 淡入淡出 -->
<style>
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
