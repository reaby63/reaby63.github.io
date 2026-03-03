<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();

const curPageData = computed(() => commonStore.getPageInfo);
const serveGroup = computed(() => curPageData.value.serveDetail || []);
</script>

<template>
    <div v-if="curPageData.serveSetting?.title || serveGroup.length" :class="$style.serve">
        <div v-if="curPageData.serveSetting?.title" :class="$style.title">
            {{ curPageData.serveSetting?.title }}
        </div>
        <div v-if="serveGroup.length" :class="$style.contact">
            <span v-for="(item, index) in serveGroup">
                {{ item.content }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.serve {
    color: #fff;
    padding: 0 32px 37px;
    background: url('/images/biz/B02250226/bg_about.jpg') center / cover no-repeat;
    background-position: center top;
}

.title {
    font-size: 17px;
    margin-bottom: 20px;
}

.contact {
    span {
        margin-bottom: 20px;
        display: block;
        font-size: 15px;
    }
}
</style>
