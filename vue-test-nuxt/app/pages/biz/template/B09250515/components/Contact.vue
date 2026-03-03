<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Image from '@/components/Image.vue';
import Community from '../components/Community.vue';

const commonStore = useCommonStore();
const openContact = computed(() =>
    commonStore.getPageInfo.basic?.info?.phone ||
    commonStore.getPageInfo.basic?.info?.mobile ||
    // commonStore.getPageInfo.basic?.info?.email ||
    commonStore.getPageInfo.basic?.info?.url ||
    commonStore.getPageInfo.basic?.info?.location ||
    commonStore.getPageInfo.introduce?.franchisePhone
);

const openPhone = () => {
    window.location.href = `tel:${commonStore.getPageInfo.basic?.info?.phone || commonStore.getPageInfo.basic?.info?.mobile}`;
};

const openFranchisePhone = () => {
    window.location.href = `tel:${commonStore.getPageInfo.introduce?.franchisePhone}`;
};

const openMail = () => {
    window.location.href = `mailto:${commonStore.getPageInfo.basic?.info?.email}`;
};

const openUrl = () => {
    window.open(commonStore.getPageInfo.basic?.info?.url);
};

const openMap = () => {
    const url = `https://www.google.com/maps?q=${commonStore.getPageInfo.basic.info.location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
};
</script>

<template>
    <div :class="$style['contact-all']">
        <div :class="$style['contact-top']">
            <ClientOnly>
                <Image
                    v-if="commonStore.getPageInfo.basic.logo[0]"
                    :img-src="commonStore.getImg(commonStore.userInfo.webID, commonStore.getPageInfo.basic.logo[0])"
                    :has-zoom="true"
                    :class="$style['contact-img']"
                />
                <Image
                    v-else-if="commonStore.getPageInfo.basic.image[0]"
                    :img-src="commonStore.getImg(commonStore.userInfo.webID, commonStore.getPageInfo.basic.image[0])"
                    :has-zoom="true"
                    :class="$style['contact-img']"
                />
            </ClientOnly>
        </div>
        <div v-if="openContact" :class="$style.contact">
            <div v-if="commonStore.getPageInfo.basic?.info?.phone || commonStore.getPageInfo.basic?.info?.mobile || commonStore.getPageInfo.introduce?.franchisePhone" :class="$style['phone-list']">
                <div v-if="commonStore.getPageInfo.basic?.info?.phone || commonStore.getPageInfo.basic?.info?.mobile" :class="$style['contact-list']">
                    <div :class="$style.img">
                        <img src="/images/biz/B09250515/icon-phone.svg">
                    </div>
                    <div
                        :class="$style.link"
                        title="撥打電話"
                        @click="openPhone"
                    >
                        {{ commonStore.getPageInfo.basic?.info?.phone || commonStore.getPageInfo.basic?.info?.mobile }}
                    </div>
                </div>
                <div v-if="commonStore.getPageInfo.introduce?.franchisePhone" :class="[$style['contact-list'], $style['franchise-phone']]">
                    <div :class="$style.img">
                        <img src="/images/biz/B09250515/icon-franchisePhone.svg">
                    </div>
                    <div
                        :class="$style.link"
                        title="撥打加盟專線"
                        @click="openFranchisePhone"
                    >
                        {{ commonStore.getPageInfo.introduce.franchisePhone }}
                    </div>
                </div>
            </div>
            <!-- <div v-if="commonStore.getPageInfo.basic?.info?.email" :class="$style['contact-list']">
                <div :class="$style.img">
                    <img src="/images/biz/B09250515/icon-mail.svg">
                </div>
                <div
                    :class="$style.link"
                    title="前往寄信"
                    @click="openMail"
                >
                    {{ commonStore.getPageInfo.basic?.info?.email }}
                </div>
            </div> -->
            <div v-if="commonStore.getPageInfo.basic?.info?.url" :class="$style['contact-list']">
                <div :class="$style.img">
                    <img src="/images/biz/B09250515/icon-web.svg">
                </div>
                <div
                    :class="$style.link"
                    title="前往網站"
                    @click="openUrl"
                >
                    {{ commonStore.getPageInfo.basic?.info?.url }}
                </div>
            </div>
            <div v-if="commonStore.getPageInfo.basic?.info?.location" :class="$style['contact-list']">
                <div :class="$style.img">
                    <img src="/images/biz/B09250515/icon-position.svg">
                </div>
                <div
                    :class="$style.link"
                    title="前往Google Map"
                    @click="openMap"
                >
                    {{ commonStore.getPageInfo.basic?.info?.location }}
                </div>
            </div>
            <!-- 社群元件 -->
            <Community />
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;
.contact-all {
    animation: fadeIn 1.5s ease-in-out forwards;
    opacity: 0;
    animation-delay: 0.8s;
}

.contact-top {
    background-image: url('/images/biz/B09250515/secPorfolio-bg-bottom.svg');
    background-size: 100%;
    background-position: top; /* 讓背景對齊上方 */
    background-repeat: no-repeat;
    height: 133px;
    display: flex;
    justify-content: center;
    background-color: rgba(251, 239, 216, 0.7803921569);
    .contact-img {
        max-height: 145px;
        max-width: 145px;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 23px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: transparent;
        }
    }
}

.contact {
    font-size: 15px;
    background-color: #FBEFD8C7;
    padding: 42px 114px 38px;
}

.contact-list {
    display: flex;
    align-items: center;
    color: #EB1B26F0;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.15px;
    line-height: 30px;
    padding: 10px 0;
    border-bottom: solid 2px #EB1B26F0;
    .img {
        display: flex;
        margin-right: 8px;
    }
}

.link {
    cursor: pointer;
}

.phone-list {
    border-bottom: solid 2px #EB1B26F0;
    padding: 10px 0;
    display: flex;
    .contact-list {
        border: 0px;
        padding: 0;
        margin-right: 20px;
    }
    .franchise-phone {
        border-left: solid 2px #EB1B26F0;
        padding-left: 20px;
        margin-right: 0;
        .img {
            display: none;
        }
        &:before {
            content: "加盟專線";
            display: inline-block;
            margin-right: 11px;
        }
    }
}

@media (max-width:580px) {
    .contact-all {
        display: flex;
        align-items: flex-start;
        background-color: rgba(251, 239, 216, 0.7803921569);
        padding: 0 19px;
        justify-content: center;
    }
    .contact-top {
        background-image: none;
        height: auto;
        width: 63px;
        margin-right: 19px;
        background-color: transparent;
    }
    .contact {
        padding: 0 0 70px;
        background-color: transparent;
        min-width: 158px;
    }
    .contact-list {
        font-size: 14px;
        padding: 6px 0;
        .img {
            width: 15px;
            height: 15px;
        }
    }
    .phone-list {
        border: 0;
        padding: 0;
        display: block;
        .contact-list ,
        .franchise-phone {
            padding: 6px 0;
            display: flex;
            align-items: center;
            border-left:0;
            margin-right: 0;
            border-bottom: solid 2px #EB1B26F0;
            .img {
                display: inline-flex;
            }
            &:before {
                display: none;
            }
        }
    }
}
</style>
