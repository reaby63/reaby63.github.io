<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
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
                        <Image
                            v-if="item.exhibitImage?.[0]"
                            :img-src="commonStore.getImg(webID, item.exhibitImage?.[0])"
                            :class="$style['img-wrap']"
                        />
                        <VideoLink
                            v-else-if="item.image?.[0]?.type === 'link'"
                            :video-link="item.image?.[0]?.value"
                            :video-type="item.image?.[0]?.community"
                            video-width="160"
                            video-height="151"
                            :class="$style['iframe-wrap']"
                        />
                        <Image v-else :img-src="commonStore.getImg(webID, item.image?.[0]?.value)" :class="$style['img-wrap']"/>
                    </ClientOnly>
                </div>
            </SwiperSlide>
        </Swiper>
        <!-- PD彈跳視窗 -->
        <Pdcard v-if="commonStore.popupInfo.type === 'portfolio'"/>
    </div>
</template>

<style lang="scss" module>
.contain {
    overflow: hidden;

    :global {
        .swiper-pagination {
            position: static;
            margin-top: 21px !important;
        }

        .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background-color: #c9c9c9;
            opacity: 1;
            margin: 0 12px !important;

            &.swiper-pagination-bullet-active {
                background-color: #000;
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
    &.six-pic {
        .pic {
            &:nth-child(4),
            &:nth-child(5),
            &:nth-child(6) {
                margin-bottom: 0;
            }
        }
    }
    &.nine-box {
        .pic {
            &:nth-child(7n),
            &:nth-child(8n),
            &:nth-child(9n) {
                margin-bottom: 0;
            }
        }
    }
}

.pic {
    box-sizing: border-box;
    overflow: hidden;
    width: calc((100% - 40px) / 3);
    margin-right: 20px;
    margin-bottom: 20px;
    aspect-ratio: 160 / 151;
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
        cursor: pointer;
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

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
    border: 0;
}

@media (max-width: 375px) {
    .pic {
        width: calc((100% - 20px) / 2);
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
