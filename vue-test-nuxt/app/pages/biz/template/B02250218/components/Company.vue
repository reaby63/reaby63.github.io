<script setup>
import { useCommonStore } from '@/stores/common';
import Image from '@/components/Image.vue';

defineProps({
    info: {
        type: Object,
        default: () => {}
    },
    webId: {
        type: String,
        default: ''
    }
});

const commonStore = useCommonStore();
</script>
<template>
    <div :class="$style.c_contain">
        <div
            v-if="info.basic?.logo?.[0]"
            :class="$style.cm_left"
        >
            <ClientOnly>
                <Image :class="$style['img-wrap']" :img-src="commonStore.getImg(webId, info.basic?.logo?.[0])"/>
            </ClientOnly>
        </div>
        <div
            v-if="info.basic.info.title||
                info.basic.info.location||
                info.basic.info.mobile"
            :class="$style.cm_right"
        >
            <ul>
                <li v-if="info.basic.info.title">
                    {{ info.basic.info.title }}
                </li>
                <li v-if="info.basic.info.location">
                    <a
                        :href="`https://www.google.com/maps?q=${info.basic.info.location}`"
                        :class="$style['list-link']"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {{ info.basic.info.location }}
                    </a>
                </li>
                <li v-if="info.basic.info.mobile">
                    <a :href="`tel:${info.basic.info.mobile}`" title="撥打電話">
                        {{ info.basic.info.mobile }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" module>
.c_contain {
    display: flex;
}

.c_contain .cm_left {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 124px;
    height: 108px;
    margin-right: 26px;
    border: 1px solid #c9c9c9;
    .img-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.c_contain .cm_left img {
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;
    padding: 13px 15px;
}

.c_contain .cm_right {
    width: calc(100% - 123px - 26px);
}

.c_contain .cm_right ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.c_contain .cm_right li {
    padding: 12px 1px;
    border-bottom: solid 1px #cacaca;
    font-size: 15px;
    line-height: 1em;
    word-wrap: break-word;
}

.c_contain .cm_right li:first-child {
    padding-top: 5px;
}

.c_contain .cm_right li:last-child {
    padding-bottom: 0;
    border-bottom: 0px;
}

.c_contain .cm_right a {
    color: #434343;
    text-decoration: none;
    transition: all 0.3s;
}

.c_contain .cm_right a:hover {
    opacity: 0.9;
}

@media (max-width: 375px) {
    .c_contain {
        display: block;
    }

    .c_contain .cm_left {
        width: 100%;
        margin-right: 0px;
        margin: 0 0 13px 0;
        text-align: center;
    }

    .c_contain .cm_left img {
        width: auto;
        height: 106px;
    }

    .c_contain .cm_right {
        width: 100%;
    }
}
</style>
