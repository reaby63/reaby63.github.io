<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCommonStore } from '@/stores/common';
import { useRelatedLink } from '@/composables/useRelatedLink';
import LinkPopup from '@/components/LinkPopup.vue';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const prevRef = ref(null);
const nextRef = ref(null);
const {
    selectedData,
    partnershipSelect,
    partnershipList,
    selectIsOpen,
    selectedName,
    listHeight,
    dropdownRef,
    isList,
    openSelect,
    selectBtn,
    openModal,
    clickBox,
    clickList
} = useRelatedLink();

// 列表模式
const slidesPerPage = ref(4); // 預設桌面 4 個
const updateSlidesPerPage = () => {
    const w = window.innerWidth;
    if (w < 500) slidesPerPage.value = 2;  // 手機窄螢幕每頁 2 個
    else slidesPerPage.value = 4;          // 桌面 4 個
};

onMounted(() => {
    updateSlidesPerPage();
    window.addEventListener('resize', updateSlidesPerPage);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateSlidesPerPage);
});

const categoryPartnershipList = computed(() => {
    const group = [];
    const list = partnershipList.value || [];
    for (let i = 0; i < list.length; i += slidesPerPage.value) {
        group.push(list.slice(i, i + slidesPerPage.value));
    }
    return group;
});
</script>

<template>
    <div v-if="commonStore.userInfo?.partnership.length" :class="$style['link-space']">
        <div :class="$style.title">
            {{ commonStore.getPageInfo.referralLinkSet?.title || '相關連結' }}<span :class="$style['title-line']" />
            <div :class="$style['title-right']">
                <div :class="$style.select">
                    <div ref="dropdownRef" :class="$style.position">
                        <button :class="$style['select-btn']" @click="openSelect">
                            <span :class="$style['select-btn-content']">{{ selectedName }}</span>
                            <span :class="[$style['select-btn-arrow'], { [$style.scaleY]: selectIsOpen }]" />
                        </button>
                        <div
                            ref="listHeight"
                            :class="[$style['select-list'], { [$style['select-open']]: selectIsOpen }]"
                        >
                            <button @click="selectBtn({ name:'全部廠商', value:'' })">
                                全部廠商
                            </button>
                            <button
                                v-for="(item,index) in partnershipSelect"
                                :key="index"
                                @click="selectBtn(item)"
                            >
                                {{ item.name }}
                            </button>
                        </div>
                    </div>
                </div>
                <div :class="$style['switch-btn']">
                    <div :class="$style['switch-box']" @click="clickBox()">
                        <span/>
                    </div>
                    <div :class="$style['switch-list']" @click="clickList()">
                        <span/>
                    </div>
                </div>
            </div>
        </div>
        <div :class="[$style['link-wrap'], { [$style['change-list']]: isList }]">
            <div ref="prevRef" :class="[$style['swiper-arrow'], $style['swiper-prev']]" />
            <!-- 方塊樣式 -->
            <Swiper
                :class="[$style['link-swiper-wrap'], $style['isbox']]"
                :modules="[Navigation]"
                :space-between="14"
                :navigation="{
                    prevEl: prevRef,
                    nextEl: nextRef
                }"
                :breakpoints="{
                    0: { slidesPerView: 2 },
                    350: { slidesPerView: 3 },
                    480: { slidesPerView: 4 }
                }"
            >
                <SwiperSlide
                    v-for="(item, index) in partnershipList"
                    :key="index"
                    :class="$style['link-box']"
                >
                    <div :class="$style['link-item']" @click="openModal(item)">
                        <div :class="$style['link-item-img']">
                            <ClientOnly>
                                <Image :class="$style.img" :img-src="commonStore.getImg(item.webID, item.logoImage || item.headshotImage)"/>
                            </ClientOnly>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <!-- 列表樣式 -->
            <Swiper
                :class="[$style['link-swiper-wrap'], $style['islist']]"
                :modules="[Navigation]"
                :space-between="20"
                :navigation="{
                    prevEl: prevRef,
                    nextEl: nextRef
                }"
            >
                <SwiperSlide
                    v-for="(item, index) in categoryPartnershipList"
                    :key="index"
                    :class="$style['link-box']"
                >
                    <div :class="$style['link-list']">
                        <div v-if="item[0]" :class="$style['link-item']" @click="openModal(item[0])">
                            <div :class="$style['link-item-img']">
                                <ClientOnly>
                                    <Image :class="$style.img" :img-src="commonStore.getImg(item[0].webID, item[0].logoImage || item[0].headshotImage)"/>
                                </ClientOnly>
                            </div>
                            <div :class="$style['link-item-text']">
                                <div>
                                    {{ item[0].title }}
                                </div>
                                <div>
                                    {{ item[0].industryName }}
                                </div>
                                <div>
                                    <span :class="$style['btn-view']">VIEW</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="item[1]" :class="$style['link-item']" @click="openModal(item[1])">
                            <div :class="$style['link-item-img']">
                                <ClientOnly>
                                    <Image :class="$style.img" :img-src="commonStore.getImg(item[1].webID, item[1].logoImage || item[1].headshotImage)"/>
                                </ClientOnly>
                            </div>
                            <div :class="$style['link-item-text']">
                                <div>
                                    {{ item[1].title }}
                                </div>
                                <div>
                                    {{ item[1].industryName }}
                                </div>
                                <div>
                                    <span :class="$style['btn-view']">VIEW</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="$style['link-list']">
                        <div v-if="item[2]" :class="$style['link-item']" @click="openModal(item[2])">
                            <div :class="$style['link-item-img']">
                                <ClientOnly>
                                    <Image :class="$style.img" :img-src="commonStore.getImg(item[2].webID, item[2].logoImage || item[2].headshotImage)"/>
                                </ClientOnly>
                            </div>
                            <div :class="$style['link-item-text']">
                                <div>
                                    {{ item[2].title }}
                                </div>
                                <div>
                                    {{ item[2].industryName }}
                                </div>
                                <div>
                                    <span :class="$style['btn-view']">VIEW</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="item[3]" :class="$style['link-item']" @click="openModal(item[3])">
                            <div :class="$style['link-item-img']">
                                <ClientOnly>
                                    <Image :class="$style.img" :img-src="commonStore.getImg(item[3].webID, item[3].logoImage || item[3].headshotImage)"/>
                                </ClientOnly>
                            </div>
                            <div :class="$style['link-item-text']">
                                <div>
                                    {{ item[3].title }}
                                </div>
                                <div>
                                    {{ item[3].industryName }}
                                </div>
                                <div>
                                    <span :class="$style['btn-view']">VIEW</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div ref="nextRef" :class="[$style['swiper-arrow'], $style['swiper-next']]" />
        </div>
        <LinkPopup v-if="commonStore.popupInfo.type === 'LinkPopup'" :data="selectedData" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.link-space {
    margin: 20px 0 0 -10px;
    margin-right: 67px;
}

