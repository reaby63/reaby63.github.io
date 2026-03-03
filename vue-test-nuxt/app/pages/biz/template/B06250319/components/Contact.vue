<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    info: {
        type: Object,
        default: () => { }
    },
    webId: {
        type: String,
        default: () => { }
    }
});
</script>

<template>
    <div :class="$style.title">
        <span>了解詳細資訊</span>
    </div>
    <div :class="$style.contain">
        <ul>
            <li v-if="props.info.mobile">
                <span>
                    <img src="/images/biz/B06250319/phone.svg">
                </span>
                <span>
                    <a :href="`tel:${props.info.mobile}`" title="撥打電話">{{ props.info.mobile }}</a>
                </span>
            </li>
            <li v-if="props.info.email">
                <span>
                    <img src="/images/biz/B06250319/mail.svg">
                </span>
                <span>
                    <a :href="`mailto:${props.info.email}`" title="前往寄信">{{ props.info.email }}</a>
                </span>
            </li>
            <li v-if="props.info.url">
                <span>
                    <img src="/images/biz/B06250319/web.svg">
                </span>
                <span>
                    <a
                        :href="props.info.url"
                        :class="$style.underline"
                        title="前往網站"
                        target="_blank"
                    >{{ props.info.url }}</a>
                </span>
            </li>
            <li v-if="props.info.location">
                <span>
                    <img src="/images/biz/B06250319/address.svg">
                </span>
                <span>
                    <a
                        :href="`https://www.google.com/maps?q=${props.info.location}`"
                        :class="$style['list-link']"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ props.info.location }}
                    </a>
                </span>
            </li>
        </ul>
    </div>
</template>
<style lang="scss" module>
.title {
    font-size: 20px;
    color: #1E1E1E;
    margin-bottom: 32px;
    line-height: 32px;
    text-align: center;
    border-bottom: solid 1px #1E1E1E;
}

.title span {
    position: relative;
    display: inline-block;
    font-weight: 600;
    letter-spacing: 3px;
    padding-bottom: 5px;
    margin-left: 3px;
}

.contain {
    ul {
        li {
            line-height: 16px;
            margin-bottom: 13px;

            span {
                display: inline-block;
                vertical-align: top;

                &:last-child {
                    width: calc(100% - 43px);
                }
            }

            span,
            a {
                word-wrap: break-word;
                font-weight: 300;
                letter-spacing: 1px;
                font-size: 15px;
                color: #1E1E1E;
                transition: all 0.3s;
                display: inline-block;

                &:hover {
                    opacity: 0.8;
                }
            }

            a {
                width: calc(100% - 5px);
            }

            span {
                &:first-child {
                    margin-right: 19px;

                    img {
                        width: 24px;
                    }
                }
            }

            &:last-child {
                margin-bottom: 0;
            }

            .underline {
                text-decoration: underline;
            }
        }
    }
}
</style>
