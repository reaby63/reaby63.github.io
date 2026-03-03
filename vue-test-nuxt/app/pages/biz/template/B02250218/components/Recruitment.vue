<script setup>
import { ref } from 'vue';

const props = defineProps({
    recruitInfo: {
        type: Array,
        default: () => []
    }
});

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
                我們正在尋找的夥伴
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
                <li
                    v-for="(item, index) in recruitInfo"
                    :key="index"
                    :class="$style.rm_list_content"
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
}

.cross button {
    position: relative;
    height: 25px;
    display: inline-block;
    transition: all 0.3s;
    width: 29px;
}

.cross button::before,
.cross button::after {
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

.cross button::before {
    transform: rotate(48deg);
}

.cross button::after {
    transform: rotate(-48deg);
}

.cross button:hover {
    opacity: 0.8;
}

.rm_cross {
    padding-bottom: 8px;
}

.rm {
    margin: 23px 25px;
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 50px;
    padding-top: 30px;
}

.rm .rm_title {
    color: #ffffff;
    background-color: #000000;
    text-align: center;
    padding: 10px 26px;
}

.rm .rm_list .rm_list_title>ul,
.rm .rm_list .rm_list_content>ul {
    display: flex;
    padding: 0px 26px;
    align-items: center;
}

.rm .rm_list .rm_list_title>ul>li,
.rm .rm_list .rm_list_content>ul>li {
    padding: 10px 0px;
}

.rm .rm_list .rm_list_title>ul>li:nth-child(1),
.rm .rm_list .rm_list_content>ul>li:nth-child(1) {
    width: calc(55% - 80px);
}

.rm .rm_list .rm_list_title>ul>li:nth-child(2),
.rm .rm_list .rm_list_content>ul>li:nth-child(2) {
    width: 20%;
    text-align: center;
}

.rm .rm_list .rm_list_title>ul>li:nth-child(3),
.rm .rm_list .rm_list_content>ul>li:nth-child(3) {
    width: 25%;
    text-align: center;
}

.rm .rm_list .rm_list_title>ul>li:nth-child(4),
.rm .rm_list .rm_list_content>ul>li:nth-child(4) {
    width: 80px;
    text-align: center;
    justify-content: center;
}

.rm .rm_list .rm_list_title {
    color: #ffffff;
    background-color: #4b4b4b;
}

.rm .rm_list .rm_list_content ul {
    background-color: #ffffff;
}

.rm .rm_list .rm_list_content:nth-of-type(2n) ul {
    background-color: #e7e7e7;
}

.rm .rm_list .rm_list_content button {
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color: #ffffff;
    padding: 5px 30px;
    background-color: #000000;
    border-radius: 14px;
    transition: all 0.3s;
    width: 80px;
}

.rm .rm_list .rm_list_content button:hover {
    opacity: 0.8;
}

.rm .rm_list .open_list {
    border: solid #ffffff;
    border-width: 2px 4px;
    box-sizing: border-box;
    background-color: #f6f6f6;
    color: #2b2b2b;
    font-size: 15px;
    padding-bottom: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 1s ease-out;
}

.rm .rm_list .open_list .open_padding {
    padding: 20px 22px;
}

.rm .rm_list .open_list .open_title,
.rm .rm_list .open_list .wl_title {
    font-weight: 600;
    font-size: 16px;
}

.rm .rm_list .open_list .work_content {
    margin-bottom: 25px;
}

.rm .rm_list .open_list .work_content>div {
    margin-bottom: 14px;
}

.rm .rm_list .open_list .work_content>div:last-child {
    margin-bottom: 0;
}

.rm .rm_list .open_list .work_content .open_mark span {
    display: inline-block;
    vertical-align: top;
}

.rm .rm_list .open_list .work_content .open_mark span:first-child {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #2b2b2b;
    position: relative;
    top: 10px;
    margin: 0px calc(0.5em - 4px);
}

.rm .rm_list .open_list .work_content .open_mark span:last-child {
    width: calc(100% - 1em);
}

.rm .rm_list .open_list .work_list {
    margin-bottom: 22px;
}

.rm .rm_list .open_list .work_list>div {
    display: inline-block;
    vertical-align: top;
}

.rm .rm_list .open_list .work_list>div:first-child {
    margin-right: 16px;
}

.rm .rm_list .open_list .work_list>div:last-child {
    width: calc(100% - 4em - 24px);
}

.rm .rm_list .open_list.active {
    max-height: 45vh;
    overflow-y: scroll;
}

@media (max-width: 420px) {
    .rm .rm_list .rm_list_title ul li span {
        display: block;
    }

    .rm .rm_list .rm_list_title ul li:nth-child(1) {
        text-align: center;
    }

    .rm .rm_list .rm_list_title>ul>li:nth-child(1),
    .rm .rm_list .rm_list_content>ul>li:nth-child(1) {
        width: calc(55% - 50px - 12px);
        text-align: center;
    }

    .rm .rm_list .rm_list_title>ul>li:nth-child(2),
    .rm .rm_list .rm_list_content>ul>li:nth-child(2) {
        width: 21%;
    }

    .rm .rm_list .rm_list_title>ul>li:nth-child(3),
    .rm .rm_list .rm_list_content>ul>li:nth-child(3) {
        width: 24%;
    }

    .rm .rm_list .rm_list_title>ul>li:nth-child(4),
    .rm .rm_list .rm_list_content>ul>li:nth-child(4) {
        width: 50px;
        margin-left: 12px;
    }

    .rm .rm_list .rm_list_title>ul>li:nth-child(4) button,
    .rm .rm_list .rm_list_content>ul>li:nth-child(4) button {
        padding: 5px 16px;
        width: auto;
    }
}
</style>
