<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed, useCssModule } from 'vue';

const props = defineProps({
    info: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        default: 'month'
    },
    styleType: {
        type: String,
        default: 'green',
        validator: (value) => ['white', 'green', 'orange'].includes(value)
    },
    addFunc: {
        type: Function,
        required: true
    }
});
const $style = useCssModule();

const imgSrc = computed(() => {
    if (props.styleType === 'white') {
        return '/image/modelView/shopping/star.svg';
    }

    if (props.styleType === 'orange') {
        return '/image/modelView/shopping/crown.svg';
    }

    return '/image/modelView/shopping/medal_star.svg';
});
const remarkList = computed(() => props.info.priceID === 1 ? props.info.remarks : props.info[`${props.type}Remarks`]);

const getAmount = (info) => {
    if (props.type === 'year') {
        const discount = info.yearDiscount < 100 ? (info.yearDiscount / 100) : 1;
        return info.year * discount;
    }

    if (props.type === 'quarter') {
        const discount = info.quarterDiscount < 100 ? (info.quarterDiscount / 100) : 1;
        return info.quarter * discount;
    }

    const discount = info.monthDiscount < 100 ? (info.monthDiscount / 100) : 1;
    return info.month * discount;
};
const amountClass = (info) => ({
    [$style['amount-text']]: true,
    [$style['is-discount']]: isShowTag(info)
});
const isShowTag = (info) => info[`${props.type}Discount`] && (info[`${props.type}Discount`] >= 1 && info[`${props.type}Discount`] <= 69);
const onClick = (item) => {
    props.addFunc({
        ...item,
        monthType: props.type
    });
};
</script>

<template>
    <div :class="[$style['info-item'], $style[`is-${styleType}`]]">
        <div>
            <div
                v-if="isShowTag(info)"
                :class="$style['type-tag']"
            >
                熱門
            </div>
            <div :class="$style['title-text']">
                <img :src="imgSrc" :class="$style['title-img']">
                {{ info.title }}
            </div>
            <div :class="$style['amount-wrap']">
                <div :class="$style['amount-item']">
                    <span :class="amountClass(info)">${{ getAmount(info) }}</span>
                    <del
                        v-if="getAmount(info) !== info[type]"
                        :class="$style['del-text']"
                    >
                        {{ info[type] }}
                    </del>
                    <div v-if="info.priceID !== 1 && info[`${type}Discount`] !== 100" :class="$style['discount-tag']">
                        <img :class="$style['discount-img']" src="/image/modelView/shopping/sale.svg">
                        <span>特惠 {{ info[`${type}Discount`] / 10 }} 折</span>
                    </div>
                </div>
            </div>
            <div :class="$style['tip-wrap']">
                <div
                    v-for="(item, index) in remarkList"
                    :key="`tip-${index}`"
                    :class="$style['tip-item']"
                >
                    <div :class="$style['tip-title']">
                        <FontAwesomeIcon :class="$style['tip-icon']" :icon="['fa', 'circle-info']" />
                        {{ item.name }}：
                    </div>{{ item.text }}
                </div>
            </div>
        </div>
        <div :class="$style['add-btn']" @click="onClick(info)">
            <FontAwesomeIcon :class="$style['icon-shopping']" :icon="['fa', 'cart-shopping']" />
            新增
        </div>
    </div>
</template>

<style lang="scss" module>
.info-item {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.03);
    border-radius: 12px;
    background: #dcf4f3;

    &.is-white {
        background: #fff;
    }

    &.is-orange {
        background-color: #ffe2d5;
    }

    &:nth-child(3n) {
        margin-right: 0;
    }
}

.type-tag {
    position: absolute;
    padding: 5px 12px;
    top: 12px;
    right: -10px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 13px 5px 10px rgba(255, 108, 47, 0.3);
    border-radius: 0.5rem 0 0 0.5rem;
    color: #fff;
    background-color: #ff6c2f;

    &:before {
        content: "";
        position: absolute;
        margin-bottom: -10px;
        border-style: solid;
        border-width: 10px;
        border-left: 0 solid transparent;
        bottom: -10px;
        right: 0;
        border-color: #d95c28 transparent transparent;
    }
}

.title-text {
    display: flex;
    align-items: center;
    line-height: 18px;
    margin-bottom: 24px;
    font-size: 16px;
    font-weight: bold;
    color: #313b5e;
}

.title-img {
    margin-right: 8px;
}

.amount-wrap {
    margin-bottom: 24px;
}

.amount-item {
    position: relative;
    display: flex;
    align-items: center;
    line-height: 32px;
    font-size: 14px;
    color: #5d7186;
}

.amount-text {
    font-size: 36px;
    font-weight: bold;
    color: #4ecac2;

    .is-white & {
        color: #313b5e;
    }

    .is-orange & {
        color: #313b5e;
    }

    &.is-discount {
        color: #ff6c2f;
    }
}

// 優惠價格
.del-text {
    line-height: 1.5rem;
    margin-left: 0.5rem;
    font-size: 14px;
    color: #5d7186;
}

.discount-tag {
    position: absolute;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    height: 32px;
    margin-top: -16px;
    padding: 0 8px;
    top: 50%;
    right: 0;
    font-size: 12px;
    font-weight: bold;
    border-radius: 4px;
    border: 1px solid rgba(239, 95, 95, 0.20);
    color: #ef5f5f;
    background: rgba(239, 95, 95, 0.05);
    background: linear-gradient(0, rgba(239, 95, 95, 0.05) 0%, rgba(239, 95, 95, 0.05) 100%), #FFF;
}

.discount-img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
}

.tip-wrap {
    margin-top: 5px;
}

.tip-item {
    display: flex;
    font-size: 14px;
    color: #313b5e;
}

.tip-title {
    flex-shrink: 0;
}

.tip-icon {
    margin-right: 6px;
}

.add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 40px;
    margin-top: 24px;
    font-size: 14px;
    transition: color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
    cursor: pointer;
    border: 1px solid #4ecac2;
    border-radius: 12px;
    color: #fff;
    background: #4ecac2;

    &:hover {
        border: 1px solid #46b6af;
        background-color: #46b6af;
    }

    .is-white & {
        border: 1px solid #ff6c2f;
        color: #ff6c2f;
        background: #fff;

        &:hover {
            color: #fff;
            background-color: #ff6c2f;
        }
    }

    .is-orange & {
        border: 1px solid #ff6c2f;
        color: #fff;
        background-color: #ff6c2f;

        &:hover {
            border-color: #e6612a;
            background-color: #e6612a;
        }
    }
}

.icon-shopping {
    margin-right: 0.375rem;
}
</style>
