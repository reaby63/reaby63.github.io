<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import SecPdCard from './SecPdCard.vue';
import Text from '@/pages/biz/components/Text.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const modules = [Pagination];
const pagination = {
    clickable: true
};
const portfolioGroup = computed(() =>
    curPageData.value.productSecondSetting?.title ||
    curPageData.value.productSecondSetting?.foreword ||
    curPageData.value.productSecondList?.length
);
const isLoading = ref(false);
const selectIsOpen = ref(false);
const listHeight = ref(null);
const selected = ref('');
const selectedKey = ref('');
const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productSecondList || [];
    const selectedGroup = selectedKey.value === 'all' ? list : list.filter(item => item.portfoliolistGroup === selectedKey.value);

    for (let i = 0; i < selectedGroup.length; i += 6) {
        group.push(selectedGroup.slice(i, i + 6));
    }
    return group;
});
const dropdownRef = ref(null);

function openSelect() {
    selectIsOpen.value = !selectIsOpen.value;
    nextTick(() => {
        const listEl = listHeight.value;
        if (selectIsOpen.value) {
            return listEl.style.height = listEl.scrollHeight + 'px';
        }
        return listEl.style.height = '0';
    });
}

function selectBtn(item) {
    isLoading.value = true;
    selectIsOpen.value = false;
    selected.value = item.name;
    selectedKey.value = item.value;
    if (listHeight.value) {
        listHeight.value.style.height = '0';
    }
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
}

// 彈跳視窗
function openModal(item) {
    const hasForeword = item.foreword && item.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    if (hasForeword || hasImage) {
        commonStore.actionSetPopupInfo({ type: 'SecPdCard', value: item });
    }
}

onMounted(() => {
    selectedKey.value = 'all';
    selected.value = '全部';
});

// 點外層也能收選單
function ifClickOutside(e) {
    if (!selectIsOpen.value) return;
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
        selectIsOpen.value = false;
        if (listHeight.value) {
            listHeight.value.style.height = '0';
        }
    }
}

