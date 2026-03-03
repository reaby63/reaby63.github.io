<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();

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
    commonStore.actionSetPopupInfo({ type: 'ad', value: commonStore.getPageInfo.adInfo });
    qaOff.value = true;
    qaOn.value = false;

    setTimeout(() => {
        qaOff.value = false;
    }, 500);
};

// 點擊外框也要可以關閉qa-in
const handleClickOutside = (e) => {
    if (!qaOn.value) return;

    if (qaBox.value && !qaBox.value.contains(e.target)) {
        qaCloseBtn();
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
<a
    v-if="commonStore.getPageInfo?.adInfo?.length"
    :class="$style.quickaccess"
    @click.stop="qaOpenBtn"
>
    <span :class="$style['qa-contanin']">
        更多資訊
        <img src="/images/biz/B08250527/qa_arrow.svg">
        <span :class="$style['qa-new']">
            NEW
        </span>
    </span>
</a>
<div
    ref="qaBox"
    @click.stop
    :class="[{[$style['qa-an']]: qaOn}, {[$style['qa-close']]: qaOff}, $style['quickaccess-in']]"
>
    <div :class="$style.cross" @click="qaCloseBtn">
        <div />
    </div>
    <div :class="$style['qa-title']">
        更多資訊
    </div>
    <div :class="$style['qa-btn']">
        <button @click="qaBtnAd">
            <img src="/images/biz/B06250401/speaker.svg">公告訊息
        </button>
    </div>
</div>
</template>

<style lang="scss" module>
button {
    cursor: pointer;
    background-color: transparent;
    border: 0px;
}

.quickaccess {
    position: fixed;
    bottom: 0px;
    right: calc(50% - 320px);
    z-index: 999;

    .qa-contanin {
        background-color: #000000;
        cursor: pointer;
        color: #FFFFFF;
        font-size: 16px;
        padding: 13.5px 36px;
        padding-right: 12px;
        border-radius: 47px 0 0 0;
        font-weight: 500;
        position: relative;
        letter-spacing: 0.8px;
        display: flex;
        font-family: "Noto Sans TC", sans-serif;
        line-height: 1.6em;

        img {
            width: 14px;
            margin-left: 10px;
            position: relative;
        }

        .qa-new {
            font-weight: 700;
            font-style: italic;
            display: block;
            background-color: #F96412;
            padding: 0px 6.5px;
            padding-left: 5.5px;
            color: #ffffff;
            border-radius: 20px;
            position: absolute;
            top: -4px;
            left: 17px;
            font-size: 13px;
            line-height: 1.6em;
            letter-spacing: 0.5px;
        }
    }
}

.quickaccess-in {
    background-color: #000000;
    padding-top: 22px;
    padding-bottom: 22px;
    color: #ffffff;
    position: fixed;
    right: calc(50% - 320px);
    bottom: -177px;
    opacity: 0;
    width: 100%;
    max-width: 640px;
    text-align: center;
    z-index: 99999;
    box-sizing: border-box;

    .qa-title {
        font-weight: 400;
        line-height: 22px;
        margin-bottom: 18px;
        font-size: 18px;
        font-family: Noto Sans TC, Arial, sans-serif;
    }
}

.cross {
    display: inline-block;
    position: absolute;
    width: 24px;
    height: 24px;
    top: 10px;
    right: 15px;
    padding: 0;
    cursor: pointer;

    > div {
        width: 17px;
        height: 17px;
        position: relative;

        &:before,
        &:after {
            content: "";
            position: absolute;
            width: 1px;
            height: 24px;
            border-radius: 5px;
            background-color: #fff;
        }

        &:before{
            transform: rotate(48deg);
        }

        &:after {
            transform: rotate(-48deg);
        }
    }
}

.qa-btn {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 calc((640px - 14em - 80px) / 2);

    button {
        color: #ffffff;
        font-size: 15px;
        height: 24px;
        padding: 2px 20px;
        transition: all .3s;
        position: relative;
        width: calc(7.2em + 40px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Noto Sans TC, Arial, sans-serif;

        &::after {
            content: "";
            display: inline-block;
            width: 1px;
            height: 1em;
            background-color: #ffffff;
            position: absolute;
            right: 0px;
        }

        // 未來新增
        &:nth-child(3) {
            margin-top: 8px;
        }

        img {
            display: inline-block;
            height: 16px;
            width: auto;
            margin-right: 6px;
        }

        &:last-child,
        &:nth-child(2n) {
            &::after {
                display: none;
            }
        }

        &:hover {
            opacity: 0.8;
        }
    }
}

// 動畫部分~~~
.qa-an {
    animation: qa-an 1s ease-out forwards;
}

@keyframes qa-an {
    from {
        bottom: -177px;
        opacity: 0;
    }
    to {
        bottom: -1px;
        opacity: 1;
    }
}

.qa-close {
    animation: qa-close 1s ease-out forwards;
}

@keyframes qa-close {
    from {
        bottom: 0px;
        opacity: 1;
    }

    to {
        bottom: -177px;
        opacity: 0;
    }
}

@media (max-width:640px) {
    .quickaccess {
        right: 0;
    }
    .quickaccess-in {
        width: 100%;
        right: 0px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        .qa-title {
            width: 100%;
        }

        .qa-btn {
            padding: 0px 0px;
            width: calc(14em + 80px);
        }
    }
}
</style>
