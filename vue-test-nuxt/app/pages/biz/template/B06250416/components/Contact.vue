<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Link from '../components/Link.vue';
import { useRelatedLink } from '@/composables/useRelatedLink';
import Footer from '@/components/Footer.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const {
    partnershipList
} = useRelatedLink();
const openContactList = computed(() =>
    curPageData.value.basic?.info?.mobile ||
    curPageData.value.basic?.info?.email ||
    curPageData.value.basic?.info?.url
);

const openPhone = () => {
    window.location.href = `tel:${curPageData.value.basic?.info?.mobile}`;
};

const openMail = () => {
    window.location.href = `mailto:${curPageData.value.basic?.info?.email}`;
};

const openUrl = () => {
    window.open(curPageData.value.basic?.info?.url, '_blank');
};
</script>

<template>
    <div v-if="openContactList || partnershipList?.length || curPageData.basic?.footer" :class="$style.contact">
        <div :class="[$style['contact-bg'],$style['bgimg-size']]">
            <img src="/images/biz/B06250416/purple_round_up.png">
        </div>
        <div v-if="openContactList" :class="[$style['contact-title'],$style.title]">
            個人聯絡資訊
        </div>
        <div v-if="openContactList" :class="$style.contain">
            <ul :class="$style.list">
                <li v-if="curPageData.basic?.info?.mobile" :class="$style['list-self']">
                    <span>
                        <img src="/images/biz/B06250416/phone.svg">
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
                        <img src="/images/biz/B06250416/mail.svg">
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
                        <img src="/images/biz/B06250416/web.svg">
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
            </ul>
        </div>
        <!-- 優質推薦 -->
        <Link />
        <Footer :class="$style.footer" />
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.contact {
    z-index: 1;
    position: relative;
}

.contact-bg {
    position: relative;
    top: 2px;
}

.contact-title {
    padding-top: 10px;
    padding-bottom: 25px;
    background-color: #000003;
}

.contain {
    background-color: #000003;
    padding-bottom: 60px;
}

.list {
    margin: 0 67px;
    padding-left: 0;
}

.list-self {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: solid 0.5px rgba($color: #ffffff, $alpha: 0.2);
    &:last-child {
        border-bottom: 0;
    }
    span {
        display: inline-block;
        vertical-align: top;
        &:first-child {
            width: 25px;
            height: 20px;
            text-align: center;
            margin-right: 15px;
        }
        &:last-child {
            width: calc( 100% - 25px - 15px );
            .link {
                font-size: 15px;
                color: #ffffff;
                letter-spacing: 0.75px;
                font-weight: 300;
                overflow-wrap: break-word;
                word-wrap: break-word;
                white-space: normal;
                width: 100%;
                display: block;
                cursor: pointer;
            }
        }
    }
}

.footer {
    padding: 0 52px 28px;
    background-color: #000;
}

@media (max-width:580px) {
    .list {
        margin: 0 48px;
    }
    .contain {
        padding-bottom: 50px;
    }
}
</style>
