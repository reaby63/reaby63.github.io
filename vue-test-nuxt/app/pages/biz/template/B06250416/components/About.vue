<script setup>
import { ref, computed } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';
import { useCommunity } from '@/composables/useCommunity';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const modules = [Navigation];
// 社群元件套件
const prevRef = ref(null);
const nextRef = ref(null);
const {
    community,
    imgUrl,
    goPage
} = useCommunity({
    ig: '/images/biz/B06250401/ig.svg'
});
</script>

<template>
    <div :class="$style.info">
        <div :class="$style['info-left']">
            <ClientOnly>
                <Image
                    v-if="curPageData?.basic?.image?.[0]"
                    :img-src="commonStore.getImg(webID, curPageData?.basic?.image?.[0])"
                    :has-zoom="true"
                />
                <img v-else src="/images/biz/B06250416/no-img.svg">
            </ClientOnly>
        </div>
        <div :class="$style['info-right']">
            <div v-if="curPageData?.introduce?.company" :class="$style.tag">
                {{ curPageData?.introduce?.company }}
            </div>
            <div :class="$style['info-name']">
                <div v-if="curPageData.basic?.info?.name || curPageData.basic?.info?.enName" :class="$style.h1">
                    {{ curPageData.basic?.info?.name }} <span v-if="curPageData.basic?.info?.name && curPageData.basic?.info?.enName">/</span> {{ curPageData.basic?.info?.enName }}
                </div>
                <div v-if="curPageData.basic?.info?.profession" :class="$style.h5">
                    {{ curPageData.basic?.info?.profession }}
                </div>
            </div>
            <div v-if="curPageData?.basic?.image?.[0]" :class="$style['info-photo-phone']">
                <span>
                    <ClientOnly>
                        <img :src="commonStore.getImg(webID, curPageData?.basic?.image?.[0])">
                    </ClientOnly>
                </span>
            </div>
            <Text
                v-if="curPageData.introduce.resume"
                :class="$style['info-content']"
                :text="curPageData.introduce.resume"
            />
            <div v-if="community.length" :class="$style.community">
                <div :class="$style['community-wrap']">
                    <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : curPageData.community?.length < 5 }]">
                        <img src="/images/biz/B06250416/btn_page_right.svg">
                    </div>
                    <Swiper
                        :class="[$style['community-swiper-wrap'], {[$style['less-than-five']] : curPageData.community?.length < 5 }]"
                        :modules="modules"
                        :slides-per-view="4"
                        :navigation="{
                            prevEl: prevRef,
                            nextEl: nextRef
                        }"
                    >
                        <SwiperSlide v-for="(item, index) in community" :key="index">
                            <div
                                :class="$style['community-item']"
                                @click="goPage(item)"
                            >
                                <div
                                    :class="[$style['item-img'], $style[`is-${item.key}`]]"
                                    :style="{
                                        'mask-image': `url(${item.maskUrl})`
                                    }"
                                />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div ref="nextRef" :class="[$style['swiper-next'], {[$style['without-arrow']] : curPageData.community?.length < 5 }]">
                        <img src="/images/biz/B06250416/btn_page_right.svg">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.info {
    margin: 10px 67px;
    display: flex;
    padding-top: 20px;
}

.info-left {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 31px;
    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
}

.info-right {
    width: calc( 100% - 180px - 31px );
}

.tag {
    font-size: 14px;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin-bottom: 9px;
    color: #FFFFFFCC;
    line-height: 20px;
}

.info-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
    line-height: 25px;
    .h1 {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 0.5px;
        font-family: "Noto Sans Display", sans-serif;
    }
    .h5 {
        font-size: 15px;
        font-weight: 300;
        letter-spacing: 0.5px;
        color: #FFFFFFCC;
    }
}

.info-photo-phone {
    display: none;
    span {
        width: 180px;
        height: 180px;
        border-radius: 50%;
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

.info-content {
    font-size: 15px;
    line-height: 27px;
    letter-spacing: 1px;
    color: #FFFFFFCC;
    margin-bottom: 40px;
    text-align: justify;
}

// 社群套件
.community-wrap {
    width: 295px;
    display: flex;
    align-items: center;
}

.arrow-btn {
    display: block;
    width: 9px;
    height: 15px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }

    &:global(.swiper-button-disabled) {
        opacity: 0.5;
        cursor: initial;
    }
}

.swiper-prev {
    composes: arrow-btn;
    width: 20px;
    height: 20px;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    img {
        position: relative;
        left: 0.8px;
    }
    &.without-arrow {
        display: none;
    }
}

.community-swiper-wrap {
    width: calc(100% - 65px);
    &.less-than-five {
        margin-left: 0;
        .community-item {
            margin-left: 0;
        }
    }
}

.community-item {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    margin: 0 auto;
    padding: 6px;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    &:hover {
        opacity: 0.8;
    }
}

.item-img {
    display: block;
    width: 20px;
    height: 20px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    position: relative;
    transition: all 0.2s;
    background-color: #000;
}

.swiper-next {
    composes: arrow-btn;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    img {
        position: relative;
        left: 0.6px;
    }
    &.without-arrow {
        display: none;
    }
}

@media (max-width:580px) {
    .info {
        margin: 10px 48px;
    }
    .info-left {
        display: none;
    }
    .info-right {
        width: 100%;
    }
    .community {
        display: flex;
        justify-content: center;
    }
    .community-wrap {
        width: 250px;
    }
    .community-swiper-wrap {
        width: calc(100% - 45px);
        &.less-than-five {
            margin-left: auto;
            :global(.swiper-wrapper) {
                justify-content: center;
            }
            .community-item {
                margin-left: auto;
            }
        }
    }
    .tag {
        margin-bottom: 9px;
    }
    .info-name {
        margin-bottom: 25px;
    }
    .info-photo-phone {
        display: flex;
        width: 100%;
        justify-content: center;
        margin-bottom: 25px;
    }
    .info-content {
        margin-bottom: 30px;
    }
}
</style>
