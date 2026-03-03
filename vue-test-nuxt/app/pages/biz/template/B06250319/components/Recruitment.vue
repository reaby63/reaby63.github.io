<script setup>
defineProps({
    recruitInfo: Array
});
import { ref } from 'vue';
const emit = defineEmits(['close']);

const activeIndex = ref(null); // 用來記錄展開的項目

const toggleAccordion = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index;
};


</script>

<template>
    <div :class="[$style.ccard, $style.rm_card]">
        <div :class="[$style.cross, $style.rm_cross]">
            <button @click="emit('close')" />
        </div>
        <div :class="$style.rm">
            <div :class="$style.rm_title">
                <span>人才招募</span>
            </div>
            <ul :class="$style.rm_list">
                <!-- 標題 -->
                <li :class="$style.rm_list_title">
                    <ul>
                        <li>
                            <span>職務</span><span>名稱</span>
                        </li>
                        <li>
                            <span>工作</span><span>性質</span>
                        </li>
                        <li>
                            <span>工作</span><span>地點</span>
                        </li>
                        <li>
                            <span>詳細</span><span>介紹</span>
                        </li>
                    </ul>
                </li>

                <!-- 內容 -->
                <li v-for="(item, index) in recruitInfo" :key="index" :class="$style.rm_list_content">
                    <ul>
                        <li>{{ item.name }}</li>
                        <li>{{ item.type }}</li>
                        <li>{{ item.place }}</li>
                        <li>
                            <button @click="toggleAccordion(index)">GO</button>
                        </li>
                    </ul>
                    <div :class="[$style.open_list, activeIndex === index ? $style.active : '']">
                        <div :class="$style.open_padding" v-html="item.detail" />
                    </div>
                </li>

            </ul>
        </div>
    </div>
</template>

