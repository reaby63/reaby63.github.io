<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import Image from '@/components/Image.vue';
import PdCard from './PdCard.vue';
import VideoLink from '@/components/video/index.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const modules = [Pagination];
const pagination = {
    clickable: true
};
const portfolioGroup = computed(() =>
    curPageData.value.productSetting?.title ||
    curPageData.value.productSetting?.decorateImg ||
    curPageData.value.productSetting?.decorateTextLeft ||
    curPageData.value.productSetting?.decorateTextRight ||
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
    for (let i = 0; i < selectedGroup.length; i += 3) {
        group.push(selectedGroup.slice(i, i + 3));
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
        commonStore.actionSetPopupInfo({ type: 'pdcard', value: item });
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
    <div
        v-if="curPageData.productSetting?.title ||
            productGroup.length ||
            curPageData.productSetting?.decorateTextLeft ||
            curPageData.productSetting?.decorateImg[0] ||
            curPageData.productSetting?.decorateTextRight"
        :class="$style.portfolio"
    >
        <div :class="$style.title">
            <div v-if="curPageData.productSetting?.title" :class="$style['title-in']">
                {{ curPageData.productSetting?.title }}
            </div>
            <div :class="$style['title-dec']">
                <img src="/images/biz/B09250515/porfolio-dec.png">
            </div>
            <div :class="$style['title-phone-dec-left']">
                <img src="/images/biz/B09250515/porfolio-dec-left.svg">
            </div>
            <div :class="$style['title-phone-dec-right']">
                <img src="/images/biz/B09250515/porfolio-dec-right.svg">
            </div>
        </div>
        <div v-if="productGroup.length" :class="$style.relative">
            <div ref="dropdownRef" :class="$style.select">
                <button :class="$style['select-btn']" @click="openSelect">
                    <span :class="$style['select-btn-content']">{{ selected }}</span>
                    <span :class="[$style['select-btn-arrow'], { [$style.scaleY]: selectIsOpen }]">
                        <img src="/images/biz/B06250416/dropdown-arrow.svg">
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
                    <Swiper
                        :pagination="pagination"
                        :modules="modules"
                        :loop="true"
                        :auto-height="true"
                        :class="[$style.portfolioSwiper, { [$style['padding-bottom']]: curPageData.productFirstList?.length < 7 }]"
                    >
                        <SwiperSlide
                            v-for="(groupBox, groupNum) in productGroup"
                            :key="groupNum"
                            :class="$style['portfolio-list']"
                        >
                            <div :class="$style.top">
                                <div
                                    v-if="groupBox[0]"
                                    :class="[$style['img-box'], { [$style.disable]: !groupBox[0]?.image?.length && !groupBox[0]?.foreword }]"
                                    @click="openModal(groupBox[0])"    
                                >
                                    <ClientOnly>
                                        <Image
                                            v-if="groupBox[0]?.exhibitImage?.[0]"
                                            :img-src="commonStore.getImg(webID, groupBox[0]?.exhibitImage?.[0])"
                                        />
                                        <VideoLink
                                            v-else-if="groupBox[0]?.image[0]?.type === 'link'"
                                            :video-link="groupBox[0]?.image[0]?.value"
                                            :video-type="groupBox[0]?.image[0]?.community"
                                            video-width="319"
                                            video-height="450"
                                            :class="$style['iframe-wrap']"
                                        />
                                        <Image
                                            v-else
                                            :img-src="commonStore.getImg(webID, groupBox[0]?.image[0]?.value)"
                                        />
                                    </ClientOnly>
                                </div>
                                <div
                                    v-if="groupBox[1]"
                                    :class="[$style['img-box'], { [$style.disable]: !groupBox[1]?.image?.length && !groupBox[1]?.foreword }]"
                                    @click="openModal(groupBox[1])"    
                                >
                                    <ClientOnly>
                                        <Image
                                            v-if="groupBox[1]?.exhibitImage?.[0]"
                                            :img-src="commonStore.getImg(webID, groupBox[1]?.exhibitImage?.[0])"
                                        />
                                        <VideoLink
                                            v-else-if="groupBox[1]?.image[0]?.type === 'link'"
                                            :video-link="groupBox[1]?.image[0]?.value"
                                            :video-type="groupBox[1]?.image[0]?.community"
                                            video-width="319"
                                            video-height="450"
                                            :class="$style['iframe-wrap']"
                                        />
                                        <Image
                                            v-else
                                            :img-src="commonStore.getImg(webID, groupBox[1]?.image[0]?.value)"
                                        />
                                    </ClientOnly>
                                </div>
                            </div>
                            <div :class="$style.bottom">
                                <div
                                    v-if="groupBox[2]"
                                    :class="[$style['img-box'], { [$style.disable]: !groupBox[2]?.image?.length && !groupBox[2]?.foreword }]"
                                    @click="openModal(groupBox[2])"    
                                >
                                    <ClientOnly>
                                        <Image
                                            v-if="groupBox[2]?.exhibitImage?.[0]"
                                            :img-src="commonStore.getImg(webID, groupBox[2]?.exhibitImage?.[0])"
                                        />
                                        <VideoLink
                                            v-else-if="groupBox[2]?.image[0]?.type === 'link'"
                                            :video-link="groupBox[2]?.image[0]?.value"
                                            :video-type="groupBox[2]?.image[0]?.community"
                                            video-width="637"
                                            video-height="357"
                                            :class="$style['iframe-wrap']"
                                        />
                                        <Image
                                            v-else
                                            :img-src="commonStore.getImg(webID, groupBox[2]?.image[0]?.value)"
                                        />
                                    </ClientOnly>
                                </div>
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
        <div v-if="curPageData.productSetting?.decorateTextLeft || curPageData.productSetting?.decorateImg[0] || curPageData.productSetting?.decorateTextRight" :class="$style['bottom-decoration']">
            <div :class="$style['left-words']">
                <div v-if="curPageData.productSetting?.decorateTextLeft">
                    {{ curPageData.productSetting?.decorateTextLeft }}
                </div>
            </div>
            <div :class="$style['mid-img']">
                <ClientOnly>
                    <Image
                        v-if="curPageData.productSetting?.decorateImg[0]"
                        :img-src="commonStore.getImg(commonStore.userInfo.webID, curPageData.productSetting?.decorateImg[0])"
                        :has-zoom="true"
                    />
                </ClientOnly>
            </div>
            <div :class="$style['right-words']">
                <div v-if="curPageData.productSetting?.decorateTextRight">
                    {{ curPageData.productSetting?.decorateTextRight }}
                </div>
            </div>
        </div>
    </div>
    <PdCard open="pdcard" />
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
    background-color: #FBF2EC;
    animation: fadeIn 1.5s ease-in-out forwards;
    opacity: 0;
    animation-delay: 0.8s;
}

.relative {
    position: relative;
}

.title {
    padding: 0 40px;
    padding-bottom: 73px;
    color: #EC2831;
    font-weight: 700;
    font-size: 17px;
    letter-spacing: 0.15px;
    text-align: center;
    position: relative;
    .title-in {
        margin: 0 100px;
    }
    .title-dec {
        position: absolute;
        right: 0;
        bottom: 0;
        max-width: 243px;
        max-height: 123px;
        img {
            width: 100%;
            object-fit: contain;
        }
    }
}

.title-phone-dec-left ,
.title-phone-dec-right {
    display: none;
}

.select {
    position: absolute;
    text-align: center;
    top: -47px;
    left: 0;
}

.select-btn {
    position: relative;
    background-color: #FE7D85;
    padding: 15px 13px;
    color: #FBF2EC;
    z-index: 6;
    display: inline-flex;
    align-items: center;
    span {
        letter-spacing: 0.5px;
    }
    .select-btn-content {
        font-size: 15px;
        margin-right: 8px;
        font-weight: 700;
        position: relative;
        top: -0.5px;
        min-width: 109px;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 245px;
    }
    .select-btn-arrow {
        img {
            width: 13px;
            height: 6.5px;
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
    top: 42px;
    left: 0;
    background-color: #FFFEF2;
    padding: 0;
    width: 100%;
    z-index: 5;
    transition: all 0.5s;
    overflow: hidden;
    height: 0;
    max-height: 175px;
    overflow-y: auto;
    button {
        color: #EB1B26F0;
        font-size: 14px;
        line-height: 22.4px;
        letter-spacing: 2px;
        padding: 7.5px 13px;
        display: block;
        width: 100%;
        transition: all .3s;
        background-color: #FFFEF2;
        text-align: left;
        &:last-child {
            margin-bottom: 0;
        }
        &:hover {
            background-color: #fffbd4;
            color: rgba(218, 55, 64, 0.941);
        }
    }
    &.select-open {
        opacity: 1;
        padding: 15px 0px;
    }
}

.contain {
    background-color: #FBF2EC;
    .portfolioSwiper {
        padding-bottom: 35px;
    }
}

.portfolio-list {
    .img-box {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
        &:hover{
            filter: brightness(1.1);
            img {
                transform: scale(1.1);
            }
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

.top {
    display: flex;
    border: solid 2px #FE7D85;
    border-bottom: 0;
    box-sizing: border-box;
    width: 100%;
    .img-box {
        width: 50%;
        aspect-ratio: 319 / 451;
        background-color: #fff;
    }
}

.bottom {
    border: solid 2px #FE7D85;
    border-bottom: 0;
    border-top: 0;
    box-sizing: border-box;
    .img-box {
        aspect-ratio: 638 / 358;
        background-color: #fff;
    }
}

.noData {
    text-align: center;
    padding: 80px;
    color: #ec28327e;
    border-top: solid 2px #FE7D85;
}

.portfolioSwiper {
    :global(.swiper-pagination-fraction),
    :global(.swiper-pagination-custom),
    :global(.swiper-horizontal > .swiper-pagination-bullets),
    :global(.swiper-pagination-bullets.swiper-pagination-horizontal) {
        bottom: -1px;
        z-index: 3;
    }
    :global(.swiper-pagination-bullet) {
        background-color: #FE7D85;
        opacity: 1;
        transition: all 0.3s;
        border-radius: 50px;
        margin: 0 9px !important;
        width: 10px;
        height: 10px;
        &:global(.swiper-pagination-bullet-active) {
            background-color: #EB1B26F0;
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
    border: 4px solid #ff9ba2;
    border-top-color: #EB1B26F0;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

// 底下裝飾文字
.bottom-decoration {
    background-image: url('/images/biz/B09250515/porfolio-bg.svg');
    background-size: 100%;
    background-position: top; /* 讓背景對齊上方 */
    background-repeat: no-repeat;
    position: relative;
    top: -35px;
    display: flex;
    align-items: end;
    justify-content: center;
    padding-top: 65px;
    color: #F0405E;
    min-height: 133px;
    .left-words {
        font-size: 30px;
        letter-spacing: 1px;
        width: calc((100% - 139px - 40px - 40px) / 2);
        text-align: right;
        margin-right: 20px;
        margin-left: 20px;
        position: relative;
        bottom: 25px;
        font-family: "Impact", sans-serif;
    }
    .mid-img {
        width: 139px;
        max-height: 179px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: transparent;
        }
    }
    .right-words {
        font-size: 12px;
        letter-spacing: 0.8px;
        width: calc((100% - 139px - 40px - 40px) / 2);
        margin-right: 20px;
        margin-left: 20px;
        position: relative;
        bottom: 29px;
        font-family: "Palanquin Dark", sans-serif;
    }
}

@media (max-width:480px) {
    .title {
        padding-bottom: 97px;
        .title-in {
            margin: 0;
        }
        .title-dec {
            display: none;
            // 以下如果要將裝飾圖改為使用者輸入 再打開
            // position: absolute;
            // right: 0;
            // max-width: 167px;
            // max-height: 84px;
        }
        .title-phone-dec-left ,
        .title-phone-dec-right {
            display: block;
            position: absolute;
        }
        .title-phone-dec-left {
            right: 0;
            bottom: 0;
            width: 135px;
            height: 97px;
        }
        .title-phone-dec-right {
            bottom: 0;
            left: 0;
            width: 56px;
            height: 52px;
        }
    }
    .select {
        position: absolute;
        top: -47px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        z-index: 20;
    }
    .portfolioSwiper {
        :global(.swiper-pagination-bullet) {
            margin: 0 4px !important;
            width: 5px;
            height: 5px;
        }
    }
    .bottom-decoration {
        min-height: auto;
        .left-words ,
        .right-words {
            width: calc((100% - 87px - 16px - 16px) / 2);
            margin-right: 8px;
            margin-left: 8px;
        }
        .left-words {
            font-size: 18px;
        }
        .right-words {
            font-size: 8px;
        }
        .mid-img {
            width: 87px;
        }
    }
}
</style>
