<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import Pdcard from './Pdcard.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');

const modules = [Pagination];

const pagination = {
    clickable: true,
    type: 'custom',
    renderCustom: (swiper, current, total) => {
        if (total <= 1) return ''; //頁數小於等於1時不出現
        let html = '';
        for (let i = 1; i <= total; i++) {
            html += `<span class="${i === current ? 'active' : ''}" data-index="${i - 1}">${i}</span>`;
        }
        setTimeout(() => {
            const bullets = document.querySelectorAll('.swiper-pagination span');
            bullets.forEach(b => {
                b.onclick = () => {
                    swiper.slideTo(+b.dataset.index);
                };
            });
        }, 0);
        return html;
    }
};

function onSwiperInit(swiper) {
    const paginationEl = swiper.pagination.el;
    if (!paginationEl) return;

    const totalPages = productGroup.value.length;

    if (totalPages > 5) {
        return paginationEl.classList.add('more-than-five');
    }

    paginationEl.classList.remove('more-than-five');
}

const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productFirstList || [];
    for (let i = 0; i < list.length; i += 5) {
        group.push(list.slice(i, i + 5));
    }
    return group;
});

// 彈跳視窗
function openModal(item) {
    const hasForeword = item.foreword && item.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    if (hasForeword || hasImage) {
        commonStore.actionSetPopupInfo({ type: 'pdcard', value: item });
    }
}
</script>

<template>
    <div :class="$style.portfolio">
        <div v-if="curPageData.productSetting?.title" :class="$style.title">
            <span>
                {{ curPageData.productSetting?.title }}
            </span>
        </div>
        <div v-if="productGroup.length" :class="$style.contain">
            <Swiper
                :pagination="pagination"
                :modules="modules"
                :loop="true"
                :auto-height="true"
                :class="$style.portfolioSwiper"
                @swiper="onSwiperInit"
            >
                <SwiperSlide
                    v-for="(groupBox, groupNum) in productGroup"
                    :key="groupNum"
                    :class="$style['portfolio-list']"
                >
                    <div :class="$style.left">
                        <div
                            v-if="groupBox[0]"
                            :class="[$style['img-box'], { [$style.disable]: !groupBox[0]?.image?.length && !groupBox[0]?.foreword }]"
                            @click="openModal(groupBox[0])"
                        >
                            <span>
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[0]?.exhibitImage?.[0]"
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[0]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[0]?.image[0]?.value"
                                        :video-type="groupBox[0]?.image[0]?.community"
                                        video-width="248"
                                        video-height="221"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.image[0]?.value)"
                                    />
                                </ClientOnly>
                            </span>
                        </div>
                        <div
                            v-if="groupBox[2]"
                            :class="[$style['img-box'], { [$style.disable]: !groupBox[2]?.image?.length && !groupBox[2]?.foreword }]"
                            @click="openModal(groupBox[2])"    
                        >
                            <span>
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[2]?.exhibitImage?.[0]"
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[2]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[2]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[2]?.image[0]?.value"
                                        :video-type="groupBox[2]?.image[0]?.community"
                                        video-width="248"
                                        video-height="221"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[2]?.image[0]?.value)"
                                    />
                                </ClientOnly>
                            </span>
                        </div>
                        <div
                            v-if="groupBox[4]"
                            :class="[$style['img-box'], { [$style.disable]: !groupBox[4]?.image?.length && !groupBox[4]?.foreword }]"
                            @click="openModal(groupBox[4])"
                        >
                            <span>
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[4]?.exhibitImage?.[0]"
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[4]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[4]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[4]?.image[0]?.value"
                                        :video-type="groupBox[4]?.image[0]?.community"
                                        video-width="248"
                                        video-height="221"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[4]?.image[0]?.value)"
                                    />
                                </ClientOnly>
                            </span>
                        </div>
                    </div>
                    <div :class="$style.right">
                        <div
                            v-if="groupBox[1]"
                            :class="[$style['img-box'], { [$style.disable]: !groupBox[1]?.image?.length && !groupBox[1]?.foreword }]"
                            @click="openModal(groupBox[1])"    
                        >
                            <span>
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[1]?.exhibitImage?.[0]"
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[1]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[1]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[1]?.image[0]?.value"
                                        :video-type="groupBox[1]?.image[0]?.community"
                                        video-width="224"
                                        video-height="359"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[1]?.image[0]?.value)"
                                    />
                                </ClientOnly>
                            </span>
                        </div>
                        <div
                            v-if="groupBox[3]"
                            :class="[$style['img-box'], { [$style.disable]: !groupBox[3]?.image?.length && !groupBox[3]?.foreword }]"
                            @click="openModal(groupBox[3])"
                        >
                            <span>
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[3]?.exhibitImage?.[0]"
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[3]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[3]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[3]?.image[0]?.value"
                                        :video-type="groupBox[3]?.image[0]?.community"
                                        video-width="224"
                                        video-height="359"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :class="[$style['img-wrap']]"
                                        :img-src="commonStore.getImg(webID, groupBox[3]?.image[0]?.value)"
                                    />
                                </ClientOnly>
                            </span>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <Pdcard open="pdcard" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.title {
    color: #000;
    font-size: 20px;
    margin-bottom: 20px;
}

