<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';
import Text from '@/pages/biz/components/Text.vue';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const route = useRoute();
const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});
</script>

<template>
    <div :class="$style.about">
        <!-- 追蹤 -->
        <!-- <div
            :class="[$style['follow-btn'], { [$style['is-active']]: curFollow }]"
            @click="onChange"
        >
            <span>{{ curFollow ? '已追蹤' : '追蹤' }}</span>
        </div> -->
        <div :class="$style.info">
            <div :class="$style.photo">
                <ClientOnly>
                    <img v-if="curPageData.introduce?.bgImage?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.bgImage?.[0])">
                    <img v-else src="/images/biz/B02250318/bg_img.png">
                </ClientOnly>
            </div>
            <div :class="$style['info-box']">
                <div v-if="curPageData.basic?.logo?.[0]" :class="$style['info-logo']">
                    <ClientOnly>
                        <img :src="commonStore.getImg(webID, curPageData.basic?.logo?.[0])">
                    </ClientOnly>
                </div>
                <div v-if="curPageData.basic?.image?.[0]" :class="$style['info-photo']">
                    <span>
                        <ClientOnly>
                            <Image
                                :img-src="commonStore.getImg(webID, curPageData.basic?.image?.[0])"
                                :has-zoom="true"
                            />
                        </ClientOnly>
                    </span>
                </div>
                <h5>
                    {{ curPageData.basic?.info?.enName || curPageData.basic?.info?.name }}<span v-if="curPageData.basic?.info?.profession" />{{ curPageData.basic?.info?.profession }}
                </h5>
                <Text
                    v-if="curPageData.introduce?.resume"
                    :class="$style.introduce"
                    :text="curPageData.introduce?.resume"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.follow-btn {
    background-color: #292929;
    border-radius: 25px;
    width: 138px;
    font-size: 14px;
    color: #969696;
    height: 37px;
    transition: all .2s;
    position: absolute;
    top: 27px;
    right: 13px;
    z-index: 9;
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
        position: relative;
        top: -1.5px;
    }
    &:hover {
        background-color: #212121;
    }
    &::before {
        content: url('/images/biz/B02250318/heart-line.svg');
        display: inline-block;
        width: 20px;
        height: 16px;
        position: relative;
        top: 0;
        margin-right: 6px;
    }
    &.is-active {
        &::before {
            content: url('/images/biz/B02250318/heart.svg');
        }
    }
}

.info {
    position: relative;
    min-height: auto;
    padding-bottom: 140px;
}

.photo {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.info-box {
    position: relative;
    top: 82px;
    left: auto;
    width: auto;
    margin: 0px 20px;
    background-color: rgba($color: #f2c812, $alpha: 0.82);
    padding: 15px 23px;
    padding-bottom: 44px;
    box-sizing: border-box;
    color: #000000;
    opacity: 0;
    transform: translateY(50px);
    animation: fadeInSlideUp 1s ease-in-out forwards;
    .info-logo {
        text-align: center;
        margin-bottom: 13px;
        img {
            width: 105px;
        }
    }
    .info-photo {
        display: flex;
        justify-content: center;
        margin-bottom: 28px;
        span {
            width: 127px;
            height: 127px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    h5 {
        font-size: 15px;
        margin-bottom: 5px;
        font-weight: 500;
        span {
            display: inline-block;
            width: 1px;
            height: 15px;
            background-color: #000000;
            margin: 0px 11px;
            position: relative;
            top: 1px;
        }
    }
    .introduce {
        font-size: 15px;
        line-height: 30px;
    }
}

@media (min-width:640px) {
    .info {
        padding-bottom: 176px;
    }
}

@media (min-width:475px) {
    .info-box {
        left: 34px;
        width: 256px;
        margin: 0;
    }
}
</style>
