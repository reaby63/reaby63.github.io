<script setup>
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();
</script>
<template>
    <div
        v-if="commonStore.getPageInfo.basic.info.mobile ||
            commonStore.getPageInfo.basic.info.email ||
            commonStore.getPageInfo.basic.info.url"
        :class="$style.contact"
    >
        <div :class="$style.title">
            <span>聯絡資訊</span>
        </div>
        <div :class="$style.contain">
            <ul>
                <li v-if="commonStore.getPageInfo.basic.info.mobile">
                    <span>
                        <img src="/images/biz/B06250317/phone.svg">
                    </span>
                    <span>
                        <a :href="`tel:${commonStore.getPageInfo.basic.info.mobile}`" title="撥打電話">
                            {{ commonStore.getPageInfo.basic.info.mobile }}
                        </a>
                    </span>
                </li>
                <li v-if="commonStore.getPageInfo.basic.info.email">
                    <span>
                        <img src="/images/biz/B06250317/mail.svg">
                    </span>
                    <span>
                        <a :href="`mailto:${commonStore.getPageInfo.basic.info.email}`" title="前往寄信">
                            {{ commonStore.getPageInfo.basic.info.email }}
                        </a>
                    </span>
                </li>
                <li v-if="commonStore.getPageInfo.basic.info.url">
                    <span>
                        <img src="/images/biz/B06250317/web.svg">
                    </span>
                    <span>
                        <a
                            :href="commonStore.getPageInfo.basic.info.url"
                            title="前往網站"
                            target="_blank"
                        >
                            {{ commonStore.getPageInfo.basic.info.url }}
                        </a>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" module>
.contact {
    margin-bottom: 49px;
    padding: 0 35px;
    position: relative;
    z-index: 3;
}

.title {
    margin-bottom: 18px;
    font-size: 20px;
    color: #ffffff;
    line-height: 32px;

    span {
        position: relative;
        display: inline-block;
        font-weight: 600;
        letter-spacing: 1px;
    }
}

.contain {
    width: calc(100% - 26px - 17px);

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        @media (max-width: 500px) {
            width: calc(100% - 65px);
        }

        li {
            padding: 10px 0;
            border-bottom: solid 0.5px rgba(255, 255, 255, 0.5019607843);
            line-height: 16px;
            display: flex;
            align-items: center;

            span {
                font-weight: 400;
                font-size: 15px;
                word-wrap: break-word;
                display: inline-block;
                vertical-align: top;

                &:last-child {
                    width: calc(100% - 43px);
                    padding-top: 1px;
                    display: flex;
                    align-items: center;
                    justify-content: left;
                }

                &:first-child {
                    margin-right: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: left;

                    img {
                        width: 24px;
                    }
                }
            }

            &:first-child {
                padding-top: 0;
            }

            &:last-child {
                border-bottom: 0;
            }
        }
    }

    a {
        color: #fff;
        text-decoration: none;
        transition: all 0.3s;
        letter-spacing: 1px;
        font-weight: lighter;
        word-break: break-word;
        line-height: 1.1;
        position: relative;
        top: -2px;

        &:hover {
            opacity: 0.9;
        }
    }
}

.phone {
    span {
        &:last-child {
            position: relative;
            top: 5px;
        }
    }
}

.web {
    span {
        &:last-child {
            position: relative;
            top: 5px;
        }
    }
}

@media (max-width: 500px) {

    .contact {
        padding: 0 20px;
        margin-bottom: 49px;
    }

    .contain {
        width: 100%;
    }
}
</style>
