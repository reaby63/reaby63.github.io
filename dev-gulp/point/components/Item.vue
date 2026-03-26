<script setup>
import { ref, computed, useCssModule, onMounted, onUnmounted } from 'vue';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const props = defineProps({
    info: {
        type: Object,
        required: true
    },
    buyFunc: {
        type: Function,
        required: true
    }
});
const $style = useCssModule();

// 算出剩餘優惠時間
dayjs.extend(duration);

const now = ref(dayjs());

let timer = null;

const remainTimeText = computed(() => {
    if (!props.info?.endDateTime) return '';

    const end = dayjs(props.info.endDateTime);
    const diff = end.diff(now.value);

    if (diff <= 0) return '已結束';

    const duration = dayjs.duration(diff);

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();

    return `剩餘 ${days} 天 ${hours} 小時 ${minutes} 分鐘`;
});

onMounted(() => {
    timer = setInterval(() => {
        now.value = dayjs();
    }, 60000); // 每分鐘更新
});

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
    <!-- 原始色為周方案 月方案:plan-mounth 年方案:plan-year 限時優惠:plan-discount  -->
    <div :class="[$style['card-item'] , { [$style['plan-mounth']] : info.typeID === 1 }, { [$style['plan-discount']] : info.typeID === 2 }]">
        <!-- 右上角小tag -->
        <div v-if="info.tag" :class="$style['card-tag']">
            {{ info.tag }}
        </div>
        <!-- 標題 -->
        <div :class="$style['title']">
            {{ info.title }}
        </div>
        <div :class="$style['contain']">
            <div :class="$style['contain-left']">
                <div :class="$style['point']">
                    <span v-if="info.originalPoint">
                        特價
                    </span>
                    {{ info.point }}
                    <span>
                        點
                    </span>
                </div>
                <div v-if="info.originalPoint" :class="$style['point-original']">
                    <span>原價</span>
                    {{ info.originalPoint }}
                    <span>點</span>
                </div>
                <div v-if="info.originalPoint" :class="$style['point-discount']">
                    <img src="/image/modelView/shopping/timeline-icon.svg">
                    <span>
                        限時優惠
                    </span>
                    <span>
                        {{ remainTimeText }}
                    </span>
                </div>
            </div>
            <!-- 方案說明列表 目前尚無資料 以後有了再補 -->
            <!-- <div :class="$style['contain-right']">
                <div>
                    活動曝光 30 天
                </div>
            </div> -->
        </div>
        <div :class="$style['bottom']">
            <div>
                使用期限
                <span>
                    {{ dayjs(info.startDateTime).format('YYYY.MM.D') }} - {{ dayjs(info.endDateTime).format('YYYY.MM.D') }}
                </span>
            </div>
            <div :class="$style['btn-buy']" @click="buyFunc">
                立即購買
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>

.card-item {
    padding: 18px 0;
    border: solid 1px #EAEDF1;
    box-shadow: 0px 4px 4px 0px #00000040;
    background-color: #fff;
    position: relative;
    width: 100%;
    margin-bottom: 19px;
    .card-tag {
        position: absolute;
        top: 12px;
        right: -11px;
        color: #fff;
        background-color: #2859C5;
        font-size: 12px;
        line-height: 10px;
        font-weight: 700;
        padding: 10px 16px 11px 19px;
        border-radius: 8px 0 0 8px;
        &:after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-right: 8px solid transparent;
            border-top: 10px solid;
            right: 2px;
            bottom: -10px;
            border-top-color: #19429b;
        }
    }
    .title {
        font-size: 16px;
        font-weight: 700;
        line-height: 22px;
        margin: 0 28px;
        color: #2859C5;
    }
    .contain {
        display: flex;
        margin: 0 28px 30px;
        color: #1C274C;
        min-height: 140px;
        .contain-left {
            font-weight: 700;
            margin-right: 40px;
            .point {
                font-size: 53px;
                span {
                    font-size: 20px;
                }
            }
            .point-original {
                font-size: 21px;
                color: #313B5E;
                position: relative;
                margin-left: 7.5px;
                line-height: 10px;
                span {
                    font-size: 13px;
                }
                &:before {
                    content: "";
                    display: block;
                    height: 0.5px;
                    width: 102px;
                    background-color: #313B5E;
                    position: absolute;
                    top: 6px;
                    left: -7.5px;
                }
            }
            .point-discount {
                margin-top: 20px;
                color: #2859C5;
                font-size: 12px;
                display: flex;
                align-items: center;
                span {
                    margin-left: 6px;
                }
            }
        }
        .contain-right {
            padding-left: 39px;
            font-size: 12px;
            color: #1C274C;
            line-height: 20px;
            position: relative;
            &::after {
                content: "";
                display: block;
                width: 1px;
                height: 114.5px;
                background-color: #D9E2F4;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
    .bottom {
        display: flex;
        justify-content: space-between;
        padding: 15px 0 6px;
        margin: 0 16px;
        border-top: solid 1px #D9E2F4;
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
        color: #1C274C;
        align-items: center;
        color: #1C274C;
        .btn-buy {
            color: #fff;
            display: inline-block;
            background-color: #2859C5;
            border-radius: 30px;
            font-size: 12px;
            line-height: 25px;
            font-weight: 700;
            padding: 4.5px 34.5px;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
                filter: brightness(1.08);
            }
        }
    }
}

// 月方案
.card-item {
    &.plan-mounth {
        .title {
            color: #059526;
        }
        .bottom {
            .btn-buy {
                background-color: #059526;
            }
        }
    }
}

// 年方案
.card-item {
    &.plan-year {
        .card-tag {
            background-color: #F9B931;
            box-shadow: 2px 5px 10px 0px #FF6C2F4D;
            &:after {
                border-top-color: #D95C28;
            }
        }
        .title {
            color: #840086;
        }
        .bottom {
            .btn-buy {
                background-color: #840086;
            }
        }
    }
}

// 限時優惠方案
.card-item {
    &.plan-discount {
        .card-tag {
            background-color: #FF6C2F;
            box-shadow: 2px 5px 10px 0px #FF6C2F4D;
            &:after {
                border-top-color: #D95C28;
            }
        }
        .title {
            color: #FF6C2F;
        }
        .bottom {
            .btn-buy {
                background-color: #FF6C2F;
            }
        }
    }
}
</style>