.title {
    font-size: 15px;
    line-height: 18px;
    font-weight: Bold;
    letter-spacing: 3px;
    color: #221D1A;
    display: flex;
    margin-bottom: 25px;
    align-items: center;

    .title-line {
        flex: 1;
        height: 1px;
        background-color: #DFDFDF;
        display: inline-block;
        width: 100%;
        margin-left: 10px;
    }
}

.title-right {
    display: flex;
    align-items: center;
}

.switch-btn {
    display: flex;
    align-items: center;
    margin-left: 15px;
    .switch-box ,
    .switch-list {
        padding: 4px;
        cursor: pointer;
        span {
            height: 16px;
            width: 16px;
            display: block;
            mask-position: center;
            mask-repeat: no-repeat;
            mask-size: contain;
            background: #000;
        }
    }
    .switch-box {
        margin-right: 3px;
        span {
            mask-image: url('/images/components/referralLink/switch-box.svg');
        }
    }
    .switch-list {
        span {
            mask-image: url('/images/components/referralLink/switch-list.svg');
        }
    }
}

.select {
    display: flex;
    justify-content: center;
    font-family: "MiSans TC", Arial, sans-serif;
    color: #221D1A;
}

.position {
    position: relative;
}

.select-btn {
    border: solid 0.79px #947F73;
    border-radius: 10px;
    padding: 8px 16px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 130px;
    z-index: 6;
    position: relative;
    background-color: #D7D0C9;
    font-weight: 400;
}

