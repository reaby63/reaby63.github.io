<script setup>
import { useCssModule } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';

const $style = useCssModule();
const route = useRoute();
const commonStore = useCommonStore();

const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});
</script>
<template>
    <div :class="[$style.container, $style.c_photo_an]">
        <!-- <div :class="$style.c_photo">
            <button
                :class="[$style.focus_bt, { [$style.active]: curFollow }]"
                @click="onChange"
            >
                <span :class="$style.focus_bt_span">追蹤</span>
            </button>
        </div> -->
        <div :class="$style.c_photo_bg">
            <img src="/images/biz/B06250401/c_photo_bg.png">
        </div>
        <div :class="$style.c_photo_nice">
            <img :class="$style.cp_nice_web" src="/images/biz/B06250401/c_photo_nice.png">
            <img :class="$style.cp_nice_phone" src="/images/biz/B06250401/c_photo_nice_phone.png">
        </div>
        <div :class="$style.c_photo_words">
            Here’s<br>A Little About<br>What I Do.
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.focus_bt{
    background-color: rgba($color: #000000, $alpha: 0.6);
    border-radius: 25px;
    padding-top: 9px;
    padding-bottom: 12px;
    width: 110px;
    font-size: $font_size_S;
    color: #d2d7db;
    height: 40px;
    transition: all .2s;
    border: solid 1px #858585;
    letter-spacing: 0.5px;
    position: absolute;
    top: -10px;
    right: 25px;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover{
        background-color: #195498;
    }
    &::before{
        content: url('/images/biz/B06250401/heart-line.svg');
        display: inline-block;
        width: 20px;
        position: relative;
        top: 3.2px;
        margin-right: 12px;
    }
    &.active{
        &::before{
            content: url('/images/biz/B06250401/heart.svg');
            top: 2px;
        }
        span{
            &::before{
                content: "已";
            }
        }
    }
    &.focus_login{
        span{
            letter-spacing: 2px;
            position: relative;
            top: 2px;
            right: -2px;
        }
        &:before{
            content: "";
            display: none;
        }
    }
}

.focus_bt_span{
    position: relative;
    top: 2.5px;
}

.c_photo{
    margin-top: 28.5px;
    position: relative;
}

.c_photo_bg{
    width: 512px;
    height: 451px;
    img{
        width: 100%;
    }
}

.c_photo_nice{
    position: absolute;
    width: 320px;
    right: 35px;
    bottom: 107.5px;
    img{
        width: 100%;
        line-height: 0;
    }
}
.cp_nice_phone{
    display: none;
}

.c_photo_words{
    color: #ffffff;
    position: absolute;
    top: 106px;
    right: 35px;
    font-size: 20px;
    letter-spacing: 1px;
    text-align: right;
    font-family: "Nanum Pen Script", cursive , sans-serif ;
    line-height: 25px;
}

// 動態套用
.c_photo_an {
    .c_photo_bg {
        animation: jumpInHeight 1s ease-in forwards;
        animation-delay: 0s;
        opacity: 0;
    }

    .c_photo_words {
        animation: fadeInSlideUp 1s ease-in-out forwards;
        animation-delay: 0.8s;
        opacity: 0;
    }

    .c_photo_nice {
        animation: fadeInSlideUp 1s ease-in-out forwards;
        animation-delay: 1.3s;
        opacity: 0;
    }
}

@media (max-width:570px) {
    .c_photo_bg {
        width: 423px;
        height: auto;
    }
    .c_photo_nice{
        bottom: 72px;
        width: 270px
    }
}

@media (max-width:520px) {
    .c_photo_bg {
        width: 376px;
    }
    .c_photo_nice{
        bottom: 74px;
        width: 242px;
    }
    .c_photo_words{
        top: 74px;
    }
}

@media (max-width:500px) {
    .focus_bt{
        top: -9px;
        right: 19px;
    }
    .c_photo_bg {
        width: 330px;
    }
    .c_photo_words{
        right: 19px;
    }
    .c_photo_nice{
        bottom: 44px;
        width: 198px;
        right: 19px;
    }
}

@media (max-width:450px) {
    .c_photo_bg {
        left: -37px;
        position: relative;
    }
}

@media (max-width:430px) {
    .c_photo_bg{
        left: -84px;
    }
    .cp_nice_web{
        display: none;
    }
    .cp_nice_phone{
        display: block;
    }
}

@media (max-width:390px) {
    .c_photo_bg {
        width: 309px;
        margin-left: -80px;
        left: 0;
    }
    .c_photo_nice{
        width: 198px;
        right: 19px;
        bottom: 46px;
    }
    .cp_nice_web{
        display: none;
    }
    .cp_nice_phone{
        display: block;
    }
    .c_photo_words{
        right: 19px;
        top: 72px;
    }
}

@media (max-width:345px) {
    .c_photo_words {
        top: 61px;
    }
}

@media (max-width:321px) {
    .c_photo_bg {
        margin-left: -86px;
    }
}

</style>
