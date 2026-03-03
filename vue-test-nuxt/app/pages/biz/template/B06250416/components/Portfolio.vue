<script setup>
import { ref, computed, nextTick, onMounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import PdCard from './PdCard.vue';
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
    curPageData.value.productSetting?.title ||
    curPageData.value.productSetting?.productGroupTitle ||
    curPageData.value.productSetting?.productGroup?.length ||
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

    for (let i = 0; i < selectedGroup.length; i += 6) {
        group.push(selectedGroup.slice(i, i + 6));
    }
    return group;
});

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
</script>

<template>
    <div v-if="portfolioGroup" :class="$style.portfolio">
        <div :class="$style.title">
            {{ curPageData.productSetting?.title }}
        </div>
        <div :class="$style.select">
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
                <!-- <button @click="selectBtn({ name:'全部', value:'all' })">
                    全部
                </button> -->
                <button
                    v-for="(item,index) in curPageData.productSetting?.productGroup"
                    :key="index"
                    @click="selectBtn(item)"
                >
                    {{ item.name }}
                </button>
            </div>
            <div :class="[$style['select-bg'], $style['bgimg-size']]">
                <img src="/images/biz/B06250416/purple_round_up.png">
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
                        <div :class="$style.left">
                            <div
                                v-if="groupBox[0]"
                                :class="[$style['img-box'], { [$style.disable]: !groupBox[0]?.image?.length && !groupBox[0]?.foreword }]"
                                @click="openModal(groupBox[0])"
                            >
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[0]?.exhibitImage?.[0]"
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[0]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[0]?.image[0]?.value"
                                        :video-type="groupBox[0]?.image[0]?.community"
                                        video-width="336"
                                        video-height="267"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(webID, groupBox[0]?.image[0]?.value)"
                                        :class="$style['img-wrap']"
                                    />
                                </ClientOnly>
                            </div>
                            <div :class="$style.bottom">
                                <div
                                    v-if="groupBox[1]"
                                    :class="[$style['img-box'], { [$style.disable]: !groupBox[1]?.image?.length && !groupBox[1]?.foreword }]"
                                    @click="openModal(groupBox[1])"    
                                >
                                    <ClientOnly>
                                        <Image
                                            v-if="groupBox[1]?.exhibitImage?.[0]"
                                            :class="$style['img-wrap']"
                                            :img-src="commonStore.getImg(webID, groupBox[1]?.exhibitImage?.[0])"
                                        />
                                        <VideoLink
                                            v-else-if="groupBox[1]?.image[0]?.type === 'link'"
                                            :video-link="groupBox[1]?.image[0]?.value"
                                            :video-type="groupBox[1]?.image[0]?.community"
                                            video-width="159"
                                            video-height="195"
                                            :class="$style['iframe-wrap']"
                                        />
                                        <Image
                                            v-else
                                            :img-src="commonStore.getImg(webID, groupBox[1]?.image[0]?.value)"
                                            :class="$style['img-wrap']"
                                        />
                                    </ClientOnly>
                                </div>
                                <div
                                    v-if="groupBox[2]"
                                    :class="[$style['img-box'], { [$style.disable]: !groupBox[2]?.image?.length && !groupBox[2]?.foreword }]"
                                    @click="openModal(groupBox[2])"    
                                >
                                    <ClientOnly>
                                        <Image
                                            v-if="groupBox[2]?.exhibitImage?.[0]"
                                            :class="$style['img-wrap']"
                                            :img-src="commonStore.getImg(webID, groupBox[2]?.exhibitImage?.[0])"
                                        />
                                        <VideoLink
                                            v-else-if="groupBox[2]?.image[0]?.type === 'link'"
                                            :video-link="groupBox[2]?.image[0]?.value"
                                            :video-type="groupBox[2]?.image[0]?.community"
                                            video-width="159"
                                            video-height="195"
                                            :class="$style['iframe-wrap']"
                                        />
                                        <Image
                                            v-else
                                            :img-src="commonStore.getImg(webID, groupBox[2]?.image[0]?.value)"
                                            :class="$style['img-wrap']"
                                        />
                                    </ClientOnly>
                                </div>
                            </div>
                        </div>
                        <div :class="$style.right">
                            <div
                                v-if="groupBox[3]"
                                :class="[$style['img-box'], { [$style.disable]: !groupBox[3]?.image?.length && !groupBox[3]?.foreword }]"
                                @click="openModal(groupBox[3])"    
                            >
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[3]?.exhibitImage?.[0]"
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[3]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[3]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[3]?.image[0]?.value"
                                        :video-type="groupBox[3]?.image[0]?.community"
                                        video-width="139"
                                        video-height="148"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(webID, groupBox[3]?.image[0]?.value)"
                                        :class="$style['img-wrap']"
                                    />
                                </ClientOnly>
                            </div>
                            <div
                                v-if="groupBox[4]"
                                :class="[$style['img-box'], { [$style.disable]: !groupBox[4]?.image?.length && !groupBox[4]?.foreword }]"
                                @click="openModal(groupBox[4])"    
                            >
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[4]?.exhibitImage?.[0]"
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[4]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[4]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[4]?.image[0]?.value"
                                        :video-type="groupBox[4]?.image[0]?.community"
                                        video-width="139"
                                        video-height="148"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(webID, groupBox[4]?.image[0]?.value)"
                                        :class="$style['img-wrap']"
                                    />
                                </ClientOnly>
                            </div>
                            <div
                                v-if="groupBox[5]"
                                :class="[$style['img-box'], { [$style.disable]: !groupBox[5]?.image?.length && !groupBox[5]?.foreword }]"
                                @click="openModal(groupBox[5])"    
                            >
                                <ClientOnly>
                                    <Image
                                        v-if="groupBox[5]?.exhibitImage?.[0]"
                                        :class="$style['img-wrap']"
                                        :img-src="commonStore.getImg(webID, groupBox[5]?.exhibitImage?.[0])"
                                    />
                                    <VideoLink
                                        v-else-if="groupBox[5]?.image[0]?.type === 'link'"
                                        :video-link="groupBox[5]?.image[0]?.value"
                                        :video-type="groupBox[5]?.image[0]?.community"
                                        video-width="139"
                                        video-height="148"
                                        :class="$style['iframe-wrap']"
                                    />
                                    <Image
                                        v-else
                                        :img-src="commonStore.getImg(webID, groupBox[5]?.image[0]?.value)"
                                        :class="$style['img-wrap']"
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
        <PdCard open="pdcard" />
    </div>
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
    margin-top: 63px;
}