.select-btn-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 17px);
    text-align: left;
    color: #000;
}

.select-btn-arrow {
    height: 17px;
    width: 17px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-image: url('/images/components/industries/select-arrow.svg');
    background: #221D1A;
    transition: all 0.5s;
    &.scaleY {
        transform: scaleY(-1);
    }
}

.select-list {
    height: 0;
    overflow: hidden;
    transition: all 0.7s;
    position: absolute;
    top: 24px;
    left: 0;
    display: inline-block;
    z-index: 5;
    background-color: #D7D0C9;
    padding: 0;
    border: solid 1px #947F73;
    border-radius: 0 0 10px 10px;
    box-sizing: border-box;
    max-height: 155px;
    width: 100%;
    &.select-open {
        padding: 20px 0 5px;
        overflow-y: auto;
    }
    button {
        display: block;
        font-size: 14px;
        padding: 8px 24px;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        width: 100%;
        color: #000;
        font-weight: 400;
        &:hover {
            background-color: #fcf2e7;
        }
    }
    &::-webkit-scrollbar {
        width: 6px;/* 捲軸的寬度 */
    }
    &::-webkit-scrollbar-track {
        background: transparent;/* 軌道顏色 */
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #c7baab;/* 拖曳拉條顏色 */
        border-radius: 10px;
        cursor: pointer;
        &:hover {
            background: #baa997;
        }
    }
}

.link-wrap {
    display: flex;
    align-items: center;
    :global(.swiper) {
        margin: 0 !important;
        width: 100%;
    }
}

.link-swiper-wrap {
    display: none;
    &.isbox {
        display: flex;
    }
}

.change-list {
    margin-top: 25px;
    .link-swiper-wrap {
        &.islist {
            display: flex;
        }
        &.isbox {
            display: none;
        }
    }

    .link-list {
        display: flex;
        align-items: center;
        &:first-child {
            margin-bottom: 16px;
        }
    }

    .link-item {
        width: 50%;
        align-items: center;
    }

    .link-item-img {
        height: 70px;
        width: 70px;
        padding: 6px;
    }

    .link-item-text {
        color: #221D1A;
        margin-left: 13px;
        width: calc( 100% - 70px - 13px );
        div {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 1.2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: Outfit;
        }
    }

    .btn-view {
        display: inline-block;
        background: #fff;
        padding: 2px 7px;
        font-size: 12px;
        line-height: 14px;
        color: #221D1A;
        font-family: Outfit;
    }
}

.link-item {
    display: flex;
    cursor: pointer;
    &:hover {
        filter: brightness(1.1);
    }
}

.link-item-img {
    transition: all 0.2s;
    background-color: #fff;
    margin-left: 20px;
    flex-wrap: wrap;
    aspect-ratio: 100 / 100;
    width: 100%;
    display: flex;
    justify-content: center;
    max-height: 100%;
    padding: 4px;
    box-sizing: border-box;
    &:first-child {
        margin-left: 0;
    }
    .img {
        overflow: hidden;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }
}

.swiper-arrow {
    position: relative;
    padding: 10px 0;
    cursor: pointer;
    &:after {
        content: "";
        display: block;
        width: 4.5px;
        height: 9px;
        overflow: hidden;
        background: url('/images/biz/B08250527/link-arrow.svg') no-repeat center center;
        background-size: contain;
    }
    &:hover {
        opacity: 0.7;
    }
    &:global(.swiper-button-disabled) {
        opacity: 0.3;
        cursor: initial;
    }
}

.swiper-prev {
    padding-right: 14px;
}

.swiper-next {
    transform: scaleX(-1);
    padding-right: 14px;
}

@media (max-width:501px) {
    .link-space {
        margin-right: 20px;
    }
    .title {
        flex-wrap: wrap;
    }
    .title-right {
        justify-content: flex-end;
        width: 100%;
        margin-top: 12px;
    }
    .change-list {
        .link-list {
            display: block;
            &:first-child {
                margin-bottom: 0;
            }
        }
        .link-item {
            width: 100%;
            &:first-child {
                margin-bottom: 16px;
            }
        }
    }
}
</style>
