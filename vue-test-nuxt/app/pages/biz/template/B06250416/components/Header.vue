<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const route = useRoute();
const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});

function bannerArrow() {
    window.scrollTo({
        top: window.scrollY + 320,
        behavior: 'smooth'
    });
}
</script>

<template>
    <div :class="$style.banner">
        <!-- <div
            :class="[$style['follow-btn'], { [$style['is-active']]: curFollow }]"
            @click="onChange"
        >
            {{ curFollow ? '已追蹤' : '追蹤' }}
        </div> -->
        <div v-if="!curPageData.introduce?.introduceImg?.[0]" :class="$style['banner-text']">
            <div :class="$style.h6">
                Professional, Honest, Trustworthy
            </div>
            <div :class="$style.p">
                Trustworthy
            </div>
        </div>
        <div :class="$style['banner-img']">
            <ClientOnly>
                <img v-if="curPageData.introduce?.introduceImg?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.introduceImg?.[0])">
                <img v-else src="/images/biz/B06250416/pic_banner.png">
            </ClientOnly>
            <div :class="$style['banner-img-bottom']">
                <img src="/images/biz/B06250416/topbg.png">
            </div>
            <a :class="$style['banner-arrow']" @click="bannerArrow">
                <img src="/images/biz/B06250416/dropdown-arrow.svg">
            </a>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.follow-btn {
    background-color: rgba($color: #4A00A6, $alpha: 1);
    border-radius: 25px;
    width: 110px;
    font-size: 14px;
    color: #ffffff;
    height: 40px;
    transition: all .2s;
    letter-spacing: 0.5px;
    position: absolute;
    top: 46px;
    right: 25px;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    span {
        position: relative;
        top: 1px;
    }
    &:hover {
        background-color: #4A00A6;
        filter: brightness(1.2);
    }
    &::before {
        content: url('/images/biz/B06250416/heart-line.svg');
        display: inline-block;
        width: 20px;
        position: relative;
        top: 1.5px;
        margin-right: 8px;
    }
    &.active {
        filter: brightness(1.2);
        &::before {
            content: url('/images/biz/B06250416/heart.svg');
        }
    }
}

.banner {
    position: relative;
    margin-bottom: 66px;
}

.banner-text {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 1;
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 2s;
    .h6 {
        font-family: "Gudea", sans-serif;
        font-size: 20px;
        font-weight: 700;
        line-height: 1.6em;
        letter-spacing: 0.03em;
        margin-bottom: 8px;
    }
    .p {
        font-family: "Gudea", sans-serif;
        font-size: 10px;
        line-height: 1.6em;
        letter-spacing: 0.03em;
    }
}

.banner-img {
    height: auto;
    animation: bannerimg 3s ease-in-out forwards;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    aspect-ratio: 640/346;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.banner-img-bottom {
    position: absolute;
    bottom: -8px;
    width: 640px;
    img {
        height: auto;
    }
}

.banner-arrow {
    position: absolute;
    bottom: -18px;
    width: 30px;
    height: 30px;
    background-color: #009DFF;
    border-radius: 50px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: arrowOutBg 0.4s ease-in-out forwards;
    img {
        width: 12px;
        height: 7px;
        animation: arrowOut 0.4s ease-in-out forwards;
    }
    &:hover {
        animation: arrowInBg 0.4s ease-in-out forwards;
        img {
            animation: arrowIn 0.4s ease-in-out forwards;
        }
    }
}

@media (max-width:640px) {
    .banner-img-bottom {
        width: 100%;
    }
}

@media (max-width:580px) {
    .banner {
        margin-bottom: 25px;
    }
    .banner-text {
        top:71px;
        .h6 {
            font-size: 16px;
            margin-bottom: 6px;
        }
        .p {
            font-size: 9px;
        }
    }
    .follow-btn {
        top: 16px;
    }
}
</style>