.title {
    margin-bottom: 10px;
}

.select {
    position: relative;
    min-height: 77.16px;
    text-align: center;
}

.select-btn {
    position: relative;
    background-color: #009DFF;
    padding: 0 20px;
    border-radius: 50px;
    color: #ffffff;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    span {
        line-height: 1.6em;
        letter-spacing: 2px;
    }
    .select-btn-title {
        font-size: 16px;
        font-weight: 600;
        margin-right: 8px;
        font-family: "Noto Sans Display", sans-serif;
    }
    .select-btn-content {
        font-size: 15px;
        margin-right: 8px;
        font-family: "Noto Sans Display", sans-serif;
        position: relative;
        top: -0.5px;
    }
    .select-btn-arrow {
        img {
            width: 12px;
            height: 7px;
            transform: scaleY(1);
            transition: all 0.3s;
            position: relative;
            top: -2px;
        }
        &.scaleY {
            img {
                transform: scaleY(-1);
                top: -3px;
            }
        }
    }
}

.select-list {
    position: absolute;
    top: 36px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #FFFFFF;
    border-radius: 20px;
    padding: 0;
    width: 189px;
    text-align: center;
    z-index: 5;
    transition: all 0.5s;
    overflow: hidden;
    height: 0;
    button {
        color: #000000;
        font-size: 14px;
        line-height: 22.4px;
        letter-spacing: 2px;
        padding: 2px 0;
        display: block;
        margin-bottom: 6px;
        width: 100%;
        transition: all .3s;
        background-color: #fff;
        &:last-child {
            margin-bottom: 0;
        }
        &:hover {
            background-color: #519DF4;
            color: #ffffff;
        }
    }
    &.select-open {
        opacity: 1;
        padding: 15px 0px;
    }
}

.select-bg {
    position: absolute;
    top: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        height: 100%;
        object-fit: cover;
    }
}

.contain {
    background-color: #000003;
    padding: 52px 67.5px 0;
    .portfolioSwiper {
        padding-bottom: 66px;
        &.padding-bottom {
            padding-bottom: 16px;
        }
    }
}

.portfolio-list {
    display: flex;
    .img-box {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        border: solid 1px #FFFFFF33;
        box-sizing: border-box;
        overflow: hidden;
        transition: all 0.3s;
        cursor: pointer;
        &:hover{
            border: solid 3px #519DF4;
            filter: brightness(1.1);
            img {
                transform: scale(1.1);
            }
        }
        &.disable {
            cursor: initial;
        }
        .img-wrap {
            width: 100%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    img {
        transition: all 0.3s;
    }
}

.left {
    width: 67%;
    margin-right: 25px;
    .img-box {
        aspect-ratio: 336.88 / 268.01;
    }
}

.bottom {
    margin-top: 15px;
    display: flex;
    .img-box {
        width: calc( (100% - 15px) / 2 );
        height: 100%;
        aspect-ratio: 161.67 / 197.72;
        &:first-child {
            margin-right: 15px;
        }
    }
}

.right {
    max-width: calc(100% - 67% - 25px);
    .img-box {
        width: 100%;
        margin-bottom: 15px;
        aspect-ratio: 141.64 / 150.76;
        height: calc((100% - 30px) / 3);
        &:last-child {
            margin-bottom: 0;
        }
    }
}

.noData {
    text-align: center;
    background-color: #000000;
    padding: 80px;
    color: #797979;
}

.portfolioSwiper {
    :global(.swiper-pagination-bullet) {
        background-color: #fff;
        opacity: 1;
        transition: all 0.3s;
        border-radius: 50px;
        margin: 0 15px !important;
        &:global(.swiper-pagination-bullet-active) {
            background-color: #009DFF;
            width: 55px;
            border-radius: 10px;
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
    background: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.spinner {
    width: 32px;
    height: 32px;
    border: 4px solid #474747;
    border-top-color: #009DFF;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width:580px) {
    .contain {
        padding: 9px 48px 0;
    }
    .portfolio-list {
        display: block;
    }
    .left {
        width: 100%;
        margin-right: 0;
        margin-bottom: 15px;
    }
    .right {
        display: flex;
        flex-wrap: wrap;
        max-width: 100%;
        .img-box {
            width: calc((100% - 30px) / 3);
            height: auto;
            margin-bottom: 0;
            margin-right: 15px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    .portfolioSwiper {
        :global(.swiper-pagination-bullet) {
            margin: 0 8px !important;
            &:global(.swiper-pagination-bullet-active) {
                width: 40px;
            }
        }
    }
}
</style>
