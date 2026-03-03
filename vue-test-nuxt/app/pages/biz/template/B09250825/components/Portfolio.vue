<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import PdCard from './PdCard.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const modules = [Pagination, Navigation];
const pagination = {
    clickable: true,
    renderBullet: (index, className) => {
        return `<span class="${className}">${index + 1}</span>`; // 圓點換數字
    }
};
const prevRef = ref(null);
const nextRef = ref(null);
const portfolioGroup = computed(() =>
    curPageData.value.productSetting?.title ||
    curPageData.value.productSetting?.foreword ||
    curPageData.value.productFirstList?.length
);
const isLoading = ref(false);
const selectIsOpen = ref(false);
const listHeight = ref(null);
const selected = ref('');
const selectedKey = ref('');
const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productFirstList || [];
    const selectedGroup = selectedKey.value === 'all' ? list : list.filter(item => item.portfoliolistGroup === selectedKey.value);

    for (let i = 0; i < selectedGroup.length; i += 4) {
        group.push(selectedGroup.slice(i, i + 4));
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

// 計算右箭頭的距離
const setNextBtnPosition = () => {
    const bullets = document.querySelectorAll('.swiper-pagination-bullet');
    const pageCount = bullets.length;

    const base = 60;
    const step = 18;

    let left = base + (pageCount - 1) * step;

    // 不可超過視窗寬度
    const maxLeft = window.innerWidth - 40; // 留一點安全距
    if (left > maxLeft) {
        left = maxLeft;
    }
    if (nextRef) {
        nextRef.value.style.left = `${left}px`;
    }
};

// 彈跳視窗
function openModal(item) {
    const hasForeword = item.foreword && item.foreword.trim() !== '';
    const hasImage = Array.isArray(item.image) && item.image.length > 0;
    if (hasForeword || hasImage) {
        commonStore.actionSetPopupInfo({ type: 'PdCard', value: item });
    }
}

onMounted(() => {
    selectedKey.value = 'all';
    selected.value = '全部';
    document.addEventListener('click', ifClickOutside);
    window.addEventListener('resize', setNextBtnPosition);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', ifClickOutside);
    window.removeEventListener('resize', setNextBtnPosition);
});
</script>

<template>
    <div v-if="portfolioGroup" :class="$style.portfolio">
        <div v-if="curPageData.productSetting?.title" :class="$style.title">
            {{ curPageData.productSetting?.title }}
        </div>
        <div v-if="curPageData.productSetting?.subTitle" :class="$style.subTitle">
            {{ curPageData.productSetting?.subTitle }}
        </div>
        <div ref="dropdownRef" :class="$style.select">
            <button :class="$style['select-btn']" @click="openSelect">
                <span :class="$style['select-btn-content']">{{ selected }}</span>
                <span :class="[$style['select-btn-arrow'], { [$style.scaleY]: selectIsOpen }]">
                    <img src="/images/biz/B09250825/btn_dropdown_list.svg">
                </span>
            </button>
            <div
                ref="listHeight"
                :class="[$style['select-list'], { [$style['select-open']]: selectIsOpen }]"
            >
                <button
                    v-for="(item,index) in curPageData.productSetting?.productGroup"
                    :key="index"
                    @click="selectBtn(item)"
                >
                    {{ item.name }}
                </button>
            </div>
        </div>
        <div :class="$style.loadingbox">
            <div v-if="isLoading" :class="$style['loading-mask']">
                <div :class="$style.spinner" />
            </div>
            <div v-if="productGroup.length" :class="$style.contain">
                <div ref="prevRef" :class="[$style['swiper-arrow'], $style['swiper-prev']]" />
                <Swiper
                    :pagination="pagination"
                    :modules="modules"
                    :navigation="{
                        prevEl: prevRef,
                        nextEl: nextRef
                    }"
                    @swiper="setNextBtnPosition"
                    @slideChange="setNextBtnPosition"
                    :loop="true"
                    :auto-height="true"
                    :class="[$style.portfolioSwiper, { [$style['padding-bottom']]: curPageData.productFirstList?.length < 7 }]"
                >
                    <SwiperSlide
                        v-for="(groupBox, groupNum) in productGroup"
                        :key="groupNum"
                        :class="$style['portfolio-list']"
                    >
                        <div
                            v-for="(item, index) in groupBox"
                            :key="item.image[0]?.value || index"
                            :class="[$style['portfolio-self'], { [$style.disable]: item.image?.length < 0 && !item.foreword }]"
                            @click="openModal(item)"
                        >
                            <div :class="$style['img-box']">
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
                                        video-width="254"
                                        video-height="269"
                                        :class="[$style['iframe-wrap'], $style['list-img']]"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(webID, item.image?.[0]?.value)"
                                        :class="$style['list-img']"
                                    />
                                </ClientOnly>
                            </div>
                            <div :class="$style['title-space']">
                                <div v-if="item?.title" :class="$style['img-title']">
                                    {{ item?.title }}
                                </div>
                                <div v-if="item?.subTitle" :class="$style['img-subtitle']">
                                    {{ item?.subTitle }}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div ref="nextRef" :class="[$style['swiper-arrow'], $style['swiper-next']]" />
            </div>
            <!-- 無資料時顯示 -->
            <div v-else :class="$style.noData">
                尚無資訊
            </div>
        </div>
    </div>
    <PdCard open="PdCard" />
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