.contain {
    overflow: hidden;
}

.img-box {
    overflow: hidden;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    span{
        transition: all 0.3s ease-in-out;
        display: flex;
        height: 100%;
        width: 100%;
    }
    &::before,
    &::after,
    span::before,
    span::after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 15px;
        height: 15px;
        z-index: 9;
        background-color: #ffffff;
        transition: all 0.3s ease-in-out;
    }
    &::before {
        top: -20px;
        left: -20px;
    }
    &::after {
        top: -20px;
        right: -20px;
    }
    span::before {
        bottom: -20px;
        left: -20px;
    }
    span::after {
        bottom: -20px;
        right: -20px;
    }
    img {
        width: 100%;
        height: 100%;
        transform:scale(1);
        transition: transform 0.3s ease-in-out;
    }
    &:hover {
        overflow: hidden;
        &::before {
            top: 0;
            left: 0;
        }
        &::after {
            top: 0;
            right: 0;
        }
        span::before {
            bottom: 0;
            left: 0;
        }
        span::after {
            bottom: 0;
            right: 0;
        }
        &::before,
        &::after,
        span::before,
        span::after {
            opacity: 1;
        }
        img {
            transform:scale(1.1);
        }

    }
    &.disable {
        cursor: initial;
    }
}

.img-wrap {
    width: 100%;
    height: 100%;
    img {
        object-fit: cover;
    }
}

.portfolio-list {
    display: flex;
    flex-wrap: wrap;
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

// 工作紀錄圖片排版
.left ,
.right {
    width: 100%;
}

.left {
    width: 51%;
    .img-box {
        height: 221.67px;
        margin-bottom: 15px;
        aspect-ratio: 248.88 / 221.67;
    }
}


.right {
    width: calc( 49% - 15px );
    margin-left: 15px;
    .img-box {
        height: 359px;
        aspect-ratio: 224.11 / 359;
        margin-bottom: 15px;
    }
}

// 頁籤
.portfolioSwiper {
    padding-bottom: 10px;
    :global(.swiper-pagination) {
        width: 51%;
        display: block;
        bottom: 12px;
        span {
            cursor: pointer;
            font-weight: 500;
            color: #000;
            display: inline-flex;
            border-radius: 50%;
            border: solid 1px #000;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            transition: all 0.5s;
            background-color: #fff;
            box-sizing: border-box;
            margin-right: 35px;
            width: 20px;
            height: 20px;
            &:last-child {
                margin-right: 0;
            }
            &:global(.active) {
                background-color: #000;
                color: #fff;
            }
        }
    }
    :global(.swiper-pagination.more-than-five) {
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 13px;
        span {
            margin-right: 8px;
            width: 20px;
            height: 20px;
        }
    }
    :global(.swiper-pagination-bullet) {
        width: 11px;
        height: 11px;
        background-color: #bbbbbb;
        opacity: 1;
        margin: 0 13px !important;
    }
    :global(.swiper-pagination-bullet-active) {
        background-color: #28566a;
    }
}

@media (max-width: 640px) {
    .portfolioSwiper {
        :global(.swiper-pagination) {
            span {
                margin-right: 15px;
                width: 15px;
                height: 15px;
            }
        }
    }

    .left {
        width: 49%;
        .img-box {
            height: auto;
            margin-bottom: 10px;
            spect-ratio: 248.88 / 221.67;
        }
    }

    .right {
        width: calc( 51% - 10px );
        margin-left: 10px;
        .img-box {
            height: auto;
            margin-bottom: 10px;
            aspect-ratio: 224.11 / 359;
        }
    }
}

@media (max-width: 460px) {
    .portfolioSwiper {
        :global(.swiper-pagination) {
            span {
                margin-right: 7px;
                width: 13px;
                height: 13px;
            }
        }
        :global(.swiper-pagination.more-than-five) {
            display: block;
            bottom: 0px;
            span {
                margin-right: 4px;
                width: 15px;
                height: 15px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>
