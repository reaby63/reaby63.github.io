<script setup>
import { ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const modules = [Navigation];

// 套資料
const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    },
    list: {
        type: Array,
        required: true,
        validator: (value) => Object.keys(value).every(key => ['key', 'account', 'link'].includes(key))
    },
    previewCount: {
        type: Number,
        default: 4
    },
    imgColor: {
        type: String,
        default: '#ffffff'
    },
    imgBgColor: {
        type: String,
        default: '#05438B'
    }
});

const commonStore = useCommonStore();
const curPageData = computed(() => props.userInfo?.pageData || {});
const webID = computed(() => props.userInfo?.webID || '');

// 社群元件套件
const prevRef = ref(null);
const nextRef = ref(null);

function goPage(item) {
    window.open(item.link, 'community');
}

// 聯絡資訊連結
const openPhone = () => {
    window.location.href = `tel:${curPageData.value.basic.info.phone}`;
};

const openMail = () => {
    window.location.href = `mailto:${curPageData.value.basic.info.email}`;
};

const openUrl = () => {
    window.open(curPageData.value.basic.info.url, '_blank');
};

// 社群 開分頁
const openLink = (url) => {
    if (url) {
        window.open(url, '_blank');
    }
};

// 社群--- 用數量
const socialMove = ref(null);
const socialPosition = ref(0);

const movePosition = () => {
    // return window.innerWidth <= 430 ? 43 : 50;
    if (window.innerWidth <= 430) {
        return 43;
    } else {
        return 50;
    }
};

const clickRight = () => {
    socialPosition.value -= movePosition();
    if (socialMove.value) {
        socialMove.value.style.transition = 'transform 0.3s ease-in-out';
    }
};

const clickLeft = () => {
    socialPosition.value += movePosition();
    if (socialMove.value) {
        socialMove.value.style.transition = 'transform 0.3s ease-in-out';
    }
};

</script>

