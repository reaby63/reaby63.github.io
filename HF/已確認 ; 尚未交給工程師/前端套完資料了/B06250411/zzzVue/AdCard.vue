<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';
import { useCommonStore } from '@/stores/common';
import { watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// 套資料-----
const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    },
    modelValue: {
        type: Boolean,
        required: true
    }
});
const commonStore = useCommonStore();
const curPageData = computed(() => props.userInfo?.pageData || {});
const webID = computed(() => props.userInfo?.webID || '');
const adInfoList = computed(() => curPageData.value.adList || []);

const emits = defineEmits(['update:modelValue']);

function close() {
    emits('update:modelValue', false);
}

// 輪播套件
const modules = [Navigation];

// 輪播~~~
// const imgNum = ref(0); // 也是圖片和頁籤的共同參數
// const carouselBox = ref(null); //先準備一個容器 等到vue建立好DOM後再幫我塞進去

// // 設定往右滑動
// const clickRight = () => {
//     if (imgNum.value < adInfoList.value.length - 1) {
//         return imgNum.value += 1;
//     }

//     if (imgNum.value = adInfoList.value.length - 1) {
//         return imgNum.value = 0;
//     }
// };

// // 設定往左滑動
// const clickLeft = () => {
//     // if(A條件,B條件) => 只會吃到B條件
//     if (imgNum.value > 0) {
//         return imgNum.value -= 1;
//     }

//     if (imgNum.value = adInfoList.value.length) {
//         return imgNum.value = adInfoList.value.length - 1;
//     }
// };

// // 彈窗關閉後 將目前圖片順序imgNum重整
// watch(() => props.modelValue, (newVal) => { // 當modelValue是true時執行以下動作(watch預設不會馬上執行 所以等他從true 變化時 才會執行哦!)
//     if (newVal) {
//         imgNum.value = 0; // 承上 所以這邊是 當true->false時執行! (如果要false->true執行咚咚 就要if (oldVal === false && newVal === true))
//     }
//     // 如果要做彈窗關閉後的事情 這邊寫else{...}
//     // 如果要一true就做事情 加這行{ immediate: true }
// });

</script>

