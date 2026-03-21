<script setup>
import { watch, defineAsyncComponent } from 'vue';
import debounce from 'lodash/debounce';
import { useShoppingCheckout } from '@/composables/useShoppingCheckout';
import { useCommonStore } from '@/stores/common';
import { useModelViewStore } from '@/stores/modelView';

const components = {
    Field: defineAsyncComponent(() => import('@/components/modelView/Field.vue')),
    Select: defineAsyncComponent(() => import('@/components/modelView/Select.vue'))
};
const commonStore = useCommonStore();
const modelViewStore = useModelViewStore();
const {
    cartList,
    companyName,
    recommendName,
    errorMsg,
    errorDiscount,
    promotionId,
    payInfo,
    errorInfo,
    canSubmit,
    discountAmount,
    totalAmount,
    resultTotal,
    payFieldList,
    goPay,
    resultBindValue,
    checkRecommendId,
    checkDiscountId,
    checkCompanyName,
    checkBarcode,
    onInit
} = useShoppingCheckout();

watch(() => payInfo.recommendDefinedID, debounce((newValue) => {
    if (!newValue) {
        errorInfo.recommendDefinedID = false;
        recommendName.value = '';
        return;
    }

    checkRecommendId();
}, 1000));

watch(() => payInfo.discountID, debounce((newValue) => {
    if (!newValue) {
        errorInfo.discountID = false;
        return;
    }

    checkDiscountId();
}, 1000));

watch(() => payInfo.customerIdentifier, debounce((newValue) => {
    if (!newValue) {
        errorInfo.customerIdentifier = false;
        companyName.value = '';
        return;
    }

    checkCompanyName();
}, 1000));

watch(() => payInfo.carrierType, (newValue, oldValue) => {
    if (+newValue !== +oldValue) {
        payInfo.carrierNum = '';
        errorInfo.carrierNum = false;
        errorMsg.value = '';
    }
});

watch(() => payInfo.carrierNum, debounce((newValue) => {
    if (!newValue) {
        return;
    }

    if (+payInfo.carrierType === 2) {
        return;
    }

    checkBarcode();
}, 1000));

onInit();
</script>

<template>
    <div class="checkout-wrap clearfix">
        <div :class="$style['field-wrap']">
            <div :class="$style['title-text']">
                結帳資訊
            </div>
            <div :class="$style['field-item-wrap']">
                <div
                    v-for="item in payFieldList"
                    :key="`field-${item.key}`"
                    :class="[$style['component-field-item'], $style[`is-${item.key}`]]"
                >
                    <component
                        :is="components[item.componentType]"
                        v-model:model-value="payInfo[item.key]"
                        v-model:is-error="errorInfo[item.key]"
                        :class="$style['field-item']"
                        v-bind="resultBindValue(item)"
                        :is-disable="item.key === 'recommendDefinedID' && promotionId !== null"
                    />
                    <div
                        v-if="item.key === 'customerIdentifier' && (companyName || errorInfo.customerIdentifier)"
                        :class="[$style['company-title'], { [$style['is-error']]: errorInfo.customerIdentifier }]"
                    >
                        {{ errorInfo.customerIdentifier ? '查無公司' : companyName }}
                    </div>
                    <div
                        v-if="item.key === 'recommendDefinedID' && (recommendName || errorInfo.recommendDefinedID)"
                        :class="[$style['company-title'], { [$style['is-error']]: errorInfo.recommendDefinedID }]"
                    >
                        {{ errorInfo.recommendDefinedID ? '查無推薦人' : recommendName }}
                    </div>
                    <div
                        v-if="item.key === 'discountID' && (payInfo.discountID && errorInfo.discountID)"
                        :class="[$style['company-title'], { [$style['is-error']]: errorInfo.discountID }]"
                    >
                        {{ errorDiscount }}
                    </div>
                    <div
                        v-if="item.key === 'carrierNum' && (payInfo.carrierNum && errorInfo.carrierNum)"
                        :class="[$style['company-title'], { [$style['is-error']]: errorInfo.carrierNum }]"
                    >
                        {{ errorMsg }}
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style['shop-car-wrap']">
            <div :class="$style['car-wrap']">
                <div :class="$style['title-text']">
                    結帳明細
                </div>
                <div :class="$style['shop-item-wrap']">
                    <div
                        v-for="(item, index) in cartList"
                        :key="`shop-${index}`"
                        :class="$style['shop-item']"
                    >
                        <div :class="$style['shop-img']">
                            <img src="/image/modelView/info/product.svg">
                        </div>
                        <div :class="$style['shop-info-wrap']">
                            <div :class="$style['shop-title-wrap']">
                                <span>{{ item.content }}</span>
                                <span :class="$style['title-sub-text']">${{ item.total }}</span>
                            </div>
                            <div v-if="item.brandName === 'Project'" :class="$style['shop-sub-text']">
                                <span>ID：{{ modelViewStore.curPlanInfo.definedID }}</span>
                                <span>1</span>
                            </div>
                            <div v-else :class="$style['shop-sub-text']">
                                <span>{{ item.brandName }}</span>
                                <span>1</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div :class="$style['discount-wrap']">
                    <div :class="$style['discount-item']">
                        <div :class="$style['discount-item-title-wrap']">
                            <img src="/image/modelView/shopping/bx-receipt.svg">
                            <div :class="$style['discount-title-text']">
                                總計
                            </div>
                        </div>
                        <div>${{ totalAmount }}</div>
                    </div>
                    <div :class="$style['discount-item']">
                        <div :class="$style['discount-item-title-wrap']">
                            <img src="/image/modelView/shopping/bx-purchase-tag-alt.svg">
                            <div :class="$style['discount-title-text']">
                                折扣
                            </div>
                        </div>
                        <div>{{ discountAmount }}</div>
                    </div>
                </div>
                <div :class="$style['total-wrap']">
                    <span>總付款金額</span>
                    <span>${{ resultTotal }}</span>
                </div>
            </div>
            <div
                :class="[$style['feature-btn'], { [$style['is-disable']]: !canSubmit }, { [$style['is-loading']]: commonStore.isLoading }]"
                @click="goPay"
            >
                前往結帳
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.field-wrap {
    float: left;
    width: calc(100% - 372px - 20px);
    margin-right: 20px;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.03);
    border-radius: 0.75rem;
    background-color: #fff;
}