<template>
    <div :class="$style.c_contact">
        <div
        :class="$style.c_contact_title"
        v-if="curPageData.basic.info.phone || curPageData.basic.info.mobile || curPageData.basic.info.email || curPageData.basic.info.url"
        >
            <div :class="$style.c_title">
                關注我<span :class="$style.ct_en">Follow Me</span>
            </div>
        </div>
        <div :class="$style.c_contain">
            <ul :class="$style.ul">
                <li :class="$style.li" v-if="curPageData.basic.info.phone || curPageData.basic.info.mobile">
                    <span>
                        <img src="/images/biz/B06250401/phone.svg" alt="">
                    </span>
                    <span>
                        <!-- <a :href="`tel:${curPageData.basic.info.phone}`" title="撥打電話">
                             {{ curPageData.basic.info.phone }}
                        </a> -->
                        <div
                            :class="$style.a_link"
                            title="撥打電話"
                            @click="openPhone"
                        >
                            <!-- 0984888212 -->
                            {{ curPageData.basic.info.phone || curPageData.basic.info.mobile}}
                        </div>
                    </span>
                </li>
                <li :class="$style.li" v-if="curPageData.basic.info.email">
                    <span>
                        <img src="/images/biz/B06250401/mail.svg" alt="">
                    </span>
                    <span>
                        <!-- <a :href="`mailto:${curPageData.basic.info.email}`" title="前往寄信">
                            {{ curPageData.basic.info.email }}
                        </a> -->
                        <div
                            :class="$style.a_link"
                            title="前往寄信"
                            @click="openMail"
                        >
                            <!-- woofwoof33@gmail.com -->
                            {{ curPageData.basic.info.email }}
                        </div>
                    </span>
                </li>
                <li :class="$style.li" v-if="curPageData.basic.info.url">
                    <span>
                        <img src="/images/biz/B06250401/web.svg" alt="">
                    </span>
                    <span>
                        <div
                            :class="$style.a_link"
                            title="前往網站"
                            @click="openUrl"
                        >
                            <!-- www.woooof.com.tw -->
                            {{ curPageData.basic.info.url }}
                        </div>
                    </span>
                </li>
            </ul>
            <!-- <div :class="$style.social_box">
                <span :class="$style.social">
                    <button :class="$style.arrow_l_bt" @click="clickLeft">
                        <img src="/images/biz/B06250401/arrow-l.svg" alt="" :class="$style.web_block">
                        <img src="/images/biz/B06250401/arrow-l-phone.svg" alt="" :class="$style.phone_block">
                    </button>
                    <span :class="$style.social_icon_box">
                        <span
                        :class="$style.social_icon"
                        :style = "{transform: `translateX(${socialPosition}px)`}"
                        ref="socialMove"
                        >
                            <div
                            v-for="(item, index) in curPageData.community"
                            :class="$style.social_self"
                            :key="index"
                            @click="openLink(item.link)"
                            ref="socialLinks"
                            >
                                <img :src="commonStore.getImg(webID, item.image?.[0])">
                            </div>
                        </span>
                    </span>
                    <button :class="$style.arrow_r_bt" @click="clickRight">
                        <img src="/images/biz/B06250401/arrow-r.svg" alt="" :class="$style.web_block">
                        <img src="/images/biz/B06250401/arrow-r-phone.svg" alt="" :class="$style.phone_block">
                    </button>
                </span>
            </div> -->
            <div v-if="curPageData.community.length" :class="$style['community-wrap']">
                <div ref="prevRef" :class="$style['swiper-prev']">
                    <img src="/images/biz/B06250401/social_arrow.svg" alt="">
                </div>
                    <Swiper
                        :class="$style['community-swiper-wrap']"
                        :modules="modules"
                        :slidesPerView="previewCount"
                        :navigation="{
                            prevEl: prevRef,
                            nextEl: nextRef
                        }"
                    >
                        <SwiperSlide v-for="(item, index) in curPageData.community" :key="index">
                            <div
                                :class="$style['community-item']"
                                :style="{
                                    'background-color': imgBgColor
                                }"
                                @click="goPage(item)"
                            >
                                <div
                                    :class="[$style['item-img'], $style[`is-${item.key}`]]"
                                    :style="{
                                        'background-color': imgColor
                                    }"
                                />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                <div ref="nextRef" :class="$style['swiper-next']">
                    <img src="/images/biz/B06250401/social_arrow.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@import "../scss/all.scss";
@import "../scss/animate.scss";

button {
  cursor: pointer;
  background-color: transparent;
  border: 0px;
}

ul,li{
    padding: 0;
    margin: 0;
}

.c_contact{
    z-index: 1;
    position: relative;
    margin-top: 80px;
}
.c_contact_title{
    position: relative;
    height: 163px;
    &::before{
        content: "";
        display: block;
        position: absolute;
        bottom: 0px;
        right: 382px;
        width: 92px;
        height: 75px;
        background-image: url(/images/biz/B06250401/contact_cat.png);
        background-size: cover;
        background-position: top;
        z-index: 0;
    }
    &::after{
        content: "";
        display: block;
        position: absolute;
        top: 0px;
        right: 45.72px;
        width: 320px;
        height: 147px;
        background-image: url(/images/biz/B06250401/contact_bubble.png);
        background-size: cover;
        background-position: top;
        z-index: 0;
    }
}
.c_title{
    margin-bottom: 18px;
    position: absolute;
    top: 60px;
    right: 76px;
    z-index: 3;
}

.c_contain{
    margin-bottom: 76px;
}
.ul{
    margin: 0px 76px;
    .li{
        display: flex;
        align-items: center;
        background-color: #ffffff;
        border-radius: 20px;
        padding: 10px 35px;
        padding-left: 50px;
        margin-bottom: 12px;
        &:last-child{
            margin-bottom: 20px;
        }
        span{
            display: inline-block;
            vertical-align: top;
            line-height: 1em;
            &:first-child{
                width: 25px;
                text-align: center;
                margin-right: 15px;
                position: relative;
                top: 1px;
            }
            &:last-child{
                width: calc( 100% - 25px - 15px );
                .a_link , a{
                    color: #333333;
                    letter-spacing: 1px;
                    line-height: 1em;
                    word-break: break-word;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    white-space: normal;
                    cursor: pointer;
                }
            }
        }
    }
}

