<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCommonStore } from '@/stores/common';
import LinkPopup from '@/components/LinkPopup.vue';
import { useRelatedLink } from '@/composables/useRelatedLink';
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
    <div v-if="partnershipList?.length" :class="$style.link">
        <div :class="$style['link-title']">
            <span :class="$style.line" />
            <span>{{ commonStore.getPageInfo.referralLinkSet?.title || '相關連結' }}</span>
            <span :class="$style.line" />
        </div>
        <div :class="$style['title-bottom']">
            <div :class="$style.select">
                <div ref="dropdownRef" :class="$style.position">
                    <button :class="[$style['select-btn'], { [$style['btn-open']]: selectIsOpen }]" @click="openSelect">
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
                :space-between="20"
                :navigation="{
                    prevEl: prevRef,
                    nextEl: nextRef
                }"
                :breakpoints="{
                    0: { slidesPerView: 2 },
                    420: { slidesPerView: 3 }
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

.link {
    animation: fadeInSlideUp 2.5s ease-in-out forwards;
    opacity: 0;
    transform: translateY(50px);
    animation-delay: 0.5s;
    padding: 24px 76px;
    padding-bottom: 44px;
    color: #ffffff;
    position: relative;
    z-index: 2;
    // .title {
    //     margin-bottom: 15px;
    //     color: #ffffff;
    //     &::before,
    //     &::after {
    //         background-color: #ffffff;
    //     }
    // }
}

.link-title {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 25px;
    span {
        display: inline-flex;
        width: auto;
        &:nth-child(2){
            font-size: 20px;
            line-height: 1.6em;
            letter-spacing: 0.05em;
            font-weight: 700;
            margin: 0 16px;
            justify-content: center;
        }
    }
    .line {
        flex: 1;
        height: 1.5px;
        background-color: #fff;
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
            background: #fff;
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
    border: solid 1px #858585;
    border-radius: 50px;
    padding: 13px 22px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 164px;
    z-index: 6;
    position: relative;
    background-color: rgba($color: #000000, $alpha: 0.6);
    color: #fff;
    transition: all 0.5s;
    &.btn-open {
        background-color: rgba($color: #000000, $alpha: 1);
    }
}

.select-btn-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 17px);
    text-align: left;
}

.select-btn-arrow {
    height: 17px;
    width: 17px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-image: url('/images/components/industries/select-arrow.svg');
    background: #fff;
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
    background-color: #404041;
    padding: 0;
    border: solid 1px #858585;
    border-radius: 0 0 10px 10px;
    box-sizing: border-box;
    max-height: 160px;
    width: 100%;
    opacity: 0;
    &.select-open {
        padding: 20px 0 5px;
        overflow-y: auto;
        opacity: 1;
    }
    button {
        display: block;
        font-size: 14px;
        padding: 8px 24px;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        width: 100%;
        color: #fff;
        background-color: transparent;
        border: 0;
        &:hover {
            background-color: #78787a;
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
    margin: 0 3px;
    align-items: center;
    margin-top: 20px;
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
        padding: 3px;
        border: 2px solid #E0E0E0;
    }

    .link-item-text {
        color: #fff;
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
        background: #fff;
        padding: 2px 7px;
        font-size: 12px;
        line-height: 14px;
        color: #000;
        margin-top: 7px;
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
    border: solid 1px #9b9b9b;
    background-color: #fff;
    margin-left: 20px;
    flex-wrap: wrap;
    aspect-ratio: 100 / 100;
    width: 100%;
    display: flex;
    justify-content: center;
    max-height: 100%;
    padding: 16px;
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
    width: 20px;
    height: 20px;
    overflow: hidden;
    cursor: pointer;
    background: url('/images/biz/B06250320/link-arrow.svg') no-repeat center center;
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
    margin-right: 12px;
}

.swiper-next {
    transform: scaleX(-1);
    margin-left: 12px;
}

@media (max-width: 500px) {
    .link {
        padding: 0px 28px;
        padding-bottom: 75px;
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
