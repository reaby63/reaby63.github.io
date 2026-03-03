<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Link from './Link.vue';
import Footer from '@/components/Footer.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);

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
    <div
        v-if="curPageData.basic?.info?.mobile ||
            curPageData.basic?.info?.email ||
            curPageData.basic?.info?.url ||
            curPageData.basic?.info?.location ||
            commonStore.userInfo?.partnership.length ||
            curPageData.basic?.footer"
        :class="$style.contact"
    >
        <Link />
        <div :class="$style.contain">
            <div :class="$style.ul">
                <div v-if="curPageData.basic?.info?.email" :class="[$style.mail, $style.li]">
                    <span>
                        <img src="/images/biz/B02250313/mail.svg">
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
                        <img src="/images/biz/B02250313/phone.svg">
                    </span>
                    <span>
                        <a
                            :class="$style.link"
                            title="撥打電話"
                            @click="openPhone"
                        >
                            {{ curPageData.basic?.info?.mobile }}
                        </a>
                    </span>
                </div>
                <div v-if="curPageData.basic?.info?.url" :class="[$style.web, $style.li]">
                    <span>
                        <img src="/images/biz/B02250313/web.svg">
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
                        <img src="/images/biz/B02250313/map.svg">
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
                </div>
            </div>
        </div>
        <Footer :class="$style.footer" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.contact {
    background-image: url('/images/biz/B02250313/bg_04.jpg');
    background-size: cover; /* 寬度100%，高度50% */
    background-position: top; /* 讓背景對齊上方 */
    padding: 15px 35px;
    padding-bottom: 60px;
    position: relative;
    &::before {
        content: "";
        display: block;
        width: 100%;
        height: 22px;
        position: absolute;
        background-image: url('/images/biz/B02250313/bg_04_top.jpg');
        background-size: cover;
        background-position: top;
        top: -22px;
        left: 0;
    }
}

.contain {
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 1s;
    opacity: 0;
}

.ul {
    width: 100%;
    margin-left: 0;
}
.li {
    padding: 10px 7px;
    border-bottom: solid 1px #cacaca;
    line-height: 16px;
    span {
        font-weight: 400;
        font-size: 15px;
        word-wrap: break-word;
        display: inline-flex;
        vertical-align: top;
        color: #ffffff;
        line-height: 18px;
        letter-spacing: 0.75px;
        &:last-child {
            width: calc(100% - 53px);
        }
        &:first-child {
            margin-right: 29px;
            img {
                width: 21px;
            }
        }
    }
    &:first-child {
        padding-top: 0;
        padding-bottom: 8px;
    }
    &:last-child {
        border-bottom: 0;
    }
}

.link {
    color: #ffffff;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;
    word-break: break-all;
    overflow-wrap: break-word;
    white-space: normal;
    &:hover {
        opacity: 0.9;
    }
}

.mail {
    span {
        .link {
            font-family: "Roboto", sans-serif;
        }
        &:last-child {
            position: relative;
            top: 2.3px;
        }
    }
}

.phone {
    .link {
        font-family: "Noto Sans TC", sans-serif;
    }
    span {
        &:first-child {
            img {
                height: 18px;
                position: relative;
                left: 0.2px;
            }
        }
        &:last-child {
            position: relative;
            top: 1px;
        }
    }
}

.web {
    span {
        font-family: "Noto Sans TC", Arial, sans-serif;
        &:last-child {
            position: relative;
            top: 1px;
        }
    }
}

.map {
    span {
        &:last-child {
            position: relative;
            top: 3px;
        }
    }
}

.footer {
    padding: 20px 0;
    border-top: 1px solid #fff;
    margin-top: 20px;
    > div {
        margin-left: 12px;
    }
}

@media (min-width:640px){
    .contact {
        padding-bottom: 25px;
    }

    .ul {
        margin-left: 10px;
        width: calc( 100% - 171px );
    }
}
</style>
