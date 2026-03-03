<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
</script>

<template>
    <div
        v-if="curPageData.basic?.footer"
        v-bind="$attrs"
        :class="$style['footer-wrap']"
    >
        <div :class="$style['footer-list']">
            <Text :text="curPageData.basic?.footer"/>
        </div>
    </div>
</template>

<style lang="scss" module>
.footer-wrap {
    padding: 20px 35px;
    color: #fff;
}

.footer-list {
    line-height: 21px;
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 2px;

    .link {
        cursor: pointer;
    }
}
</style>