onMounted(() => {
    document.addEventListener('click', ifClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', ifClickOutside);
});
</script>

<template>
    <div :class="$style['portfolio-bg']">
        <div :class="$style['portfolio-top']">
            <img src="/images/biz/B09250515/secPorfolio-bg.svg">
        </div>
        <div v-if="portfolioGroup" :class="$style.portfolio">
            <div v-if="curPageData.productSecondSetting?.title" :class="$style.title">
                {{ curPageData.productSecondSetting?.title }}
            </div>
            <div ref="dropdownRef" :class="$style.select">
                <button :class="$style['select-btn']" @click="openSelect">
                    <span :class="$style['select-btn-content']">{{ selected }}</span>
                    <span :class="[$style['select-btn-arrow'], { [$style.scaleY]: selectIsOpen }]">
                        <img src="/images/biz/B09250515/btn_dropdown_list.svg">
                    </span>
                </button>
                <div
                    ref="listHeight"
                    :class="[$style['select-list'], { [$style['select-open']]: selectIsOpen }]"
                >
                    <button
                        v-for="(item,index) in curPageData.productSecondSetting?.productGroup"
                        :key="index"
                        @click="selectBtn(item)"
                    >
                        {{ item.name }}
                    </button>
                </div>
            </div>
            <Text
                v-if="curPageData.productSecondSetting?.foreword"
                :class="$style.content"
                :text="curPageData.productSecondSetting?.foreword"
            />
            <div :class="$style.loadingbox">
                <div v-if="isLoading" :class="$style['loading-mask']">
                    <div :class="$style.spinner" />
                </div>
                <div v-if="productGroup.length" :class="$style.contain">
                    <Swiper
                        :pagination="pagination"
                        :modules="modules"
                        :loop="true"
                        :auto-height="true"
                        :class="[$style.portfolioSwiper, { [$style['padding-bottom']]: curPageData.productSecondList?.length < 7 }]"
                    >
                        <SwiperSlide
                            v-for="(groupBox, groupNum) in productGroup"
                            :key="groupNum"
                            :class="$style['portfolio-list']"
                        >
                            <div
                                v-for="(item, index) in groupBox"
                                :key="item.image?.[0]?.value || index"
                                :class="[$style['img-box'], { [$style.disable]: item.image?.length < 1 && !item.foreword }]"
                                @click="openModal(item)"
                            >
                                <ClientOnly>
                                    <Image
                                        v-if="item.exhibitImage?.[0]"
                                        :img-src="commonStore.getImg(webID, item.exhibitImage?.[0])"
                                        :class="$style['list-img']"
                                    />
                                    <VideoLink
                                        v-else-if="item.image?.[0]?.type === 'link'"
                                        :video-link="item.image?.[0]?.value"
                                        :video-type="item.image?.[0]?.community"
                                        video-width="166"
                                        :class="[$style['iframe-wrap'], $style['list-img']]"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(webID, item.image?.[0]?.value)"
                                        :class="$style['list-img']"
                                    />
                                </ClientOnly>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <!-- 無資料時顯示 -->
                <div v-else :class="$style.noData">
                    尚無資訊
                </div>
            </div>
        </div>
    </div>
    <SecPdCard open="SecPdCard" />
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

button {
    border: 0;
    cursor: pointer;
}

.portfolio-bg {
    background-color: #FBF2EC;
}

.portfolio-top {
    width: 100%;
    display: flex;
    animation: fadeIn 1.5s ease-in-out forwards;
    opacity: 0;
    animation-delay: 0.8s;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.portfolio {
    position: relative;
    z-index: 2;
    background-color: #FE7D85;
    animation: fadeIn 1.5s ease-in-out forwards;
    opacity: 0;
    animation-delay: 0.8s;
}

.title {
    padding-bottom: 10px;
    text-align: center;
    padding-bottom: 27px;
    margin: 0 42px;
    border-bottom: solid 2px #FBF2EC;
    margin-bottom: 25px;
    color: #FFFEF2;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 1.5px;
}

.content {
    text-align: center;
    line-height: 25px;
    padding: 0 40px 23px;
    color: #FFFEF2;
    letter-spacing: 1.5px;
}

.select {
    position: relative;
    text-align: center;
    padding-bottom: 23px;
}

.select-btn {
    position: relative;
    background-color: #FFFEF2;
    padding: 9px 10px;
    border-radius: 5px;
    color: #EC2831;
    z-index: 7;
    display: inline-flex;
    align-items: center;
    span {
        letter-spacing: 2px;
    }
    .select-btn-content {
        font-size: 15px;
        font-weight: 500;
        position: relative;
        top: -0.5px;
        width: 105px;
        text-align: left;
        margin-right: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .select-btn-arrow {
        img {
            width: 12px;
            height: 7px;
            transform: scaleY(1);
            transition: all 0.3s;
            position: relative;
            top: -4px;
        }
        &.scaleY {
            img {
                transform: scaleY(-1);
                top: -5px;
            }
        }
    }
}

.select-list {
    position: absolute;
    top: 33px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #EB1B26F0;
    padding: 0;
    z-index: 6;
    transition: all 0.5s;
    overflow: hidden;
    height: 0;
    width: 144.99px;
    max-height: 175px;
    overflow-y: auto;
    button {
        color: #FFFEF2;
        font-size: 14px;
        line-height: 22.4px;
        letter-spacing: 2px;
        padding: 2px 0;
        padding-left: 10px;
        display: block;
        margin-bottom: 6px;
        text-align: left;
        width: 100%;
        transition: all .3s;
        background-color: #EB1B26F0;
        &:last-child {
            margin-bottom: 0;
        }
        &:hover {
            background-color: #ff414bf0;
        }
    }
    &.select-open {
        opacity: 1;
        padding: 15px 0px;
    }
}

.contain {
    background-color: #FE7D85;
    padding: 0 25px;
    padding-bottom: 42px;
    .portfolioSwiper {
        padding-bottom: 48px;
        position: relative;
        &:after {
            content: "";
            display: block;
            width: calc( 100% - 32px );
            height: 2px;
            background-color: #FFFEF2;
            bottom: 0;
            left: 16px;
            position: absolute;
        }
    }
}

.portfolio-list {
    display: flex;
    flex-wrap: wrap;
    .img-box {
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 8px #fff;
        box-sizing: border-box;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
        width: calc( (100% - 36px - 12px) / 3 );
        margin-right: 18px;
        margin-bottom: 18px;
        margin-left: 6px;
        aspect-ratio: 100 / 100;
        background-color: #fff;
        box-shadow: 0px 4px 4px 0px #00000040;
        &:hover{
            filter: brightness(1.1);
            img {
                transform: scale(1.1);
            }
        }
        &:nth-child(2) , &:nth-child(5) {
            margin-left: 0px;
        }
        &:nth-child(3n) {
            margin-right: 6px;
            margin-left: 0px;
        }
        &.disable {
            cursor: initial;
        }
    }
    img {
        transition: all 0.3s;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.iframe-wrap {
    pointer-events: none;
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.noData {
    text-align: center;
    background-color: #FE7D85;
    padding: 80px;
    color: #fffef291;
}

.portfolioSwiper {
    :global(.swiper-pagination-fraction),
    :global(.swiper-pagination-custom),
    :global(.swiper-horizontal > .swiper-pagination-bullets),
    :global(.swiper-pagination-bullets.swiper-pagination-horizontal) {
        bottom: 26px;
    }
    :global(.swiper-pagination-bullet) {
        background-color: #FBEFD8;
        opacity: 1;
        transition: all 0.3s;
        border-radius: 50px;
        margin: 0 9px !important;
        width: 10px;
        height: 10px;
        &:global(.swiper-pagination-bullet-active) {
            background-color: #FFD54F;
        }
    }
}

// loading
.loadingbox {
    position: relative;
}

.loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.spinner {
    width: 32px;
    height: 32px;
    border: 4px solid #fff;
    border-top-color: #FFD54F;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width:480px) {
    .title {
        margin: 0 18px;
        margin-bottom: 25px;
    }
    .content {
        padding: 0 18px 23px;
    }
    .contain {
        padding: 0px 24px;
        padding-bottom: 42px;
    }
    .portfolio-list {
        .img-box {
            width: calc((100% - 18px - 12px) / 2);
            &:nth-child(3n),
            &:nth-child(5n) {
                margin-right: 18px;
                margin-left: 6px;
            }
            &:nth-child(2n) {
                margin-right: 6px;
                margin-left: 0;
            }
        }
    }
    .portfolioSwiper {
        :global(.swiper-pagination-bullet) {
            margin: 0 5px !important;
            width: 5px;
            height: 5px;
        }
    }
}
</style>
