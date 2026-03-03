<script setup>
import { ref, computed, watch } from 'vue';
import { useCommonStore } from '@/stores/common';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import PdCard from '../components/PdCard.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

// 引入必要樣式
import 'swiper/css';
import 'swiper/css/pagination';

const modules = [Pagination, Autoplay];
const commonStore = useCommonStore();
const swiperKey = ref(0);

const props = defineProps({
    info: {
        type: Array,
        default: () => { }
    },
    webId: {
        type: String,
        default: () => { }
    }
});

const pdCard = ref();
const showCard = ref(false);

function openCard(item) {
    const hasForeword = item.foreword && item.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    if (hasForeword || hasImage) {
        pdCard.value = item;
        showCard.value = true;
    }
}

// 將資料分成每4個一組
const groupedInfo = computed(() => {
    if (!props.info) return [];

    const result = [];
    const items = [...props.info];

    // 補齊到4的倍數
    while (items.length % 4 !== 0) {
        items.push(null);
    }

    for (let i = 0; i < items.length; i += 4) {
        result.push(items.slice(i, i + 4));
    }

    return result;
});

// 當分組變化時重新渲染Swiper
watch(() => groupedInfo.value.length, () => {
    swiperKey.value++;
});

const swiperOptions = {
    modules,
    loop: true,
    spaceBetween: 20,
    autoplay: false,
    pagination: {
        clickable: true
    }
};
</script>

<template>
    <div v-if="groupedInfo?.length > 0" :class="$style.contain">
        <Swiper
            v-bind="swiperOptions"
            :key="swiperKey"
            :auto-height="true"
        >
            <SwiperSlide
                v-for="(group, groupIndex) in groupedInfo"
                :key="groupIndex"
            >
                <div :class="$style.wrapper">
                    <div :class="$style.list">
                        <!-- 左上大圖 -->
                        <div
                            v-if="group[0]"
                            :class="[$style.item, {[$style['disable']]: !group[0].image.length && !group[0].foreword}]"
                            @click="openCard(group[0])"
                        >
                            <span v-if="group[0]?.image[0]?.value">
                                <ClientOnly>
                                    <Image
                                        v-if="group[0]?.exhibitImage?.[0]"
                                        :class="$style.img"
                                        :img-src="commonStore.getImg(webId, group[0]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="group[0]?.image[0]?.type === 'link'"
                                        :video-link="group[0]?.image[0]?.value"
                                        :video-type="group[0]?.image[0]?.community"
                                        video-width="488"
                                        video-height="275"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image v-else :class="$style.img" :img-src="commonStore.getImg(webId, group[0]?.image[0]?.value)"/>
                                </ClientOnly>
                            </span>
                        </div>
                        <div v-else :class="$style.item" />

                        <div v-if="group[1] || group[2]" :class="$style['list-left-right']">
                            <div
                                v-if="group[1]"
                                :class="[$style.item, {[$style['disable']]: !group[1].image.length && !group[1].foreword}]"
                                @click="openCard(group[1])"
                            >
                                <span v-if="group[1]?.image[0]?.value">
                                    <ClientOnly>
                                        <Image
                                            v-if="group[1]?.exhibitImage?.[0]"
                                            :class="$style.img"
                                            :img-src="commonStore.getImg(webId, group[1]?.exhibitImage?.[0])"
                                        />
                                        <VideoLink
                                            v-else-if="group[1]?.image[0]?.type === 'link'"
                                            :video-link="group[1]?.image[0]?.value"
                                            :video-type="group[1]?.image[0]?.community"
                                            video-width="239"
                                            video-height="299"
                                            :class="$style['iframe-wrap']"
                                        />
                                        <Image v-else :class="$style.img" :img-src="commonStore.getImg(webId, group[1]?.image[0]?.value)"/>
                                    </ClientOnly>
                                </span>
                            </div>
                            <div v-else :class="$style.item" />

                            <div
                                v-if="group[2]"
                                :class="[$style.item, {[$style['disable']]: !group[2].image.length && !group[2].foreword}]"
                                @click="openCard(group[2])"
                            >
                                <span v-if="group[2]?.image[0]?.value">
                                    <ClientOnly>
                                        <Image
                                            v-if="group[2]?.exhibitImage?.[0]"
                                            :class="$style.img"
                                            :img-src="commonStore.getImg(webId, group[2]?.exhibitImage?.[0])"
                                        />
                                        <VideoLink
                                            v-else-if="group[2]?.image[0]?.type === 'link'"
                                            :video-link="group[2]?.image[0]?.value"
                                            :video-type="group[2]?.image[0]?.community"
                                            video-width="239"
                                            video-height="299"
                                            :class="$style['iframe-wrap']"
                                        />
                                        <Image v-else :class="$style.img" :img-src="commonStore.getImg(webId, group[2]?.image[0]?.value)"/>
                                    </ClientOnly>
                                </span>
                            </div>
                            <div v-else :class="$style.item" />
                        </div>

                        <!-- 下方大圖 -->
                        <div
                            v-if="group[3]"
                            :class="[$style.item, {[$style['disable']]: !group[3].image.length && !group[3].foreword}]"
                            @click="openCard(group[3])"
                        >
                            <span v-if="group[3]?.image[0]?.value">
                                <ClientOnly>
                                    <Image
                                        v-if="group[3]?.exhibitImage?.[0]"
                                        :class="$style.img"
                                        :img-src="commonStore.getImg(webId, group[3]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="group[3]?.image[0]?.type === 'link'"
                                        :video-link="group[3]?.image[0]?.value"
                                        :video-type="group[3]?.image[0]?.community"
                                        video-width="488"
                                        video-height="275"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image v-else :class="$style.img" :img-src="commonStore.getImg(webId, group[3]?.image[0]?.value)"/>
                                </ClientOnly>
                            </span>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
        <!-- 產品 -->
        <PdCard
            v-if="showCard"
            :info="pdCard"
            @close="showCard = false"
        />
    </div>
