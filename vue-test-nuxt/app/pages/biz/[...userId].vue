<script setup>
import { computed, defineAsyncComponent, onMounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import { useTemplate } from '@/composables/useTemplate';

const commonStore = useCommonStore();
const { onInit } = useTemplate();
const componentsMap = {
    B02250218: defineAsyncComponent(() => import('./template/B02250218/index.vue')),
    B06250317: defineAsyncComponent(() => import('./template/B06250317/index.vue')),
    B06250319: defineAsyncComponent(() => import('./template/B06250319/index.vue')),
    B06250401: defineAsyncComponent(() => import('./template/B06250401/index.vue')),
    B08250527: defineAsyncComponent(() => import('./template/B08250527/index.vue')),
    T02250114: defineAsyncComponent(() => import('./template/T02250114/index.vue')),
    B06250411: defineAsyncComponent(() => import('./template/B06250411/index.vue')),
    B02250313: defineAsyncComponent(() => import('./template/B02250313/index.vue')),
    B06250320: defineAsyncComponent(() => import('./template/B06250320/index.vue')),
    B02250318: defineAsyncComponent(() => import('./template/B02250318/index.vue')),
    B08250401: defineAsyncComponent(() => import('./template/B08250401/index.vue')),
    B06250416: defineAsyncComponent(() => import('./template/B06250416/index.vue')),
    B09250825: defineAsyncComponent(() => import('./template/B09250825/index.vue')),
    B09250515: defineAsyncComponent(() => import('./template/B09250515/index.vue')),
    B02250226: defineAsyncComponent(() => import('./template/B02250226/index.vue'))
};

const currentComponent = computed(() => componentsMap[commonStore.userInfo.templateID] || null);
const isPageReady = computed(() => { return !!commonStore.getPageInfo });
async function onServeInit() {
    const { data, error } = await useAsyncData(
        'user-page',
        async() => onInit()
    );

    if (data.value?.status === 'ok') {
        commonStore.actionSetUserInfo(data.value.data);

        if (commonStore.getPageInfo.adInfo?.length) {
            commonStore.actionSetPopupInfo({
                type: 'ad',
                value: commonStore.getPageInfo.adInfo
            });
        }
    }

}

await onServeInit();

// 設定分享卡片(各模板)
const seoTitle = computed(() => {
    const title = commonStore.getPageInfo?.basic?.info?.title || 'BranDoor';
    const vipTitle = commonStore.getPageInfo.basic?.seo?.seoTitle;
    if (commonStore.userInfo.isFree === true) {
        return title;
    }
    return vipTitle || title;
});

const seoDesc = computed(() => {
    const resume = commonStore.getPageInfo?.introduce?.resume || '為品牌開門，讓更多人「走進來」';
    const vipResume = commonStore.getPageInfo.basic?.seo?.seoResume;
    if (commonStore.userInfo.isFree === true) {
        return resume.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    }
    return vipResume || resume.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
});

const seoImage = computed(() => {
    const webID = commonStore.userInfo?.webID;
    // const logo = commonStore.getPageInfo?.basic?.logo?.[0];
    const photo = commonStore.getPageInfo?.basic?.image?.[0];
    const img = webID && photo ? commonStore.getImg(webID, photo) : '';
    return img || '/images/home/header/logo-darkBg.png';
});

const headImage = computed(() => {
    const webID = commonStore.userInfo?.webID;
    const logoImage = commonStore.getPageInfo?.basic?.logo?.[0] || commonStore.getPageInfo?.basic?.image?.[0];
    const img = webID && logoImage ? commonStore.getImg(webID, logoImage) : '';
    return img || '/images/favicon.svg';
});

useSeoMeta({
    title: seoTitle,
    description: seoDesc,
    ogTitle: seoTitle,
    ogDescription: seoDesc,
    ogImage: seoImage,
    ogType: 'website'
});

useHead({
    link: [
        {
            rel: 'icon',
            type: 'image/svg+xml',
            href: headImage.value
        }
    ]
});

// 若為錯誤路徑 導向首頁
onMounted(() => {
    if (!componentsMap[commonStore.userInfo?.templateID] || !isPageReady || !commonStore.getPageInfo) {
        alert('該網站已關閉，將導向官方首頁');
        navigateTo('/', { redirectCode: 301 });
    }
});
</script>

<template>
    <component v-if="currentComponent && isPageReady" :is="currentComponent" />
</template>
