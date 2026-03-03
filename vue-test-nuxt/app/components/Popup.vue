<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const emit = defineEmits(['close', 'update:visible']);
const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    customStyle: {
        type: Object,
        default: () => ({
            'max-width': '640px'
        })
    }
});

function close() {
    emit('update:visible', false);
    emit('close');
}

onMounted(() => {
    document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
    document.body.style.overflow = '';
});
</script>

<template>
    <Teleport to="body">
        <transition
            :enter-active-class="$style['fade-enter-active']"
            :leave-active-class="$style['fade-leave-active']"
            :enter-from-class="$style['fade-enter-from']"
            :leave-from-class="$style['fade-leave-from']"
            :enter-to-class="$style['fade-enter-to']"
            :leave-to-class="$style['fade-leave-to']"
        >
            <div v-if="visible" :class="$style.windows">
                <div :class="$style['mask']" @click.stop="close" />
                <div :class="$style['windows-content']" :style="customStyle">
                    <slot />
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<style lang="scss" module>
.windows {
    position: fixed;
    inset: 0;
    z-index: 100000;
    display: flex;
    justify-content: center;
    /*置中*/
    align-items: center;
}

.mask {
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    inset: 0;
    z-index: 1;
}

.windows-content {
    width: 100%;
    max-height: 100vh;
    position: relative;
    z-index: 2;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease-out;
}

.fade-leave-from,
.fade-enter-to {
    opacity: 1;
}
</style>
