<script setup>
import { ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Pdcard from './PdCard.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// 套資料---
const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    }
});
const commonStore = useCommonStore();
const curPageData = computed(() => props.userInfo?.pageData || {});
const webID = computed(() => props.userInfo?.webID || '');

// 輪播套件
function renderBullet(index, className) {
    return `<span class="${className}">${index + 1}</span>`;
}

const pagination = {
    clickable: true,
    renderBullet
};

const modules = [Pagination];

// 彈跳視窗
const showModal = ref(false);
const selectedItem = ref({});

function openModal(item) {
    if (Array.isArray(item.image) && item.image.length > 0) {
        selectedItem.value = item;
        showModal.value = true;
    }
}

// 作品列表分組---
const productGroup = computed(() => {
    const group = [];
    const list = curPageData.value.productList || []; //作品資料放這 在這邊取要+.value
    for (let i = 0; i < list.length; i += 6) {
        group.push(list.slice(i, i + 6));
    }
    return group;
});

// // 頁籤
// const pageNum = ref(0); // 目前位子
// function clickPage(index) {
//     pageNum.value = index; //將圖片再用的參數綁在頁籤參數上
// }

</script>

<template>
    <div :class="$style.c_portfolio" v-if="curPageData.productList.length">
        <div :class="$style.cp_title">
            <div :class="$style.c_title">
                作品展示<span :class="$style.ct_en">Portfolio</span>
            </div>
        </div>
        <div :class="$style.c_contain">
            <Swiper
            :pagination="pagination"
            :modules="modules"
            :class="[$style.portfolioSwiper, 'swiperFor_b06250401']"
            >
                <SwiperSlide
                :class="$style.cp_list"
                v-for="(groupBox, groupNum) in productGroup"
                :key="groupNum"
                >
                    <div
                    v-for="(item, index) in groupBox"
                    :key="item.img?.exhibitImage?.[0] || index"
                    :class="[$style.list_a, { [$style.hasHover]: item.image?.length > 0 }]"
                    @click="openModal(item)"
                    >
                        <span :class="$style.list_span">
                            <img
                            :src="`${commonStore.getImg(webID, item.exhibitImage[0])}`"
                            :class="$style.list_img"
                            >
                        </span>
                    </div>
                </SwiperSlide>
            </Swiper>
            <!-- <div :class="$style.cp_wrapper" :style="{transform : `translateX(-${pageNum * 100}%)`}">
                <div
                :class="$style.cp_list"
                v-for="(groupBox, groupNum) in productGroup"
                :key="groupNum"
                >
                    <div
                    v-for="(item, index) in groupBox"
                    :key="item.img?.exhibitImage?.[0] || index"
                    :class="[$style.list_a, { [$style.hasHover]: item.image?.length > 0 }]"
                    @click="openModal(item)"
                    >
                        <span :class="$style.list_span">
                            <img
                            :src="`${commonStore.getImg(webID, item.exhibitImage[0])}`"
                            :class="$style.list_img"
                            >
                        </span>
                    </div>
                </div>
            </div>
            <div :class="$style.cp_listmark">
                <button
                v-for="(btn, btnNum) of productGroup"
                :key="btnNum"
                :class="{ [$style.cp_btn]: true, [$style.active]: btnNum === pageNum }"
                @click="clickPage(btnNum)"
                >
                    {{ btnNum + 1 }}
                </button>
            </div> -->
        </div>
    </div>
    <!-- PD彈跳視窗 -->
    <Pdcard
    :userInfo="userInfo"
    v-model:visible="showModal"
    :data="selectedItem"
    />
</template>

<style lang="scss" module>
@import "../scss/all.scss";
@import "../scss/animate.scss";

button {
    cursor: pointer;
    background-color: transparent;
    border: 0px;
}
.c_portfolio{
    position: relative;
    z-index: 2;
    padding-bottom: 1.5px;
    &::before{
        content: "";
        display: block;
        // width: 301px;
        width: 299px;
        height: 669px;
        background-image: url(/images/biz/B06250401/porfolio_bg.png);
        background-size: 100% 100%;
        background-position: top;
        position: absolute;
        left: -2px;
        bottom: 5px;
    }
}

.cp_title{
    text-align: right;
    margin-right: 76px;
    margin-bottom: 39px;
}

.c_title{
    color: #464646;
    border-color: #333333;
    text-shadow:
    -1px -1px 0 #ffffff,
    1px -1px 0 #ffffff,
    -1px  1px 0 #ffffff,
    1px  1px 0 #ffffff;
}
.ct_en{
    color: #333333;
}

