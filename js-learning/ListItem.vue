<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import {
    axiosExploreIsShowEnable,
    axiosExploreIsAutoDebit,
    axiosExploreIsEnable
} from '@/utils/axios/explore';
import { useModelViewInfo } from '@/composables/useModelViewInfo';
import { useModelViewStore } from '@/stores/modelView';
import { useCommonStore } from '@/stores/common';
import WebInfo from './WebInfo.vue';

const props = defineProps({
    list: {
        type: Array,
        default: () => ([])
    },
    webEdit: {
        type: Function,
        default: () => {}
    },
    callbackFunc: {
        type: Function,
        default: () => {}
    }
});

const commonStore = useCommonStore();
const modelViewStore = useModelViewStore();
const router = useRouter();
const {
    goView,
    canModify,
    isCheckBuy,
    canShowHistory,
    onAdd
} = useModelViewInfo();

// 卡片編輯頁面
function cardEdit(info) {
    modelViewStore.actionSetCurCardEditData(info);

    router.push({
        name: 'model-view-cardEdit'
    });
}

const option = [
    {
        name: '品牌名片',
        objKey: 'title',
        minWidth: 250
    },
    {
        name: '到期日',
        objKey: 'registerFinishDateTime',
        minWidth: 100
    },
    {
        name: '選購版本',
        objKey: 'serviceTitle',
        minWidth: 100
    },
    {
        name: '名片啟用',
        objKey: 'isCardEnable',
        minWidth: 100
    },
    // {
    //     name: '自動續約',
    //     objKey: 'isExtendEnable',
    //     minWidth: 100
    // },
    {
        name: '名片編輯',
        objKey: 'operate',
        minWidth: 100
    }
    // 網站先隱藏 以後開放
    // {
    //     name: '網站資訊',
    //     objKey: 'webInfo',
    //     minWidth: 100
    // }
];

const isLoading = ref(false);
const isShowWebInfo = ref(false);
const webInfoData = ref([]);
// 頁籤
const currentPage = ref(1);
const pageSize = ref(8);

const pagedList = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return props.list.slice(start, end);
});

function onDelete(info) {
    if (isLoading.value) {
        return;
    }

    isLoading.value = true;

    axiosExploreIsEnable({
        webID: info.webID,
        isEnable: true
    }).then((response) => {
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

        props.callbackFunc();
    }).catch(() => {
        commonStore.actionSetPopupInfo({
            type: 'alert',
            value: {
                title: '系統錯誤',
                content: '請稍後再試'
            }
        });
    }).finally(() => {
        isLoading.value = false;
    });
}

function isCardEnable(info) {
    if (isLoading.value) {
        return;
    }

    isLoading.value = true;
    axiosExploreIsShowEnable({
        webID: info.webID,
        isEnable: !info.isShowEnable
    }).then((response) => {
        if (!response.result) {
            commonStore.actionSetPopupInfo({
                type: 'alert',
                value: {
                    title: '系統訊息',
                    content: response.message
                }
            });
            return;
        }

        props.callbackFunc();
    }).finally(() => {
        isLoading.value = false;
    });
}

function isExtendEnable(info) {
    if (isLoading.value) {
        return;
    }

    isLoading.value = true;
    axiosExploreIsAutoDebit({
        webID: info.webID,
        isEnable: !info.isAutoDebit
    }).then((response) => {
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

        props.callbackFunc();
    }).finally(() => {
        isLoading.value = false;
    });
}

function getWebId(info) {
    if (info.isFree) {
        return;
    }
    isShowWebInfo.value = true;
    webInfoData.value = [info];
}

function isPassed(expiryDate) {
    if (!expiryDate) return false;

    // 排除特例
    if (
        expiryDate === '2099-01-01T00:00:00' ||
        expiryDate === '1911-01-01T00:00:00'
    ) {
        return false;
    }

    return dayjs().isAfter(dayjs(expiryDate));
}
</script>

