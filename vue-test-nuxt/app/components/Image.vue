<script setup>
import { ref } from 'vue';

const props = defineProps({
    imgSrc: {
        type: String,
        default: ''
    },
    hasZoom: {
        type: Boolean,
        default: false
    }
});

const openZoom = ref(false);

function open() {
    if (!props.hasZoom) return;
    openZoom.value = true;
}

function closeZoom() {
    openZoom.value = false;
}
</script>

<template>
    <div
        v-bind="$attrs"
        :class="$style['img-box']"
        @click="open"
    >
        <ClientOnly>
            <img
                v-lazy="{
                    src: props.imgSrc,
                    error: '/images/home/template/detail/no-pic.svg',
                    loading: '/images/home/template/detail/loading.svg'
                }"
                :class="[{[$style.hover]: hasZoom}, $style.img]"
            >
        </ClientOnly>
    </div>
    <!-- 幻燈片彈窗 -->
    <Teleport to="body">
        <div v-if="openZoom && props.imgSrc" :class="$style.windows">
            <div :class="$style['mask']" @click="closeZoom" />
            <img :src="props.imgSrc">
            <div :class="$style.close" @click="closeZoom" />
        </div>
    </Teleport>
</template>

<style lang="scss" module>
.windows {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    max-height: 100dvh;
    img {
        max-width: 100%;
        max-height: 100%;
        height: auto;
        width: auto;
        z-index: 2;
        object-fit: contain;
    }
}

.img-box {
    height: 100%;
    width: 100%;
    .img {
        object-fit: cover;
        background-color: #fff;
    }
}

.mask {
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    inset: 0;
    z-index: 1;
}

.close {
    position: fixed;
    top: 15px;
    right: 15px;
    height: 25px;
    display: inline-block;
    transition: all 0.3s;
    width: 25px;
    border: none;
    overflow: hidden;
    background-color: transparent;
    cursor: pointer;
    z-index: 99999;

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 1px;
        background-color: #fff;
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
        opacity: 0.7;
    }
}

.hover {
    cursor: pointer;
}
</style>