.c_contain{
    overflow: hidden;
    margin: 0 105px;
    margin-right: 91px;
    z-index: 2;
    position: relative;
}
.cp_wrapper {
    display: flex;
    transition: transform 0.4s ease-in-out; // 加上滑動動畫
    width: 100%; // 避免 flex 影響排列
}
.cp_list{
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex: 0 0 100%; // 讓每頁剛好佔滿容器
    flex-wrap: wrap;
}
.list_a{
    position: relative;
    width: calc( (100% - 50px) / 2 );
    margin-right: 34px;
    margin-bottom: 13px;
    &:after{
        content: "";
        display: none;
        width: 69px;
        height: 66px;
        background-image: url(/images/biz/B06250401/hover_portfolio.png);
        background-size: cover;
        background-position: top;
        position: absolute;
        right: -15px;
        bottom: -14px !important;
        opacity: 0;
        transform: scale(0.5) translateY(100px);
    }
    &:nth-child(2n){
        margin-right: 0;
    }
    &:nth-child(6n) , &:nth-child(6n+5){
        margin-bottom: 0;
    }
    &.hasHover{
        cursor: pointer;
        &:hover{
            &::after{
                display: block;
                opacity: 1;
                transform: scale(0) translateY(100px);
                animation: jumpIn 0.6s ease-out forwards;
            }
            span{
                overflow: hidden;
                img{
                    transform:scale(1.1);
                }
            }
        }
    }
}
.list_span{
    display: inline-block;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: solid 3px #333333;
    box-sizing: border-box;
    height: 265px;
    width: 100%;
}
.list_img{
    width: 100%;
    object-fit: cover;
    height: 100%;
    transform:scale(1);
    transition: transform 0.3s ease-in-out;
}

.cp_listmark{
    text-align: center;
    margin-top: 30px;
}
.cp_btn{
    display: inline-block;
    margin-right: 25px;
    opacity: 1;
    transition: all .3s;
    color: #ffffff;
    width: 32px;
    height: 32px;
    background-image: url(/images/biz/B06250401/button_off.png);
    background-size: cover;
    background-position: top;
    &:last-child{
        margin-right: 0;
    }
    &:hover{
        opacity: 0.8;
    }
    &.active , &:active{
        cursor: initial;
        color: #333333;
        background-image: url(/images/biz/B06250401/button_on.png);
        &:hover{
            opacity: 1;
        }
    }
}

@media (max-width:570px) {
    .c_contain{
        margin: 0 65px;
        margin-right: 51px;
    }
}

@media (max-width:500px) {
    .c_portfolio{
        &:before{
            width: 232px;
            height: 524px;
            left: -12px;
            bottom: 64px;
        }
    }
    .cp_title{
        margin-right: 29px;
        margin-bottom: 30px;
    }
    .c_contain{
        margin: 0 34px;
        margin-right: 20px;
    }
    .cp_list a{
        &::after{
            width: 56px;
            height: 54px;
            background-image: url('/images/biz/B06250401/hover_portfolio_phone.png');
        }
    }
    .list_span{
        height: 230px;
    }
    .cp_listmark{
        margin-right: 14px;
        margin-top: 20px;
    }
}

@media (max-width:430px) {
    .cp_list a span {
        height: 200px;
    }
}

@media (max-width:375px) {
    .cp_list a span {
        height: 186px;
    }
}

@media (max-width:345px) {
    .cp_list a span {
        height: 160px;
    }
    .c_portfolio:before {
        bottom: 30px;
    }
}

// 輪播套件
.portfolioSwiper {
    width: 100%;
    height: auto;
}

:global(.swiperFor_b06250401 .swiper-pagination){
    position: initial;
    margin-top: 30px;
    width: calc(100% - 14px);
}

:global(.swiperFor_b06250401 .swiper-pagination-bullet){
    transition: all .3s;
    color: #ffffff;
    width: 32px;
    height: 33px;
    background-image: url(/images/biz/B06250401/button_off.svg);
    background-size: cover;
    background-position: top;
    background-color: transparent;
    margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 15px) !important;
    border-radius: var(--swiper-pagination-bullet-border-radius, initial);
    opacity: var(--swiper-pagination-bullet-inactive-opacity, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:hover{
        opacity: 0.8;
    }
}

:global(.swiperFor_b06250401 .swiper-pagination-bullet.swiper-pagination-bullet-active){
    cursor: initial;
    color: #333333;
    background-image: url(/images/biz/B06250401/button_on.svg);
    &:hover{
        opacity: 1;
    }
}

</style>
