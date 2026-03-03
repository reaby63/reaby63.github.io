<script setup>
import { computed } from 'vue';
import Text from '@/pages/biz/components/Text.vue';
import { useCommonStore } from '@/stores/common';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();

const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
</script>
<template>
    <div
        v-if="curPageData.basic.info?.profession ||
            curPageData.basic.info?.name ||
            curPageData.introduce?.resume"
        :class="[$style.reset,$style.info]"
    >
        <div :class="$style.title">
            <div :class="$style['info-title']">
                關於我<span :class="$style['title-en']">About Me</span>
            </div>
        </div>
        <div :class="$style['info-box']">
            <div v-if="webID&&curPageData.basic?.image?.[0]" :class="$style['info-left']">
                <div :class="$style.img">
                    <ClientOnly>
                        <Image
                            :img-src="commonStore.getImg(webID, curPageData.basic?.image?.[0])"
                            :has-zoom="true"
                        />
                    </ClientOnly>
                </div>
            </div>
            <div :class="$style['info-right']">
                <div v-if="curPageData.basic.info?.profession" :class="$style['info-tag']">
                    {{ curPageData.basic.info?.profession }}
                </div>
                <div v-if="curPageData.basic.info?.name" :class="$style['info-name']">
                    {{ curPageData.basic.info?.name }}
                </div>
                <Text
                    v-if="curPageData.introduce?.resume"
                    :class="$style['info-content']"
                    :text="curPageData.introduce?.resume"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.info {
    margin: 39px 0 10px 55px;
    position: relative;
    &::before {
        content: "";
        display: block;
        width: 452px;
        height: 619px;
        background-image: url('/images/biz/B06250401/info_bg.png');
        background-size: cover;
        background-position: top;
        position: absolute;
        top: -86px;
        right: 0;
        z-index: 0;
    }
    &::after {
        content: "";
        display: block;
        width: 96px;
        height: 164px;
        background-image: url('/images/biz/B06250401/info_bg_cat.png');
        background-size: cover;
        background-position: top;
        position: absolute;
        left: -55px;
        bottom: -136px;
    }
}

.title {
    margin-left: 21px;
    margin-bottom: 41px;
    z-index: 1;
    position: relative;
}

.info-title {
    color: #ffffff;
    border-color: #ffffff;
}

.info-box {
    z-index: 1;
    position: relative;
    margin-right: 76px;
    display: flex;
    justify-content: end;
}

.info-right,
.info-left {
    display: inline-block;
    vertical-align: top;
}

.img {
    width: 205px;
    height: 205px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: solid 3px #333333;
    box-sizing: border-box;

    img {
        width: 100%;
        height: 100%;
    }
}

.info-left {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
}

.info-right {
    width: calc( 100% - 205px + 24px );
    margin-top: 46px;
}

.info-tag {
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 2px;
    color: #333333;
    margin-left: 43px;
    margin-bottom: 5px;
    overflow-wrap: break-word;
}

.info-name {
    background-color: #58a1f4;
    color: #fff;
    border-radius: 0 35px 35px 0;
    border: solid 2px #333333;
    padding: 14px 44px 13px;
    font-size: 20px;
    letter-spacing: 2px;
    margin-bottom: 22px;
    overflow-wrap: break-word;
}

.info-content {
    margin-left: 43px;
    text-align: justify;
    line-height: 28.8px;
    font-size: 16px;
    letter-spacing: 3px;
    color: #333333;
    overflow-wrap: break-word;
    height: 200px;
    margin-bottom: 35px;
    overflow-y: auto;
    scrollbar-width: none;
}

@media (max-width:570px) {
    .info {
        margin-left: 35px;
        &::after {
            left: -35px;
        }
    }
    .info-box {
        margin-right: 65px;
    }
}

@media (max-width:500px) {
    .info {
        margin-left: 24px;
        margin-top: 32px;
        margin-bottom: 0;
        &::before {
            top: 110px;
            background-image: url(/images/biz/B06250401/info_bg_phone.png);
            width: 267px;
            height: 507px;
        }
        &::after {
            height: 112px;
            width: 69px;
            left: -33px;
        }
    }
    .title {
        margin-left: 0;
        margin-bottom: 30px;
    }
    .info-box {
        position: initial;
        display: block;
        margin-right: 24px;
        margin-bottom: 60px;
    }
    .info-left {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .info-right {
        width: 100%;
        position: relative;
        margin-top: 10px;
    }
    .info-tag {
        margin-left: 0;
        text-align: center;
    }
    .info-name {
        border-radius: 35px;
        padding: 15px;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        margin-bottom: 20px;
    }
    .info-content {
        margin-left: 8.5px;
        margin-right: 8.5px;
        min-height: auto;
        text-align: justify;
        height: auto;
        overflow-y: initial;
        margin-bottom: 0;
    }
}

// 動畫~~
.info {
    &::after {
        left: -152px;
        bottom: -186px;
        animation: info_bluecat 1.5s ease-in-out forwards;
        animation-delay: 3s;
    }
    &::before {
        opacity: 0;
        animation: jumpInHeight 1s ease-in-out forwards;
        animation-delay: 1.5s;
    }
}

.title {
    animation: fadeInSlideUp 1s ease-in-out forwards;
    animation-delay: 2s;
    opacity: 0;
}

.info-box {
    animation: jumpInOnly 1.5s ease-in-out forwards;
    animation-delay: 2.5s;
    opacity: 0;
}
</style>
