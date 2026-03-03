<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Link from './Link.vue';

const commonStore = useCommonStore();

const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');

// 聯絡資訊連結
const openPhone = () => {
    window.location.href = `tel:${curPageData.value.basic.info.mobile}`;
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
    <div
        v-if="
            curPageData.basic?.info?.mobile ||
                curPageData.basic?.info?.email ||
                curPageData.basic?.info?.location ||
                commonStore.userInfo?.partnership.length
        "
        :class="$style.contact"
    >
        <div :class="$style.decoration">
            <ClientOnly>
                <img
                    v-if="curPageData?.contactSetting?.headshotImage?.[0]"
                    :src="commonStore.getImg(webID, curPageData?.contactSetting?.headshotImage?.[0])"
                >
                <img
                    v-else
                    src="/images/biz/B08250527/contact_bg.png"
                >
            </ClientOnly>
        </div>
        <div :class="$style.title">
            聯絡資訊
        </div>
        <div :class="$style.bottom">
            <div :class="$style.entitle">
                CALL ME
            </div>
            <div :class="$style.context">
                <div :class="$style['context-list']">
                    <div v-if="curPageData.basic?.info?.mobile" :class="$style.list">
                        <img src="/images/biz/B08250527/c_phone.svg">
                        <span
                            :class="$style.text"
                            title="撥打電話"
                            @click="openPhone"
                        >
                            {{ curPageData.basic?.info?.mobile || {} }}
                        </span>
                    </div>
                    <div v-if="curPageData.basic?.info?.email" :class="$style.list">
                        <img src="/images/biz/B08250527/c_mail.svg">
                        <span
                            :class="$style.text"
                            title="前往寄信"
                            @click="openMail"
                        >
                            {{ curPageData.basic?.info?.email }}
                        </span>
                    </div>
                    <div v-if="curPageData.basic?.info?.url" :class="$style.list">
                        <img src="/images/biz/B08250527/c_link.svg">
                        <span
                            :class="$style.text"
                            title="前往網站"
                            @click="openUrl"
                        >
                            {{ curPageData.basic.info?.url }}
                        </span>
                    </div>
                    <div v-if="curPageData.basic?.info?.location" :class="$style.list">
                        <img src="/images/biz/B08250527/c_home.svg">
                        <span
                            :class="$style.text"
                            title="前往Google Map"
                            @click="openMap"
                        >
                            {{ curPageData.basic?.info?.location }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Link />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.contact {
    padding-top: 170px;
    padding-bottom: 46px;
    background-color: #EDEDED;
    padding-left: 55px;
    position: relative;
    margin-top: 160px;
}

.decoration {
    position: absolute;
    overflow: hidden;
    top: -110px;
    right: 0;
    max-width: 440px;
    max-height: 220px;
    aspect-ratio: 440 / 220;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 1px 0 1px 1px;
    border-color: #DFDFDF;
    border-style: solid;
    border-radius: 20px 0 0 4px;
    box-sizing: border-box;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.title {
    font-size: 18px;
    letter-spacing: 4px;
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 22px;
}

.bottom {
    display: block;
}

.entitle {
    width: auto;
    margin-right: 60px;
    font-size: 40px;
    font-weight: 900;
    line-height: 55px;
    letter-spacing: 5.5px;
}

.context {
    margin-top: 30px;
    width: 100%;
}

.list {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: solid 1px #DFDFDF;
    margin-bottom: 20px;
    img {
        margin-right: 20px;
        width: auto;
    }
    .text {
        line-height: 24px;
        letter-spacing: 1px;
        font-family: "MiSans TC", Arial, sans-serif;
        color: #221D1A;
        cursor: pointer;
        transition: all 0.3s;
        overflow-wrap: break-word;
        word-break: break-word;
        word-wrap: break-word;
        &:hover {
            opacity: 0.7;
        }
    }
    &:last-child {
        border: 0;
        margin-bottom: 0;
    }
}

@media (min-width:600px) {
    .bottom {
        display: flex;
    }
    .entitle {
        width: auto;
        width: 145px;
    }
    .context {
        width: calc( 100% - 145px - 60px );
        padding-top: 8px;
    }
}
</style>
