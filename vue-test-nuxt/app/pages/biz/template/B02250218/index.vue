<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import Recruitment from './components/Recruitment.vue';
import Ad from './components/Ad.vue';
import Info from './components/Info.vue';
import Portfolio from './components/Portfolio.vue';
import Contact from './components/Contact.vue';
import Company from './components/Company.vue';
import Link from './components/Link.vue';
import Footer from '@/components/Footer.vue';
import QuickAccess from '@/components/QuickAccess.vue';

const commonStore = useCommonStore();

const webID = computed(() => commonStore.userInfo.webID || '');

defineEmits(['get-info']);

//求職
const showRecruitment = ref(false);

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
            <!-- 標題開頭 -->
            <div v-if="commonStore.getPageInfo.basic?.logo?.[0]" :class="$style.header">
                <ClientOnly>
                    <img :src="`${commonStore.getImg(webID, commonStore.getPageInfo.basic?.logo?.[0])}`">
                </ClientOnly>
            </div>

            <!-- 主要內容 -->
            <div :class="$style.container">
                <Info
                    v-if="commonStore.getPageInfo.introduce"
                    :class="$style.info"
                    @get-info="$emit('get-info')"
                />
                <div
                    v-if="commonStore.getPageInfo.productFirstList?.length !== 0"
                    :class="$style.portfolio"
                >
                    <div :class="$style.title">
                        <span>展示區域</span>
                    </div>
                    <Portfolio />
                </div>
                <div
                    v-if="commonStore.getPageInfo.basic.info"
                    :class="$style.contact"
                >
                    <div
                        v-if="commonStore.getPageInfo.basic.info.email ||
                            commonStore.getPageInfo.basic.info.mobile ||
                            commonStore.getPageInfo.basic.info.url"
                        :class="$style.title"
                    >
                        <span>聯絡資訊</span>
                    </div>
                    <Contact :info="commonStore.getPageInfo" :web-id="webID" />
                </div>
                <div :class="$style['related-link']">
                    <Link />
                </div>
                <div
                    v-if="commonStore.getPageInfo.basic?.logo?.[0] ||
                        commonStore.getPageInfo.basic.info.title ||
                        commonStore.getPageInfo.basic.info.location
                    "
                    :class="$style.company"
                >
                    <div :class="$style.title">
                        <span>公司資訊</span>
                    </div>
                    <Company :info="commonStore.getPageInfo" :web-id="webID" />
                </div>
                <QuickAccess />
            </div>
            <Footer :class="$style.footer" />

            <!-- 回頂端 -->
            <transition name="fade-up">
                <button
                    v-if="showButton"
                    id="scrollToTopBtn"
                    :class="$style['to-top']"
                    @click="scrollToTop"
                >
                    <div>
                        <img src="/images/biz/B02250218/arrow-totop.svg">
                    </div>
                    <div :class="$style['to-top-text']">
                        TOP
                    </div>
                </button>
            </transition>
            <!-- 招募視窗-->
            <transition name="fade">
                <Recruitment
                    v-if="showRecruitment"
                    :recruit-info="commonStore.getPageInfo.recruitInfo"
                    @close="showRecruitment = false"
                />
            </transition>
            <transition name="fade">
                <div
                    v-if="showRecruitment"
                    style="
                        background-color: rgba(0, 0, 0, 0.8);
                        position: fixed;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;"
                />
            </transition>
            <!-- 廣告視窗-->
            <Ad v-if="commonStore.popupInfo.type === 'ad'" />
        </div>
    </div>
</template>

<style lang="scss" module>
.bg {
    background-color: #3f3f3f;
    margin: 0;
    padding: 0;
    letter-spacing: 0;
}

.footer {
    color: #434343;
    border-top: solid 1px #cacaca;
    padding: 15px 25px;
}

.card {
    max-width: 640px;
    background-color: #ffffff;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.header {
    box-sizing: border-box;
    opacity: 0;
    height: 93px;
    padding: 13px 18px 0 18px;
    animation: fadeInSlideUp 1s ease-in-out forwards;
}

.header {
    img {
        max-width: 100%;
        max-height: 100%;
    }
}

.container {
    padding: 0 60px;
    margin-top: 10.5px;
    color: #434343;
}

.title {
    font-size: 17px;
    margin-bottom: 18px;
    opacity: 0;
    line-height: 26px;
    animation: fadeInSlideUp 1s ease-in-out forwards;
}

.title {
    span {
        position: relative;
        display: inline-block;
        padding: 0px 9px;
        &::before,
        &::after {
            content: "";
            display: inline-block;
            width: 1px;
            height: 18px;
            position: absolute;
            background-color: #434343;
        }
        &::before {
            top: 5px;
            left: 0px;
        }
        &::after {
            right: 0px;
            bottom: 3px;
        }
    }
}

.info {
    margin-bottom: 27px;
    opacity: 0;
    animation: fadeInSlideUp 1s ease-in-out forwards;
}

.portfolio {
    margin-bottom: 34px;
    animation: fadeInSlideUp 1s ease-in-out forwards;
    transform: translateY(50px);
    animation-delay: 0.5s;
    opacity: 0;
}

.contact {
    animation: fadeInSlideUp 1s ease-in-out forwards;
    transform: translateY(50px);
    animation-delay: 0.5s;
    opacity: 0;
    margin-bottom: 44px;
}

.related-link {
    animation: fadeInSlideUp 1s ease-in-out forwards;
    transform: translateY(50px);
    animation-delay: 0.7s;
    opacity: 0;
}


.company {
    padding-bottom: 75px;
    animation: fadeInSlideUp 1s ease-in-out forwards;
    transform: translateY(50px);
    animation-delay: 0.9s;
    opacity: 0;
}

.to-top {
    z-index: 999;
    border: none;
    margin-right: 9px;
    color: #ffffff;
    background-color: #535353;
    font-size: 12px;
    border-radius: 50%;
    padding: 8px 10px;
    position: fixed;
    bottom: 78px;
    right: calc(50% - 320px);
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
    img {
        width: 20px;
        display: block;
        margin: 0 auto 3.225px auto;
    }
}

.to-top-text {
    transform: translateY(-1px);
}

.feature-btn {
    position: relative;
    width: calc(7em + 30px);
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
        height: 1em;
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
    .card {
        position: relative;
    }

    .to-top {
        right: 9px;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0px 18px;
    }
}

@media (max-width: 360px) {
    .header {
        text-align: center;
    }
}
</style>
