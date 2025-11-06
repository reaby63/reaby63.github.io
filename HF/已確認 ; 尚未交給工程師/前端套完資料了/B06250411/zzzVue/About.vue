<script setup>
import { ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';

// 套資料
const props = defineProps({
    userInfo: {
        type: Object,
        required: true
    }
});
const commonStore = useCommonStore();
const curPageData = computed(() => props.userInfo?.pageData || {});
const webID = computed(() => props.userInfo?.webID || '');

</script>
<template>
    <div
    :class="[$style.reset,$style.c_info]"
    v-if="
        curPageData.introduce.profession ||
        curPageData.introduce.name ||
        curPageData.introduce.resume"
    >
        <div :class="$style.ci_title">
            <div :class="$style.c_title">
                關於我<span :class="$style.ct_en">About Me</span>
            </div>
        </div>
        <div :class="$style.c_info_box">
            <div :class="$style.c_info_left" v-if="webID, curPageData.basic.image?.[0]">
                <div :class="$style.ci_img">
                     <!-- // 取得圖片網址：用網站 ID 和圖片檔名組合成 webID/image0.jpg -->
                    <img :src="commonStore.getImg(webID, curPageData.basic.image[0])" alt="">
                </div>
            </div>
            <div :class="$style.c_info_right">
                <div :class="$style.ci_tag" v-if="curPageData.introduce.profession">
                    <!-- 專業彩妝師 -->
                    {{ curPageData.introduce.profession }}
                </div>
                <div :class="$style.ci_name" v-if="curPageData.introduce.name">
                    <!-- Mia 咪亞 -->
                     {{ curPageData.introduce.name }}
                </div>
                <div :class="$style.ci_content" v-if="curPageData.introduce.resume">
                    <!-- 嗨，我是 Mia，專業彩妝師，擅長打造可愛風格妝容。熱愛用色彩與妝感展現每個人的獨特魅力，讓你在日常或特別場合中，自信閃耀、甜美動人！ -->
                    {{ curPageData.introduce.resume }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@import "../scss/all.scss";
@import "../scss/animate.scss";

.c_info{
    margin-left: 55px;
    margin-top: 39px;
    position: relative;
    margin-bottom: 10px;
    &::before{
        content: "";
        display: block;
        width: 452px;
        height: 619px;
        background-image: url('/images/biz/B06250401/info_bg.png');
        background-size: cover;
        background-position: top;
        position: absolute;
        top: -86px;
        right: 0px;
        z-index: 0;
    }
    &::after{
        content: "";
        display: block;
        width: 96px;
        height: 164px;
        background-image: url('/images/biz/B06250401/info_bg_cat.png');
        background-size: cover;
        background-position: top;
        position: absolute;
        left: -55px;
        bottom: -136px;
    }
}

.ci_title{
    margin-left: 21px;
    margin-bottom: 41px;
    z-index: 1;
    position: relative;
}
.c_title{
    color: #ffffff;
    border-color: #ffffff;
}

.c_info_box{
    z-index: 1;
    position: relative;
    margin-right: 76px;
    display: flex;
    justify-content: end;
    // transform: translateY(100px); //動畫
}
.c_info_right , .c_info_left{
    display: inline-block;
    vertical-align: top;
}
.ci_img{
    width: 205px;
    height: 205px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: solid 3px #333333;
    box-sizing: border-box;
    img{
        height: 100%;
        object-fit: cover;
    }
}

.c_info_left{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
}

.c_info_right{
    width: calc( 100% - 205px + 24px );
    margin-top: 46px;
}
.ci_tag{
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 2px;
    color: #333333;
    margin-left: 43px;
    margin-bottom: 5px;
    overflow-wrap: break-word;
}
.ci_name{
    background-color: #58a1f4;
    color: #fff;
    border-radius: 0 35px 35px 0;
    border: solid 2px #333333;
    padding: 14px 44px 13px;
    font-size: 20px;
    letter-spacing: 2px;
    margin-bottom: 22px;
    overflow-wrap: break-word;
}
.ci_content{
    margin-left: 43px;
    text-align: justify;
    line-height: 1.8em;
    font-size: 16px;
    letter-spacing: 3px;
    color: #333333;
    min-height: 235px;
    overflow-wrap: break-word;
}

@media (max-width:570px) {
    .c_info{
        margin-left: 35px;
        &::after{
            left: -35px;
        }
    }
    .c_info_box{
        margin-right: 65px;
    }
}

@media (max-width:500px) {
    .c_info{
        margin-left: 24px;
        margin-top: 32px;
        margin-bottom: 0;
        &::before{
            top: 110px;
            background-image: url(/images/biz/B06250401/info_bg_phone.png);
            width: 267px;
            height: 507px;
        }
        &::after{
            height: 112px;
            width: 69px;
            left: -33px;
        }
    }
    .ci_title{
        margin-left: 0;
        margin-bottom: 30px;
    }
    .c_info_box{
        position: initial;
        display: block;
        margin-right: 24px;
        margin-bottom: 60px;
    }
    .c_info_left{
        position: relative;
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .c_info_right{
        width: 100%;
        position: relative;
        margin-top: 10px;
    }
    .ci_tag{
        margin-left: 0;
        text-align: center;
    }
    .ci_name{
        border-radius: 35px;
        padding: 15px;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
        margin-bottom: 20px;
    }
    .ci_content{
        margin-left: 8.5px;
        margin-right: 8.5px;
        min-height: auto;
        text-align: center;
    }
}

// 動畫~~
.c_info::before {
    opacity: 0;
}
.c_info::after {
    left: -152px;
    bottom: -186px;
}
.c_info{
    &::before {
        animation: jumpInHeight 1s ease-in-out forwards;
        animation-delay: 1.5s;
    }
    .ci_title {
        animation: fadeInSlideUp 1s ease-in-out forwards;
        animation-delay: 2s;
        opacity: 0;
    }
    .c_info_box {
        animation: jumpInOnly 1.5s ease-in-out forwards;
        animation-delay: 2.5s;
        opacity: 0;
    }
    &::after {
        animation: c_info_bluecat 1.5s ease-in-out forwards;
        animation-delay: 3s;
    }
}

</style>
