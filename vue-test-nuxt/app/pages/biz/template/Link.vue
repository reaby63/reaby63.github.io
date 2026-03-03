<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCommonStore } from '@/stores/common';
import LinkPopup from '@/components/LinkPopup.vue';
import { useRelatedLink } from '@/composables/useRelatedLink';

const commonStore = useCommonStore();
const {
    selectedData,
    partnershipSelect,
    partnershipList,
    selectIsOpen,
    selectedName,
    listHeight,
    dropdownRef,
    openSelect,
    selectBtn,
    openModal
} = useRelatedLink(14);
const prevRef = ref(null);
const nextRef = ref(null);
</script>

<template>
    <div v-if="partnershipList?.length" :class="$style.link">
        <div :class="$style.title">
            <span>優質廠商</span>
        </div>
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
        <div :class="$style['link-wrap']">
            <div ref="prevRef" :class="[$style['swiper-arrow'], $style['swiper-prev']]" />
            <Swiper
                :class="[$style['link-swiper-wrap']]"
                :modules="[Navigation]"
                :space-between="20"
                :navigation="{
                    prevEl: prevRef,
                    nextEl: nextRef
                }"
                :breakpoints="{
                    0: { slidesPerView: 2 },
                    340: { slidesPerView: 3 },
                    415: { slidesPerView: 4 }
                }"
            >
                <SwiperSlide
                    v-for="(item, index) in partnershipList"
                    :key="index"
                    :class="$style['link-box']"
                >
                    <div :class="$style['link-item']" @click="openModal(item)">
                        <div :class="$style['link-item-img']">
                            <img
                                v-lazy="{
                                    src: commonStore.getImg(item.webID, item.logoImage || item.headshotImage),
                                    loading: '/images/home/template/detail/loading.svg'
                                }"
                            >
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div ref="nextRef" :class="[$style['swiper-arrow'], $style['swiper-next']]" />
        </div>
    </div>
    <LinkPopup v-if="commonStore.popupInfo.type === 'LinkPopup'" :data="selectedData" />
</template>

<style lang="scss" module>

.title {
    font-size: 18px;
    margin-bottom: 17px;
    opacity: 0;
    line-height: 26px;
    animation: fadeInSlideUp 1s ease-in-out forwards;
    span {
        position: relative;
        display: inline-block;
        padding: 0px 9px;
        &::before,
        &::after {
            content: "";
            display: inline-block;
            width: 1px;
            height: 18px;
            position: absolute;
            background-color: #434343;
        }
        &::before {
            top: 5px;
            left: 0px;
        }
        &::after {
            right: 0px;
            bottom: 3px;
        }
    }
}

.link {
    position: relative;
    margin-bottom: 44px;
}

.select {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    position: absolute;
    top: -3px;
    right: 0;
    opacity: 0;
    animation: fadeInSlideUp 1s ease-in-out forwards;
    z-index: 2;
}

.position {
    position: relative;
}

.select-btn {
    border: solid 1px #c9c9c9;
    border-radius: 5px;
    padding: 8px 18px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    width: 164px;
    z-index: 6;
    position: relative;
    background-color: #fff;
    color: #000;
    font-weight: 400;
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
    mask-image: url('/images/components/industries/select-arrow-t.svg');
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
    top: 42px;
    left: 0;
    display: inline-block;
    z-index: 5;
    background-color: #fff;
    padding: 0;
    border: solid 1px #c9c9c9;
    border-radius: 5px;
    box-sizing: border-box;
    max-height: 160px;
    width: 100%;
    opacity: 0;
    &.select-open {
        padding: 6px 0;
        overflow-y: auto;
        opacity: 1;
    }
    button {
        display: block;
        font-size: 14px;
        padding: 12px 6px;
        margin: 0 12px;
        text-align: left;
        cursor: pointer;
        transition: all 0.2s;
        width: -webkit-fill-available;
        background-color: transparent;
        border: 0;
        border-bottom: solid 1px #c9c9c9;
        color: #000;
        font-weight: 400;
        &:last-child {
            border-bottom: 0;
        }
        &:hover {
            background-color: #e3e3e3;
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
    :global(.swiper) {
        margin: 0 !important;
        width: 100%;
    }
}

.link-item {
    box-sizing: border-box;
    transition: all 0.2s;
    cursor: pointer;
    border: solid 1px #9b9b9b;
    display: flex;
    justify-content: center;
    margin-left: 20px;
    flex-wrap: wrap;
    aspect-ratio: 100 / 100;

    &:first-child {
        margin-left: 0;
    }

    &:hover {
        opacity: 0.7;
    }
}

.link-item-img {
    width: 100%;
    display: flex;
    justify-content: center;
    max-height: 100%;
    padding: 9px;
    box-sizing: border-box;
    img {
        width: 100%;
        object-fit: contain;
        object-position: center;
    }
}

.swiper-arrow {
    position: relative;
    width: 12px;
    height: 20px;
    overflow: hidden;
    cursor: pointer;
    &:before ,
    &:after {
        content: "";
        display: block;
        position: absolute;
        width: 1px;
        height: 23px;
        background-color: #000;
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
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

@keyframes fadeInSlideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
