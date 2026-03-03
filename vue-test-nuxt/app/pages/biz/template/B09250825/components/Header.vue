<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
</script>

<template>
    <div :class="$style.topBg">
        <ClientOnly>
            <img v-if="curPageData.introduce?.introduceImg?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.introduceImg?.[0])">
            <img v-else src="/images/biz/B09250825/topBg.jpg">
        </ClientOnly>
        <div :class="$style['info-box']">
            <div :class="$style['info-left']">
                <ClientOnly>
                    <Image
                        :img-src="commonStore.getImg(webID, curPageData.basic?.image?.[0])"
                        :has-zoom="true"
                        :class="$style['info-img']"
                    />
                </ClientOnly>
            </div>
            <div :class="$style['info-right']">
                <div v-if="curPageData.basic?.info?.profession" :class="$style['info-job']">
                    {{ curPageData.basic?.info?.profession }}
                </div>
                <div v-if="curPageData.basic?.info?.name || curPageData.basic?.info?.enName" :class="$style['info-name']">
                    {{ curPageData.basic?.info?.name || curPageData.basic?.info?.enName }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.topBg {
    aspect-ratio: 640 / 564;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 564px;
    overflow: hidden;
    position: relative;
    img {
        object-fit: cover;
        height: 100%;
    }
}

.info-box {
    position: absolute;
    bottom: 0;
    width: -webkit-fill-available;
    margin: 0 75px;
}

.info-left {
    display: inline-flex;
    vertical-align: bottom;
    width: calc(50% + 16px);
    justify-content: end;
    align-items: end;
    position: relative;
    .info-img {
        aspect-ratio: 100/100;
        overflow: hidden;
        max-width: 226px;
        z-index: 2;
        border: 1px solid #858585;
        img {
            display: flex;
            object-fit: cover;
        }
    }
    &:before {
        content: "";
        display: block;
        position: absolute;
        height: 259px;
        width: 199px;
        bottom: 0;
        left: 0;
        z-index: 1;
        background-color: #F7F2E9;
    }
}

.info-right {
    display: inline-block;
    vertical-align: bottom;
    width: calc(50% - 16px );
    background-color: #F7F2E9;
    padding: 33px 23px 8px 23px;
    box-sizing: border-box;

    .info-job {
        font-size: 15px;
        color: #5E5338;
        font-weight: 500;
        letter-spacing: 1.2px;
        margin-bottom: 7px;
    }

    .info-name {
        font-size: 17px;
        color: #000;
        font-weight: 700;
        letter-spacing: 1.7px;
    }
}

@media (max-width:600px) {
    .info-box {
        margin: 0 20px;
    }
}

@media (max-width:470px) {
    .info-left {
        display: block;
        background-color: #F7F2E9;
        padding-top: 32px;
        .info-img {
            position: relative;
            margin-left: 32px;
        }
        &::before {
            max-height: 259px;
            max-width: 199px;
            height: auto;
            width: auto;
            aspect-ratio: 259 / 199 ;
        }
    }
    .info-right {
        display: block;
        width: 100%;
        padding: 23px 23px 0 32px;
    }
}
</style>
