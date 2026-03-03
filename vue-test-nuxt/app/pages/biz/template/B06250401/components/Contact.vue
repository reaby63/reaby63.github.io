<script setup>
import { ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useCommunity } from '@/composables/useCommunity';

const modules = [Navigation];
const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);

// 社群元件套件
const prevRef = ref(null);
const nextRef = ref(null);
const {
    community,
    imgUrl,
    goPage
} = useCommunity({
    ig: '/images/biz/B06250401/ig.svg'
});

// 聯絡資訊連結
const openPhone = () => {
    window.location.href = `tel:${curPageData.value.basic.info.mobile}`;
};

const openMail = () => {
    window.location.href = `mailto:${curPageData.value.basic.info?.email}`;
};

const openUrl = () => {
    window.open(curPageData.value.basic.info?.url);
};
</script>

<template>
    <div :class="$style.contact">
        <div
            v-if="curPageData.basic?.info?.mobile ||
                curPageData.basic?.info?.email ||
                curPageData.basic?.info?.url ||
                curPageData.basic?.info?.location"
            :class="$style['contact-title']"
        >
            <div :class="$style['info-title']">
                追蹤我<span :class="$style['title-en']">Follow Me</span>
            </div>
        </div>
        <div :class="$style.contain">
            <ul :class="$style.ul">
                <li v-if="curPageData.basic?.info?.mobile" :class="$style.li">
                    <span>
                        <img src="/images/biz/B06250401/phone.svg">
                    </span>
                    <span>
                        <div
                            :class="$style['a-link']"
                            title="撥打電話"
                            @click="openPhone"
                        >
                            {{ curPageData.basic?.info?.mobile }}
                        </div>
                    </span>
                </li>
                <li v-if="curPageData.basic?.info?.email" :class="$style.li">
                    <span>
                        <img src="/images/biz/B06250401/mail.svg">
                    </span>
                    <span>
                        <div
                            :class="$style['a-link']"
                            title="前往寄信"
                            @click="openMail"
                        >
                            {{ curPageData.basic?.info?.email }}
                        </div>
                    </span>
                </li>
                <li v-if="curPageData.basic?.info?.url" :class="$style.li">
                    <span>
                        <img src="/images/biz/B06250401/web.svg">
                    </span>
                    <span>
                        <div
                            :class="$style['a-link']"
                            title="前往網站"
                            @click="openUrl"
                        >
                            {{ curPageData.basic?.info?.url }}
                        </div>
                    </span>
                </li>
                <li v-if="curPageData.basic?.info?.location" :class="$style.li">
                    <span>
                        <img src="/images/biz/B06250401/location.svg">
                    </span>
                    <span>
                        <div :class="$style['a-link']">
                            <a
                                :href="`https://www.google.com/maps?q=${curPageData.basic?.info?.location}`"
                                :class="$style['list-link']"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {{ curPageData.basic?.info?.location }}
                            </a>
                        </div>
                    </span>
                </li>
            </ul>
            <div v-if="community?.length" :class="$style['community-wrap']">
                <div ref="prevRef" :class="$style['swiper-prev']">
                    <img src="/images/biz/B06250401/social_arrow.svg">
                </div>
                <Swiper
                    :class="$style['community-swiper-wrap']"
                    :modules="modules"
                    :slides-per-view="4"
                    :navigation="{
                        prevEl: prevRef,
                        nextEl: nextRef
                    }"
                >
                    <SwiperSlide v-for="(item, index) in community" :key="index">
                        <div :class="$style['community-item']" @click="goPage(item)">
                            <div
                                :class="[$style['item-img'], $style[`is-${item.key}`]]"
                                :style="{
                                    'mask-image': `url(${item.maskUrl})`
                                }"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div ref="nextRef" :class="$style['swiper-next']">
                    <img src="/images/biz/B06250401/social_arrow.svg">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

button {
  cursor: pointer;
  background-color: transparent;
  border: 0px;
}

ul,
li {
    padding: 0;
    margin: 0;
}

.contact {
    z-index: 1;
    position: relative;
    margin-top: 80px;
}

