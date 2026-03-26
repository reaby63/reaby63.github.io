<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import { useShoppingMain } from '@/composables/useShoppingMain';
import Item from './components/Item.vue';
import CheckoutView from './page/CheckoutView.vue';

const {
    curType,
    curPage,
    priceTypeList,
    resultProjectList,
    curStyleType,
    onAdd,
    onInit
} = useShoppingMain();
const route = useRoute();
const router = useRouter();

const navList = computed(() => {
    const list = [
        {
            key: 'info',
            routerKey: 'model-view-info',
            name: '網站方案'
        },
        {
            key: 'choose',
            routerKey: 'model-view-shopping',
            name: '選擇方案',
            params: {
                pageName: 'choose'
            }
        }
    ];

    if (route.params.pageName === 'checkout') {
        list.push({
            key: 'checkout',
            routerKey: 'model-view-shopping',
            name: '結帳確定',
            params: {
                pageName: 'checkout'
            }
        });
    }

    return list;
});

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

onInit();
</script>

<template>
    <div :class="$style['pay-wrap']">
        <Header>
            <template #title>
                <div
                    v-for="(item, index) in navList"
                    :key="`bread-item-${item.key}`"
                    :class="$style['bread-item']"
                >
                    <div
                        :class="[$style['bread-text'], { [$style['is-current']]: item.key === curPage }]"
                        @click="goPage(item)"
                    >
                        {{ item.name }}
                    </div>
                    <div v-if="index < navList.length - 1" :class="$style['bread-arrow']">
                        <FontAwesomeIcon :class="$style['icon-btn']" :icon="['fa', 'angle-right']" />
                    </div>
                </div>
            </template>
        </Header>
        <CheckoutView v-if="route.params.pageName === 'checkout'" />
        <template v-else>
            <div :class="$style['nav-wrap']">
                <div :class="$style['nav-item-wrap']">
                    <div
                        v-for="item in priceTypeList"
                        :key="`nav-item-${item.key}`"
                        :class="[$style['nav-item'], { [$style['is-current']]: item.key === curType }]"
                        @click="curType = item.key"
                    >
                        {{ item.name }}
                    </div>
                </div>
            </div>
            <div :class="$style['info-wrap']">
                <Item
                    v-for="item in resultProjectList"
                    :key="`info-item-${item.priceID}`"
                    :class="$style['info-item']"
                    :info="item"
                    :type="curType"
                    :style-type="curStyleType(item)"
                    :add-func="onAdd"
                />
            </div>
        </template>
    </div>
</template>

<style lang="scss" module>
.pay-wrap {
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

.nav-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 28px;
}

.nav-item-wrap {
    display: flex;
    justify-content: center;
    padding: 0 6px;
    line-height: 40px;
    padding: 6px;
    box-sizing:border-box;
    border-radius: 12px;
    background: #fff;
    background: linear-gradient(0deg, #FFF 0%, #FFF 100%), linear-gradient(0deg, #F8F9FA 0%, #F8F9FA 100%), #EEF2F7;
}

.nav-item {
    min-width: 75px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 8px;
    color: #707793;
    line-height: 38px;
    &.is-current,
    &:hover {
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.03);
        border: 1px solid #FF6C2F;
        color: #fff;
        background: #FF6C2F;
        line-height: 36px;
    }
}

.info-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
}

.info-item {
    width: calc((100% - (28px * 2)) / 3);
}
</style>
