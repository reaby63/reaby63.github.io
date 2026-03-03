<script setup>
import { ref, computed } from 'vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useCommonStore } from '@/stores/common';
import { useCommunity } from '@/composables/useCommunity';
import Link from './Link.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const modules = [Navigation];
const prevRef = ref(null);
const nextRef = ref(null);
const {
    community,
    imgUrl,
    goPage
} = useCommunity({
    ig: '/images/biz/B06250401/ig.svg'
});

const openContact = computed(() =>
    curPageData.value.basic?.info?.mobile ||
    curPageData.value.basic?.info?.email ||
    curPageData.value.basic?.info?.url ||
    curPageData.value.basic?.info?.location ||
    curPageData.value.community?.length
);

const openContactList = computed(() =>
    curPageData.value.basic?.info?.mobile ||
    curPageData.value.basic?.info?.email ||
    curPageData.value.basic?.info?.url ||
    curPageData.value.basic?.info?.location
);

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
    <div v-if="openContact" :class="$style.contact">
        <Link />
        <div :class="$style['contact-title']">
            <span :class="$style['title-en']">
                <span>
                    Contact Info
                </span>
            </span>
            <span :class="$style['title-line']" />
            <span :class="$style['title-ch']">
                聯絡資訊
            </span>
        </div>
        <div>
            <ul v-if="openContactList" :class="$style.list">
                <li v-if="curPageData.basic?.info?.mobile" :class="$style['list-self']">
                    <span>
                        <img src="/images/biz/B06250411/phone.svg">
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
                </li>
                <li v-if="curPageData.basic?.info?.email" :class="$style['list-self']">
                    <span>
                        <img src="/images/biz/B06250411/mail.svg">
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
                </li>
                <li v-if="curPageData.basic?.info?.url" :class="$style['list-self']">
                    <span>
                        <img src="/images/biz/B06250411/web.svg">
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
                </li>
                <li v-if="curPageData.basic?.info?.location" :class="$style['list-self']">
                    <span>
                        <img src="/images/biz/B06250411/address.svg">
                    </span>
                    <span>
                        <div
                            :class="$style.link"
                            title="前往Google Map"
                            @click="openMap"
                        >
                            {{ curPageData.basic?.info?.location }}
                        </div>
                    </span>
                </li>
            </ul>
            <div v-if="community?.length" :class="$style['community-wrap']">
                <div ref="prevRef" :class="[$style['swiper-prev'], {[$style['without-arrow']] : community?.length < 5 }]" />
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
                        <div
                            :class="$style['community-item']"
                            @click="goPage(item)"
                        >
                            <div
                                :class="[$style['item-img'], $style[`is-${item.key}`]]"
                                :style="{
                                    'mask-image': `url(${item.maskUrl})`
                                }"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div ref="nextRef" :class="[$style['swiper-next'], {[$style['without-arrow']] : community?.length < 5 }]" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.community-wrap {
    width: 339px;
    display: flex;
    align-items: center;
    margin-left: 75px;
    margin-bottom: 3px;
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
        opacity: 0.3;
        cursor: initial;
    }
}

.swiper-prev {
    composes: arrow-btn;
    background: url('/images/biz/B06250411/arrow-l.svg') 50% 0 no-repeat;
    height: 20px;
    width: 20px;
    margin-right: 40px;
    &.without-arrow {
        display: none;
    }
}

.community-swiper-wrap {
    width: 100%;
    max-width: 231px;
    margin: 0;
}

.community-item {
    box-sizing: border-box;
    width: 35px;
    height: 35px;
    margin: 0 auto;
    padding: 6px;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 50%;
    border:solid 2px #000;
    background-color: #fff;

    &:hover {
        background-color: #000;

        .item-img {
          background-color: #fff;
        }
    }
}

.item-img {
    display: block;
    width: 20px;
    height: 20px;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
}

.swiper-next {
    composes: arrow-btn;
    background: url('/images/biz/B06250411/arrow-r.svg') 50% 0 no-repeat;
    height: 20px;
    width: 20px;
    margin-left: 40px;
    &.without-arrow {
        display: none;
    }
}

.contact {
  margin-top: 80px;
  background-color: #FFD600;
  padding-top: 35px;
  padding-bottom: 26px;
  border-radius: 50px 0 0 0;
}

.contact-title {
    margin: 0 76px;
    margin-bottom: 35px;
    display: flex;
    align-items: center;
    font-size: 20px;
    line-height: 1.6;

    .title-en {
        span {
            letter-spacing: 3px;
            font-family: "Freeman", sans-serif;
        }
    }

    .title-line {
        flex: 1;
        height: 1px;
        background-color: #000000;
        margin-right: 30px;
        margin-left: 30px;
    }

    .title-ch {
        letter-spacing: 1px;
        font-weight: 600;
    }
}

.list {
    margin: 0 76px;
    padding: 0;
}

.list-self {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    border: solid 2px #000000;
    color: #000000;

    &:last-child {
        margin-bottom: 29px;
    }

    span {
        display: inline-block;
        vertical-align: top;
        &:first-child {
            width: 24px;
            text-align: center;
            margin-right: 15px;
            line-height: 0;
        }
        &:last-child {
            width: calc( 100% - 25px - 15px );
            line-height: 0;
        }
    }
}

.link {
    color: #000000;
    letter-spacing: 1px;
    word-break: break-word;
    overflow-wrap: break-word;
    word-wrap: break-word;
    white-space: normal;
    width: 100%;
    display: inline-block;
    font-size: 15px;
    line-height: 1;
    cursor: pointer;
}

@media (max-width:640px) {
    .contact {
        padding-bottom: 82px;
    }
}

@media (max-width:501px) {
    .contact-title {
        margin: 0 56px;
        margin-bottom: 25px;
        font-size: 16px;

        .title-line {
            margin-right: 5px;
            margin-left: 5px;
        }
    }

    .list {
        margin: 0 56px;
    }

    .list-self {
        &:last-child {
            margin-bottom: 18px;
        }
    }

    .community-wrap {
        margin-left: 56px;
        width: 238px;
    }

    .community-swiper-wrap {
        width: calc(100% - 18px);
    }

    .swiper-prev {
        margin-right: 10px;
    }

    .swiper-next {
        margin-left: 10px;
    }
}

@media (max-width:358px) {
    .community-wrap {
        width: 210px;
    }
}

@media (max-width:330px) {
    .contact-title {
        margin: 0 25px;
        margin-bottom: 25px;
    }
    .list {
        margin: 0 25px;
    }
    .community-wrap {
        margin-left: 25px;
        width: 230px;
    }
}
</style>