</template>

<style lang="scss" module>
.contain {
    overflow: hidden;

    .wrapper {
        display: flex;
        transition: transform 0.4s ease-in-out; // 加上滑動動畫
        width: 100%; // 避免 flex 影響排列
    }

    .list {
        width: 100%;
        height: 100%;
        transition: all 0.5s ease;
        flex: 0 0 100%; // 讓每頁剛好佔滿容器
        box-sizing: border-box;

        .item {
            cursor: pointer;
            overflow: hidden;
            max-width: 488px;
            max-height: 275px;
            aspect-ratio: 488 / 275;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-bottom: 10px;
            position: relative;
            transition: all 0.3s ease-in-out;
            &.disable {
                cursor: initial;
            }

            span {
                position: relative;
                transition: all 0.3s ease-in-out;
                display: flex;
                height: 100%;
                width: 100%;
                align-items: center;
                justify-content: center;
            }

            &::before,
            &::after,
            span::before,
            span::after {
                content: "";
                display: inline-block;
                position: absolute;
                width: 0;
                height: 0;
                z-index: 9;
                border-style: solid;
                border-width: 20px;
                /* 控制三角形大小 */
                transition: all 0.3s ease-in-out;
            }

            &::before {
                top: -20px;
                left: -20px;
                border-color: transparent;
            }

            &::after {
                top: -20px;
                right: -20px;
                border-color: transparent;
            }

            span::before {
                bottom: -20px;
                left: -20px;
                border-color: transparent;
            }

            span::after {
                bottom: -20px;
                right: -20px;
                border-color: transparent;
            }

            img {
                width: 100%;
                height: 100%;
                transform: scale(1);
                transition: all 0.3s ease-in-out;
                background-color: #000;
                object-fit: cover;
            }

            &:hover {
                overflow: hidden;

                &::before {
                    top: 0;
                    left: 0;
                    border-color: #ffffff transparent transparent #ffffff;
                }

                &::after {
                    top: 0;
                    right: 0;
                    border-color: #ffffff #ffffff transparent transparent;
                }

                span::before {
                    bottom: 0;
                    left: 0;
                    border-color: transparent transparent #ffffff #ffffff;
                }

                span::after {
                    bottom: 0;
                    right: 0;
                    border-color: transparent #ffffff #ffffff transparent;
                }

                &::before,
                &::after,
                span::before,
                span::after {
                    opacity: 1;
                }

                img {
                    transform: scale(1.05);
                }
            }

            .img {
                width: 100%;
            }
        }

        .list-left-right {
            display: flex;
            align-items: flex-start;
        }

        .list-left-right .item {
            width: calc((100% - 10px) / 2);
            max-height: 299px;
            aspect-ratio: 239 / 299;

            &:last-child {
                margin-left: 10px;
            }

            &:first-child {
                margin-left: 0;
            }
        }

        // 淡入淡出動態
        &.cp_in {
            animation: fadeIn 1s ease-in forwards;
        }

        &.cp_back {
            animation: fadeOut 1s ease-out forwards;
        }
    }

    :global(.swiper) {
        :global(.swiper-pagination) {
            position: static;
            text-align: center;
            margin-top: 13px;

            :global(.swiper-pagination-bullet) {
                display: inline-block;
                margin: 0px 15px;
                opacity: 1;
                padding: 10px;
                box-sizing: border-box;
                position: relative;
                background-color: transparent;

                &::before {
                    content: "";
                    display: inline-block;
                    background-color: #000000;
                    width: 4px;
                    height: 4px;
                    position: absolute;
                    top: 7px;
                    right: 8px;
                    transition: all .3s;
                    border: solid 1px #000000;
                }

                &:hover {
                    &::before {
                        transform: rotate(45deg);
                    }
                }

                &:global(.swiper-pagination-bullet-active),
                &:active {
                    cursor: initial;

                    &::before {
                        transform: rotate(45deg);
                        background-color: #ffffff;
                        border: solid 1px #000000;
                    }
                }
            }
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
</style>
