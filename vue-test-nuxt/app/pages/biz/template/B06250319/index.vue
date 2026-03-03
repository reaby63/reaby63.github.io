<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCommonStore } from '@/stores/common';
import { useFollow } from '@/composables/useFollow.js';
import Ad from './components/Ad.vue';
import Info from './components/Info.vue';
import Portfolio from './components/Portfolio.vue';
import Serve from './components/Serve.vue';
import Contact from './components/Contact.vue';
import Link from './components/Link.vue';
import Footer from '@/components/Footer.vue';
import QuickAccess from '@/components/QuickAccess.vue';

defineEmits(['get-info']);
const commonStore = useCommonStore();
const route = useRoute();

const webId = computed(() => commonStore.userInfo.webID || '');

const { curFollow, onChange } = useFollow({
    isFollow: Boolean(commonStore.userInfo.follow),
    userId: route.params.userId
});

//作品視窗
const showCard = ref(false);
const cardInfo = ref({});

//開啟作品燈箱
function openCard(info) {
    cardInfo.value = info;
    showCard.value = true;
}

//回頂端
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const showButton = ref(false);

const handleScroll = () => {
    showButton.value = window.scrollY > 0;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <div :class="$style.bg">
        <div :class="$style.card">
            <div :class="[$style.container, $style['index-bg']]">
                <!-- 簡介 -->
                <div :class="$style.info">
                    <!-- <div :class="$style.focus">
                    <button
                        :class="[$style['focus-bt'], { [$style.active]: curFollow }]"
                        @click="onChange"
                    >
                        <span>{{ curFollow ? '已追蹤' : '追蹤' }}</span>
                    </button>
                </div> -->
                    <div :class="$style.topbg">
                        <ClientOnly>
                            <img v-if="commonStore.getPageInfo?.introduce?.topBgImage?.[0]" :src="commonStore.getImg(webId, commonStore.getPageInfo?.introduce?.topBgImage?.[0])">
                            <img v-else src="/images/biz/B06250319/info_bg.jpg">
                        </ClientOnly>
                    </div>
                    <Info
                        :info="commonStore.getPageInfo"
                        :web-id="webId"
                        :class="$style['info-contain']"
                        @get-info="$emit('get-info')"
                    />
                </div>

                <!-- 產品 -->
                <div
                    v-if="commonStore.getPageInfo.productFirstList?.length > 0"
                    :class="$style.portfolio"
                >
                    <Portfolio
                        :info="commonStore.getPageInfo.productFirstList"
                        :web-id="webId"
                        @open-card="openCard"
                    />
                </div>

                <!-- 服務 -->
                <div
                    v-if="commonStore.getPageInfo.serveDetail?.length > 0"
                    :class="$style.serve"
                >
                    <Serve :info="commonStore.getPageInfo.serveDetail" />
                </div>

                <!-- 詳細 -->
                <div
                    v-if="commonStore.getPageInfo.basic.info.mobile ||
                        commonStore.getPageInfo.basic.info.email ||
                        commonStore.getPageInfo.basic.info.url ||
                        commonStore.getPageInfo.basic.info.location"
                    :class="$style.contact"
                >
                    <Contact
                        :info="commonStore.getPageInfo.basic.info"
                        :web-id="webId"
                    />
                </div>

                <!-- 優質廠商 -->
                <Link />

                <Footer :class="$style.footer" />

                <QuickAccess />
            </div>

            <!-- 回頂端 -->
            <transition name="fade-up">
                <button
                    v-if="showButton"
                    :class="$style['to-top']"
                    @click="scrollToTop()"
                >
                    <div>
                        <img src="/images/biz/B06250319/arrow-totop.svg">
                    </div>
                    <div>TOP</div>
                </button>
            </transition>
            <!-- 廣告 -->
            <Ad v-if="commonStore.popupInfo.type === 'ad'" />
        </div>
    </div>
</template>

<style lang="scss" module>
.bg {
    background-color: #3f3f3f;
}

button {
    background-color: transparent;
    border: none;
}

a {
    text-decoration: none;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.card {
    max-width: 640px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.container {
    color: #434343;
    position: relative;
}

.info {
    margin-bottom: 48px;
    opacity: 0;
    padding: 29px 76px;
    padding-bottom: 0;
    position: relative;
    animation: fadeInSlideUp 1s ease-in-out forwards;
}

.footer {
    background-image: url('/images/biz/B06250319/serve_bg.jpg');
    background-size: 100% 100%;
    background-position: top;
    background-repeat: no-repeat;
}

.focus {
    position: absolute;
    top: 29px;
    right: 35px;
    z-index: 10;
    padding: 24px 36px;
}

.focus-bt {
    cursor: pointer;
    background-color: rgba($color: #000000, $alpha: 0.6);
    border-radius: 25px;
    width: 110px;
    font-size: 14px;
    color: #d2d7db;
    height: 40px;
    transition: all .2s;
    border: solid 1px #858585;
    letter-spacing: 0.5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2px;

    &:hover {
        opacity: 0.7;
    }

    &::before {
        content: url('/images/biz/B06250319/heart-line.svg');
        display: inline-block;
        width: 14px;
        height: 12px;
        position: relative;
        top: -1px;
        margin-right: 12px;
    }

    &.active {
        &::before {
            content: url('/images/biz/B06250319/heart.svg');
        }
    }
}

.topbg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 640px;
    max-height: 250px;
    aspect-ratio: 640 / 250;
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: 0;
    width: 100%;
    left: 0;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.info-contain {
    position: relative;
    z-index: 9;
}

.portfolio {
    margin-bottom: 31px;
    animation: fadeInSlideUp 1s ease-in-out forwards;
    transform: translateY(50px);
    animation-delay: 0.3s;
    opacity: 0;
    padding: 0 76px;
}

.serve {
    background-image: url('/images/biz/B06250319/serve_bg.jpg');
    background-size: 100% 100%;
    background-position: top;
    background-repeat: no-repeat;
    padding: 70px 76px;
    padding-bottom: 75px;
}

.contact {
    animation-delay: 0.5s;
    padding: 37px 76px 50px 76px;
}

.index-bg {
    position: relative;
}

.to-top {
    z-index: 999;
    cursor: pointer;
    margin-right: 9px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 70px;
    right: calc(50% - 320px);
    transition: all .3s;
    border: solid 1px #858585;
    padding: 0;

    div {
        font-size: 12px;
        font-weight: 300;
        letter-spacing: 1px;

        &:nth-child(1) {
            margin-top: -7px;
        }

        &:nth-child(2n) {
            margin-top: 4px;
        }
    }

    &:hover {
        opacity: 0.8;
    }

    img {
        width: 14px;
    }

}

// 淡入淡出動畫
@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes fadeInSlideUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width:640px) {
    .to-top {
        right: 5px;
    }

    .info {
        background-size: auto 250px;
    }

    .card {
        position: relative;
    }
}

@media (max-width:500px) {
    .info {
        background-size: auto 200px;
        padding: 29px 35px;
        margin-bottom: 1px;
    }

    .focus {
        right: 20px;
    }

    .portfolio {
        padding: 0 35px;
    }

    .serve {
        background-image: url('/images/biz/B06250319/serve_bg_phone.jpg');
        padding: 60px 35px;
        background-size: cover;
    }

    .contact {
        padding: 30px 35px;
    }

    .to-top {
        bottom: 65px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fadeupenter-active,
.fadeupleave-active {
    transition: opacity 0.5s ease;
}

.fadeupenter-from,
.fadeup-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.fadeupenter-to,
.fadeupleave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