<style lang="scss" module>
$font_size_XL: 24px;
$font_size_L: 18px;
$font_size_ML: 16px;
$font_size_M: 15px;
$font_size_S: 14px;
$font_size_XS: 12px;
.ccard {
    max-width: 640px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.cross {
    position: absolute;
    right: 5px;
    top: 5px;

    button {
        position: relative;
        height: 25px;
        display: inline-block;
        transition: all 0.3s;
        width: 29px;


        &::before,
        &::after {
            content: "";
            display: block;
            position: absolute;
            width: 1px;
            background-color: #000000;
            border-radius: 5px;
            height: 32px;
            top: -4px;
            right: 12px;
        }

        &::before {
            transform: rotate(48deg);
        }

        &::after {
            transform: rotate(-48deg);
        }

        &:hover {
            opacity: 0.8;
        }
    }
}

.rm_card {
    background-color: #000000;
    color: #ffffff;
}

.rm_cross {
    position: absolute;
    top: 15px;
    right: 15px;

    button {
        border-radius: 50%;

        &::before,
        &::after {
            background-color: #FFFFFF;
        }
    }
}

.rm {
    padding: 77px 76px;
    padding-bottom: 114px;
    border: solid 1px #353535;

    .rm_title {
        text-align: center;
        margin-bottom: 35px;

        span {
            display: block;
            font-size: 20px;
            letter-spacing: 10px;
            font-weight: 600;
            margin-left: 10px;
        }
    }

    .rm_list {
        .rm_list_title {
            background-color: #ffffff;

            >ul {

                >li {
                    color: #1E1E1E;
                }
            }
        }

        .rm_list_content {
            ul {
                li {
                    color: #ffffff;
                }
            }
        }

        .rm_list_title,
        .rm_list_content {
            // background-color: #ffffff;

            >ul {
                display: flex;
                align-items: center;
                padding: 0 10px;

                >li {
                    position: relative;
                    padding: 3px 10px;
                    width: calc(4em + 40px);
                    font-size: $font_size_M;
                    line-height: 1.8em;
                    font-weight: 600;
                    color: #ccc;
                    letter-spacing: 0.5px;
                    white-space: nowrap;
                    /* 不換行 */
                    overflow: hidden;
                    /* 隱藏超出的內容 */
                    text-overflow: ellipsis;

                    /* 省略號 */
                    &::after {
                        content: "";
                        display: inline-block;
                        width: 1px;
                        height: 20px;
                        background-color: #fff;
                        position: absolute;
                        right: 0px;
                        top: calc(50% - 10px);
                    }

                    &:nth-child(1) {
                        width: calc(100% - 12em - 60px);
                    }

                    &:nth-child(2) {
                        text-align: center;
                    }

                    &:nth-child(3) {
                        text-align: center;
                    }

                    &:nth-child(4) {
                        text-align: center;
                        justify-content: center;

                        &::after {
                            display: none;
                        }
                    }
                }
            }

            .open_list {
                box-sizing: border-box;
                color: #FFFFFFCC;
                font-size: $font_size_M;
                padding-bottom: 0;
                max-height: 0;
                overflow: hidden;
                transition: max-height 1s ease-out;

                &::-webkit-scrollbar {
                    width: 10px;
                }

                &::-webkit-scrollbar-thumb {
                    background: #FFFFFF33;
                    border-radius: 8px;
                }

                .open_padding {
                    padding: 35px 0px;
                }

                .open_title,
                .wl_title {
                    font-weight: 600;
                    font-size: $font_size_ML;
                }

                .open_title {
                    span {
                        font-weight: 700;
                        color: #ffffff;
                        font-size: $font_size_ML;
                        display: inline-block;
                        border: solid #FFFFFFCC;
                        border-width: 0 0 1px 0;
                        line-height: 1.8em;
                        padding: 2px 10px;
                        letter-spacing: 0.5px;
                    }
                }

                .work_content {
                    margin-bottom: 30px;

                    >div {
                        &:nth-child(2) {
                            margin-top: 15px;
                        }

                        &:last-child {
                            margin-top: 0;
                            margin-bottom: 0;
                        }
                    }

                    .open_mark {
                        span {
                            display: inline-block;
                            vertical-align: top;
                            line-height: 1.8em;
                            letter-spacing: 0.5px;

                            &:first-child {
                                width: 4px;
                                height: 4px;
                                border-radius: 50%;
                                background-color: #FFFFFFCC;
                                position: relative;
                                top: 11px;
                                margin: 0px calc(0.5em - 4px);
                            }

                            &:last-child {
                                width: calc(100% - 1em);
                            }
                        }
                    }
                }

                .work_list {
                    margin-bottom: 22px;

                    >div {
                        display: inline-block;
                        vertical-align: top;

                        &:first-child {
                            margin-right: 10px;
                        }

                        &:last-child {
                            width: calc(100% - 110px - 10px);
                            line-height: 1.8em;
                            position: relative;
                            top: 5px;
                        }
                    }
                }
            }

            .open_list.active {
                max-height: 45vh;
                overflow-y: scroll;
            }
        }

        .rm_list_title {
            margin-bottom: 9px;

            span {
                font-weight: 600;
            }
        }

        .rm_list_content {
            margin-bottom: 5px;
            transition: all .5s;

            button {
                font-size: $font_size_S;
                font-weight: 400;
                border-radius: 14px;
                transition: all 0.3s;
                width: 100%;
                position: relative;
                color: #ffffff;

                &:hover {
                    opacity: 0.8;
                }

                &:after {
                    content: "";
                    display: block;
                    width: 1.6em;
                    height: 1px;
                    position: absolute;
                    background-color: #fff;
                    bottom: -2.5px;
                    left: calc(50% - 0.8em);
                }
            }

            &.go_active {
                background-color: transparent;

                ul,
                button {
                    color: #ffffff;
                }

                >ul>li {
                    color: #ffffff;
                    white-space: normal;
                    overflow: auto;
                    text-overflow: initial;

                    &::after {
                        background-color: #ffffff;
                    }
                }

                button {
                    &:after {
                        background-color: #ffffff;
                    }
                }
            }
        }


    }
}

@media (max-width:500px) {
    .rm {
        padding: 38px 24px;

        .rm_list {
            .rm_list_title {
                ul li {
                    span {
                        display: block;
                        line-height: 1.6em;
                    }

                    &:nth-child(1) {
                        text-align: center;
                    }
                }
            }
        }
    }

    .rm .rm_list .rm_list_title>ul>li,
    .rm .rm_list .rm_list_content>ul>li {
        width: calc(3em + 20px);

        &:nth-child(1) {
            width: calc(100% - 9em - 60px);
        }
    }

    .rm .rm_list .rm_list_content>ul>li {
        &:first-child {
            text-align: center;
        }
    }
}
</style>