.title-text {
    box-sizing: border-box;
    height: 56px;
    line-height: 56px;
    padding: 0 24px;
    border-bottom: 1px solid #eaedf1;
    font-weight: 600;
}

.field-item-wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 1.5rem;
}

.component-field-item {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 1.5rem;

    &.is-carrierType {
        width: calc(50% - 4px);
        margin-right: 4px;
    }

    &.is-carrierNum {
        width: calc(50% - 4px);
        margin-left: 4px;
    }
}

.field-item {
    width: 100%;
}

.company-title {
    margin-top: 5px;
    font-size: 14px;
    color: #ff6c2f;

    &.is-error {
        color: #c13515;
    }
}

.shop-car-wrap {
    float: right;
    width: 372px;
}

.car-wrap {
    position: relative;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    max-height: 548px;
    padding-bottom: 62px;
    box-shadow: 0px 0px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 5px 12px 0px rgba(0, 0, 0, 0.13), 0px 1px 3px 0px rgba(0, 0, 0, 0.10);
    border-radius: 12px;
    background-color: #fff;
}

.shop-item-wrap {
    padding: 24px;
}

.shop-item {
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    &:last-child {
        margin-bottom: 0;
    }
}

.shop-img {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    margin-right: 12px;
    padding: 12px;
    border-radius: 12px;
    background: rgba(255, 108, 47, 0.10);
}

.shop-info-wrap {
    flex: 1;
}

.shop-title-wrap {
    display: flex;
    justify-content: space-between;
    line-height: 20px;
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: bold;
    color: #313b5e;
}

.title-sub-text {
    font-size: 14px;
    font-weight: normal;
    color: #313b5e;
}

.shop-sub-text {
    display: flex;
    justify-content: space-between;
    line-height: 14px;
    font-size: 14px;
    color: #5d7186;
}

.discount-wrap {
    padding: 0 24px 16px;
}

.discount-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 50px;
    font-size: 14px;
    border-bottom: 1px solid #EAEDF1;
    color: #313b5e;

    &:last-child {
        border-bottom: none;
    }
}

.discount-item-title-wrap {
    display: flex;
    align-items: center;
}

.discount-title-text {
    margin-left: 8px;
    color: #5d7186;
}

.total-wrap {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 62px;
    line-height: 62px;
    bottom: 0;
    padding: 0 24px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 0 0 12px 12px;
    color: #313b5e;
    background: rgba(255, 108, 47, 0.10);
}

.feature-btn {
    height: 42px;
    line-height: 42px;
    margin-top: 24px;
    padding: 0 16px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    transition: color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.03);
    border-radius: 12px;
    cursor: pointer;
    color: #fff;
    background-color: #ff6c2f;

    &:hover {
        background-color: #e6612a;
    }

    &.is-disable {
        opacity: 0.65;
        cursor: no-drop;
        background-color: #ff6c2f;
    }

    &.is-loading{
        opacity: 0.65;
        cursor: no-drop;
        background-color: #5D7186;
    }
}
</style>
