<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
const serveList = computed(() => commonStore.getPageInfo.serveDetail || {});
</script>

<template>
    <div v-if="curPageData.serveSetting?.titleEn || curPageData.serveSetting?.title || serveList?.length" :class="$style.serve">
        <div v-if="curPageData.serveSetting?.titleEn || curPageData.serveSetting?.title" :class="$style.title">
            <div :class="$style['title-left']">
                <span>
                    {{ curPageData.serveSetting?.titleEn }}
                </span>
                <span :class="$style['title-left-line']" />
            </div>
            <div :class="$style['title-right']">
                <span :class="$style['title-right-line']" />
                <span>
                    {{ curPageData.serveSetting?.title }}
                </span>
            </div>
        </div>
        <div v-if="serveList?.length" :class="$style.content">
            <div
                v-for="(serveSelf,index) in serveList"
                :key="serveSelf"
                :class="$style.list"
            >
                <div :class="$style['list-title']">
                    {{ index + 1 }}.
                </div>
                <div :class="$style['list-content']">
                    <div v-if="serveSelf.title">
                        {{ serveSelf.title }}
                    </div>
                    <Text
                        v-if="serveSelf.link"
                        :text="serveSelf.link"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.serve {
    padding: 0 76px;
    padding-top: 34px;
    margin-top: 80px;
    margin-bottom: 54px;
    position: relative;

    &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        background-color: #FFD600;
        width: 401px;
        height: 415px;
        z-index: 0;
        border-radius: 20px;
    }
}

.title {
    z-index: 1;
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 38px;
}

.title-left,
.title-right {
    align-items: center;
    display: inline-flex;

    span {
        display: inline-flex;
        font-size: 20px;
        line-height: 1.6;
    }
}

.title-left {
    width: calc( 100% - 401px + 76px );
    span {
        color: #ffffff;
        letter-spacing: 3px;
        font-family: "Freeman", sans-serif;
    }
}

.title-left-line {
    flex: 1;
    height: 1px;
    background-color: #ffffff;
    margin-left: 30px;
}

.title-right {
    flex: 1;
    span {
        letter-spacing: 2px;
    }
}

.title-right-line {
    flex: 1;
    height: 1px;
    background-color: #000000;
    margin-right: 30px;
}

.content {
    display: flex;
    flex-wrap: wrap;
    z-index: 1;
    position: relative;
}

.list {
    display: inline-block;
    background-color: #FFFFFF;
    border: solid 1px #000000;
    border-radius: 20px 0 20px 0;
    box-sizing: border-box;
    margin-right: 25px;
    margin-bottom: 26px;
    width: calc( ( 100% - 25px ) / 2 );

    &:nth-child(2n){
        margin-right: 0;
    }
}

.list-title {
    font-size: 40px;
    line-height: 1.6;
    letter-spacing: 2px;
    text-align: center;
    margin-bottom: 12px;
    border-bottom: solid 1px #000000;
    font-family: "Limelight", sans-serif;
    padding-left: 2px;
    padding-bottom: 12px;
}

.list-content {
    line-height: 28.7px;
    letter-spacing: 2px;

    div {
        margin: 12px 10px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
    }

    p {
        font-size: 15px;
        margin: 0 19.25px;
        margin-bottom: 45px;
        p {
            margin: 0;
            padding: 0;
        }
    }
}

@media (max-width:600px) {
    .serve {
        &::before {
            width: 320px;
        }
    }
    .title-left {
        width: calc(100% - 320px + 75px);
    }
}

@media (max-width:553px) {
    .serve {
        &::before {
            width: 276px;
        }
    }
    .title-left {
        width: calc(100% - 276px + 75px);
    }
}

@media (max-width:501px) {
    .serve {
        padding: 0 56px;
        padding-top: 35px;
        margin-top: 72px;
    }
    .title-left-line {
        margin-left: 5px;
    }
    .title-right-line {
        margin-right: 5px;
    }

    .list {
        display: block;
        width: 100%;
        margin-right: 0;
        margin-bottom: 15px;
    }
    .list-title {
        font-size: 32px;
    }
    .list-content {
        div {
            font-size: 15px;
        }
        p {
            margin: 0 38.5px;
            margin-bottom: 45px;
            font-size: 14px;
        }
    }

    .serve {
        &::before {
            width: 230px;
            height: 770px;
        }
    }

    .title-left {
        width: calc(100% - 230px + 56px);
    }

    .title-left,
    .title-right {
        span {
            font-size: 16px;
        }
    }
}

@media (max-width:430px) {
    .serve {
        &::before {
            width: 177px;
        }
    }
    .title-left {
        width: calc(100% - 177px + 56px);
    }
}

@media (max-width:330px) {
    .serve {
        padding: 0 25px;
        padding-top: 35px;
    }
    .title-left {
        width: calc(100% - 177px + 25px);
    }
}
</style>
