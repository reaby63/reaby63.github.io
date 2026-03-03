<script setup>
import { computed, useCssModule } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';

const commonStore = useCommonStore();
const $style = useCssModule();
const route = useRoute();

const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});

const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
</script>

<template>
    <div :class="$style.container">
        <!-- 追蹤 -->
        <!-- <div
            :class="[$style['follow-btn'], { [$style['is-active']]: curFollow }]"
            @click="onChange"
        >
            <span>{{ curFollow ? '已追蹤' : '追蹤' }}</span>
        </div> -->
        <div :class="$style.photo">
            <ClientOnly>
                <img v-if="curPageData.introduce?.introduceImg?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.introduceImg?.[0])">
                <img v-else src="/images/biz/B02250313/bg_img.jpg">
            </ClientOnly>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.follow-btn {
    background-color: rgba($color: #000000, $alpha: 0.61);
    border-radius: 25px;
    padding-top: 6px;
    padding-bottom: 10px;
    width: 138px;
    font-size: 14px;
    color: #d2d7db;
    height: 37px;
    transition: all .2s;
    position: absolute;
    top: 20px;
    right: 14px;
    z-index: 9;
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 1s;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
    &::before {
        content: url('/images/biz/B02250313/heart-line.svg');
        display: inline-block;
        width: 20px;
        height: 16px;
        position: relative;
        top: 4px;
        margin-right: 7px;
    }
    &.is-active {
        &::before {
            content: url('/images/biz/B02250313/heart.svg');
        }
    }
}

.photo {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 640px;
    max-height: 322px;
    aspect-ratio: 640 / 322;

    img {
        width: 100%;
        height: 100%;
        opacity: 0;
        animation: fadeIn 2s ease-in-out forwards;
        object-fit: cover;
    }
}
</style>
