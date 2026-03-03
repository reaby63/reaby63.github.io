<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Text from '@/pages/biz/components/Text.vue';
import { useFollow } from '@/composables/useFollow.js';
import { useCommonStore } from '@/stores/common';
import Community from '../components/Community.vue';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webId = computed(() => commonStore.userInfo.webID || '');
const route = useRoute();
const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});

const communityPreview = ref(4);
</script>

<template>
    <div :class="$style.info">
        <div :class="$style.topbg">
            <ClientOnly>
                <img v-if="commonStore.getPageInfo?.introduce?.topBgImage?.[0]" :src="commonStore.getImg(webId, commonStore.getPageInfo?.introduce?.topBgImage?.[0])">
                <img v-else src="/images/biz/B06250317/info_bg.jpg">
            </ClientOnly>
        </div>
        <!-- <div :class="$style.focus">
            <button
                v-if="curFollow"
                :class="[$style['focus-bt'], { [$style.active]: curFollow }]"
                @click="onChange"
            >
                <img src="/images/biz/B06250317/heart.svg" alt="icon">
                <span>已追蹤</span>
            </button>
            <button
                v-else
                :class="$style['focus-bt']"
                @click="onChange"
            >
                <img src="/images/biz/B06250317/heart-line.svg" alt="icon">
                <span>追蹤</span>
            </button>
        </div> -->
        <div :class="$style.top">
            <div :class="$style['top-left']">
                <ClientOnly>
                    <Image
                        v-if="commonStore.getPageInfo.basic.image?.[0]"
                        :img-src="commonStore.getImg(webId, commonStore.getPageInfo.basic.image[0])"
                        :has-zoom="true"
                    />
                </ClientOnly>
            </div>
            <div :class="[$style['top-right'], { [$style['without-left']]: !commonStore.getPageInfo.basic.image?.[0] }]">
                <p v-if="commonStore.getPageInfo.basic.info.profession" :class="$style.tag">
                    <span>
                        {{ commonStore.getPageInfo.basic.info.profession }}
                    </span>
                </p>
                <h6 v-if="commonStore.getPageInfo.basic.info.name">
                    {{ commonStore.getPageInfo.basic.info.name }}
                    <span v-if="commonStore.getPageInfo.basic.info.enName">
                        {{ commonStore.getPageInfo.basic.info.enName }}
                    </span>
                </h6>
                <Text
                    v-if="commonStore.getPageInfo.introduce.resume"
                    :class="$style.resume"
                    :text="commonStore.getPageInfo.introduce.resume"
                />
                <div :class="$style['content-wrapper']">
                    <div :class="$style.content">
                        <Community
                            v-if="curPageData.community"
                            :key="communityPreview"
                            :class="[
                                $style['info-community-wrap'],
                                curPageData.community.length < 4 ? $style['community-less'] : ''
                            ]"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.focus-bt {
    background-color: rgba($color: #000000, $alpha: 0.6);
    border-radius: 25px;
    width: 110px;
    font-size: 14px;
    color: #d2d7db;
    height: 40px;
    transition: all .2s;
    border: solid 1px #858585;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: inline-block;
    transform: translateY(1px);

    &:hover {
        opacity: 0.7;
    }

    img {
        display: inline-block;
        width: 15px;
        position: relative;
        top: 1.5px;
        margin-right: 10px;
    }
}

.topbg {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 297px;
    aspect-ratio: 640 / 297;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 0;
    width: 100%;
    left: 0;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &::after {
        content: "";
        position: absolute;
        bottom: 0;
        z-index: -1;
        right: 0;
        width: 100%;
        height: 162px;
        background: white;
        clip-path: polygon(100% 0, 0 100%, 100% 100%);
        z-index: 1;
    }
}

.info {
    margin-bottom: 49px;
    padding: 30px 35px;
    padding-bottom: 0;
    position: relative;
    animation: fadeInSlideUp 1s ease-in-out forwards;
}

.focus {
    text-align: right;
    z-index: 1;
}

.top {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 118px;
    z-index: 2;
    position: relative;
}

.top-left {
    width: 205px;
    min-width: 205px;
    height: 205px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    position: relative;

    &::before {
        content: "";
        width: 99%;
        height: 99%;
        background-color: #000;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    img {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }
}

.top-right {
    width: calc(100% - 255px);
    text-align: right;
    margin-left: 50px;
    margin-top: -5px;

    h6,
    p {
        letter-spacing: 0.5px;
    }

    h6 {
        font-size: 24px;
        margin: 0 0 10px 0;
        font-weight: 600;
        color: #1E1E1E;
        text-shadow: 0.1px 0 0 currentColor, -0.1px 0 0 currentColor;
        line-height: 34px;

        span {
            font-weight: 600;
            display: inline-block;
            margin-left: 6px;
            letter-spacing: 0.5px;
        }
    }

    p {
        font-size: 15px;
        margin-bottom: 14px;
        color: rgba($color: #1E1E1E, $alpha: 0.8);
    }
}

.resume {
    line-height: 1.8em;
    margin-bottom: 20px;
    text-align: justify;
    word-wrap: break-word;
}

.tag {
    margin-bottom: 5px;

    span {
        display: inline-block;
        border-bottom: solid 0.5px #00000080;
        padding-bottom: 3px;
        font-weight: 300;
        letter-spacing: 0.5px;
        line-height: 21px;
    }
}

.content-wrapper {
    display: flex;
    justify-content: right;
}

.info-community-wrap {
    width: 100%;
    min-width: 172px;
    max-width: 290px;
    transform-origin: center right;
    display: flex;
    align-items: center;
}

.community-less {
    :global(.swiper-wrapper) {
        justify-content: flex-end !important;
    }
}

@media (max-width:639px) {
    .focus-bt {

        &:hover {
            opacity: 1;
        }
    }
}

@media (max-width:500px) {
    .content-wrapper {
        justify-content: center;
    }

    .info-community-wrap {
        transform-origin: center;
    }

    .topbg {
        height: 271px;

        &::after {
            height: 72px;
        }
    }

    .info {
        padding: 20px;
    }

    .top {
        display: block;
        text-align: center;
        margin-top: 40px;
    }

    .top-right {
        width: 100%;
        margin-left: 0;
        text-align: center;
        margin-top: 18px;
        &.without-left{
            margin-left: 0;
        }

        h6,
        p {
            margin-left: 0;
        }

        h6 {
            margin-bottom: 10px;
        }

        p {
            margin-bottom: 11px;
        }
    }

    .resume {
        text-align: left;
        margin-bottom: 21px;
    }

    .tag {
        margin-bottom: 12px;

        span {
            padding-bottom: 3px;
        }
    }
}

@media (max-width: 480px) {
    .content {
        margin-left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
    }
}

@media (max-width: 360px) {
    .top {
        display: block;
        text-align: center;
    }
    .top-right {
        width: 100%;

        h6,
        p {
            margin-left: 0;
        }

        p {
            margin-bottom: 11px;
        }
    }
}
</style>
