<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useModelViewStore } from '@/stores/modelView';
import { useShoppingMain } from '@/composables/useShoppingMain';
import { axiosCreateServiceCart } from '@/utils/axios/point';
import Header from '@/components/Header.vue';
import Item from './components/Item.vue';
import Footer from '@/router/mobile/components/Footer.vue';

const {
    curPage
} = useShoppingMain();
const router = useRouter();
const modelViewStore = useModelViewStore();
const commonStore = useCommonStore();

const list = [
    {
        key: 'info',
        routerKey: 'mobile-model-view-info',
        name: '購買方案'
    }
];

const serviceList = computed(() => modelViewStore.serviceInformation);

function goPage(item) {
    if (item.key === curPage.value) {
        return;
    }

    curPage.value = item.key;

    if (item?.params) {
        router.push({ name: item.routerKey, params: item.params });
        return;
    }

    router.push({ name: item.routerKey });
}

function onBuy(item) {
    if (!item) return;

    // 1-先跳確認購買的彈窗
    commonStore.actionSetPopupInfo({
        type: 'confirm',
        value: {
            title: '是否確認購買此方案',
            content: `
                    您確定要購買此方案嗎？<br>
                    購買後將立即增加相應的金幣點數，並啟用此方案。`,
            confirmText: '確認購買',
            onConfirm: () => {
                // 2-點確認才呼叫 API
                axiosCreateServiceCart(item)
                    .then((response) => {
                        if (response.data.resultCode) {
                            commonStore.actionSetPopupInfo({
                                type: 'alert',
                                value: {
                                    title: '系統訊息',
                                    content: response.data.resultMessage
                                }
                            });
                            return;
                        }

                        // 購買成功彈窗
                        commonStore.actionSetPopupInfo({
                            type: 'alert',
                            value: {
                                title: '系統訊息',
                                content: '購買成功！',
                                onConfirm: () => {
                                    router.push({ name: 'mobile-model-view-info' });
                                }
                            }
                        });
                    })
                    .finally(() => {});
            }
        }
    });
}
</script>

<template>
    <div :class="$style['shop-wrap']">
        <Header>
            <template #title>
                <div
                    v-for="(item, index) in list"
                    :key="`bread-item-${item.key}`"
                    :class="$style['bread-item']"
                >
                    <div
                        :class="[$style['bread-text'], { [$style['is-current']]: item.key === curPage }]"
                        @click="goPage(item)"
                    >
                        {{ item.name }}
                    </div>
                    <div v-if="index < list.length - 1" :class="$style['bread-arrow']">
                        <FontAwesomeIcon :class="$style['icon-btn']" :icon="['fa', 'angle-right']" />
                    </div>
                </div>
            </template>
        </Header>
        <div :class="$style['info-wrap']">
            <div :class="$style['title-wrap']">
                <h6>
                    讓更多消費者看見你的活動
                </h6>
                <p>
                    透過 Brandoor 探索平台曝光你的活動資訊，讓正在搜尋相關服務的消費者更容易發現你的活動內容，提高品牌曝光與來客機會。
                </p>
            </div>
            <Item
                v-for="item in serviceList"
                :key="`info-item-${item.typeID}`"
                :class="$style['card-item']"
                :info="item"
                :buy-func="() => onBuy(item)"
            />
        </div>
    </div>
    <Footer />
</template>

<style lang="scss" module>
.shop-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.bread-item {
    display: flex;
    align-items: center;
}

.bread-text {
    display: flex;
    align-items: center;
    line-height: 22px;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    color: #9097a7;
    font-family: 'Noto Sans TC', sans-serif;

    &.is-current {
        cursor: default;
    }

    &.is-current,
    &:hover {
        color: #707793;
    }
}

.bread-arrow {
    margin: 0 8px;
    cursor: default;
    color: #9097a7;
}

.info-wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 0 21px 120px;
}

.title-wrap {
    width: 100%;
    color: #1C274C;
    margin: 0 19px 25px 8px;
    &::after {
        content: "";
        display: inline-block;
        width: 100%;
        height: 1px;
        background-color: #E5E5E5;
        box-shadow: 0 3px 4px rgba($color: #000000, $alpha: 0.15);
    }
    h6 {
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
        margin-bottom: 11px;
        margin-top: 0;
    }
    p {
        margin: 0;
        font-size: 12px;
        line-height: 22px;
        font-weight: 500;
        max-width: 481px;
    }
}
</style>
