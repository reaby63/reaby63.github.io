<script setup>
import { ref, computed } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';
import { useCommunity } from '@/composables/useCommunity';
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

const modules = [Navigation];
const prevRef = ref(null);
const nextRef = ref(null);

const {
    community,
    imgUrl,
    goPage
} = useCommunity({
    ig: '/images/biz/B08250401/icon-ig.svg',
    fb: '/images/biz/B08250401/icon-fb.svg',
    line: '/images/biz/B08250401/icon-line.svg',
    threads: '/images/biz/B08250401/icon-threads.svg',
    openAir: '/images/biz/B08250401/icon-ruten.svg',
    youtube: '/images/biz/B08250401/icon-youtube.svg',
    shopee: '/images/biz/B08250401/icon-shopee.svg'
});
</script>

<template>
    <div :class="$style.info">
        <div :class="$style['info-top']">
            <div :class="$style['info-left']">
                <div :class="$style['info-photo']">
                    <span>
                        <ClientOnly>
                            <Image
                                v-if="curPageData.basic?.image?.[0]"
                                :img-src="commonStore.getImg(webID, curPageData.basic?.image?.[0])"
                                :has-zoom="true"
                            />
                            <img v-else src="/images/biz/B08250401/info-no-img.svg">
                        </ClientOnly>
                    </span>
                </div>
            </div>
            <div :class="$style['info-right']">
                <!-- <div
                    :class="[$style['follow-btn'], { [$style['is-active']]: curFollow }]"
                    @click="onChange"
                >
                    <span :class="$style['follow-btn-tag']">Follow me</span>
                    <span :class="$style['follow-btn-text']">{{ curFollow ? '已追蹤' : '追蹤' }}</span>
                    <span :class="$style['follow-btn-heart']" />
                </div> -->
            </div>
        </div>
        <div :class="$style.bottom">
            <div :class="$style['bottom-top']">
                <div :class="$style['bottom-tag']">
                    <span>
                        {{ curPageData.introduce?.title || 'Portfolio' }}
                    </span>
                </div>
                <div :class="$style['bottom-decration']">
                    <img src="/images/biz/B08250401/circle.svg">
                    <img src="/images/biz/B08250401/triangle.svg">
                    <img src="/images/biz/B08250401/square.svg">
                </div>
            </div>
            <div :class="$style['resume-bottom']">
                <div :class="$style.content">
                    <div :class="$style['content-left']">
                        <div :class="$style['title-photo']">
                            <ClientOnly>
                                <img v-if="curPageData.basic?.image?.[0]" :src="commonStore.getImg(webID, curPageData.basic?.image?.[0])">
                                <img v-else src="/images/biz/B08250401/info-no-img-sml.svg">
                            </ClientOnly>
                        </div>
                    </div>
                    <div :class="$style['content-right']">
                        <div v-if="curPageData.basic?.info?.profession" :class="$style.h6">
                            {{ curPageData.basic?.info?.profession }}
                        </div>
                        <div :class="$style.h5">
                            {{ curPageData.basic?.info?.name }} {{ curPageData.basic?.info?.enName }}
                        </div>
                    </div>
                </div>
                <div v-if="curPageData.introduce.resume || community?.length" :class="$style.content">
                    <div :class="$style['content-left']">
                        <div :class="$style['content-tag']">
                            <img src="/images/biz/B08250401/profile-photo-A.png">
                        </div>
                    </div>
                    <div :class="[$style['content-right'], $style['content-in']]">
                        <Text
                            v-if="curPageData.introduce.resume"
                            :class="$style['content-in-top']"
                            :text="curPageData.introduce.resume"
                        />
                        <div v-if="curPageData.introduce.resume && community?.length" :class="$style['content-line']" />
                        <div v-if="community?.length" :class="$style['community-wrap']">
                            <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : curPageData.community?.length < 4 }]" />
                            <Swiper
                                :class="$style['community-swiper-wrap']"
                                :modules="modules"
                                :breakpoints="{
                                    0: { slidesPerView: 2 },
                                    375: { slidesPerView: 3 },
                                    440: { slidesPerView: 4 },
                                    500: { slidesPerView: 5 }
                                }"
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
                            <div ref="nextRef" :class="[$style['swiper-next'], {[$style['without-arrow']] : curPageData.community?.length < 4 }]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.info {
    padding: 30px;
    position: relative;
    &::after {
        content: "";
        display: block;
        border-radius: 674.5px;
        background: rgba(13, 153, 255, 0.20);
        filter: blur(90px);
        position: absolute;
        top: 138px;
        left: 21px;
        width: 674px;
        height: 639px;
        z-index: 0;
    }
    &::before {
        content: "";
        display: block;
        position: fixed;
        top: 0;
        width: calc(100vw - 10px);
        max-width: 644px;
        padding-top: calc(514 / 640 * 100%); // 80.3%
        background-image: url(/images/biz/B08250401/index-bg-image.png);
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: top left;
    }
}

