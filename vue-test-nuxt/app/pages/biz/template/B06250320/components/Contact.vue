<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);

const openContactList = computed(() =>
    curPageData.value.basic?.info?.mobile ||
    curPageData.value.basic?.info?.email ||
    curPageData.value.basic?.info?.url ||
    curPageData.value.basic?.info?.location
);

// 聯絡資訊連結
const openPhone = () => {
    window.location.href = `tel:${curPageData.value.basic?.info?.mobile}`;
};

const openMail = () => {
    window.location.href = `mailto:${curPageData.value.basic.info.email}`;
};

const openUrl = () => {
    window.open(curPageData.value.basic.info.url);
};

const openMap = () => {
    const url = `https://www.google.com/maps?q=${commonStore.getPageInfo.basic.info.location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <div v-if="openContactList" :class="$style.contact">
        <div :class="$style.title">
            <span>聯絡資訊</span>
        </div>
        <div>
            <div v-if="curPageData.basic?.info?.mobile" :class="$style['list-self']">
                <span>
                    <img src="/images/biz/B06250320/phone.svg">
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
            </div>
            <div v-if="curPageData.basic?.info?.email" :class="$style['list-self']">
                <span>
                    <img src="/images/biz/B06250320/mail.svg">
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
            </div>
            <div v-if="curPageData.basic?.info?.url" :class="$style['list-self']">
                <span>
                    <img src="/images/biz/B06250320/web.svg">
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
            </div>
            <div v-if="curPageData.basic?.info?.location" :class="$style['list-self']">
                <span>
                    <img src="/images/biz/B06250320/address.svg">
                </span>
                <span>
                    <div
                        :class="$style['a-link']"
                        title="前往Google Map"
                        @click="openMap"
                    >
                        {{ curPageData.basic?.info?.location }}
                    </div>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.contact {
    animation: fadeInSlideUp 1.5s ease-in-out forwards;
    opacity: 0;
    transform: translateY(50px);
    animation-delay: 0.5s;
    padding: 24px 76px;
    padding-bottom: 53px;
    color: #ffffff;
    position: relative;
    z-index: 2;
}

.title {
    margin-bottom: 25px;
    color: #ffffff;
    &::before,
    &::after {
        background-color: #ffffff;
    }
}

.list-self {
    line-height: 1em;
    margin-bottom: 9px;
    border-bottom: solid 0.5px #FFFFFF80;
    padding-bottom: 9px;
    &:last-child {
        border-bottom: 0px;
    }
    span {
        display: inline-block;
        vertical-align: top;
        &:last-child {
            width: calc(100% - 44px);
            position: relative;
            top: 1px;
        }
    }
    span,
    .a-link {
        word-wrap: break-word;
        font-weight: 300;
        letter-spacing: 0.75px;
        font-size: 15px;
    }
    span {
        &:first-child {
            margin-right: 19px;
            img {
                width: 24px;
            }
        }
    }
    .a-link {
        transition: all 0.3s;
        color: #ffffff;
        text-decoration: none;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
    &:last-child {
        margin-bottom: 0;
    }
}

@media (max-width: 500px) {
    .contact {
        padding: 0px 28px;
        padding-bottom: 53px;
    }
}
</style>
