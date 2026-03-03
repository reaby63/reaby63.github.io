<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Link from '../components/Link.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const openContact = computed(() =>
    curPageData.value.basic?.info?.mobile ||
    curPageData.value.basic?.info?.email ||
    curPageData.value.basic?.info?.url ||
    curPageData.value.basic?.info?.location ||
    commonStore.userInfo?.partnership?.length
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
        <div :class="$style['contact-top']">
            <div :class="$style.left">
                <div :class="$style.title">
                    <div>
                        Contact
                    </div>
                    <div>
                        聯絡資訊
                    </div>
                </div>
                <div :class="$style['title-dec']">
                    <span>
                        Call me
                    </span>
                </div>
            </div>
            <div :class="$style.right">
                <img src="/images/biz/B08250401/circle.svg">
                <img src="/images/biz/B08250401/triangle.svg">
                <img src="/images/biz/B08250401/square.svg">
            </div>
        </div>
        <div :class="$style['contact-bottom']">
            <div v-if="curPageData.basic?.info?.mobile" :class="$style['contact-list']">
                <div>
                    <img src="/images/biz/B08250401/phone.svg">
                </div>
                <div
                    :class="$style.link"
                    title="撥打電話"
                    @click="openPhone"
                >
                    {{ curPageData.basic?.info?.mobile }}
                </div>
            </div>
            <div v-if="curPageData.basic?.info?.email" :class="$style['contact-list']">
                <div>
                    <img src="/images/biz/B08250401/mail.svg">
                </div>
                <div
                    :class="$style.link"
                    title="前往寄信"
                    @click="openMail"
                >
                    {{ curPageData.basic?.info?.email }}
                </div>
            </div>
            <div v-if="curPageData.basic?.info?.url" :class="$style['contact-list']">
                <div>
                    <img src="/images/biz/B08250401/link.svg">
                </div>
                <div
                    :class="$style.link"
                    title="前往網站"
                    @click="openUrl"
                >
                    {{ curPageData.basic?.info?.url }}
                </div>
            </div>
            <div v-if="curPageData.basic?.info?.location" :class="$style['contact-list']">
                <div>
                    <img src="/images/biz/B08250401/home.svg">
                </div>
                <div
                    :class="$style.link"
                    title="前往Google Map"
                    @click="openMap"
                >
                    {{ curPageData.basic?.info?.location }}
                </div>
            </div>
            <Link />
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.contact {
    border-top: 1.5px solid #444;
    background: #2C2C2C;
    padding: 30px;
    padding-bottom: 41px;
    position: relative;
    z-index: 2;
}

.contact-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 30px;
}

.left {
    display: flex;
    margin-bottom: 9px;
}
.title {
    color: #ffffff;
    div {
        &:first-child {
            font-size: 16.5px;
            line-height: 18px;
            margin-bottom: 6px;
        }
        &:last-child {
            font-size: 21px;
            line-height: 27px;
            letter-spacing: 0.05em;
            font-weight: 900;
        }
    }
}

.title-dec {
    border-left: 1.5px solid #7CC4F8;
    position: relative;
    margin-left: 35px;
    span {
        position: absolute;
        top: calc( (100% - 1em - 8px) / 2 );
        left: 15px;
        color: #ffffff;
        font-size: 16.5px;
        font-weight: 500;
        line-height: 1em;
        letter-spacing: 0.05em;
        display: block;
        background-color: #0E99FF;
        border-radius: 3px;
        padding: 3px 4px;
        padding-bottom: 4px;
        text-align: center;
        width: 65px;
    }
    &::before,
    &::after {
        content: "";
        display: block;
        width: 6px;
        height: 1.5px;
        background-color: #7CC4F8;
        position: absolute;
        left: -3.5px;
    }
    &::before {
        top: 0;
    }
    &::after {
        bottom: 0;
    }
}

.right {
    display: flex;
    img {
        width: 36px;
        height: 36px;
        margin-right: 6px;
        opacity: 0.28;
        &:last-child {
            margin-right: 0;
        }
    }
}

.contact-list {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    &:last-child {
        margin-bottom: 0;
    }
    div {
        &:first-child {
            margin-right: 12px;
            img {
                width: 36px;
            }
        }
        &:last-child {
            width: 100%;
            background-color: #383838;
            border-radius: 9px;
            display: flex;
            padding: 6px 12px;
            font-size: 16.5px;
            line-height: 24px;
            color: #ffffff;
            word-break: break-word;
            overflow-wrap: break-word;
            word-wrap: break-word; /* 為了支援舊版瀏覽器 */
        }
        &.link {
            cursor: pointer;
        }
    }
}

@media (max-width:400px) {
    .contact-top {
        margin-bottom: 20px;
    }
    .title {
        div {
            &:first-child {
                font-size: 15px;
                line-height: 16px;
            }
            &:last-child {
                font-size: 18px;
            }
        }
    }
    .title-dec {
        margin-left: 20px;
        span {
            font-size: 14px;
            width: 54px;
        }
    }
    .right {
        img {
            width: 26px;
            height: 26px;
        }
    }
}
</style>