// .social_box{
//     display: flex;
//     align-items: center;
//     margin-left: 76px;
//     .social{
//         display: inline-flex;
//         align-items: center;
//         button{
//             padding: 5px;
//             transition: all .2s;
//             &:hover{
//                 opacity: 0.8;
//             }
//             img{
//                 width: 9px;
//                 height: 13px;
//             }
//             &.arrow_l_bt , &.arrow_r_bt{
//                 border:solid 2px #ffffff;
//                 border-radius: 50%;
//                 width: 30px;
//                 height: 30px;
//             }
//             &.arrow_l_bt{
//                 margin-right: 25px;
//                 margin-left: 20px;
//                 img{
//                     position: relative;
//                 }
//             }
//             &.arrow_r_bt{
//                 margin-left: 20px;
//                 img{
//                     position: relative;
//                     right: -1px;
//                 }
//             }
//             &.btn_fin{
//                 cursor: initial;
//                 opacity: 0.7;
//             }
//         }
//         .social_icon_box{
//             overflow: hidden;
//             width: 190px;
//             .social_icon{
//                 display: flex;
//                 height: 35px;
//                 align-items: center;
//             }
//         }
//         .social_self{
//             display: inline-flex;
//             align-items: center;
//             justify-content: center;
//             width: 35px;
//             height: 35px;
//             flex: 0 0 35px; /* 每個 icon 固定寬度 */
//             transition: transform 0.3s ease-in-out;
//             border-radius: 50%;
//             background-color: #05438B;
//             margin-right: 15px;
//             transition: all .2s;
//             cursor: pointer;
//             &:hover{
//                 opacity: 0.7;
//             }
//             img{
//                 width: 20px;
//                 height: 20px;
//             }
//         }
//     }
// }

// 社群套件
.community-wrap {
    width: 295px;
    display: flex;
    align-items: center;
    margin-left: 96px;
}

.arrow-btn {
    display: block;
    width: 9px;
    height: 15px;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }

    &:global(.swiper-button-disabled) {
        opacity: 0.7;
        cursor: initial;
    }
}

.swiper-prev {
    composes: arrow-btn;
    // background: url('/images/components/community/arrow-l.svg') 50% 0 no-repeat;
    width: 30px;
    height: 30px;
    border: solid 2px #ffffff;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-sizing: border-box;
    img{
        position: relative;
        left: 0.8px;
    }
}

.community-swiper-wrap {
    width: calc(100% - 60px - 35px);
}

.community-item {
    box-sizing: border-box;
    width: 35px;
    height: 35px;
    margin: 0 auto;
    padding: 6px;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.8;
    }
}

.item-img {
    display: block;
    width: 20px;
    height: 20px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    position: relative;
    transition: all 0.2s;
    &.is-ig {
        // mask-image: url('/images/components/community/ig.svg')
        mask-image: url('/images/biz/B06250401/ig.svg')
    }

    &.is-fb {
        mask-image: url('/images/biz/B06250401/fb.svg')
    }

    &.is-line {
        mask-image: url('/images/biz/B06250401/line.svg')
    }

    &.is-threads {
        mask-image: url('/images/biz/B06250401/threads.svg')
    }

    &.is-openAir {
        width: 16px;
        mask-image: url('/images/components/community/openAir.svg')
    }

    &.is-tikTok {
        width: 16px;
        mask-image: url('/images/components/community/tikTok.svg')
    }

    &.is-youtube {
        width: 16px;
        mask-image: url('/images/components/community/youtube.svg')
    }

    &.is-shopee {
        width: 16px;
        mask-image: url('/images/components/community/shopee.svg')
    }
}

