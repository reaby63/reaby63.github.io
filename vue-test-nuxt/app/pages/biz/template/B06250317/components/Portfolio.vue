<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Pdcard from './PdCard.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const modules = [Pagination];

// Nuxt 待SSR建立後執行
const windowWidth = ref(0);

function updateWindowWidth() {
    windowWidth.value = window.innerWidth;
}

onMounted(() => {
    updateWindowWidth();
    window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateWindowWidth);
});

// 彈跳視窗
function openModal(item) {
    const hasForeword = item.foreword && item.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    if (hasForeword || hasImage) {
        commonStore.actionSetPopupInfo({ type: 'portfolio', value: item });
    }
}

// 作品列表分組---
const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productFirstList || [];
    const windowSize = windowWidth.value <= 375 ? 8 : 9;
    for (let i = 0; i < list.length; i += windowSize) {
        group.push(list.slice(i, i + windowSize));
    }
    return group;
});
</script>

<template>
    <div v-if="commonStore.getPageInfo.productFirstList?.length !== 0" :class="$style.portfolio">
        <div v-if="commonStore.getPageInfo.productSetting?.title" :class="$style.title">
            <span>{{ commonStore.getPageInfo.productSetting?.title }}</span>
        </div>

        <div :class="$style.contain">
            <Swiper
                :pagination="{ clickable: true }"
                :modules="modules"
                :loop="true"
                :auto-height="true"
                :class="$style.swiper"
            >
                <SwiperSlide
                    v-for="(groupBox, groupNum) in productGroup"
                    :key="groupNum"
                    :class="[
                        $style.list,
                        { [$style['two-pic']]: groupBox?.length < 3 },
                        { [$style['three-pic']]: groupBox?.length < 4 },
                        { [$style['four-pic']]: groupBox?.length === 4 },
                        { [$style['six-pic']]: groupBox?.length >= 4 && groupBox?.length <= 6 },
                        { [$style['nine-box']]: groupBox?.length >= 7 }
                    ]"
                >
                    <div
                        v-for="(item, index) in groupBox"
                        :key="item.image?.[0]?.value || index"
                        :class="[
                            $style.pic,
                            { [$style.disable]: item.image?.length === 0 && !item.foreword },
                        ]"
                        @click="openModal(item)"
                    >
                        <ClientOnly>
                            <Image v-if="item.exhibitImage?.[0]" :img-src="commonStore.getImg(webID, item.exhibitImage?.[0])" :class="$style['img-wrap']"/>
                            <VideoLink
                                v-else-if="item.image?.[0]?.type === 'link'"
                                :video-link="item.image?.[0]?.value"
                                :video-type="item.image?.[0]?.community"
                                video-width="175"
                                video-height="129"
                                :class="$style['iframe-wrap']"
                            />
                            <Image v-else :img-src="commonStore.getImg(webID, item.image?.[0]?.value)" :class="$style['img-wrap']"/>
                        </ClientOnly>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <!-- PD彈跳視窗 -->
        <Pdcard open="portfolio" />
    </div>
</template>
<style lang="scss" module>
.title {
    font-size: 20px;
    margin-bottom: 20px;
    line-height: 32px;
    color: #1E1E1E;
    text-align: center;

    span {
        position: relative;
        display: inline-block;
        font-weight: 600;
        letter-spacing: 1px;
    }
}

.portfolio {
    animation-delay: 0.3s;
    padding: 0 35px 20px;
    position: relative;
    background-image: url('/images/biz/B06250317/triangle.svg');
    background-repeat: no-repeat;
    background-position: center 114%;
    background-size: cover;
    min-height: 231px;
    z-index: 3;
}

.contain {
    overflow: hidden;

    :global {
        .swiper-pagination {
            position: static !important;
            width: 100%;
            margin-top: 17px;
        }

        .swiper-pagination .swiper-pagination-bullet {
            background-color: transparent !important;
            width: auto !important;
            height: auto !important;
            color: #ffffff;
            border-radius: 0 !important;
            font-weight: 400;
            position: static;
            margin: 0 13px;
            opacity: 1;
            padding-bottom: 1px;
        }

        .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active {
            border-bottom: solid 1px #ffffff;
        }

        .swiper-pagination .swiper-pagination-bullet::before {
            position: relative;
            z-index: 1;
            font-size: 13px;
            font-weight: 400;
            top: 0;
        }

        @for $i from 1 through 99 {
            .swiper-pagination .swiper-pagination-bullet:nth-child(#{$i})::before {
                content: "#{$i}";
            }
        }
    }
}

.list {
    display: flex;
    flex-wrap: wrap;
    &.three-pic {
        .pic {
            margin-bottom: 0;
        }
    }
    &.nine-box {
        .pic {
            &:nth-child(7n),
            &:nth-child(8n),
            &:nth-child(9n) {
                margin-bottom: 14px;
            }
        }
    }
}

.pic {
    box-sizing: border-box;
    overflow: hidden;
    width: calc((100% - 44px) / 3);
    margin-right: 22px;
    margin-bottom: 28px;
    aspect-ratio: 205 / 152;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;             
    &:nth-child(3n) {
        margin-right: 0;
    }
    img {
        width: 100%;
        height: 100%;
        transform: scale(1);
        transition: transform 0.3s ease-in-out;
        background-color: #000 !important;
        display: flex;
        object-fit: cover;
    }
    &.disable {
        img {
            cursor: initial;
        }
    }
    &:hover {
        overflow: hidden;
        img {
            transform: scale(1.1);
        }
    }
    .img-wrap {
        width: 100%;
    }
}

.listmark {
    text-align: center;
    margin-top: 15px;

    button {
        display: inline-block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        background-color: #c9c9c9;
        margin-right: 24px;
        opacity: 1;
        transition: all .3s;

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            opacity: 0.8;
        }

        &.active,
        &:active {
            background-color: #000000;
            cursor: initial;
        }
    }
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

@media (max-width: 500px) {
    .portfolio {
        padding: 0 20px 20px;
    }
}

@media (max-width: 375px) {
    .pic {
        width: calc((100% - 20px) / 2);
        margin-bottom: 20px;
        margin-right: 20px;
        &:nth-child(3n) {
            margin-right: 20px;
        }
        &:nth-child(2n) {
            margin-right: 0;
        }
    }
    .list {
        &.two-pic {
            .pic {
                margin-bottom: 0 !important;
            }
        }
        &.three-pic {
            .pic {
                margin-bottom: 20px;
                &:nth-child(3) {
                    margin-bottom: 0;
                }
            }
        }
        &.four-pic {
            .pic {
                &:nth-child(3),
                &:nth-child(4) {
                    margin-bottom: 0 !important;
                }
            }
        }
        &.six-pic {
            .pic {
                &:nth-child(4) {
                    margin-bottom: 20px;
                }
            }
        }
    }
}
</style>
