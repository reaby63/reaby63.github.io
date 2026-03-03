<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();

const curPageData = computed(() => commonStore.getPageInfo);
</script>

<template>
    <div :class="$style.service">
        <div v-if="curPageData?.serveSetting?.subTitle" :class="$style.subtitle">
            {{ curPageData?.serveSetting?.subTitle }}
        </div>
        <Text
            v-if="curPageData?.serveSetting?.title"
            :class="$style.title"
            :text="curPageData?.serveSetting?.title"
        />
        <div v-if="curPageData?.serveDetail" :class="$style['ser-list']">
            <div
                v-for="(item,index) in curPageData?.serveDetail"
                :key="index"
                :class="$style['ser-list-self']"
            >
                <div :class="$style['ser-title']">
                    {{ item?.title }}
                </div>
                <Text
                    :class="$style['ser-content']"
                    :text="item?.link"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.service {
    padding-top: 40px;
    background: linear-gradient(to bottom,
    #F8F8F8 0%,
    #F8F8F8 50%,
    #FFFFFF 100%);
    .subtitle {
        color: #947F73;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 4px;
        margin-bottom: 15px;
        margin-left: 60px;
        margin-right: 56px;
        line-height: 22px;
    }
    .title {
        font-weight: 600;
        font-size: 32px;
        line-height: 50px;
        letter-spacing: 7px;
        margin-left: 60px;
        margin-right: 53px;
        margin-bottom: 80px;
    }
}

.ser-list {
    margin: 0 60px;
    .ser-list-self {
        display: flex;
        padding-bottom: 60px;
        border-bottom: solid 1px #DFDFDF;
        margin-bottom: 60px;
        &:last-child {
            border: 0;
            margin-bottom: 0;
        }
        .ser-title {
            font-weight: 600;
            font-size: 18px;
            line-height: 28px;
            letter-spacing: 1px;
            width: 132px;
            margin-right: 60px;
            overflow-wrap: break-word;
            word-break: break-word;
            word-wrap: break-word;
        }
        .ser-content {
            width: calc( 100% - 132px - 60px );
            font-family: "MiSans TC", Arial, sans-serif;
            color: #221D1AB2;
            line-height: 28px;
            letter-spacing: 2px;
            overflow-wrap: break-word;
            word-break: break-word;
            word-wrap: break-word;
        }
    }
}

@media (max-width:600px) {
    .ser-list {
        .ser-list-self {
            display: block;
            .ser-title {
                margin-right: 0;
                width: auto;
                margin-bottom: 20px;
            }
            .ser-content {
                width: 100%;
            }
        }
    }
}

</style>
