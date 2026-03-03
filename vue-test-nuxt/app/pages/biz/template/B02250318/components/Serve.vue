<script setup>
import { ref, computed, onMounted, onBeforeUnmount, useCssModule } from 'vue';
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();
const curPageData = computed(() => commonStore.getPageInfo);
// 項目一個一個滑入動態
const $style = useCssModule();
const serveItems = ref([]);
let observer;

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add($style['visible']);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    serveItems.value.forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => {
    if (observer) observer.disconnect();
});
</script>

<template>
    <div :class="$style.serve">
        <div :class="$style['serve-img']">
            <img src="/images/biz/B02250318/bg_01_top.svg">
        </div>
        <div v-if="curPageData.serveDetail?.length || curPageData.serveSetting?.title || curPageData.serveSetting?.titleEn || curPageData.serveSetting?.content" :class="$style['serve-in']">
            <div v-if="curPageData.serveSetting?.title || curPageData.serveSetting?.titleEn" :class="$style.title">
                <span>{{ curPageData.serveSetting?.title }}</span><span :class="$style['titile-en']">{{ curPageData.serveSetting?.titleEn }}</span>
            </div>
            <Text
                v-if="curPageData.serveSetting?.content"
                :class="$style['title-p']"
                :text="curPageData.serveSetting?.content"
            />
            <div v-if="curPageData.serveDetail?.length" :class="$style.listAn">
                <div
                    v-for="(item, index) in curPageData.serveDetail"
                    :key="index"
                    :ref="(el) => (serveItems[index] = el)"
                    :class="$style['serve-self']"
                >
                    <div :class="$style['cs-num']">
                        <span>
                            {{ (index + 1) < 10 ? '0' + (index + 1) : index + 1 }}
                        </span>
                    </div>
                    <div :class="$style.in">
                        <div :class="$style['cs-title']">
                            {{ item.title }}
                        </div>
                        <Text
                            v-if="item.link"
                            :class="$style['cs-content']"
                            :text="item.link"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.serve {
    position: relative;
    background-color: #292929;
}

.serve-img {
    width: 100%;
    height: 37px;
    position: absolute;
    top: -36px;
    width: -webkit-fill-available;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.serve-in {
    color: #ffffff;
    padding: 25px 35px;
    padding-bottom: 52px;
    background-color: #292929;
    overflow: hidden;
}

.title,
.title-p {
    opacity: 0;
    animation: fadeInSlideUp 1s ease-in-out forwards;
    animation-delay: 0.2s;
}

.listAn {
    opacity: 0;
    animation: fadeInSlideUp 1s ease-in-out forwards;
    animation-delay: 0.8s;
}

.serve-self {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 27px;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
    animation-delay: 0.2s;
    &:last-child {
        margin-bottom: 0;
    }
}

.visible {
  opacity: 1;
  transform: translateY(0);
}

.cs-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 19px;
    background-color: #e6ba00;
    position: relative;
    span {
        font-family: "Zen Kaku Gothic New", sans-serif;
        font-size: 21px;
        font-style: italic;
        position: absolute;
        top: 11px;
        left: 13px;
        font-weight: bold;
    }
}

.in {
    width: calc( 100% - 50px - 18px );
    .cs-title {
        color: #e6ba00;
        font-style: italic;
        font-size: 18px;
        line-height: 1.6;
    }
    .cs-content {
        margin-left: 2px;
        font-size: 15px;
        line-height: 2;
    }
}

@media (min-width:475px) {
    .serve-in {
        padding: 18px 50px;
        padding-bottom: 52px;
    }
}
</style>
