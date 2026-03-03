<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();
const openContact = computed(() =>
    commonStore.getPageInfo.basic?.info?.mobile ||
    commonStore.getPageInfo.basic?.info?.email ||
    commonStore.getPageInfo.basic?.info?.url
);

const openPhone = () => {
    window.location.href = `tel:${commonStore.getPageInfo.basic?.info?.mobile}`;
};

const openMail = () => {
    window.location.href = `mailto:${commonStore.getPageInfo.basic?.info?.email}`;
};

const openUrl = () => {
    window.open(commonStore.getPageInfo.basic?.info?.url);
};
</script>

<template>
    <div v-if="openContact">
        <div v-if="commonStore.getPageInfo.basic?.info?.email" :class="$style['contact-list']">
            <div>
                <img src="/images/biz/B02250226/mail.svg">
            </div>
            <div
                :class="$style.link"
                title="前往寄信"
                @click="openMail"
            >
                {{ commonStore.getPageInfo.basic?.info?.email }}
            </div>
        </div>
        <div v-if="commonStore.getPageInfo.basic?.info?.mobile" :class="$style['contact-list']">
            <div>
                <img src="/images/biz/B02250226/tel.svg">
            </div>
            <div
                :class="$style.link"
                title="撥打電話"
                @click="openPhone"
            >
                {{ commonStore.getPageInfo.basic?.info?.mobile }}
            </div>
        </div>
        <div v-if="commonStore.getPageInfo.basic?.info?.url" :class="$style['contact-list']">
            <div>
                <img src="/images/biz/B02250226/web.png">
            </div>
            <div
                :class="$style.link"
                title="前往網站"
                @click="openUrl"
            >
                {{ commonStore.getPageInfo.basic?.info?.url }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.contact-list {
    padding: 10px 6px;
    border-bottom: 1px solid #cacaca;
    div {
        word-wrap: break-word;
        display: inline-block;
        vertical-align: top;
        &:first-child {
            width: 22.99px;
            height: 22.99px;
            margin-right: 23px;
        }
        &:last-child {
            width: calc( 100% - 23px - 23px );
            position: relative;
            top: -2px;
        }
    }
    &:last-child {
        border-bottom: 0;
    }
    .link {
        transition: all 0.3s;
        text-decoration: underline 2px #fff;
        -webkit-text-decoration: underline 2px #fff;
        &:hover {
            transition: all 0.3s;
            cursor: pointer;
            -webkit-text-decoration: underline 2px rgba(33, 148, 207, 0.3);
            text-decoration: underline 2px rgba(33, 148, 207, 0.3);
        }
    }
}
</style>
