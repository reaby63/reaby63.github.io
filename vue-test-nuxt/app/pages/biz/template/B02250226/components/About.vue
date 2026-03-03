<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Contact from './Contact.vue';
import Community from '../components/Community.vue';
import Text from '@/pages/biz/components/Text.vue';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();

const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const community = computed(() => commonStore.getPageInfo?.community);
</script>

<template>
    <div :class="$style.about">
        <div :class="$style.header">
            <ClientOnly>
                <img v-if="curPageData.introduce?.introduceImg?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.introduceImg?.[0])">
                <img v-else src="/images/biz/B02250226/bg_header.jpg">
            </ClientOnly>
        </div>
        <div :class="$style.top">
            <div :class="$style['info-img']">
                <ClientOnly>
                    <Image
                        :img-src="commonStore.getImg(webID, curPageData.basic?.image?.[0])"
                        :has-zoom="true"
                        :class="$style['img-box']"
                    />
                </ClientOnly>
            </div>
            <div v-if="curPageData.basic?.info?.name || curPageData.basic?.info?.enName" :class="$style['info-name']">
                {{ curPageData.basic?.info?.name || curPageData.basic?.info?.enName }}
            </div>
            <div v-if="curPageData.basic?.info?.profession" :class="$style['info-job']">
                {{ curPageData.basic?.info?.profession }}
            </div>
            <!-- 社群元件 -->
            <div v-if="community?.length">
                <Community />
            </div>
            
        </div>
        <div :class="$style.bottom">
            <div :class="$style['info-about']">
                <Text
                    v-if="curPageData.introduce.resume"
                    :class="$style.introduce"
                    :text="curPageData.introduce.resume"
                />
                <Contact />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.about {
    position: relative;
    overflow: hidden;
}

.header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 640 / 524;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.top {
    margin: 45px 32px 0;
    margin-bottom: 29px;
    display: flex;
    flex-wrap: wrap;
    z-index: 2;
    position: relative;
    > div {
        width: 100%;
        justify-content: center;
        text-align: center;
        display: flex;
    }
}

.info-img {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 3px;
    .img-box {
        width: 142px;
        height: 142px;
        overflow: hidden;
        border-radius: 30px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}

.info-name {
    font-size: 24px;
    margin-bottom: 2px;
    line-height: 32px;
    letter-spacing: 1px;
}

.info-job {
    font-size: 16px;
    margin-bottom: 20px;
}

.bottom {
    position: relative;
    z-index: 2;
    padding: 0 32px 37px;
    background: url('/images/biz/B02250226/bg_about.jpg') center / cover no-repeat;
    background-position: center 100px;
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100px;
        z-index: 1;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 66, 0),
            #000042
        );
    }
}

.info-about {
    position: relative;
    z-index: 3;
    color: #434343;
    background: #fff;
    border-radius: 30px;
    font-size: 15px;
    padding: 30px 30px 25px;
    .introduce {
        line-height: 2.4;
        margin-bottom: 15px;
        p {
            margin: 0;
        }
    }
}

@media (max-width: 639px) {
    .header {
        width: auto;
        aspect-ratio: auto;
        height: 100%;
        object-fit: cover;
    }
}

</style>