<template>
    <div :class="$style['list-item-wrap']">
        <ElTable
            v-loading="isLoading"
            :data="pagedList"
            :header-cell-style="{ color: '#5d7186', 'background-color': '#fcfcfd' }"
            :cell-style="{ color: '#5d7186' }"
            :class="$style['table-wrap']"
        >
            <ElTableColumn
                v-for="item in option"
                :key="`col-${item.objKey}`"
                :label="item.name"
                :min-width="item.minWidth"
                :class-name="$style['td-wrap']"
                :align="[
                    'title',
                    'registerFinishDateTime',
                    'modifyDateTime'
                ].includes(item.objKey) ? 'left' : 'center'"
                :show-overflow-tooltip="['history', 'operate'].includes(item.objKey) ? false : true"
            >
                <template #default="scope">
                    <div v-if="item.objKey === 'title'" :class="$style['item-title-wrap']">
                        <div :class="$style['title-img']">
                            <img src="/image/modelView/info/product.svg">
                        </div>
                        <div :class="$style['title-content']">
                            <div
                                :class="[$style['title-text'], { [$style['has-link']]: scope.row.isShowEnable }]"
                                @click="goView(scope.row)"
                            >
                                {{ scope.row[item.objKey] || '--' }}
                            </div>
                            <div :class="$style['sub-text']">
                                ID：{{ scope.row.branDoorID || '尚未填寫' }}
                            </div>
                        </div>
                    </div>
                    <div
                        v-else-if="['registerFinishDateTime', 'modifyDateTime'].includes(item.objKey)"
                        :class="$style['item-wrap']"
                    >
                        <template v-if="scope.row.expiryDate === '2099-01-01T00:00:00'">
                            永久授權
                        </template>
                        <template v-else>
                            <div :class="$style['title-text']">
                                <template v-if="scope.row.expiryDate === '1911-01-01T00:00:00'" />
                                {{ dayjs(scope.row.expiryDate).format('YYYY/MM/DD') }}
                            </div>
                            <!-- <div :class="$style['sub-text']">
                                {{ dayjs(scope.row.expiryDate).format('hh:mm A') }}
                            </div> -->
                        </template>
                    </div>
                    <div v-else-if="item.objKey === 'serviceTitle'">
                        {{ scope.row.serviceTitle }}
                    </div>
                    <!-- 名片啟用 -->
                    <div
                        v-else-if="item.objKey === 'isCardEnable'"
                        :class="$style['item-wrap']"
                    >
                        <ElSwitch
                            :model-value="scope.row.isShowEnable"
                            :class="$style['switch-item']"
                            @change="isCardEnable(scope.row)"
                        />
                    </div>
                    <!-- 自動續約 -->
                    <div
                        v-else-if="item.objKey === 'isExtendEnable'"
                        :class="$style['item-wrap']"
                    >
                        <ElSwitch
                            :model-value="scope.row.isAutoDebit"
                            :class="$style['switch-item']"
                            @change="isExtendEnable(scope.row)"
                        />
                    </div>
                    <div v-else-if="item.objKey === 'operate'" :class="$style['item-wrap']">
                        <!-- 未付款 & 已過期 -> 購物車按鈕 -->
                        <div
                            v-if="scope.row.isRenewal"
                            :class="$style['shoping-btn']"
                            @click="onAdd(scope.row)"
                        >
                            <FontAwesomeIcon :icon="['fa', 'cart-shopping']" />
                        </div>
                        <!-- 已付款 -> 編輯按鈕 -->
                        <div
                            v-if="scope.row.isEdit"
                            :class="$style['feature-btn']"
                            :title="'編輯'"
                            @click="cardEdit(scope.row)"
                        >
                            <FontAwesomeIcon :icon="['fa','pen']" />
                        </div>
                        <!-- 刪除按鈕 -->
                        <ElPopconfirm
                            v-if="scope.row.isDel"
                            title="確認刪除？"
                            confirm-button-text="是"
                            cancel-button-text="否"
                            @confirm="onDelete(scope.row)"
                        >
                            <template #reference>
                                <div :class="$style['feature-btn']">
                                    <FontAwesomeIcon :icon="['fa', 'trash']" />
                                </div>
                            </template>
                        </ElPopconfirm>
                    </div>
                    <!-- 網站資訊 -->
                    <!-- <div
                        v-else
                        :class="$style['item-wrap']"
                    >
                        <div
                            :class="[
                                $style['history-wrap'],
                                { [$style['is-disable']]: scope.row.isFree }
                            ]"
                            @click="getWebId(scope.row)"
                        />
                    </div> -->
                </template>
            </ElTableColumn>
        </ElTable>
        <WebInfo
            v-if="isShowWebInfo"
            v-model:is-show="isShowWebInfo"
            :data="webInfoData"
            :web-edit="webEdit"
        />
        <!-- 頁籤 -->
        <div :class="$style['page-wrap']">
            <ElPagination
                v-model:current-page="currentPage"
                :total="list.length"
                :page-size="pageSize"
                layout="prev, pager, next"
                prev-text="上一頁"
                next-text="下一頁"
            />
        </div>
    </div>
</template>

<style lang="scss" module>
.table-wrap {
    &:global(.el-table) {
        .td-wrap {
            padding: 14px 0;
        }
    }
}

.td-wrap {
    font-size: 14px;
}

.item-title-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.item-wrap {
    display: inline-block;
}

.title-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 0.75rem;
    border-radius: 0.75rem;
    background: rgba(255, 108, 47, 0.10);
}

.title-content {
    width: calc(100% - 69px);
}

.title-text {
    width: 100%;
    line-height: 0.875rem;
    color: #313b5e;
    white-space: normal;
}

.has-link {
    text-decoration: underline;
    cursor: pointer;
}

.sub-text {
    width: 100%;
    line-height: 0.75rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: #5d7186;
}

