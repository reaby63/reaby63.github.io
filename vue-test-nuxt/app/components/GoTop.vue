<script setup>
function goTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
</script>

<template>
    <div :class="$style['feature-btn']" @click="goTop">
        <!-- <img :class="$style['arrow-img']" src="/images/components/goTop/arrow_totop.svg"> -->
        TOP
    </div>
</template>

<style lang="scss" module>
.feature-btn {
    position: fixed;
    box-sizing: border-box;
    z-index: 999;
    width: 50px;
    height: 50px;
    bottom: 55px;
    right: 0;
    text-align: center;
    transition: all 0.3s;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.6px;
    border: 1px solid #858585;
    border-radius: 50%;
    cursor: pointer;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.6);

    &:hover {
        background-color: #000;
    }
}

.arrow-img {
    display: block;
    width: 14px;
    height: 8px;
    margin: 9px auto 3px;
}
</style>
