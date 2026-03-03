<script setup>
import { useCommonStore } from '@/stores/common';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');

</script>

<template>
    <div :class="$style.banner">
        <div :class="$style.center">
            <ClientOnly>
                <Image v-if="curPageData.basic?.logo?.[0]" :class="$style.logo" :img-src="commonStore.getImg(webID, curPageData.basic?.logo?.[0])"/>
            </ClientOnly>
        </div>
    </div>
</template>

<style lang="scss" module>

.banner {
    display: flex;
    justify-content: space-around;
    padding: 9px 20px;
}

.center {
    .logo {
        img {
            background-color: #FCF7EE;
            max-height: 54px;
        }
    }
}

</style>
