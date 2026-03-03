<script setup>
import { useCssModule, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const $style = useCssModule();
const route = useRoute();
const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});
const emit = defineEmits(['get-info']);

const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
</script>

<template>
    <div :class="$style.header">
        <!-- <button
            :class="[$style['focus-bt'], { [$style.active]: curFollow }]"
            @click="onChange"
        >
            <span :class="$style['focus-bt-span']">追蹤</span>
        </button> -->
        <div v-if="webID&&curPageData.basic.image?.[0]" :class="$style['info-img']">
            <ClientOnly>
                <Image
                    :img-src="commonStore.getImg(webID, curPageData.basic.image?.[0])"
                    :has-zoom="true"
                />
            </ClientOnly>
        </div>
        <div :class="$style['info-name']">
            <div :class="$style['ch-name']">
                {{ curPageData.basic.info?.name }}
            </div>
            <div :class="$style['en-name']">
                {{ curPageData.basic.info?.enName }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.focus-bt {
    border-radius: 16px 16px 16px 2px;
    padding: 10px 12px;
    padding-left: 13px;
    font-size: 16px;
    color: #221D1A;
    transition: all .3s;
    border: solid 1px #221D1A;
    letter-spacing: 6px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    box-sizing: border-box;
    &:hover {
        color: #A39689;
        border-color: #A39689;
        &::before {
            background-color: #A39689;
        }
    }
    &::before {
        content: "";
        display: inline-block;
        margin-right: 8px;
        width: 24px;
        height: 24px;
        background-color: #221D1A;
        mask: url('/images/biz/B08250527/focus_off.svg') no-repeat center center;
    }
    &.active {
        background-color: #D7D0C9;
        border-color: #D7D0C9;
        &::before {
            mask: url('/images/biz/B08250527/focus_on.svg') no-repeat center center;
        }
        &:hover {
            color: #221D1A;
            filter: brightness(1.05);
            &::before {
                background-color: #221D1A;
            }
        }
    }
}
.focus-bt-span {
    line-height: 24px;
    font-family: "DM Sans", sans-serif;
    font-weight: Medium;
}

.header {
    display:flex;
    align-items: center;
    margin-top: 50px;
    margin-left: 60px;
    margin-right: 55px;
    margin-bottom: 40px;
    position: relative;
    padding-top: 25px;
    justify-content: space-between;
}
.info-img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
    }
}
.info-name {
    width: calc(100% - 200px - 65px);
    .ch-name {
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 4px;
        line-height: 22px;
    }
    .en-name {
        font-size: 40px;
        font-weight: 900;
        line-height: 55px;
        letter-spacing: 5.5px;
        overflow-wrap: break-word;
        word-break: break-word;
        word-wrap: break-word;
    }
}

@media (max-width:600px) {
    .header {
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 35px;
        padding-top: 65px;
    }
    .info-img {
        margin-right: 0;
        margin-bottom: 20px;
    }
    .info-name {
        width: 100%;
    }
}
</style>
