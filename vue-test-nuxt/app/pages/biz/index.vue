<script setup>
import { ref, onMounted } from 'vue';
definePageMeta({
    middleware: () => {
        return navigateTo('/');
    }
});

// 設定分享卡片
useSeoMeta({
    title: 'BranDoor',
    description: '為品牌開門，讓更多人「走進來」',
    ogTitle: 'BranDoor',
    ogDescription: '為品牌開門，讓更多人「走進來」',
    ogImage: '/images/home/header/logo-darkBg.png',
    ogType: 'website'
});

//nuxt 等ssr加載後才出現
const loaded = ref(false);

onMounted(() => {
    loaded.value = true;
});
</script>

<template>
    <div v-if="loaded"></div>
</template>
