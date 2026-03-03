<script setup>
import { ref } from 'vue';
import { axiosSetLineStatus } from '@/utils/axios/resource';
import { useCommonStore } from '@/stores/common';
import Popup from '@/components/Popup.vue';
import Text from '@/pages/biz/components/Text.vue';

const props = defineProps({
    data: {
        type: Object,
        default: () => ({ title: '', data: [] })
    }
});
const commonStore = useCommonStore();
const isShow = ref(true);

function toWeb(item) {
    const sourceId = commonStore.getPageInfo.basic.definedID;
    const definedId = item.definedID;
    const currentOrigin = window.location.origin;
    const newUrl = `${currentOrigin}/biz/${definedId}`;
    window.open(newUrl);

    axiosSetLineStatus(sourceId, definedId);
}

function onClose() {
    commonStore.actionSetPopupInfo({});
}
</script>

<template>
    <Popup
        v-if="isShow"
        :visible="true"
        @close="onClose"
    >
        <div :class="$style['window-center']">
            <div :class="$style['list-content']">
                <div :class="$style.close" @click="onClose" />
                <div :class="$style['window-title']">
                    <div v-if="data.headshotImage || data.logoImage" :class="$style['list-img']">
                        <img
                            v-lazy="{
                                src: commonStore.getImg(data.webID, data.logoImage || data.headshotImage),
                                loading: '/images/home/template/detail/loading.svg'
                            }"
                        >
                    </div>
                    <span>{{ data.title }}</span>
                </div>
                <Text
                    v-if="data.resume"
                    :class="$style['list-resume']"
                    :text="data.resume"/>
                <div :class="$style.btn">
                    <button @click="toWeb(data)">
                        前往網站
                    </button>
                </div>
            </div>
        </div>
    </Popup>
</template>

<style lang="scss" module>
.window-center {
    justify-content: center;
    display: flex;
}

.list-content {
    background: white;
    padding: 33px 40px 35px;
    width: 100%;
    max-width: 462px;
    position: relative;
    height: auto;
    max-height: 90dvh;
    box-sizing: border-box;
    overflow: auto;
    position: relative;
    scrollbar-width: none;
    img {
        width: 100%;
    }
}

.close {
    position: absolute;
    top: 13px;
    right: 13px;
    height: 25px;
    display: inline-block;
    transition: all 0.3s;
    width: 25px;
    border: none;
    overflow: hidden;
    background-color: transparent;
    cursor: pointer;

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 1px;
        background-color: #000000;
        border-radius: 5px;
        height: 32px;
        top: -4px;
        right: 12px;
    }

    &::before {
        transform: rotate(48deg);
    }

    &::after {
        transform: rotate(-48deg);
    }

    &:hover {
        opacity: 0.7;
    }
}

.window-title {
    display: flex;
    font-size: 16px;
    letter-spacing: 0.8px;
    color: #434343;
    align-items: center;
    margin-bottom: 20px;
}

.list-img {
    border: solid 1px #d0d0d0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    box-sizing: border-box;
    height: 80px;
    width: 80px;
    overflow: hidden;
    img {
        object-fit: cover;
        height: 100%;
    }
}

.list-resume {
    font-size: 15px;
    line-height: 30px;
    color: #2b2b2b;
}

.btn {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    button {
        cursor: pointer;
        width: 140px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #4d4d4d;
        color: #fff;
        font-size: 14px;
        transition: all 0.3s;
        &:hover {
            opacity: 0.8;
        }
    }
}
</style>
