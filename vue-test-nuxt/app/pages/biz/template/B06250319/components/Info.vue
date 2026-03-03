<script setup>
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';
import Community from '../components/Community.vue';
import Image from '@/components/Image.vue';

const commonStore = useCommonStore();
const emit = defineEmits(['get-info']);

const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    },
    webId: {
        type: String,
        default: ''
    }
});
</script>

<template>
    <div :class="$style.top">
        <div :class="$style['top-l']">
            <ClientOnly>
                <Image
                    v-if="info.basic.image?.[0]"
                    :img-src="commonStore.getImg(webId, info.basic.image[0])"
                    :has-zoom="true"
                />
            </ClientOnly>
        </div>
        <div :class="$style['top-r']">
            <h6 v-if="info.basic.info.name">
                {{ info.basic.info.name }}
                <span v-if="info.basic.info.enName">{{ info.basic.info.enName }}</span>
            </h6>
            <p v-if="info.basic.info.profession" :class="$style.tag">
                <span>{{ info.basic.info.profession }}</span>
            </p>
            <div :class="$style.social">
                <Community />
            </div>
            <Text
                v-if="info.introduce.resume"
                :class="$style.resume"
                :text="info.introduce.resume"
            />
        </div>
    </div>
</template>

<style lang="scss" module>
.top {
    margin-top: 118px;
    text-align: center;
}

.top-l {
    width: 205px;
    height: 205px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #ffffff;
    background-color: #fff;

    img {
        width: 100%;
        height: 100%;
        background-color: #000;
    }
}

.top-r {
    margin-top: 7px;

    h6,
    p {
        letter-spacing: 0.5px;
    }

    h6 {
        line-height: 40px;
        font-size: 24px;
        margin: 0 0 12px 0;
        font-weight: 600;
        color: #1E1E1E;
        padding-bottom: 2px;
        border-bottom: solid 1px #000000;

        span {
            font-weight: 600;
            display: inline-block;
            margin-left: 6px;
            letter-spacing: 0.5px;
        }
    }

    p {
        font-size: 15px;
        margin-bottom: 14px;
        color: rgba(#1E1E1E, $alpha: 0.8);
    }
}

.resume {
    line-height: 1.8em;
    margin-bottom: 40px;
    text-align: left;
}

.tag {
    margin-bottom: 15px;

    span {
        display: inline-block;
        font-weight: 300;
        letter-spacing: 0.5px;
    }
}

.social {
    display: flex;
    justify-content: center;
    width: 100%;
}

@media (max-width:500px) {

    .top {
        margin-top: 67px;
    }

    .top-r {
        margin-top: 10px;
    }

    .resume {
        margin-bottom: 0;
    }
}
</style>
