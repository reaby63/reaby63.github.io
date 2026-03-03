<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');

const serveList = computed(() => commonStore.getPageInfo.serveDetail || []);
const serveImg = computed(() =>
    serveList.value.length ||
    curPageData.value.serveSetting?.title ||
    curPageData.value.serveContent?.content
);
</script>

<template>
    <div
        v-if="serveList.length ||
            curPageData.serveSetting?.title ||
            curPageData.serveContent?.content"
        :class="$style['portfolio']"
    >
        <div :class="$style['serve']">
            <img
                v-if="serveImg && curPageData.productFirstList?.length"
                :class="$style['serve-img']"
                src="/images/biz/B02250313/c-serve.svg"
            >
            <div v-if="serveList.length || curPageData.serveSetting?.title" :class="$style['serve-in']">
                <div :class="$style['serve-in-img']">
                    <ClientOnly>
                        <img v-if="curPageData.serveSetting?.serveImg?.[0]" :src="commonStore.getImg(webID, curPageData.serveSetting?.serveImg?.[0])">
                        <img v-else src="/images/biz/B02250313/serve.png">
                    </ClientOnly>
                </div>
                <div :class="$style['serve-in-content']">
                    <div :class="$style['serve-title']">
                        <span>
                            {{ curPageData.serveSetting?.title }}
                        </span>
                    </div>
                    <div
                        v-for="(item , index) in serveList"
                        :key="index"
                        :class="$style['serve-in-list']"
                    >
                        <span :class="$style.num">
                            {{ (index + 1) < 10 ? '0' + (index + 1) : index + 1 }}.
                        </span>
                        <span :class="$style.content">
                            {{ item.content }}
                        </span>
                        <img src="/images/biz/B02250313/c-serve-in.svg">
                    </div>
                </div>
            </div>
            <Text
                v-if="curPageData.serveSetting?.content"
                :class="$style['serve-bottom']"
                :text="curPageData.serveSetting?.content"
            />
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

img {
    width: 100%;
}

.portfolio {
    background-image: url('/images/biz/B02250313/bg_02.jpg');
    background-size: cover; /* 寬度100%，高度50% */
    background-position: top; /* 讓背景對齊上方 */
    padding: 0 35px;
    padding-bottom: 48px;
    position: relative;
}

.serve {
    color: #ffffff;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 2s;
    opacity: 0;
}

.serve-img {
    margin-bottom: 20px;
    height: 8px;
    object-fit: cover;
}

.serve-in {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
}

.serve-in-img {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 26px;
    border-radius: 30px;
    border: solid 3px #ffffff;
    box-sizing: border-box;
    aspect-ratio: 353 / 270;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.serve-in-content {
    width: 100%;
    margin-left: 0;
}

.serve-title {
    margin-bottom: 7px;
    margin-left: 0;
    font-family: "Iansui", sans-serif;
    font-size: 20px;
    line-height: 22.5px;
}
.serve-in-list {
    line-height: 23px;
    display: flex;
    flex-wrap: wrap;
    .content,
    .num {
        font-size: 15px;
        padding-top: 3.5px;
        padding-bottom: 4.5px;
        display: inline-block;
        vertical-align: top;
        font-weight: 300;
        width: calc(100% - 27px);
    }
    .num {
        font-style: italic;
        width: 26.4px;
        font-family: "Klee One" , sans-serif;
        font-weight: 400;
        font-size: 16px;
        position: relative;
        top: -1.1px;
    }
    img {
        height: 6px;
        object-fit: cover;
    }
}
.serve-in-list {
    &:first-child {
        .content,
        .num {
            padding-top: 0;
        }
    }
}
.serve-in-list {
    &:last-child {
        .content,
        .num {
            padding-bottom: 0;
        }
        img {
            display: block;
        }
    }
}

.serve-bottom {
    margin-top: 10px;
    font-size: 15px;
    font-weight: 400;
    line-height: 30px;
}

@media (min-width:640px) {
    .serve-in-img {
        width: 220px;
        margin-bottom: 0;
        height: fit-content;
    }

    .serve-in-content {
        width: calc( 100% - 220px - 25px );
        margin-left: 25px;
    }

    .serve-in-list {
        &:last-child {
            img {
                display: none;
            }
        }
    }
}
</style>
