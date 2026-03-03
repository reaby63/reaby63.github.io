<script setup>
import { ref } from 'vue';

defineProps({
    recruitInfo: {
        type: Array,
        default: () => {}
    }
});

const emit = defineEmits(['close']);
const activeIndex = ref(0); // 預設展開第一項

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
                <span>夥伴招募中!</span>
            </div>
            <ul :class="$style.rm_list">
                <!-- 表頭 -->
                <li :class="$style.rm_list_title">
                    <ul>
                        <li><span>職務</span><span>名稱</span></li>
                        <li><span>工作</span><span>性質</span></li>
                        <li><span>工作</span><span>地點</span></li>
                        <li><span>詳細</span><span>介紹</span></li>
                    </ul>
                </li>

                <!-- 內容 -->
                <li
                    v-for="(item, index) in recruitInfo"
                    :key="index"
                    :class="[$style.rm_list_content, activeIndex === index ? $style.go_active : '']"
                >
                    <ul>
                        <li>{{ item.name }}</li>
                        <li>{{ item.type }}</li>
                        <li>{{ item.place }}</li>
                        <li>
                            <button @click="toggleAccordion(index)">
                                GO
                            </button>
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
$font_size_XS:12px;
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
    background-image: url('/images/biz/B06250317/rm_bg.jpg');
    background-size: cover; //填滿
    background-repeat: no-repeat;
}

.rm_cross {
    position: absolute;
    top: 20px;
    right: 20px;

    button {
        border-radius: 50%;

        &::before,
        &::after {
            background-color: #1E1E1E;
        }
    }
}

.rm {
    margin: 38px 74px;
    margin-bottom: 76px;

    .rm_title {
        color: #000000;
        text-align: center;
        margin-bottom: 33px;

        img {
            width: 160px;
            margin-bottom: 18px;
        }

        span {
            display: block;
            font-size: 36px;
            letter-spacing: 0.5px;
            font-weight: 700;
        }
    }

    .rm_list {

        .rm_list_title,
        .rm_list_content {
            background-color: #1E1E1E;
            border-radius: 20px;

            >ul {
                display: flex;
                align-items: center;
                padding: 0px 10px;

                >li {
                    position: relative;
                    padding: 3px 10px;
                    width: calc(4em + 20px);
                    font-size: $font_size_M;
                    line-height: 1.8em;
                    font-weight: 600;
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
                        background-color: #ffffff;
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
        }

        .rm_list_title {
            color: #ffffff;
            margin-bottom: 5px;

            span {
                font-weight: 600;
            }
        }

        .rm_list_content {
            margin-bottom: 3px;
            transition: all .5s;

            ul {
                color: #ffffff;
            }

            button {
                font-size: $font_size_S;
                font-weight: 400;
                color: #ffffff;
                border-radius: 14px;
                transition: all 0.3s;
                width: 100%;
                position: relative;

                &:hover {
                    opacity: 0.8;
                }

                &:after {
                    content: "";
                    display: block;
                    width: 1.6em;
                    height: 1px;
                    position: absolute;
                    background-color: #ffffff;
                    bottom: 0px;
                    left: calc(50% - 0.8em);
                }
            }

            &.go_active {
                background-color: transparent;

                ul,
                button {
                    color: #1E1E1E;
                }

                >ul>li {
                    white-space: normal;
                    overflow: auto;
                    text-overflow: initial;

                    &::after {
                        background-color: #1E1E1E;
                    }
                }

                button {
                    &:after {
                        background-color: #1E1E1E;
                    }
                }
            }
        }

        .open_list {
            box-sizing: border-box;
            color: #2b2b2b;
            font-size: $font_size_M;
            padding-bottom: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 1s ease-out;

            .open_padding {
                padding: 30px 0px;
            }

            .open_title,
            .wl_title {
                font-weight: 600;
                font-size: $font_size_ML;
            }

            .open_title {
                span {
                    font-weight: 600;
                    font-size: $font_size_ML;
                    display: inline-block;
                    border-radius: 20px;
                    border: solid 1px #000000CC;
                    line-height: 1.8em;
                    padding: 3px 20px;
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
                            background-color: #2b2b2b;
                            position: relative;
                            top: 10px;
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
}

@media (max-width:500px) {
    .rm {
        margin: 38px 24px;

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