.contact-title {
    position: relative;
    height: 163px;
    &::before {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        right: 382px;
        width: 92px;
        height: 75px;
        background-image: url(/images/biz/B06250401/contact_cat.png);
        background-size: cover;
        background-position: top;
        z-index: 0;
    }
    &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 45.72px;
        width: 320px;
        height: 147px;
        background-image: url(/images/biz/B06250401/contact_bubble.png);
        background-size: cover;
        background-position: top;
        z-index: 0;
    }
}

.info-title {
    margin-bottom: 18px;
    position: absolute;
    top: 60px;
    right: 76px;
    z-index: 3;
}

.contain {
    margin-bottom: 55px;
}

.ul {
    margin: 0 76px;
    .li {
        display: flex;
        align-items: center;
        background-color: #ffffff;
        border-radius: 20px;
        padding: 9px 50px;
        margin-bottom: 12px;
        &:last-child {
            margin-bottom: 20px;
        }
        span {
            display: inline-block;
            vertical-align: top;
            line-height: 1em;
            &:first-child {
                width: 25px;
                text-align: center;
                margin-right: 15px;
                position: relative;
                top: 1px;
            }
            &:last-child {
                width: calc( 100% - 25px - 15px );
                .a-link,
                a {
                    color: #333333;
                    letter-spacing: 1px;
                    line-height: 1em;
                    word-break: break-word;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    white-space: normal;
                    cursor: pointer;
                    text-align: left;
                    text-decoration: none;
                }
            }
        }
    }
}

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
    width: 30px;
    height: 30px;
    border: solid 2px #ffffff;
    transform: rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-sizing: border-box;
    img {
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
    background-color: #05438b;
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
    background-color: #fff;
}

.swiper-next {
    composes: arrow-btn;
    width: 30px;
    height: 30px;
    border: solid 2px #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-sizing: border-box;
    img {
        position: relative;
        left: 0.6px;
    }
}

@media (max-width:570px) {
    .ul {
        margin: 0 35px;
    }
    .community-wrap {
        margin-left: 45px;
    }
}

@media (max-width:520px) {
    .contact-title {
        &::after {
            right: 25.72px;
        }
        &::before {
            right: 362px;
        }
    }
}

@media (max-width:500px) {
    .contact {
        margin-top: 10px;
    }
    .contain {
        margin-bottom: 65px;
    }
    .contact-title {
        height: 192px;
        &::after {
            right: -18px;
        }
        &::before {
            right: 312px;
        }
    }
    .info-title {
        right: 35px;
        top: 66px;
    }
    .ul {
        margin: 0 37px;
        .li {
            padding: 8.5px 15px;
            span {
                &:last-child {
                    width: calc(100% - 25px - 15px - 21px);
                }
            }
        }
    }
    .community-wrap {
        margin-left: 47px;
        height: 36px;
    }
}

@media (max-width:450px) {
    .contact-title {
        &::after {
            width: 240px;
            height: 167px;
            right: 0;
            background-image: url('/images/biz/B06250401/contact_bubble_phone.png');
        }
        &::before {
            right: 250px;
        }
    }
}

@media (max-width:430px) {
    .community-swiper-wrap {
        width: calc(100% - 60px - 10px);
    }
    .community-wrap {
        width: 242px;
    }
    .swiper-prev,
    .swiper-next {
        width: 22px;
        height: 22px;
    }
}

@media (max-width:390px) {
    .contact-title {
        height: 193px;
        &::before {
            right: 251px;
            width: 75px;
            height: 55px;
        }
    }
    .info-title {
        right: 20px;
        top: 66px;
    }
}

@media (max-width:375px) {
    .contact-title {
        &::before {
            right: 214px;
        }
        &::after {
            right: -27px;
        }
    }
    .info-title {
        right: 20px;
    }
    .ul {
        margin: 0 20px;
    }
    .community-swiper-wrap {
        width: calc(100% - 60px);
    }
    .community-wrap {
        margin-left: 30px;
        width: 220px;
    }
}

@media (max-width:321px) {
    .contact-title {
        &::before {
            right: 210px;
        }
    }
}

</style>
