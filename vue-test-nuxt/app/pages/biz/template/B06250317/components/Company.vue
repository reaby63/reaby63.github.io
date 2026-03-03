<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const webId = computed(() => commonStore.userInfo.webID || '');

const hasCompanyInfo = computed(() => {
    return commonStore.getPageInfo.basic.info.title ||
        commonStore.getPageInfo.basic.info.mobile ||
        commonStore.getPageInfo.basic.info.location ||
        commonStore.getPageInfo.basic.logo?.[0];
});
</script>

<template>
    <div
        v-if="hasCompanyInfo"
        :class="$style.company"
    >
        <div :class="$style.title">
            <span>公司資訊</span>
        </div>
        <div :class="$style.contain">
            <div v-if="commonStore.getPageInfo.basic.logo?.[0]" :class="$style.left">
                <ClientOnly>
                    <Image :class="$style['img-wrap']" :img-src="commonStore.getImg(webId, commonStore.getPageInfo.basic.logo[0])"/>
                </ClientOnly>
            </div>
            <div :class="$style.right">
                <ul>
                    <li v-if="commonStore.getPageInfo.basic.info.title">
                        {{ commonStore.getPageInfo.basic.info.title }}
                    </li>
                    <li v-if="commonStore.getPageInfo.basic.info.mobile">
                        <a :href="`tel:${commonStore.getPageInfo.basic.info.mobile}`" title="撥打電話">
                            {{ commonStore.getPageInfo.basic.info.mobile }}
                        </a>
                    </li>
                    <li v-if="commonStore.getPageInfo.basic.info.location">
                        <a
                            :href="`https://www.google.com/maps?q=${commonStore.getPageInfo.basic.info.location}`"
                            :class="$style['list-link']"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {{ commonStore.getPageInfo.basic.info.location }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.company {
    padding: 0 35px 44px 35px;
    position: relative;
    z-index: 3;
}

.title {
    font-weight: 600;
    margin-bottom: 18px;
    font-size: 20px;
    color: #fff;
    letter-spacing: 1px;
    line-height: 32px;
}

.contain {
    display: flex;
    align-items: center;
}

.left {
    width: 100px;
    height: 100px;
    margin-right: 25px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    .img-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        padding: 13px 15px;
        width: auto;
        max-width: 100%;
        max-height: 100%;
        box-sizing: border-box;
    }
}

.right {
    width: 100%;
    flex: 1;
    margin-right: 43px;

    ul {
        margin-top: -2px;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            padding: 10px 0;
            border-bottom: solid 0.5px rgba(255, 255, 255, 0.5019607843);
            font-size: 15px;
            word-wrap: break-word;
            color: #fff;
            font-weight: lighter;
            letter-spacing: 1px;
            line-height: 1.1;

            &:first-child {
                padding: 0 0 10px 0;
            }

            &:last-child {
                padding-bottom: 0;
                border-bottom: 0;
            }

            a {
                color: #fff;
                text-decoration: none;
                transition: all 0.3s;
                font-weight: lighter;

                &:hover {
                    opacity: 0.9;
                }
            }
        }
    }
}

@media (max-width:500px) {
    .company {
        padding: 0 20px 85px 20px;
    }
    .contain {
        display: block;
    }

    .left {
        width: 100%;
        margin-right: 0;
        margin-bottom: 20px;
        text-align: center;
        height: 120px;
    }
    .right {
        width: calc(100% - 65px);
    }
}

@media (max-width: 375px) {
    .contain {
        display: block;
    }

    .left {
        width: 100%;
        margin-right: 0;
        margin-bottom: 20px;
        text-align: center;
    }

    .right {
        width: 100%;
    }
}
</style>
