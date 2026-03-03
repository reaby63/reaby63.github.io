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
    <div v-if="partnershipList?.length" :class="$style['link-space']">
        <div :class="$style.title">
            <span :class="$style['title-en']">
                <span>
                    Top Picks
                </span>
            </span>
            <span :class="$style['title-line']" />
            <span :class="$style['title-ch']">
                {{ commonStore.getPageInfo.referralLinkSet?.title || '相關連結' }}
            </span>
        </div>
        <div :class="$style['title-bottom']">
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
        <div :class="[$style['link-wrap'], { [$style['change-list']]: isList }]">
            <div ref="prevRef" :class="[$style['swiper-arrow'], $style['swiper-prev']]" />
            <!-- 方塊樣式 -->
            <Swiper
                :class="[$style['link-swiper-wrap'], $style['isbox']]"
                :modules="[Navigation]"
                :space-between="12"
                :navigation="{
                    prevEl: prevRef,
                    nextEl: nextRef
                }"
                :breakpoints="{
                    0: { slidesPerView: 1 },
                    340: { slidesPerView: 2 },
                    480: { slidesPerView: 3 }
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
.link-space {
    margin: 0 76px;
    margin-bottom: 55px;
    position: relative;
    z-index: 3;
}

.title {
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    font-size: 20px;
    line-height: 1.6;

    .title-en {
        span {
            letter-spacing: 3px;
            font-family: "Freeman", sans-serif;
        }
    }

    .title-line {
        flex: 1;
        height: 1px;
        background-color: #000000;
        margin-right: 30px;
        margin-left: 30px;
    }

    .title-ch {
        letter-spacing: 1px;
        font-weight: 600;
    }
}

.title-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .switch-btn {
        position: absolute;
        right: 0;
    }
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
}

.position {
    position: relative;
}

.select-btn {
    border: solid 2px #000;
    border-radius: 50px;
    padding: 12px 22px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 164px;
    z-index: 6;
    position: relative;
    background-color: #fff;
    font-weight: 500;
    color: #000;
}

.select-btn-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 17px);
    text-align: left;
    line-height: 17px;
}

.select-btn-arrow {
    height: 17px;
    width: 17px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-image: url('/images/components/industries/select-arrow.svg');
    background: #000;
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
    top: 25px;
    left: 0;
    display: inline-block;
    z-index: 5;
    background-color: #fff;
    padding: 0;
    border: solid 2px #000;
    border-radius: 0 0 5px 5px;
    box-sizing: border-box;
    max-height: 160px;
    width: 100%;
    &.select-open {
        padding: 20px 0 5px;
        overflow-y: auto;
    }
    button {
        display: block;
        font-size: 14px;
        padding: 11px 24px;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        width: 100%;
        font-weight: 500;
        color: #000;
        &:hover {
            background-color: #e9e9e9;
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
        background: #c8c8c8;/* 拖曳拉條顏色 */
        border-radius: 10px;
        cursor: pointer;
        &:hover {
            background: #a3a3a3;
        }
    }
}

.link-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 29px;
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
        height: 80px;
        width: 80px;
        padding: 4px;
        border: 2px solid #000;
        border-radius: 8px;
    }

    .link-item-text {
        color: #1E1E1E;
        margin-left: 13px;
        width: calc( 100% - 80px - 13px - 10px );
        div {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 1.2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .btn-view {
        display: inline-block;
        background: #000;
        padding: 2px 7px;
        font-size: 12px;
        line-height: 14px;
        color: #fff;
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
    padding: 20px;
    box-sizing: border-box;
    border: 2px solid #000;
    border-radius: 20px;
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
    width: 10px;
    height: 30px;
    overflow: hidden;
    cursor: pointer;
    background: url('/images/biz/B06250411/link-arrow.svg') no-repeat center center;
    background-size: contain;
    padding: 5px 0px;
    &:hover {
        opacity: 0.7;
    }
    &:global(.swiper-button-disabled) {
        opacity: 0.5;
        cursor: initial;
    }
}

.swiper-prev {
    margin-right: 20px;
}

.swiper-next {
    transform: scaleX(-1);
    margin-left: 20px;
}

@media (max-width:501px) {
    .link-space {
        margin: 0 56px;
        margin-bottom: 55px;
    }

    .title {
        margin-bottom: 25px;
        font-size: 16px;

        .title-line {
            margin-right: 5px;
            margin-left: 5px;
        }
    }

    .link-item-img {
        padding: 10px;
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

@media (max-width:390px) {
    .title-bottom {
        justify-content: flex-start;
    }
}

@media (max-width:330px) {
    .link-space {
        margin: 0 25px;
        margin-bottom: 55px;
    }
}
</style>
