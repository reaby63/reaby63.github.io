<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');

const storeGroup = computed(() =>
    curPageData?.value.basic?.logo?.[0] ||
    curPageData?.value.introduce?.company ||
    curPageData.value.basic?.info?.mobile ||
    curPageData.value.basic?.info?.location
);

const contentGroup = computed(() =>
    curPageData?.value.introduce?.company ||
    curPageData.value.basic?.info?.mobile ||
    curPageData.value.basic?.info?.location
);

const openPhone = () => {
    window.location.href = `tel:${curPageData.value.basic.info?.mobile}`;
};

const openMap = () => {
    const url = `https://www.google.com/maps?q=${commonStore.getPageInfo.basic.info.location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <div v-if="storeGroup" :class="$style.store">
        <div :class="$style.title">
            {{ curPageData.storeSetting?.title }}
        </div>
        <div v-if="curPageData.basic?.info?.location" :class="$style.map">
            <iframe
                :src="`https://www.google.com/maps?q=${encodeURIComponent(curPageData.basic?.info?.location)}&output=embed`"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            />
        </div>
        <div v-if="contentGroup" :class="$style.content">
            <div :class="$style.left">
                <div :class="$style.logo">
                    <ClientOnly>
                        <img v-if="curPageData?.basic?.logo?.[0]" :src="commonStore.getImg(webID, curPageData?.basic?.logo?.[0])">
                        <img v-else :src="`/images/biz/B06250416/no-logo.svg`">
                    </ClientOnly>
                </div>
            </div>
            <div :class="$style.right">
                <div v-if="curPageData?.introduce?.company">
                    {{ curPageData?.introduce?.company }}
                </div>
                <div
                    v-if="curPageData.basic?.info?.mobile"
                    :class="$style.hover"
                    title="撥打電話"
                    @click="openPhone"
                >
                    {{ curPageData.basic?.info?.mobile }}
                </div>
                <div
                    v-if="curPageData.basic?.info?.location"
                    :class="$style.hover"
                    title="前往Google Map"
                    @click="openMap"
                >
                    {{ curPageData.basic?.info?.location }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.store {
    margin: 65px 67px 80px;
}

.title {
    margin-bottom: 25px;
}

.map {
    border-radius: 20px;
    border: solid 2px #ADADAD;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 43px;
    aspect-ratio: 508 / 265;
    iframe {
        width: 100%;
        height: 100%;
        border:0;
    }
}

.content {
    display: flex;
    align-items: center;
}

.left {
    width: 100px;
    margin-right: 25px;
}

.logo {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.right {
    width: calc( 100% - 100px - 25px );
    div {
        font-size: 15px;
        line-height: 15px;
        letter-spacing: 0.75px;
        padding: 10px 0;
        border-bottom: 0.5px solid rgba($color: #ffffff, $alpha: 0.2);
        &:last-child {
            border-bottom: 0;
            padding-bottom: 0;
        }
        &:first-child {
            padding-top: 7px;
        }
    }
}

.hover {
    cursor: pointer;
}

@media (max-width:580px) {
    .store {
        margin: 65px 48px;
    }
    .map {
        aspect-ratio: 405 / 240;
    }
    .content {
        justify-content: center;
        flex-wrap: wrap;
    }
    .left {
        margin-right: 0;
        margin-bottom: 30px;
    }
    .right {
        width: 100%;
    }
}
</style>