<template>
    <teleport to="body">
        <div v-if="modelValue" class="ad_modal_overlay" @click.self="close">
            <div class="ad_modal_content">
                <button @click="close" class="close">
                    <img src="/images/biz/B06250401/cross_btn.svg" alt="">
                </button>
                <div class="scrollBar_y">
                    <Swiper
                    :navigation="true"
                    :modules="modules"
                    class="adSwiper"
                    >
                        <SwiperSlide
                        v-for="(ad, index) in adInfoList"
                        :key="ad.id"
                        class="adc_self"
                        >
                            <div class="adc_img_box" v-if="adInfoList.length">
                                <div class="adc_img">
                                    <img :src="commonStore.getImg(webID, ad.adImage[0])">
                                </div>
                                <button class="arrow arrow_left" @click="clickLeft" v-if="adInfoList.length - 1">
                                    <span></span>
                                </button>
                                <button class="arrow arrow_right" @click="clickRight" v-if="adInfoList.length - 1">
                                    <span></span>
                                </button>
                            </div>
                            <div class="adc_title" v-if="ad.adTitle">
                                {{ad.adTitle}}
                            </div>
                            <div class="adc_content" v-html="ad.adContent" v-if="ad.adContent"></div>
                            <div class="adc_date" v-if="ad.adYear || ad.adDate">
                                {{ad.adYear}}/{{ad.adDate}}
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <!-- <div class="carousel">
                        <div class="carousel_img">
                            <div
                            class="carousel_img_scroll"
                            ref="carouselBox"
                            :style="{transform : `translateX(-${imgNum * 100}%)`}"
                            >
                                <div
                                ref="carouselImg"
                                v-for="(ad, index) in adInfoList"
                                :key="ad.id"
                                class="adc_self"
                                >
                                    <div class="adc_img_box" v-if="adInfoList.length">
                                        <div class="adc_img">
                                            <img :src="commonStore.getImg(webID, ad.adImage[0])">
                                        </div>
                                        <button class="arrow arrow_left" @click="clickLeft" v-if="adInfoList.length - 1">
                                            <span></span>
                                        </button>
                                        <button class="arrow arrow_right" @click="clickRight" v-if="adInfoList.length - 1">
                                            <span></span>
                                        </button>
                                    </div>
                                    <div class="adc_title" v-if="ad.adTitle">
                                        {{ad.adTitle}}
                                    </div>
                                    <div class="adc_content" v-html="ad.adContent" v-if="ad.adContent"></div>
                                    <div class="adc_date" v-if="ad.adYear && ad.adDate">
                                        {{ad.adYear}}/{{ad.adDate}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </teleport>
</template>

<style lang="scss">
@import "../scss/all.scss";
.ad_modal_overlay {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    width: 100%;
    height: 100%;
}

.ad_modal_content {
    background: white;
    // padding: 76px 35px;
    padding: 5.5vw 2.5vw;
    border-radius: 8px;
    width: 70vw;
    max-width: 640px;
    height: 66%;
    position: relative;
    img{
        width: 100%;
    }
    .close{
        padding: 0;
        position: absolute;
        top: 20px;
        right: 20px;
        transition: all 0.3s;
        z-index: 9;
        &:hover{
            opacity: 0.8;
        }
    }
    .carousel{
        position: relative;
        overflow: hidden;
        .carousel_img{
            .carousel_img_scroll{
                display: flex;
                width: 100%;
                transition: transform 0.5s ease;
                .adc_self{
                    width: 100%;
                    flex: 0 0 100%;
                    flex-wrap: wrap;
                    .adc_img_box{
                        position: relative;
                    }
                    .adc_img{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        // height: 279.46px;
                        overflow: hidden;
                        margin: 0px 41px;
                    }
                    .arrow{
                        position: absolute;
                        bottom: calc(50% - 15px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s;
                        span{
                            width: 15px;
                            height: 30px;
                            -webkit-mask: url('/public/images/biz/B06250401/ad_arrow.svg') no-repeat center;
                            -webkit-mask-size: cover;
                            mask: url('/public/images/biz/B06250401/ad_arrow.svg') no-repeat center;
                            mask-size: cover;
                            background-color: #221D1A;
                        }
                        &:hover{
                            opacity: 0.8;
                        }
                    }
                    .arrow_left{
                        left: 0px;
                        transform: scaleX(-1);
                    }
                    .arrow_right{
                        right: 0px;
                    }
                    img{
                        width: 100%;
                        object-fit: cover;
                        height: 100%;
                        // animation: imgIn 4s ease-in-out forwards;
                    }
                    .adc_title{
                        font-weight: 600;
                        font-size: 20px;
                        letter-spacing: 0.5px;
                        margin: 32px 41px;
                        margin-bottom: 8px;
                        line-height: 27px;
                    }
                    .adc_content{
                        margin: 0px 41px;
                        margin-top: 22px;
                        line-height: 28px;
                        letter-spacing: 2px;
                        color: #221D1AB2;
                        font-weight: 400;
                        margin-bottom: 20px;
                    }
                    .adc_date{
                        color: #1E1E1ECC;
                        font-weight: 600;
                        margin-bottom: 30px;
                        letter-spacing: 1px;
                        margin: 0px 41px;
                    }
                }
            }
        }
        .carousel_btn{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 8px;
            button{
                width: 22px;
                height: 20px;
                display: block;
                position: relative;
                &::before{
                    content: "";
                    display: block;
                    width: 11px;
                    height: 4px;
                    background-color: #221D1A26;
                    border-radius: 100px;
                    margin: 0px 5px;
                    transition: all 0.3s;
                    position: absolute;
                    top: 9px;
                    left: 1px;
                }
                &:hover{
                    opacity: 0.8;
                }
                &.active{
                    cursor: initial;
                    &::before{
                        content: "";
                        background-color: #A39689;
                        width: 15px;
                        height: 6px;
                        left: -1px;
                        top: 8px;
                    }
                    &:hover{
                        opacity: 1;
                    }
                }
            }
        }
    }
}

// 輪播
.adSwiper{
    .swiper-wrapper{
        align-items: center;
    }
    .swiper-button-prev, .swiper-button-next{
        background-image: url(/images/biz/B06250401/ad_arrow.svg);
        background-size: cover;
        background-position: top;
        width: 15px;
        height: 30px;
        color: transparent;
        top: calc(21vw);
    }
    .swiper-button-next{
        right: 0;
    }
    .swiper-button-prev{
        left: 0;
        transform: rotate(180deg);
    }
    .adc_img{
        // margin: 0 41px;
        margin: 0 3vw;
        line-height: 0;
        height: 42vw;
        img{
            width: 100%;
            object-fit: cover;
            height: 100%;
        }
    }
    .adc_title{
        font-weight: 600;
        font-size: 20px;
        letter-spacing: 0.5px;
        margin: 32px 3vw;
        margin-bottom: 8px;
        line-height: 27px;
    }
    .adc_content{
        margin: 0px 3vw;
        margin-top: 22px;
        line-height: 28px;
        letter-spacing: 2px;
        color: #221D1AB2;
        font-weight: 400;
        margin-bottom: 20px;
        word-break: break-word;
    }
    .adc_date{
        color: #1E1E1ECC;
        font-weight: 600;
        margin-bottom: 30px;
        letter-spacing: 1px;
        margin: 0px 3vw;
    }
}

@media (max-width:770px) {
    .adSwiper .adc_img{
        height: 68vw;
    }
    .adSwiper{
        .swiper-button-prev, .swiper-button-next{
            top: 34vw;
        }
    }
}

@media (max-width:670px) {
    .ad_modal_content{
        padding: 10vw 7vw;
        width: 72vw;
    }

    .adSwiper .adc_img{
        margin: 0 6vw;
        height: 62vw;
    }

    .adSwiper{
        .swiper-button-prev, .swiper-button-next{
            top: 31vw;
        }
    }
}

@media(max-width:400px){
    .ad_modal_content{
        padding: 15vw 7vw;
    }
}

</style>