.swiper-next {
    composes: arrow-btn;
    // background: url('/images/components/community/arrow-r.svg') 50% 0 no-repeat;
    width: 30px;
    height: 30px;
    border: solid 2px #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-sizing: border-box;
    img{
        position: relative;
        left: 0.6px;
    }
}

@media (max-width:570px) {
    .ul{
        margin: 0px 35px;
    }
    .social_box{
        margin-left: 35px;
    }
    .community-wrap{
        margin-left: 45px;
    }
}

@media (max-width:520px) {
    .c_contact_title::after{
        right: 25.72px;
    }
    .c_contact_title::before{
        right: 362px;
    }
}

@media (max-width:500px) {
    .c_contact{
        margin-top: 10px;
    }
    .c_contain{
        margin-bottom: 65px;
    }
    .c_contact_title{
        height: 192px;
        &::after{
            right: -18px;
        }
        &::before{
            right: 312px;
        }
    }
    .c_title{
        right: 35px;
        top: 66px;
    }
    .ul{
        margin: 0px 37px;
        .li{
            padding: 8.5px 15px;
            span{
                &:last-child{
                    width: calc(100% - 25px - 15px - 21px);
                }
            }
        }
    }
    .community-wrap{
        margin-left: 47px;
        height: 36px;
    }
}

@media (max-width:450px) {
    .c_contact_title::after {
        width: 240px;
        height: 167px;
        right: 0;
        background-image: url('/images/biz/B06250401/contact_bubble_phone.png');
    }
    .c_contact_title::before {
        right: 250px;
    }
}

@media (max-width:430px) {
    .social_box{
        margin-left: 37px;
        margin-right: 75px;
        justify-content: center;
        .social{
            justify-content: space-between;
            width: 100%;
            .social_icon_box{
                width: 169px;
            }
            button{
                img{
                    width: 8px;
                    height: 10px;
                    position: relative;
                    top: -0.5px;
                    left: 0 !important;
                }
            }
            button.arrow_l_bt , button.arrow_r_bt{
                width: 22px;
                height: 22px;
            }
            button.arrow_l_bt{
                margin-right: 5.5px;
                margin-left: 10px;
            }
            button.arrow_r_bt{
                margin-left: 0px;
                margin-right: 10px;
            }
            a{
                margin-right: 8px;
            }
        }
        .web_block{
            display: none;
        }
        .phone_block{
            display: block;
        }
    }

    .community-swiper-wrap{
        width: calc(100% - 60px - 10px);
    }
    .community-wrap{
        width: 230px;
    }
    .swiper-prev , .swiper-next{
        width: 22px;
        height: 22px;
    }
}

@media (max-width:390px) {
    .c_contact_title{
        height: 193px;
    }
     .c_contact_title::before {
        right: 251px;
        width: 75px;
        height: 55px;
    }
    .c_title {
        right: 20px;
        top: 66px;
    }
}

@media (max-width:375px) {
    .c_contact_title{
        &::before{
            right: 214px;
        }
        &::after{
            right: -27px;
        }
    }
    .c_title{
        right: 20px;
    }
    .ul{
        margin: 0px 20px;
    }
    .arrow_l_bt{
        margin-left: 0;
        margin-right: 10px;
    }
    .arrow_r_bt{
        margin-left: 5px;
    }
    .community-wrap{
        margin-left: 30px;
    }
    .community-swiper-wrap{
        width: calc(100% - 60px);
    }
    .community-wrap{
        width: 220px;
    }
}

@media (max-width:345px) {
    .social_box{
        margin-left: 25px;
    }
    .arrow_r_bt{
        margin-right: 5px;
    }
}

@media (max-width:330px) {
    .social_box{
        margin-left: 20px;
    }
    .arrow_r_bt{
        margin-right: 0;
    }
}

@media (max-width:321px) {
    .c_contact_title::before {
        right: 210px;
    }
}

</style>
