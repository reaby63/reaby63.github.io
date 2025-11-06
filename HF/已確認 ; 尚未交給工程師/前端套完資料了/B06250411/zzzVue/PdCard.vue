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
    visible: { // 是否顯示彈跳窗 都點開了一定是先true
        type: Boolean,
        required: true
    },
    data: { // (這裡的data就是Portfolio.vue內的item哦)
        type: Object,
        required: true
    }
});
const commonStore = useCommonStore();
const curPageData = computed(() => props.userInfo?.pageData || {});
const webID = computed(() => props.userInfo?.webID || '');
const pdInfoList = computed(() => props.data.image || []);

const emits = defineEmits(['update:visible']);
const productList = computed(() => props.imageList || []);

function close() {
    emits('update:visible', false);
}

// 輪播套件
const modules = [Navigation];

// 彈窗關閉後 將目前圖片順序imgNum重整
// watch(() => props.visible, (newVal) => {
//     if (newVal) {
//         imgNum.value = 0;
//     }
// });

</script>

<template>
    <teleport to="body">
        <!-- <div v-if="visible" class="pd_modal_overlay">
            <div class="pd_modal_content">
                <p>我是彈窗</p>
                <button @click="close" class="close">
                    關閉
                </button>
            </div>
        </div> -->
        <div v-if="visible" class="pd_modal_overlay" @click.self="close">
            <div class="pd_modal_content">
                <button @click="close" class="close">
                    <img src="/images/biz/B06250401/cross_btn.svg" alt="">
                </button>
                <div class="scrollBar_y">
                    <Swiper
                    :navigation="true"
                    :modules="modules"
                    class="pdSwiper"
                    v-if="data.image"
                    >
                        <SwiperSlide
                        v-for="(img, index) in data.image"
                        :key="img"
                        class="pd_img_box"
                        >
                            <div class="pd_img">
                                <img :src="commonStore.getImg(webID, img)"/>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <!-- <div class="carousel" v-if="data.image">
                        <div class="carousel_img">
                            <div
                            class="carousel_img_scroll"
                            ref="carouselBox"
                            :style="{transform : `translateX(-${imgNum * 100}%)`}"
                            >
                                <div
                                v-for="(img, index) in data.image"
                                :key="img"
                                class="pd_img_box"
                                >
                                    <div class="pd_img">
                                        <img :src="commonStore.getImg(webID, img)"/>
                                    </div>
                                    <button class="arrow arrow_left" @click="clickLeft" v-if="data.image.length - 1">
                                        <span></span>
                                    </button>
                                    <button class="arrow arrow_right" @click="clickRight" v-if="data.image.length - 1">
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <p
                    v-html="data.foreword"
                    class="pd_text"
                    v-if="data.foreword"
                    ></p>
                    <div class="pd_date" v-if="data.pdDate">
                        {{data.pdDate}}
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style lang="scss">
@import "../scss/all.scss";
.pd_modal_overlay {
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

.pd_modal_content {
    background: white;
    // padding: 76px 35px;
    padding: 5.5vw 2.5vw;
    border-radius: 8px;
    width: 70vw;
    max-width: 640px;
    position: relative;
    height: 84%;
    box-sizing: border-box;
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
        img{
            width: 20px;
            height: 20px;
        }
        &:hover{
            opacity: 0.8;
        }
    }
    .pd_title{
        margin-bottom: 30px;
        text-align: center;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 4px;
        overflow-wrap: break-word;
        word-break: break-word;
        word-wrap: break-word;
    }
    .carousel{
        position: relative;
        overflow: hidden;
        .carousel_img{
            .carousel_img_scroll{
                display: flex;
                width: 100%;
                transition: transform 0.5s ease;
                .pd_img_box{
                    width: 100%;
                    flex: 0 0 100%;
                    flex-wrap: wrap;
                    position: relative;
                }
                .pd_img{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 530px;
                    overflow: hidden;
                    margin: 0px 41px;
                    img{
                        width: 100%;
                        object-fit: cover;
                        height: 100%;
                        // animation: imgIn 4s ease-in-out forwards;
                    }
                }
                .arrow{
                    position: absolute;
                    bottom: calc(50% - 15px);
                    transition: all 0.3s;
                    span{
                        width: 15px;
                        height: 30px;
                        -webkit-mask: url('/public/images/biz/B06250401/ad_arrow.svg') no-repeat center;
                        -webkit-mask-size: cover;
                        mask: url('/public/images/biz/B06250401/ad_arrow.svg') no-repeat center;
                        mask-size: cover;
                        background-color: #1E1E1E;
                        display: block;
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
            }
        }
        .carousel_btn{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 15px;
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
    .pd_text{
        color: #1E1E1ECC;
        font-size: 15px;
        font-weight: 330;
        letter-spacing: 0.5px;
        line-height: 1.8em;
        margin: 0px 41px;
        margin-top: 32px;
        overflow-wrap: break-word;
        word-break: break-word;
        word-wrap: break-word;
    }
    .pd_date{
        margin: 0px 41px;
        margin-top: 20px;
        font-weight: 600;
        color: #1E1E1ECC;
        font-size: 15px;
        line-height: 1.8em;
        letter-spacing: 0.5px;
    }
}

// 輪播
.pdSwiper{
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
    }
    .swiper-button-next{
        right: 0;
    }
    .swiper-button-prev{
        left: 0;
        transform: rotate(180deg);
    }
    .pd_img{
        // margin: 0 41px;
        margin: 0 3vw;
        border-radius: 20px;
        overflow: hidden;
        line-height: 0;
        height: 30vw;
        img{
            width: 100%;
            object-fit: cover;
            height: 100%;
        }
    }
}

@media (max-width:670px) {
    .pd_modal_content{
        padding: 10vw 7vw;
        width: 95vw;
    }

    .pdSwiper .pd_img{
        margin: 0 6vw;
        height: 46vw;
    }
}

@media(max-width:400px){
    .pd_modal_content{
        padding: 15vw 7vw;
    }
}

</style>
