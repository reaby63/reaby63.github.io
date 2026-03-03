<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Text from '@/pages/biz/components/Text.vue';
import { useFollow } from '@/composables/useFollow.js';
import { useCommonStore } from '@/stores/common';
import { useCommunity } from '@/composables/useCommunity';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const route = useRoute();
const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});
const emit = defineEmits(['get-info']);

const curPageData = computed(() => commonStore.getPageInfo);
// 社群元件套件
const prevRef = ref(null);
const nextRef = ref(null);

const {
    community,
    imgUrl,
    goPage
} = useCommunity();
</script>

<template>
    <div v-if="commonStore.getPageInfo.introduce">
        <div :class="$style.top">
            <div v-if="curPageData.basic.image?.[0]" :class="$style['top-img']">
                <ClientOnly>
                    <Image
                        :img-src="commonStore.getImg(commonStore.userInfo.webID, curPageData.basic.image[0])"
                        :has-zoom="true"
                    />
                </ClientOnly>
            </div>
            <div :class="$style['top-info']">
                <h6 v-if="curPageData.basic.info.name">
                    {{ curPageData.basic.info.name }}
                </h6>
                <p v-if="curPageData.basic.info.profession">
                    {{ curPageData.basic.info.profession }}
                </p>
                <div :class="$style['community-feature-wrap']">
                    <div v-if="community.length" :class="[$style['community-wrap'] , $style['info-community-wrap']]">
                        <div ref="prevRef" :class="$style['swiper-wrap']">
                            <div :class="$style['swiper-prev']" />
                        </div>
                        <Swiper
                            :class="[$style['community-swiper-wrap'], { [$style['is-center']]: community.length < 4 }]"
                            :modules="[Navigation]"
                            :breakpoints="{
                                0: { slidesPerView: 4 },
                                480: { slidesPerView: 2 },
                                488: { slidesPerView: 3 },
                                570: { slidesPerView: 4 }
                            }"
                            :navigation="{
                                prevEl: prevRef,
                                nextEl: nextRef
                            }"
                        >
                            <SwiperSlide v-for="(item, index) in community" :key="index">
                                <div :class="$style['community-item']" @click="goPage(item)">
                                    <div
                                        :style="{
                                            'mask-image': `url(${item.maskUrl})`
                                        }"
                                        :class="[$style['item-img'], $style[`is-${item.key}`]]"
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div ref="nextRef" :class="$style['swiper-wrap']">
                            <div :class="$style['swiper-next']" />
                        </div>
                    </div>
                    <!-- <button
                            v-if="curFollow"
                            :class="[$style['focus-bt'], { [$style.active]: curFollow }]"
                            @click="onChange"
                        >
                            <img src="/images/biz/B02250218/heart.svg" alt="icon">
                            <span>已追蹤</span>
                        </button>
                        <button
                            v-else
                            :class="$style['focus-bt']"
                            @click="onChange"
                        >
                            <img src="/images/biz/B02250218/heart-line.svg" alt="icon">
                            <span>追蹤</span>
                        </button> -->
                </div>
            </div>
        </div>
        <Text
            v-if="curPageData.introduce.resume"
            :class="$style.introduce"
            :text="curPageData.introduce.resume"
        />
    </div>
</template>

<style lang="scss" module>
.top {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.top-img {
    width: 144px;
    height: 144px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.top-info {
    width: calc(100% - 144px);
    padding-top: 9px;
    h6,
    p {
        margin: 0 0 0 21px;
    }
    h6 {
        font-size: 24px;
        line-height: 35px;
        font-weight: 400;
        letter-spacing: 0;
        word-wrap: break-word;
    }
    p {
        font-size: 15px;
        margin-bottom: 14px;
        line-height: 22px;
        font-weight: 400;
        letter-spacing: 0;
    }
}

.focus-bt {
    border: none;
    background-color: #130700;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 142px;
    width: calc(100% - 232px);
    min-width: 88px;
    font-size: 14px;
    color: #d2d7db;
    height: 37px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
    img {
        display: inline-block;
        width: 20px;
        position: relative;
        top: 0.75px;
        margin-right: 7px;
    }
}

.introduce {
    font-size: 15px;
    line-height: 36px;
    line-height: 36px;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 0;
}

.info-community-wrap {
    width: 203px;
    margin: 0 14px 0 22px;
}

.community-feature-wrap,
.info-community-wrap {
    display: flex;
    align-items: center;
}

// 社群元件
.swiper-wrap {
    cursor: pointer;
    &:global(.swiper-button-disabled) {
        opacity: 0.5;
        cursor: initial;
    }
}

.arrow-btn {
    display: block;
    width: 9px;
    height: 15px;
    transition: all 0.2s;

    &:hover {
        opacity: 0.8;
    }
}

.swiper-prev {
    margin-right: 12px;
    composes: arrow-btn;
    background: url('/images/components/community/arrow-l.svg') 50% 0 no-repeat;
}

.community-swiper-wrap {
    width: 100%;
    display: flex;
}

.community-item {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    padding: 6px;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: 50%;
    background-color: #000;

    &:hover {
        opacity: 0.7;
    }
}

.item-img {
    display: block;
    width: 100%;
    height: 100%;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    background-color: #fff;
}

.swiper-next {
    composes: arrow-btn;
    background: url('/images/components/community/arrow-r.svg') 50% 0 no-repeat;
}

@media (max-width: 480px) {
    .community-feature-wrap {
        display: block;
    }

    .info-community-wrap {
        margin: 0 0 12px 25px;
    }

    .focus-bt {
        width: 100%;
        margin-left: 20px;
    }
}

@media (max-width: 419px) {
    .info-community-wrap {
        width: 161px;
    }
}

@media (max-width: 360px) {
    .top {
        display: block;
        text-align: center;
    }

    .top-info {
        width: 100%;
        h6,
        p {
            margin-left: 0;
        }
        p {
            margin-bottom: 0;
        }
    }

    .focus-bt {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .community-feature-wrap {
        margin-top: 11px;
    }

    .community-swiper-wrap {
        width: 100%;
        &.is-center {
            :global(.swiper-wrapper) {
                justify-content: center;
            }
        }
        :global(.swiper-slide) {
            justify-content: center;
            display: flex;
        }
    }

    .info-community-wrap {
        width: 210px;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
