<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import SecPdCard from './SecPdCard.vue';
import Image from '@/components/Image.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const modules = [Pagination, Navigation];
const prevRef = ref(null);
const nextRef = ref(null);
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
    document.addEventListener('click', ifClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', ifClickOutside);
});
</script>

<template>
    <div v-if="portfolioGroup" :class="$style.portfolio">
        <div :class="$style.title">
            <div v-if="curPageData.productSecondSetting?.title" :class="$style.mainTitle">
                {{ curPageData.productSecondSetting?.title }}
            </div>
            <div v-if="curPageData.productSecondSetting?.subTitle" :class="$style.subTitle">
                {{ curPageData.productSecondSetting?.subTitle }}
            </div>
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
                    v-for="(item,index) in curPageData.productSecondSetting?.productGroup"
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
                    :modules="modules"
                    :navigation="{
                        prevEl: prevRef,
                        nextEl: nextRef
                    }"
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
                            :key="item.image[0]?.value || index"
                            :class="[$style['img-box'], { [$style.disable]: item.image?.length < 0 && !item.foreword }]"
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
                                    video-height="278"
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
                <div ref="nextRef" :class="[$style['swiper-arrow'], $style['swiper-next']]" />
            </div>
            <!-- 無資料時顯示 -->
            <div v-else :class="$style.noData">
                尚無資訊
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

.portfolio {
    position: relative;
    z-index: 2;
    margin: 55px 52px;
    margin-bottom: 14px;
}

.title {
    text-align: left;
    color: #000;
    font-weight: 500;
    line-height: 28px;
    min-height: 66px;
}

.mainTitle {
    font-size: 32px;
    letter-spacing: 2.56px;
    margin-bottom: 15px;
    max-width: calc( 100% - 160px );
}

.subTitle {
    letter-spacing: 1.5px;
    font-size: 15px;
}

.select {
    position: absolute;
    text-align: center;
    right: 0;
    top: 5.5px;
}

.select-btn {
    position: relative;
    background-color: #fff;
    padding: 1px 13px;
    border-radius: 50px;
    color: #333333;
    z-index: 11;
    display: inline-flex;
    align-items: center;
    border: 0.5px solid #333;
    box-sizing: border-box;
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
    z-index: 10;
    transition: all 0.5s;
    overflow: hidden;
    height: 0;
    width: 155px;
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

.contain {
    padding-top: 28px;
}

.portfolioSwiper {
    position: relative;
    margin-bottom: 33px;
}

.portfolio-list {
    display: flex;
    flex-wrap: wrap;
    .img-box {
        margin-right: 20px;
        margin-bottom: 20px;
        transition: all 0.3s;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        overflow: hidden;
        aspect-ratio: 361 / 247;
        background-color: #fff;
        border: solid 0.5px #858585;
        box-sizing: border-box;
        width: 60%;
        &:nth-child(2n) {
            margin-right: 0;
            aspect-ratio: 189 / 247;
            width: calc( 40% - 20px );
        }
        &:hover {
            filter: brightness(1.1);
            img {
                transform: scale(1.1);
            }
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
    padding: 80px;
    color: #fffef291;
}

.swiper-arrow {
    position: absolute;
    top: -12px;
    right: 0;
    width: 12.7px;
    height: 14.7px;
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
    right: 50px;
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
    border-top-color: #FFD54F;
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
