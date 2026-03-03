<script setup>
import Text from '@/pages/biz/components/Text.vue';

const props = defineProps({
    info: {
        type: Array,
        default: () => { }
    }
});
</script>

<template>
    <div :class="$style.title">
        <span>服務項目</span>
    </div>
    <div
        v-for="(item, i) in props.info"
        :key="i"
        :class="$style['serve-contain']"
    >
        <div
            v-if="item.title"
            :class="$style['serve-title']"
        >
            {{ item.title }}
        </div>
        <Text
            v-if="item.content"
            :class="$style.serveContent"
            :text="item.content"
        />
    </div>
</template>
<style lang="scss" module>
.title {
    font-size: 20px;
    color: #1E1E1E;
    margin-bottom: 20px;
    line-height: 1.6em;
    text-align: center;
    border-bottom: solid 1px #1E1E1E;
    color: #ffffff;
    border-color: #ffffff;
    margin-bottom: 60px;

    span {
        position: relative;
        display: inline-block;
        font-weight: 600;
        letter-spacing: 0.15em;
        padding-bottom: 5px;
        margin-left: 0.15em;
    }
}

.serve-contain {
    line-height: 1.6em;
    letter-spacing: 0.05em;
    font-size: 15px;
    margin-bottom: 45px;
    color: #FFFFFF;

    &:last-child {
        margin-bottom: 0;
    }

    .serve-title {
        color: #FFFFFF;
        margin-bottom: 10px;
        font-weight: 600;

        &::before {
            content: "";
            display: inline-block;
            width: 5px;
            height: 5px;
            background-color: #FFFFFF;
            position: relative;
            top: -4px;
            transform: rotate(45deg);
            margin-right: 35px;
        }
    }

    .serveContent {
        color: #FFFFFFCC;
        font-family: "Noto Sans", Arial, sans-serif;
        font-weight: 400;
        line-height: 1.6em;
        letter-spacing: 0.05em;
        font-size: 15px;
        ul {
            li {
                list-style-type: initial;
                margin-left: 22px;
            }
        }
    }
}

@media (max-width: 500px) {
    .serve-contain,
    .title {
        margin-bottom: 30px;
    }
}
</style>
