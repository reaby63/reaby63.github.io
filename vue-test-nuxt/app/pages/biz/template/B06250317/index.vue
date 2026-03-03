<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import PdCard from './components/PdCard.vue';
import Recruitment from './components/Recruitment.vue';
import Ad from './components/Ad.vue';
import Info from './components/Info.vue';
import Portfolio from './components/Portfolio.vue';
import Contact from './components/Contact.vue';
import Company from './components/Company.vue';
import Link from './components/Link.vue';
import Footer from '@/components/Footer.vue';
import QuickAccess from '@/components/QuickAccess.vue';

defineEmits(['get-info']);
const commonStore = useCommonStore();

const curPageData = computed(() => commonStore.getPageInfo);
const webId = computed(() => commonStore.userInfo.webID || '');

//求職
const showRecruitment = ref(false);

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
        <div v-if="curPageData" :class="$style.ccard">
            <div :class="$style.container">
                <Info />
                <div :class="$style['index-bg']">
                    <div :class="$style.bottombg">
                        <ClientOnly>
                            <img v-if="commonStore.getPageInfo?.introduce?.bottomBgImage?.[0]" :src="commonStore.getImg(webId, commonStore.getPageInfo?.introduce?.bottomBgImage?.[0])">
                            <img v-else src="/images/biz/B06250317/index_bg.png">
                        </ClientOnly>
                    </div>
                    <Portfolio @open-card="openCard" />
                    <Contact />
                    <Link />
                    <Company />
                    <Footer :class="$style.footer" />
                    <QuickAccess />
                </div>
            </div>
            <!-- 回頂端 -->
            <transition name="fadeup">
                <button
                    v-if="showButton"
                    id="scrollToTopBtn"
                    :class="$style['to-top']"
                    @click="scrollToTop"
                >
                    <div>
                        <img src="/images/biz/B06250317/arrow-totop.svg">
                    </div>
                    <div :class="$style['to-top-text']">
                        TOP
                    </div>
                </button>
            </transition>
            <!-- 作品展示視窗-->
            <PdCard
                v-if="showCard"
                :info="cardInfo"
                @close="showCard = false"
            />
            <!-- 招募視窗-->
            <transition name="fade">
                <Recruitment
                    v-if="showRecruitment"
                    :recruit-info="curPageData.recruitInfo"
                    @close="showRecruitment = false"
                />
            </transition>
            <transition name="fade">
                <div v-if="showRecruitment" :class="$style.mask" />
            </transition>
            <!-- 廣告視窗-->
            <Ad v-if="commonStore.popupInfo.type === 'ad'" />
        </div>
    </div>
</template>

<style lang="scss" module>
.bg {
    background-color: #3f3f3f;
}

.ccard {
    max-width: 640px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.container {
    position: relative;
}

.footer {
    position: relative;
    z-index: 3;
    margin: 0 35px 25px;
    padding: 0;
    padding-top: 19px;
    border-top: 0.5px solid rgba(255, 255, 255, 0.5);
    > div {
        margin: 0 3px;
    }
}

.index-bg {
    position: relative;
    overflow: hidden;
}

.bottombg {
    position: absolute;
    z-index: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &::before {
        content: "";
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
}

.to-top {
    z-index: 999;
    margin-right: 9px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 78px;
    right: calc(50% - 320px);
    transition: all 0.3s;
    border: solid 1px #858585;
    cursor: pointer;
    z-index: 9;
    padding: 0;

    div {
        font-size: 12px;
        font-weight: 300;
        letter-spacing: 1px;

        &.style.to-top-text {
            margin-left: 1px;
            margin-top: 5px;
        }
    }

    &:hover {
        opacity: 0.8;
    }

    img {
        transform: translateY(-4.75px);
        width: 14px;
        height: 7.88px;
        margin: auto;
    }
}

.close-btn {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 10px;
    right: 15px;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
    background-color: transparent;

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 1px;
        height: 24px;
        border-radius: 5px;
        background-color: #fff;
    }

    &::before {
        transform: rotate(48deg);
    }

    &::after {
        transform: rotate(-48deg);
    }

    &:hover {
        opacity: 0.8;
    }
}

.feature-btn {
    position: relative;
    width: calc(105px + 30px);
    height: 25px;
    padding: 2px 20px;
    font-size: 15px;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: transparent;

    img {
        position: relative;
        display: inline-block;
        width: auto;
        height: 16px;
        margin-right: 6px;
        top: 2px;
    }

    &::after {
        content: "";
        display: inline-block;
        width: 1px;
        height: 15px;
        background-color: #ffffff;
        position: absolute;
        top: 6px;
        right: 0;
    }

    &:last-child,
    &:nth-child(2n) {
        &::after {
            display: none;
        }
    }

    &:hover {
        color: #cacaca;
    }
}

.mask {
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 98;
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

@media (max-width: 640px) {
    .to-top {
        right: 9px;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0;
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

.fadeup-enter-active,
.fadeup-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.fadeup-enter-from,
.fadeup-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.fadeup-enter-to,
.fadeup-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>
