<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Community from '../components/Community.vue';
import Link from '../components/Link.vue';
import Footer from '@/components/Footer.vue';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const community = computed(() => commonStore.getPageInfo?.community);
const openContact = computed(() =>
    commonStore.getPageInfo.basic?.info?.mobile ||
    commonStore.getPageInfo.basic?.info?.phone ||
    commonStore.getPageInfo.basic?.info?.email ||
    commonStore.getPageInfo.basic?.info?.url ||
    commonStore.getPageInfo.basic?.logo?.[0] ||
    commonStore.getPageInfo.basic?.info?.location
);

const openMobile = () => {
    window.location.href = `tel:${commonStore.getPageInfo.basic?.info?.mobile}`;
};

const openPhone = () => {
    window.location.href = `tel:${commonStore.getPageInfo.basic?.info?.phone}`;
};

const openMail = () => {
    window.location.href = `mailto:${commonStore.getPageInfo.basic?.info?.email}`;
};

const openUrl = () => {
    window.open(commonStore.getPageInfo.basic?.info?.url);
};

const openMap = () => {
    const url = `https://www.google.com/maps?q=${commonStore.getPageInfo.basic.info.location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <div v-if="openContact" :class="$style.contact">
        <div :class="$style['all-bg']">
            <ClientOnly>
                <img v-if="curPageData.introduce?.bottomBgImage?.[0]" :src="commonStore.getImg(webID, curPageData.introduce?.bottomBgImage?.[0])">
                <img v-else src="/images/biz/B09250825/contactBg.jpg">
            </ClientOnly>
        </div>

        <div v-if="commonStore.getPageInfo.basic?.info?.mobile || commonStore.getPageInfo.basic?.info?.email || commonStore.getPageInfo.basic?.info?.url || community?.length" :class="$style['contact-top']">
            <div :class="$style['contact-info']">
                <div v-if="curPageData.basic?.info?.name || curPageData.basic?.info?.enName" :class="$style['name']">
                    {{ curPageData.basic?.info?.name || curPageData.basic?.info?.enName }}
                </div>
                <div v-if="commonStore.getPageInfo.basic?.info?.mobile" :class="$style['contact-list']">
                    <div>
                        <img src="/images/biz/B06250411/phone.svg">
                    </div>
                    <div
                        :class="$style.link"
                        title="撥打電話"
                        @click="openMobile"
                    >
                        {{ commonStore.getPageInfo.basic?.info?.mobile }}
                    </div>
                </div>
                <div v-if="commonStore.getPageInfo.basic?.info?.email" :class="$style['contact-list']">
                    <div>
                        <img src="/images/biz/B06250411/mail.svg">
                    </div>
                    <div
                        :class="$style.link"
                        title="前往寄信"
                        @click="openMail"
                    >
                        {{ commonStore.getPageInfo.basic?.info?.email }}
                    </div>
                </div>
                <div v-if="commonStore.getPageInfo.basic?.info?.url" :class="$style['contact-list']">
                    <div>
                        <img src="/images/biz/B06250411/web.svg">
                    </div>
                    <div
                        :class="$style.link"
                        title="前往網站"
                        @click="openUrl"
                    >
                        {{ commonStore.getPageInfo.basic?.info?.url }}
                    </div>
                </div>
                <!-- 社群元件 -->
                <Community />
            </div>
            <div :class="$style['contact-title']">
                <span :class="$style['en']">Contact</span>
                <span :class="$style['ch']">
                    <span>聯</span>
                    <span>絡</span>
                    <span>我</span>
                    <span>們</span>
                </span>
            </div>
        </div>

        <div :class="$style['contact-bottom']">
            <div v-if="curPageData.basic?.logo?.[0]" :class="$style['contact-logo']">
                <ClientOnly>
                    <Image :class="$style.logo" :img-src="commonStore.getImg(webID, curPageData.basic?.logo?.[0])"/>
                </ClientOnly>
            </div>
            <div :class="$style['contact-otherinfo']">
                <div v-if="curPageData.basic?.info?.location" :class="$style['info-office']">
                    <div title="前往Google Map" @click="openMap" :class="$style['info-office-title']">
                        品牌總部 Office
                    </div>
                    <div :class="$style['info-office-contain']">
                        {{ curPageData.basic?.info?.location }}
                    </div>
                </div>
                <div v-if="commonStore.getPageInfo.basic?.info?.mobile" title="撥打電話" @click="openMobile" :class="$style['otherinfo-self']">
                    <span>
                        電話
                    </span>
                    <span>
                        {{ commonStore.getPageInfo.basic?.info?.mobile }}
                    </span>
                </div>
                <div v-if="commonStore.getPageInfo.basic?.info?.email" title="前往網站" @click="openUrl" :class="$style['otherinfo-self']">
                    <span>
                        信箱
                    </span>
                    <span>
                        {{ commonStore.getPageInfo.basic?.info?.email }}
                    </span>
                </div>
            </div>
        </div>
        <!-- 優質廠商 -->
        <Link />
        <!-- 頁尾 -->
        <Footer :class="$style.footer" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.contact {
    position: relative;
    overflow: hidden;
    padding: 68px 77px 57px 64px;
}

.all-bg {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
    left: 0;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}

.contact-top {
    position: relative;
    z-index: 1;
    margin-right: 53px;
}

.contact-info {
    background-color: #F7F2E9;
    padding: 14px 61px 32px 36px;
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 43px);
    box-sizing: border-box;
    min-height: 250px;
}

.contact-list {
    position: relative;
    z-index: 1;
    display: flex;
    color: #333;
    font-size: 16px;
    font-weight: 500;
    line-height: 25.6px;
    letter-spacing: 2px;
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 25px;
    }
    .link {
        overflow-wrap: break-word;
        word-break: break-word;
        word-wrap: break-word;
    }
    img {
        width: auto;
        margin-right: 15px;
    }
}

.contact-title {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #5E5338;
    top: 49px;
    right: 0;
    width: 43px;
    position: absolute;
    .en {
        display: inline-block;
        transform: rotate(90deg);
        transform-origin: center center;
        position: relative;
        left: 2px;
        font-size: 32px;
        font-weight: 500;
        letter-spacing: 2.65px;
        line-height: 30px;
    }
    .ch {
        flex-direction: column;
        margin-top: 66px;
        span {
            display: block;
            font-size: 15px;
            line-height: 1.5px;
            font-weight: 600;
            width: 15px;
            height: 25px;
            position: relative;
            right: 2px;
        }
    }
}

.name {
    font-size: 17px;
    font-weight: 700;
    line-height: 27.2px;
    letter-spacing: 1.36px;
    border-bottom: solid 1px #000;
    padding-bottom: 10.5px;
    margin-bottom: 14.5px;
}

.contact-bottom {
    position: relative;
    z-index: 1;
    display: flex;
}

.contact-logo {
    background-color: #F7F2E9;
    padding: 44px 15px;
    max-width: 172px;
    box-sizing: border-box;
    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            background-color: transparent;
        }
    }
}

.contact-otherinfo {
    margin: 20px;
    font-family: 'Texturina','Ysabeau Infant', sans-serif;
}

.info-office {
    margin-bottom: 8px;
    .info-office-title ,
    .info-office-contain {
        color: #5E5338;
        font-size: 15px;
        line-height: 25.65px;
        letter-spacing: 2px;
    }
    .info-office-title {
        font-weight: 600;
    }
    .info-office-contain {
        font-weight: 400;
    }
}

.otherinfo-self {
    margin-bottom: 9px;
    &:last-child {
        margin-bottom: 0;
        overflow-wrap: break-word;
        word-break: break-word;
        word-wrap: break-word;
    }
    span {
        display: inline-block;
        vertical-align: top;
        color: #5E5338;
        font-size: 15px;
        line-height: 25.65px;
        letter-spacing: 2px;
        &:first-child {
            font-weight: 600;
            margin-right: 7px;
        }
        &:last-child {
            font-weight: 400;
            width: calc( 100% - 2em - 12px );
            font-family: 'Ysabeau Infant', sans-serif;
        }
    }
}

.footer {
    position: relative;
    z-index: 1;
    font-family: 'Texturina','Ysabeau Infant', sans-serif;
    text-align: left;
    color: #5E5338;
    line-height: 20.8px;
    font-size: 13px;
    padding: 0;
    margin-top: 37px;
    p , h1 , h2 , h3 , h4 , h5 , h6 {
        margin-bottom: 0;
    }
}

@media (max-width:600px) {
    .contact-top {
        margin-right: 0;
    }
    .contact {
        padding: 68px 25px 57px 25px;
    }
    .contact-info {
        padding: 14px 32px 32px;
    }
}

@media (max-width:380px) {
    .contact-logo {
        display: none;
    }
    .contact-otherinfo {
        width: 100%;
    }
}

@media (max-width:356px) {
    .contact-title {
        display: none;
    }
    .contact-info {
        width: 100%;
    }
}
</style>
