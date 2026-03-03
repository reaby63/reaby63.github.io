<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const webID = computed(() => commonStore.userInfo?.webID || '');
const openAbout = computed(() =>
    curPageData.value.basic?.image?.[0] ||
    curPageData.value.basic.info?.name ||
    curPageData.value.basic.info?.profession ||
    curPageData.value.introduce?.resume
);
</script>

<template>
    <div v-if="openAbout" :class="$style.info">
        <div v-if="curPageData.basic?.image?.[0]" :class="$style['info-left']">
            <div :class="$style['info-photo']">
                <ClientOnly>
                    <Image
                        :img-src="commonStore.getImg(webID, curPageData?.basic?.image?.[0])"
                        :has-zoom="true"
                    />
                </ClientOnly>
            </div>
        </div>
        <div>
            <div v-if="curPageData.basic?.info?.name" :class="$style['info-name']">
                {{ curPageData.basic.info?.name }}
            </div>
            <div v-if="curPageData.basic?.info?.profession" :class="$style['info-tag']">
                <span :class="$style['info-tag-line']" />
                <span>
                    {{ curPageData.basic?.info?.profession }}
                </span>
            </div>
            <Text
                v-if="curPageData.introduce?.resume"
                :class="$style['info-content']"
                :text="curPageData.introduce?.resume"
            />
        </div>
        <div :class="$style['info-img']">
            <img src="/images/biz/B06250411/info_dialog.png">
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.info {
    display: flex;
    background-color: #FFD600;
    border-radius: 50px 0 50px 0;
    padding: 62px 35px;
    position: relative;
}

.info-left {
    margin-right: 40px;
}

.info-photo {
    width: 200px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 2px #000000;
    border-radius: 20px;
    overflow: hidden;
    box-sizing: border-box;

    img {
        height: 100%;
        width: 100%;
    }
}

.info-name {
    font-size: 20px;
    line-height: 1.6;
    letter-spacing: 2px;
}

.info-tag {
    font-size: 16px;
    line-height: 1.6;
    letter-spacing: 2px;
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;
    top: -9px;

    span {
        display: inline-flex;

        &.info-tag-line {
            flex: 1;
            height: 1px;
            background-color: #000000;
            margin-right: 25px;
        }

        &:last-child {
            justify-content: flex-end;
            white-space: nowrap;
        }
    }
}

.info-content {
    margin-top: 14px;
    font-size: 15px;
    line-height: 1.8;
    letter-spacing: 2px;
}

.info-img {
    position: absolute;
    bottom: -32px;
    right: 35px;
    line-height: 0;

    img {
        width: 96px;
    }
}

@media (max-width:501px) {
    .info {
        flex-wrap: wrap;
        padding: 55px 33px;
        padding-bottom: 48px;
    }

    .info-left {
        margin-right: 0;
        width: 100%;
        justify-content: center;
        display: flex;
    }

    .info-name {
        text-align: center;
        margin-top: 15px;
        margin-bottom: 5px;
    }

    .info-tag {
        position: initial;
        justify-content: center;
        border-top: solid 1px #000000;
        padding-top: 5px;

        span {
            &.info-tag-line {
                display: none;
            }
            &:last-child {
                justify-content: center;
                min-width: auto;
            }
        }
    }

    .info-content {
        margin-top: 24px;
        font-size: 15px;
    }

    .info-img {
        right: 22px;
    }

}

@media (max-width:330px) {
    .info {
        padding: 55px 25px;
        padding-bottom: 48px;
    }
    .info-content {
        margin-top: 15px;
    }
}
</style>
