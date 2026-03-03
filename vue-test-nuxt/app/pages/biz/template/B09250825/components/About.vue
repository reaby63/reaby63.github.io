<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
</script>

<template>
    <div v-if="curPageData.introduce?.resume || curPageData.movie?.link?.[0]?.value || curPageData.movie?.title || curPageData.movie?.subTitle" :class="$style['about-movie']">
        <div :class="$style['all-bg']">
            <ClientOnly>
                <img v-if="curPageData.introduce?.topBgImage?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.topBgImage?.[0])">
                <img v-else src="/images/biz/B09250825/topBgImage.jpg">
            </ClientOnly>
        </div>
        <Text
            v-if="curPageData.introduce?.resume"
            :class="$style.resume"
            :text="curPageData.introduce?.resume"
        />
        <div v-if="curPageData.movie?.link?.[0]?.value" :class="$style.movie">
            <div v-if="curPageData.movie?.title && curPageData.movie?.subTitle" :class="$style['movie-title']">
                <span v-if="curPageData.movie?.title" :class="$style.title">
                    {{ curPageData.movie?.title }}
                </span>
                <span v-if="curPageData.movie?.subTitle" :class="$style.subTitle">
                    {{ curPageData.movie?.subTitle }}
                </span>
            </div>
            <div :class="$style['movie-wrap']">
                <ClientOnly>
                    <iframe
                        v-if="curPageData.movie?.link?.[0]?.type === 'link'"
                        :src="curPageData.movie?.link?.[0]?.value"
                        :class="$style['iframe-wrap']"
                    />
                    <Image
                        v-else
                        :class="$style['img-wrap']"
                        :has-zoom="true"
                        :img-src="commonStore.getImg(webID, curPageData.movie?.link?.[0]?.value)"
                    />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.about-movie {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.all-bg {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}

.resume {
    position: relative;
    z-index: 1;
    margin: 0 75px;
    background-color: #F7F2E9;
    padding: 23px 27px 54px;
    width: 100%;
    line-height: 28px;
    letter-spacing: 1.5px;
    font-size: 15px;
    margin-bottom: 41px;
}

.movie {
    display: block;
    width: 100%;
    margin: 20px 20px 98px;
    position: relative;
    z-index: 1;
}

.movie-title {
    display: flex;
    justify-content: flex-end;
    color: #000;
    font-weight: 500;
    line-height: 28px;
    margin-bottom: 27px;
    .title {
        font-size: 32px;
        letter-spacing: 2.56px;
        margin-bottom: 5px;
    }
    .subTitle {
        margin-left: 9px;
        font-size: 15px;
        letter-spacing: 1.5px;
    }
}

.movie-wrap {
    max-height: 446px;
    aspect-ratio: 600 / 446;
}

.iframe-wrap {
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

.img-wrap {
    img {
        object-fit: cover;
        background-color: transparent !important;
    }
}

@media (max-width:600px) {
    .resume {
        margin: 0 20px 41px;
    }
}

@media (max-width:470px) {
    .resume {
        padding: 16px 32px 54px;
    }
}
</style>