.info-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    z-index: 1;
    position: relative;
    margin-bottom: 24px;
    // opacity: 0;
}

.info-left {
    .info-photo {
        margin-left: 12px;
        background-color: #0D99FF;
        padding: 16px;
        border-radius: 120px 120px 12px 120px;
        box-shadow: 0px 1.5px 0px 0px rgba(255, 255, 255, 0.08) inset,
            0px 0px 1.5px 0px rgba(255, 255, 255, 0.35) inset,
            0px 15px 36px 0px rgba(0, 0, 0, 0.45),
            0px 4.5px 7.5px 0px rgba(0, 0, 0, 0.35);
        span {
            width: 208px;
            height: 208px;
            border-radius: 50%;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: solid 6px #FFFFFF;
            box-sizing: border-box;
            box-shadow: 0 0 1.5px 0 rgba(0, 0, 0, 0.08),
                    0 15px 36px 0 rgba(0, 0, 0, 0.18),
                    0 3px 7.5px 0 rgba(0, 0, 0, 0.15);
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
}

.follow-btn {
    background-color: #3C3C3C;
    border-radius: 18px;
    padding: 12px;
    color: #ffffff;
    display: flex;
    align-items: center;
    padding: 12px;
    font-size: 16.5px;
    position: relative;
    transition: all 0.4s;
    cursor: pointer;
    box-shadow: 0 1.5px 4.5px 0 #00000080,
                0 7.5px 18px 0 #00000059,
                0 0 1.5px 0 #FFFFFF4D inset,
                0 1.5px 0 0 #FFFFFF14 inset;
    &:hover {
        .follow-btn-tag {
            animation: focusbtInFellow 0.4s ease-in-out forwards;
        }
    }
    .follow-btn-tag {
        display: block;
        background-color: #FFFBEB;
        color: #DD940E;
        padding: 1px 4.5px;
        padding-bottom: 2.5px;
        padding-right: calc( 4.5px - 0.05em );
        border-radius: 3px;
        font-size: 16.5px;
        font-weight: 500;
        letter-spacing: 0.05em;
        position: absolute;
        top: -49px;
        left: 25px;
        box-shadow: 0 1.5px 4.5px 0 #00000080,
                0 7.5px 18px 0 #00000059,
                0 0 1.5px 0 #FFFFFF4D inset,
                0 1.5px 0 0 #FFFFFF14 inset;
        animation: focusbtOutFellow 0.4s ease-in-out forwards;
        &::before {
            content: "";
            display: block;
            border-left: 9px solid transparent;
            border-right: 9px solid transparent;
            border-top: 9px solid #FFFBEB;
            width: 0;
            height: 0;
            position: absolute;
            left: 39px;
            bottom: -8px;
            z-index: 1;
        }
    }

    .follow-btn-text {
        width: 3em;
        text-align: center;
        font-weight: 900;
        margin-right: 12px;
    }
    .follow-btn-heart {
        width: 54px;
        height: 33px;
        position: relative;
        background-color: #585858;
        border-radius: 12px;
        &::before {
            content: "";
            mask-image: url('/images/biz/B08250401/heart-line.svg');
            mask-repeat: no-repeat;
            mask-size: contain;
            mask-position: center;
            display: inline-block;
            width: 30px;
            height: 30px;
            position: absolute;
            left: 1.5px;
            top: 1.5px;
            background-color: #ffffff;
            -webkit-mask-image: url('/images/biz/B08250401/heart-line.svg');
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: contain;
            -webkit-mask-position: center;
            z-index: 1;
            transition: all 1s;
        }
        &:after {
            content: "";
            display: block;
            width: 30px;
            height: 30px;
            position: absolute;
            left: 1.5px;
            top: 1.5px;
            border-radius: 12px;
            background-color: #2C2C2C;
            box-shadow: 0 1.5px 4.5px 0 #00000066,
                        0 0 0.75px 0 #00000080,
                        0 0 0.75px 0 #FFFFFF4D inset,
                        0 0.75px 0 0 #FFFFFF1A inset;
        }
    }
    .follow-btn-heart {
        &::before {
            //愛心
            animation: focusbtOutHeart 0.4s ease-in-out forwards;
        }
        &::after {
            //愛心的底
            animation: focusbtOutHeartBg 0.4s ease-in-out forwards;
        }
    }
    &.is-active {
        .follow-btn-heart {
            &::before {
                //愛心
                animation: focusbtOutHeart 0.4s ease-in-out forwards;
            }
            &::after {
                //愛心的底
                animation: focusbtOutHeartBg 0.4s ease-in-out forwards;
            }
        }
        .follow-btn-heart {
            background-color: #F3C11B;
            &::before {
                background-color: #F3C11B;
            }
            &::before ,
            &::after {
                left: auto;
                right: 1.5px;
            }
        }
    }
    &:active {
        .follow-btn-heart {
            &::after {
                animation: focusbtBgActive 0.5s ease-in-out forwards;
            }
            &::before {
                animation: focusbtHeartActive 0.5s ease-in-out forwards;
            }
        }
    }
}

.bottom {
    z-index: 1;
    position: relative;
    border-radius: 12px;
    background: #3C3C3C;
    box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.08) inset, 0 0 1px 0 rgba(255, 255, 255, 0.35) inset, 0 10px 24px 0 rgba(0, 0, 0, 0.45), 0 3px 5px 0 rgba(0, 0, 0, 0.35);
    // opacity: 0;
}

.bottom-top {
    padding: 9px 12px;
    border-bottom: 1.5px solid #555;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bottom-tag {
        color: #ffffff;
        line-height: 18px;
        font-size: 16.5px;
    }
    .bottom-decration {
        display: flex;
        img {
            width: 24px;
            margin-right: 6px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
}

.resume-bottom {
    padding: 12px;
    padding-bottom: 18px;
}

.content {
    display: flex;
    &:last-child {
        margin-top: 18px;
    }
    .content-left {
        margin-right: 12px;
        .title-photo,
        .content-tag {
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            overflow: hidden;
            border: 0.75px solid #FFF;
            box-sizing: border-box;
            margin-top: 6px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .content-tag {
            border: 0;
        }
    }
    .content-right {
        color: #ffffff;
        .h6 {
            font-size: 16.5px;
            margin-bottom: 3px;
        }
        .h5 {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: 1.2px;
            line-height: 33px;
        }
        &.content-in {
            border-radius: 12px;
            background: #484848;
            width: 100%;
            .content-in-top {
                padding: 18px;
                line-height: 30px;
            }
            .content-line {
                border-top: 1.5px solid #555;
            }
        }
    }
}

// 社群
.community-wrap {
    display: flex;
    align-items: center;
    padding: 12px 18px;
}

.arrow-btn {
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: relative;
    background-color: #0D99FF;
    transition: all 0.2s;
    border-radius: 50%;
    box-sizing: border-box;
    border: 1px solid #0C8CE9;

    &:hover {
        background-color: transparent;
    }

    &:global(.swiper-button-disabled) {
        cursor: initial;
        background-color: #757575;
        border: 1px solid #757575;
        opacity: 0.5;
        &:hover {
            background-color: #757575;
            opacity: 0.5;
        }
    }
}

.swiper-prev {
    composes: arrow-btn;
    margin-right: 15px;
    &::before {
        content: "";
        display: block;
        background: url('/images/biz/B08250401/arrow-l.svg') 50% 0 no-repeat;
        height: 24px;
        width: 24px;
        background-size: cover;
        background-position: top;
        position: relative;
        right: 1px;
        top: -1px;
    }
}

.community-swiper-wrap {
    width: 100%;
    max-width: 250px;
    margin: 0;
}

.community-item {
    box-sizing: border-box;
    width: 42px;
    height: 42px;
    margin: 0 auto;
    transition: all 0.3s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    position: relative;
    &::before {
        content: "";
        width: 100%;
        height: 100%;
        transform: scale(0.2);
        opacity: 0;
        transition: all 0.5s;
        position: absolute;
        left: calc((100% - 42px) / 2);
        top: calc((100% - 42px) / 2);
    }

    &:hover {
        &:before {
            content: "";
            width: 100%;
            height: 100%;
            border-radius: 8px;
            background: #383838;
            border: 1.5px solid #555;
            position: absolute;
            left: calc((100% - 42px) / 2);
            top: calc((100% - 42px) / 2);
            z-index: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transform: scale(1);
            transform: scale(1);
            opacity: 1;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
        }
    }
}

.item-img {
    display: block;
    width: 36px;
    height: 36px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}

.swiper-next {
    composes: arrow-btn;
    margin-left: 15px;
    position: absolute;
    right: 35px;
    &::before {
        content: "";
        display: block;
        background: url('/images/biz/B08250401/arrow-r.svg') 50% 0 no-repeat;
        height: 24px;
        width: 24px;
        background-size: cover;
        background-position: top;
        position: relative;
        left: 0px;
        top: -1px;
    }
}

@media (max-width:500px) {
    .community-swiper-wrap {
        max-width: 200px;
    }
    .info-left .info-photo {
        margin-left: 2.5vw;
        padding: 3vw;
        span {
            width: 40vw;
            height: 40vw;
        }
    }
    .follow-btn {
        padding: 10px;
        font-size: 14.5px;
        .follow-btn-text {
            margin-right: 10px;
        }
        .follow-btn-tag {
            font-size: 13px;
            top: -39px;
            left: 28px;
            &::before {
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-top: 6px solid #FFFBEB;
                left: 29px;
                bottom: -5px;
            }
        }
    }
}

@media (max-width:410px) {
    .follow-btn {
        padding: 8px;
        border-radius: 12px;
        .follow-btn-tag {
            font-size: 11px;
            top: -34px;
            left: 16px;
            &::before {
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 4px solid #FFFBEB;
                bottom: -3px;
            }
        }
        .follow-btn-text {
            font-size: 12px;
        }
        .follow-btn-heart {
            width: 36px;
            height: 22px;
            border-radius: 8px;
            &::after,
            &::before {
                top: 0.7px;
            }
            &::before {
                width: 20px;
                height: 20px;
            }
            &::after {
                width: 20px;
                height: 20px;
                border-radius: 8px;
            }
        }
    }
}

@media (max-width:440px) {
    .community-swiper-wrap {
        max-width: 150px;
    }
}

@media (max-width:400px) {
    .info {
        padding: 20px;
    }
}

@media (max-width:375px) {
    .community-swiper-wrap {
        max-width: 103px;
    }
}
</style>