button {
    border: 0;
    cursor: pointer;
}

.portfolio {
    position: relative;
    z-index: 2;
    margin: 55px 52px;
    margin-bottom: 14px;
}

.title {
    text-align: center;
    color: #000;
    font-size: 32px;
    font-weight: 500;
    letter-spacing: 2.56px;
    line-height: 28px;
    margin-bottom: 15px;
}

.subTitle {
    text-align: center;
    color: #000;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 1.5px;
    line-height: 28px;
    margin-bottom: 12px;
}

.select {
    position: relative;
    text-align: center;
    padding-bottom: 30px;
}

.select-btn {
    position: relative;
    background-color: #fff;
    padding: 1px 17px;
    border-radius: 50px;
    color: #333333;
    z-index: 7;
    display: inline-flex;
    align-items: center;
    border: 0.5px solid #333;
    span {
        letter-spacing: 1.5px;
        font-size: 15px;
        line-height: 30px;
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
            transform: scaleY(1);
            transition: all 0.3s;
            position: relative;
            top: 2px;
        }
        &.scaleY {
            img {
                transform: scaleY(-1);
                top: 3px;
            }
        }
    }
}

.select-list {
    position: absolute;
    top: 17px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border: 0.5px solid #5E5338;
    border-radius: 0 0 5px 5px;
    padding: 0;
    z-index: 6;
    transition: all 0.5s;
    overflow: hidden;
    height: 0;
    width: 164px;
    max-height: 175px;
    overflow-y: auto;
    opacity: 0;
    button {
        color: #5E5338;
        font-size: 15px;
        line-height: 30px;
        letter-spacing: 1.5px;
        padding: 4px 0;
        padding-left: 24px;
        display: block;
        text-align: left;
        width: 100%;
        transition: all .3s;
        background-color: #fff;
        font-weight: 400;
        &:last-child {
            margin-bottom: 0;
        }
        &:hover {
            background-color: rgb(240 240 240 / 94%);
        }
    }
    &.select-open {
        opacity: 1;
        padding-top: 20px;
        padding-bottom: 6px;
    }
}

.portfolioSwiper {
    padding-bottom: 48px;
    position: relative;
}

.portfolio-list {
    display: flex;
    flex-wrap: wrap;
    .portfolio-self {
        width: calc( (100% - 18px) / 2 );
        margin-right: 18px;
        margin-bottom: 33px;
        transition: all 0.3s;
        cursor: pointer;
        position: relative;
        padding-right: 5px;
        box-sizing: border-box;
        &:nth-child(2n) {
            margin-right: 0;
        }
        &:hover{
            filter: brightness(1.1);
            img {
                transform: scale(1.1);
            }
            &:before {
                background-color: #5E5338;
                background-image: url('');
            }
        }
        &.disable {
            cursor: initial;
        }
        &:after {
            content: "";
            display: block;
            width: calc(100% - 5px);
            height: 0.5px;
            position: absolute;
            background-color: #000;
            bottom: 7px;
            left: 0;
            z-index: 1;
        }
        &:before {
            content: "";
            display: block;
            width: 17px;
            height: 17px;
            position: absolute;
            right: 0;
            bottom: 0;
            border-radius: 50px;
            background-color: transparent;
            background-image: url('/images/biz/B09250825/portfolio-icon.svg');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            z-index: 2;
        }
    }
    .title-space {
        margin: 14px;
        text-align: center;
    }
    .img-title ,
    .img-subtitle {
        color: #000;
        font-size: 15px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 1.5px;
    }
    .img-box {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        overflow: hidden;
        aspect-ratio: 256 / 271;
        background-color: #fff;
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
    padding: 80px;
    color: #5E5338;
}

.portfolioSwiper {
    :global(.swiper-pagination-fraction),
    :global(.swiper-pagination-custom),
    :global(.swiper-horizontal > .swiper-pagination-bullets),
    :global(.swiper-pagination-bullets.swiper-pagination-horizontal) {
        bottom: 26px;
    }
    :global(.swiper-pagination) {
        text-align: left;
        margin-left: 31px;
    }
    :global(.swiper-pagination-bullet) {
        background-color: transparent;
        opacity: 1;
        transition: all 0.3s;
        margin: 0 5px !important;
        height: 19px;
        border-radius: 0;
        &:global(.swiper-pagination-bullet-active) {
            border-bottom: solid 0.5px #000;
        }
    }
}

.swiper-arrow {
    position: absolute;
    bottom: 22px;
    width: 9px;
    height: 13px;
    overflow: hidden;
    cursor: pointer;
    background: url('/images/biz/B09250825/portfolio-arrow.svg') no-repeat center center;
    background-size: contain;
    padding: 5px 0px;
    z-index: 9;
    &:hover {
        opacity: 0.7;
    }
    &:global(.swiper-button-disabled) {
        opacity: 0.5;
        cursor: initial;
    }
}

.swiper-prev {
    margin-right: 12px;
    left: 8px;
}

.swiper-next {
    transform: scaleX(-1);
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
    border-top-color: #938769;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width:400px) {
    .portfolio {
        margin: 45px 20px;
    }
}
</style>
