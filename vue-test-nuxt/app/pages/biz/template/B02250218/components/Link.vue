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
} = useRelatedLink(14);

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
        <div :class="$style['title-space']">
            <div :class="$style.title">
                <span>{{ commonStore.getPageInfo.referralLinkSet?.title || '相關連結' }}</span>
            </div>
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

.title {
    font-size: 18px;
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

.title-space {
    display: flex;
    align-items: center;
    margin-bottom: 17px;
    justify-content: space-between;
}

.title-right {
    display: flex;
    justify-content: center;
}

.link {
    position: relative;
    margin-bottom: 44px;
}

.select {
    display: flex;
    justify-content: center;
    opacity: 0;
    animation: fadeInSlideUp 1s ease-in-out forwards;
    z-index: 2;
}

.position {
    position: relative;
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
}

.select-btn-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 17px);
    text-align: left;
    font-weight: 400;
    color: #434343;
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
        font-weight: 400;
        color: #434343;
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
    }

    .link-item-text {
        color: #000;
        margin-left: 13px;
        width: calc( 100% - 70px - 13px - 20px );
        div {
            font-size: 14px;
            line-height: 24px;
            letter-spacing: 1.2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .btn-view {
        display: inline-block;
        background: #828282;
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
        opacity: 0.7;
    }
}

.link-item-img {
    transition: all 0.2s;
    border: solid 1px #9b9b9b;
    margin-left: 20px;
    flex-wrap: wrap;
    padding: 9px;
    aspect-ratio: 100 / 100;
    width: 100%;
    display: flex;
    justify-content: center;
    max-height: 100%;
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

@media (max-width: 500px) {
    .title-space {
        display: block;
        .title {
            margin-bottom: 12px;
        }
        .title-right {
            justify-content: right;
        }
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
