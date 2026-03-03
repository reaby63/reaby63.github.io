<script setup>
import { ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import Link from '../components/Link.vue';
import Footer from '@/components/Footer.vue';
import { useCommunity } from '@/composables/useCommunity';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const modules = [Navigation];
const openContact = computed(() =>
    curPageData.value.basic?.info?.mobile ||
    curPageData.value.basic?.info?.email ||
    curPageData.value.basic?.info?.url ||
    curPageData.value.basic?.info?.location
);

const openBody = computed(() =>
    curPageData.value.basic?.info?.mobile ||
    curPageData.value.basic?.info?.email ||
    curPageData.value.basic?.info?.url ||
    curPageData.value.basic?.info?.location ||
    community.length ||
    curPageData.value.basic?.footer
);

// 社群元件套件
const prevRef = ref(null);
const nextRef = ref(null);

const {
    community,
    imgUrl,
    goPage
} = useCommunity();

// 聯絡資訊連結
const openPhone = () => {
    window.location.href = `tel:${curPageData.value.basic?.info?.mobile}`;
};

const openMail = () => {
    window.location.href = `mailto:${curPageData.value.basic?.info?.email}`;
};

const openUrl = () => {
    window.open(curPageData.value.basic?.info?.url);
};

const openMap = () => {
    const url = `https://www.google.com/maps?q=${commonStore.getPageInfo.basic.info.location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <div v-if="openBody" :class="$style.body">
        <Link />
        <div v-if="openContact" :class="$style.contact">
            <div :class="$style.title">
                <span>聯絡資訊</span><span :class="$style['titile-en']">CONTACT INFORMATION</span>
            </div>
            <div :class="$style.contain">
                <div :class="$style.ul">
                    <div v-if="curPageData.basic?.info?.email" :class="[$style.mail, $style.li]">
                        <span>
                            <img src="/images/biz/B02250318/mail.svg">
                        </span>
                        <span>
                            <div
                                :class="$style.link"
                                title="前往寄信"
                                @click="openMail"
                            >
                                {{ curPageData.basic?.info?.email }}
                            </div>
                        </span>
                    </div>
                    <div v-if="curPageData.basic?.info?.mobile" :class="[$style.phone, $style.li]">
                        <span>
                            <img src="/images/biz/B02250318/phone.svg">
                        </span>
                        <span>
                            <div
                                :class="$style.link"
                                title="撥打電話"
                                @click="openPhone"
                            >
                                {{ curPageData.basic?.info?.mobile }}
                            </div>
                        </span>
                    </div>
                    <div v-if="curPageData.basic?.info?.url" :class="[$style.web, $style.li]">
                        <span>
                            <img src="/images/biz/B02250318/web.svg">
                        </span>
                        <span>
                            <div
                                :class="$style.link"
                                title="前往網站"
                                @click="openUrl"
                            >
                                {{ curPageData.basic?.info?.url }}
                            </div>
                        </span>
                    </div>
                    <div v-if="curPageData.basic?.info?.location" :class="[$style.map, $style.li]">
                        <span>
                            <img src="/images/biz/B02250318/map.svg">
                        </span>
                        <span>
                            <div
                                :class="$style.link"
                                title="前往網站"
                                @click="openMap"
                            >
                                {{ curPageData.basic?.info?.location }}
                            </div>
                        </span>
                    </div>
                </div>
                <div :class="$style['social-place']">
                    <div v-if="community.length" :class="$style['community-wrap']">
                        <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : community.length < 5 }]">
                            <img src="/images/biz/B02250318/arrow-r.svg">
                        </div>
                        <Swiper
                            :class="[$style['community-swiper-wrap'], {[$style['align-left']] : community.length < 5}]"
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
                                        :style="{
                                            'mask-image': `url(${item.maskUrl})`
                                        }"
                                        :class="[$style['item-img'], $style[`is-${item.key}`]]"
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                        <div ref="nextRef" :class="[$style['swiper-next'], {[$style['without-arrow']] : community.length < 5 }]">
                            <img src="/images/biz/B02250318/arrow-r.svg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer :class="$style.footer" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.body {
    position: relative;
    background-color: #F2C812;
    &::before {
        content: "";
        display: block;
        width: calc(100% + 1px);
        height: 35px;
        position: absolute;
        background-image: url(/images/biz/B02250318/bg_04_top.svg);
        background-size: cover;
        background-position: top;
        top: -33px;
        left: 0;
    }
}

.contact {
    padding: 22px 34px;
    padding-bottom: 90px;
}

.title {
    margin-bottom: 21px;
    margin-left: 6px;
    &::before,
    &::after {
        background-color: #776b43;
    }
    span {
        color: #676767;
    }
    .titile-en {
        color: #444444;
    }
}

.title,
.contain {
    opacity: 0;
    transform: translateY(50px);
    animation: fadeInSlideUp 2s ease-in-out forwards;
    animation-delay: 0.5s;
}

.ul {
    width: 100%;
}
.li {
    padding: 8px 4px;
    border-bottom: solid 1px #3c3c3c;
    span {
        font-weight: 400;
        font-size: 15px;
        word-wrap: break-word;
        display: inline-block;
        vertical-align: top;
        color: #434343;
        line-height: 22px;
        letter-spacing: 0.05em;
        &:last-child {
            width: calc(100% - 53px);
        }
        &:first-child {
            margin-right: 25px;
            img {
                width: 21px;
            }
        }
    }
    &:first-child {
        padding-top: 0;
    }
    &:last-child {
        border-bottom: 0px;
    }
}
.link {
    color: #434343;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        opacity: 0.9;
    }
}

.mail {
    padding-bottom: 8.5px;
    span {
        .link {
            font-family: "Roboto", sans-serif;
        }
    }
}
.phone {
    span {
        &:first-child {
            img {
                height: 18px;
                position: relative;
                right: -1px;
            }
        }
    }
}
.web {
    padding-bottom: 9px;
}
.map {
    padding-top: 9px;
    span {
        &:first-child {
            img {
                height: 19px;
            }
        }
        &:last-child {
            position: relative;
            top: -1px;
        }
    }
}

.social-place {
    display: flex;
    align-items: center;
    margin-top: 21px;
}

.footer {
    color: #494743;
    background-color: #F2C812;
    padding-top: 0;
    padding-bottom: 30px;
}

// 社群套件
.community-wrap {
    width: 214px;
    display: flex;
    align-items: center;
    margin-left: 6px;
}

.arrow-btn {
    display: block;
    width: 9px;
    height: 14px;
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

.swiper-prev,
.swiper-next {
    composes: arrow-btn;
    width: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-sizing: border-box;
    img {
        position: relative;
        width: 100%;
    }
    &.without-arrow {
        display: none;
    }
}

.swiper-prev {
    transform: rotateY(180deg);
    margin-right: 8px;
    img {
        left: 0.8px;
    }
}

.community-swiper-wrap {
    width: 100%;
    max-width: 216px;
    margin-left: 0;
    &.align-left {
        margin-left: 7px;
    }
}

.community-item {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    margin: 0 auto;
    padding: 6px;
    transition: all 0.2s;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    &:hover {
        opacity: 0.7;
    }
}

.item-img {
    display: block;
    width: 22px;
    height: 22px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    position: relative;
    transition: all 0.2s;
    background-color: #FCF4D0;
}

.swiper-next {
    margin-left: 8px;
    img {
        left: 0.6px;
    }
}

@media (min-width:475px) {
    .contact {
        padding: 24px 46px;
        padding-bottom: 32px;
    }
    .ul {
        width: calc( 100% - 155px );
    }
}
</style>
