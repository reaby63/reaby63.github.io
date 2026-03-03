<script setup>
import { computed } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const commentGroup = computed(() => curPageData.value.commentDetail || []);
const modules = [Autoplay];
</script>

<template>
    <div v-if="commentGroup?.length || curPageData.commentSetting?.title" :class="$style.comment">
        <div v-if="curPageData.commentSetting?.title" :class="$style.title">
            <img src="/images/biz/B06250416/icon_client_reviews.svg">
            <span>{{ curPageData.commentSetting?.title }}</span>
            <img src="/images/biz/B06250416/icon_client_reviews.svg">
        </div>
        <div v-if="commentGroup?.length" :class="$style['scroll-container']">
            <Swiper
                :centered-slides="true"
                :modules="modules"
                :slides-per-view="'auto'"
                :space-between="25"
                :slides-per-group="1"
                :class="$style.swiper"
                :autoplay="{
                    delay: 2500,
                    disableOnInteraction: false,
                }"
                :speed="1200"
            >
                <SwiperSlide
                    v-for="(item, index) in commentGroup"
                    :key="index"
                    :class="$style.item"
                >
                    <div :class="$style['comment-title']">
                        <span :class="$style['comment-name']">
                            {{ item.name }}
                        </span>
                        <span :class="$style['comment-date']">
                            {{ item.time }}
                        </span>
                    </div>
                    <div :class="$style['comment-info']">
                        {{ item.content }}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
        <div :class="[$style['comment-bg'], $style['bgimg-size']]">
            <img src="/images/biz/B06250416/purple_round_down.png">
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 90px;
    background-color: #000003;
    img {
        width: 22px;
        height: 22px;
    }
    span {
        display: inline-block;
        margin: 0 15px;
        font-family: "Noto Sans Display", sans-serif;
    }
}

.scroll-container {
    padding-top: 35px;
    padding-bottom: 85px;
    background-color: #000003;
}

.item {
    display: inline-block;
    width: 410px;
    vertical-align: top;
    background-color: #ffffff;
    height: auto;
    color: #000000;
    border-radius: 30px;
    padding: 20px 35px;
    box-sizing: border-box;
}

.comment-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.comment-name {
    font-weight: 600;
    letter-spacing: 0.5px;
    font-family: "Noto Sans Display", sans-serif;
}

.comment-date {
    font-size: 12px;
    line-height: 21.6px;
    letter-spacing: 1px;
    color: #000000CC;
    word-break: break-all;
}

.comment-info {
    font-size: 15px;
    line-height: 27px;
    color: #000000CC;
}

.comment-bg {
    position: relative;
    top: -3px;
}

@media (max-width:580px) {
    .title {
        padding-top: 75px;
    }
    .item {
        width: 70%;
    }
    .scroll-container {
        padding-bottom: 20px;
    }
    .comment-title {
        flex-wrap: wrap;
        margin-bottom: 12px;
        .comment-name {
            order: 2;
        }
        .comment-date {
            margin-bottom: 4px;
        }
        span {
            display: block;
            width: 100%;
        }
    }
}
</style>
