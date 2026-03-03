<script setup>
import { computed } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: ''
    }
});

const resultText = computed(() => props.text.replace(/\n|(\r\n)/g, '<br />'));
</script>

<template>
    <div v-html="resultText" />
</template>
