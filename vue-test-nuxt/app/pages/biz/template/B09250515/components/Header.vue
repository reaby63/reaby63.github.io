<script setup>
import { computed, useCssModule } from 'vue';
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();
const $style = useCssModule();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
</script>

<template>
    <div :class="$style.header">
        <div :class="$style.decoration">
            <img src="/images/biz/B09250515/banner-border.svg">
        </div>
        <ClientOnly>
            <img v-if="curPageData.introduce?.introduceImg?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.introduceImg?.[0])">
            <img v-else src="/images/biz/B09250515/banner.png">
        </ClientOnly>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;
.header {
    aspect-ratio: 640 / 340;
    max-height: 340px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FBF2EC;
    opacity: 0;
    animation: fadeIn 1.5s ease-in-out forwards;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.decoration {
    position: absolute;
    margin: 11px;
}
</style>