.status-tag {
    box-sizing: border-box;
    min-width: 56px;
    padding: 8px 10px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    border-radius: 4px;
}

.status-tag-1 {
    composes: status-tag;
    color: #4ecac2;
    background: #dcf4f3;
}

.status-tag-2 {
    composes: status-tag;
    color: #f9b931;
    background: #fef1d6;
}

.status-tag-3 {
    composes: status-tag;
    color: #22c55e;
    background: #d3f3df;
}

.status-tag-4 {
    composes: status-tag;
    color: #5d7186;
    background: #eef2f7;
}

.status-tag-5 {
    composes: status-tag;
    color: #ff6c2f;
    background: #ffe2d5;
}

.status-tag-6,
.status-tag-7 {
    composes: status-tag;
    color: #ef5f5f;
    background: #fcdfdf;
}

.shoping-btn {
    margin-top: 12px;
    cursor: pointer;
    color: #ff6c2f;

    &:hover {
        color: #e6612a;
    }
}

.history-wrap {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 36px;
    transition: color 0.15s ease-in-out,
        background-image 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    background: url('/image/components/image/browser.svg') #eef2f7 50% 50% no-repeat;
    background-size: 15px;

    &:hover {
        border: 1px solid #b3b6b9;
        color: #fff;
        background-image: url('/image/components/image/browser-white.svg');
        background-color: #bec2c6;
    }

    &.is-disable {
        opacity: 0.4;
        cursor: no-drop;
        border: 1px solid #eef2f7;
        color: #323a46;
        background-color: #eef2f7;

        &:hover {
            border: 1px solid #eef2f7;
            color: #323a46;
            background-image: url('/image/components/image/browser.svg');
            background-color: #eef2f7;
        }
    }
}

.history-img {
    display: block;
    width: 15px;
}

.switch-item {
    &:global(.el-switch){
        :global(.el-switch__core) {
            background-color: #fff;
            border-color: #0000002E;
            height: 16px;
            min-width: 28px;
            :global(.el-switch__action){
                background-color: #9DA9BB;
                left: 3px;
                width: 10px;
                height: 10px;
            }
        }
    }
    &:global(.el-switch.is-checked) {
        :global(.el-switch__core) {
            border: 1px solid #ff6c2f;
            background: #ff6c2f;
            :global(.el-switch__action){
                background-color: #fff;
                left: calc(100% - 12px);
            }
        }
    }
}

.feature-btn {
    display: inline-block;
    vertical-align: middle;
    margin: 0.2rem 0.75rem 0.2rem 0;
    padding: 0.35rem 0.78rem;
    transition: color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    cursor: pointer;
    color: #ff6c2f;
    background-color: rgba(255, 108, 47, 0.1);

    &:hover {
        border: 1px solid #ff6c2f;
        color: #fff;
        background-color: #ff6c2f;
    }

    &:last-child {
        margin: 0.2rem 0;
    }

    &.is-disable {
        opacity: 0.65;
        cursor: no-drop;
        border: 1px solid #eef2f7;
        color: #323a46;
        background-color: #eef2f7;

        &:hover {
            border: 1px solid #eef2f7;
            color: #323a46;
            background-color: #eef2f7;
        }
    }
}

.shoping-btn {
    composes: feature-btn;
    color: #f9b931;
    background: rgba(249, 185, 49, 0.10);
    background: linear-gradient(0deg, rgba(249, 185, 49, 0.10) 0%, rgba(249, 185, 49, 0.10) 100%), #FFF;

    &:hover {
        color: #fff;
        border: 1px solid #f9b931;
        background-color: #f9b931;
    }
}

.view-btn {
    composes: feature-btn;
    color: #323a46;
    background-color: #eef2f7;

    &:hover {
        border: 1px solid #b3b6b9;
        color: #fff;
        background-color: #bec2c6;
    }
}

.page-wrap {
    background-color: #fff;
    padding: 16px 24px;
    border-radius: 0 0 16px 16px;
    display: flex;
    justify-content: end;
    :global(.el-pagination) {
        border: solid 1px #EAEDF1;
        border-radius: 12px;
    }
    :global(.btn-prev) ,
    :global(.number) {
        border-right: solid 1px #EAEDF1;
        border-radius: 0;
    }
    :global(.btn-prev) {
        border-radius: 12px 0 0 12px;
    }
    :global(.btn-next) {
        border-radius: 0 12px 12px 0;
    }
    :global(.btn-prev) ,
    :global(.btn-next) {
        padding: 10px 12px;
        &:disabled {
            &:hover {
                color: #a8abb2;
            }
        }
    }
    :global(.number.is-active) {
        color: #fff;
        background-color: #FF6C2F;
        &:hover {
            color: #fff;
        }
    }
    :global(.btn-prev) ,
    :global(.number) ,
    :global(.btn-next) {
        &:hover {
            color: #FF6C2F;
        }
    }
}
</style>
