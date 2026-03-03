<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Image from '@/components/Image.vue';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);

</script>

<template>
    <div :class="$style.about">
        <div :class="$style['about-in']">
            <div v-if="curPageData.basic.logo[0] || curPageData.basic.image[0]" :class="$style.left">
                <ClientOnly>
                    <Image
                        v-if="curPageData.basic.logo[0]"
                        :img-src="commonStore.getImg(commonStore.userInfo.webID, curPageData.basic.logo[0])"
                        :has-zoom="true"
                        :class="$style['about-img']"
                    />
                    <Image
                        v-else-if="curPageData.basic.image[0]"
                        :img-src="commonStore.getImg(commonStore.userInfo.webID, curPageData.basic.image[0])"
                        :has-zoom="true"
                        :class="$style['about-img']"
                    />
                </ClientOnly>
            </div>
            <div :class="$style.right">
                <Text
                    v-if="curPageData.introduce.resume"
                    :class="$style.introduce"
                    :text="curPageData.introduce.resume"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;
.about {
    background-color: #FBF2EC;
    color: #EB1B26F0;
    padding-bottom: 41px;
    animation: fadeIn 1.5s ease-in-out forwards;
    opacity: 0;
    animation-delay: 0.5s;
}

.about-in {
    margin: 0 31px;
    padding: 44px 19px 37px;
    border-bottom: solid 2px #FE7D85;
}

.left {
    width: 180.83px;
    margin-right: 21px;
    display: inline-flex;
    vertical-align: top;
    align-items: center;
    justify-content: center;
    object-fit: contain;
    img {
        max-width: 180.83px;
        width: 100%;
    }
}

.about-img {
    img {
        background-color: transparent !important;
    }
}

.right {
    width: calc( 100% - 180.83px - 21px );
    display: inline-block;
    vertical-align: top;
    letter-spacing: 1.5px;
    line-height: 26px;
}

@media (max-width:480px) {
    .about-in {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding: 26px 0 37px;
    }
    .left {
        display: block;
        margin-right: 0;
        margin-bottom: 12px;
        max-width: 100px;
        width: auto;
    }
    .right {
        display: block;
        width: 100%;
    }
}
</style>
