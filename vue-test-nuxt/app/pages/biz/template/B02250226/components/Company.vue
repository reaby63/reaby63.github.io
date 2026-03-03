<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();

const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
</script>
<template>
    <div
        v-if="curPageData.basic?.info?.mobile || curPageData.basic?.info?.location || curPageData.basic?.logo?.[0] || curPageData.introduce?.company"
        :class="$style.company"
    >
        <div v-if="curPageData.introduce?.company" :class="$style.title">
            公司資訊
        </div>
        <div :class="$style.bottom">
            <div
                v-if="curPageData.basic?.logo?.[0]"
                :class="$style.left"
            >
                <ClientOnly>
                    <Image :img-src="commonStore.getImg(webID, curPageData.basic?.logo?.[0])"/>
                </ClientOnly>
            </div>
            <div :class="$style.right">
                <ul>
                    <li v-if="curPageData.introduce?.company">
                        {{ curPageData.introduce?.company }}
                    </li>
                    <li v-if="curPageData.basic?.info?.location">
                        <a
                            :href="`https://www.google.com/maps?q=${curPageData.basic?.info?.location}`"
                            :class="$style['list-link']"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {{ curPageData.basic?.info?.location }}
                        </a>
                    </li>
                    <li v-if="curPageData.basic?.info?.mobile">
                        <a :href="`tel:${curPageData.basic?.info?.mobile}`" title="撥打電話">
                            {{ curPageData.basic?.info?.mobile }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>

.company {
    padding: 30px 37px;
    background: url('/images/biz/B02250226/bg_company.png') center / cover no-repeat;
    background-position: center top;
    color: #fff;
}

.title {
    font-size: 17px;
    margin-bottom: 20px;
}

.bottom {
    display: flex;
}

.left {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 124px;
    height: 108px;
    margin-right: 26px;
    border: 1px solid #c9c9c9;
    background-color: #fff;
    img {
        box-sizing: border-box;
        max-width: 100%;
        max-height: 100%;
        padding: 13px 15px;
        width: 100%;
        height: 100%;
        object-fit: contain !important;
    }
}

.right {
    width: 100%;
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    li {
        padding: 12px 1px;
        border-bottom: solid 1px #cacaca;
        font-size: 15px;
        line-height: 1em;
        word-wrap: break-word;
        &:first-child {
            padding-top: 5px;
        }
        &:last-child {
            padding-bottom: 0;
            border-bottom: 0px;
        }
    }
    a {
        color: #fff;
        text-decoration: none;
        transition: all 0.3s;
        &:hover {
            opacity: 0.9;
        }
    }
}

@media (max-width: 375px) {
    .bottom {
        display: block;
    }

    .left {
        width: 100%;
        margin-right: 0px;
        margin: 0 0 13px 0;
        text-align: center;
        img {
            width: auto;
            height: 106px;
        }
    }

    .right {
        width: 100%;
    }
}
</style>
