<script setup>
import { computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import Text from '@/pages/biz/components/Text.vue';

const commonStore = useCommonStore();

const curPageData = computed(() => commonStore.getPageInfo);
</script>

<template>
    <div v-if="curPageData.serveDetail?.length" :class="$style.c_serve">
        <div :class="$style.cs_title">
            <div :class="$style.c_title">
                服務項目<span :class="$style.ct_en">Serveces</span>
            </div>
        </div>
        <div :class="$style.serve_ul">
            <div
                v-for="(item, index) in curPageData.serveDetail"
                :key="index"
                :class="$style.serve_list"
            >
                <div v-if="item.title" :class="$style.serve_list_title">
                    <div :class="$style.sl_num">
                        <span :class="$style.sl_num_span">
                            {{ index + 1 }}
                        </span>
                    </div>
                    <div :class="$style.sl_title">
                        {{ item?.title }}
                    </div>
                </div>
                <div v-if="item?.link" :class="$style.serve_list_content">
                    <Text
                        :class="$style.serve_list_self"
                        :text="item.link"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
@use "../scss/all.scss" as *;

.c_serve{
    position: relative;
    &::before{
        content: "";
        display: block;
        position: absolute;
        top: -124px;
        left: -4px;
        width: 101%;
        height: 267px;
        background-image: url(/images/biz/B06250401/serve_top.png);
        background-size: 100% 100%;
        background-position: top;
        z-index: 0;
    }
    &::after{
        content: "";
        display: block;
        position: absolute;
        bottom: -133px;
        left: -12px;
        width: 104%;
        height: 139px;
        background-image: url(/images/biz/B06250401/serve_bottom.png);
        background-size: 100% 100%;
        background-position: top;
        z-index: 0;
    }
}

.cs_title{
    margin: 0px 76px;
    margin-top: 83px;
    margin-bottom: 40px;
    position: relative;
    z-index: 1;
}

.c_title{
    color: #464646;
    border-color: #333333;
    text-shadow:-1px -1px 0 #ffffff,
    1px -1px 0 #ffffff,
    -1px  1px 0 #ffffff,
    1px  1px 0 #ffffff;
    margin-top: 1px;
}

.ct_en{
    color: #333333;
}

.serve_ul{
    position: relative;
    z-index: 1;
}

.serve_list{
    &:first-child{
        .serve_list_title{
            background-color: transparent;
        }
    }
    &:last-child{
        .serve_list_content{
            padding-bottom:0px;
        }
    }
}

.serve_list_title{
    padding-left: 76px;
    padding-right: 73px;
    font-size: 15px;
    letter-spacing: 0.05em;
    line-height: 1.6em;
    position: relative;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 18px;
    background-color: #ffffff;
}

.sl_num{
    background-color: #ffffff;
    position: absolute;
    left: 76px;
    top: 0px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border:solid 3px #333333;
    color: #333333;
    font-size: 24px;
    display: flex;
    justify-self: center;
    text-align: center;
    z-index: 2;
    box-sizing: border-box;
}

.sl_num_span{
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-weight: 600;
    position: relative;
    top: -1px;
}

.sl_title{
    font-weight: 600;
    background-color: #58A1F4;
    color: #ffffff;
    border: solid 2px #333333;
    border-radius: 0px 30px 30px 0px;
    width: 100%;
    margin-left: 30px;
    position: relative;
    top: 3px;
    padding: 14px 39px;
    padding-bottom: 14px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.serve_list_content{
    background-color: #ffffff;
    padding-bottom: 40px;
}

.serve_list_self{
    padding-left: 147px;
    padding-right: 124px;
    background-color: #ffffff;
    color: #434343;
    font-size: 15px;
    line-height: 1.6em;
    letter-spacing: 1px;
    overflow-wrap: break-word;
    p,h1,h1,h3,h4,h5,h6 {
        margin-top: 0;
    }
}

@media (max-width:570px) {
    .c_serve{
        &::before{
            height: 248px;
            top: -109px;
        }
    }
    .cs_title{
        margin-left: 35px;
    }
    .serve_list_title{
        padding-left: 35px;
        padding-right: 65px;
    }
    .sl_num{
        left: 35px;
    }
    .serve_list_self{
        padding-left: 95px;
        padding-right: 65px;
    }
}

@media (max-width:520px) {
    .c_serve::before {
        height: 225px;
        top: -86px;
    }
}

@media (max-width:500px) {
    .c_serve{
        &::before{
            height: 173px;
            top: -104px;
            background-image: url(/images/biz/B06250401/serve_top_phone.png);
            background-position: right;
        }
        &::after{
            bottom: -96px;
            height: 105px;
        }
    }
    .serve_list:first-child .serve_list_title{
        background-color: #ffffff;
    }
    .serve_list_title{
        padding-right: 33px;
        .sl_title{
            padding-right: 5px;
        }
    }
    .serve_list_self{
        padding-left: 96px;
    }
    .serve_list_content{
        padding-bottom: 30px;
    }
}

@media (max-width:450px) {
    .c_serve::before{
        height: 156px;
        top: -90px;
    }
}

@media (max-width:430px) {
    .c_serve::before{
        height: 148px;
        top: -81px;
    }
}

@media (max-width:390px) {
    .c_serve::before {
        height: 135px;
        top: -68px;
    }
}

@media (max-width:375px) {
    .c_serve{
        &::before{
            height: 129px;
            top: -62px;
        }
    }
}

@media (max-width:360px) {
    .c_serve{
        &::before{
            height: 124px;
            top: -58px;
        }
    }
}

@media (max-width:345px) {
    .c_serve{
        &::before{
            height: 120px;
            top: -54px;
        }
    }
}

@media (max-width:330px) {
    .c_serve{
        &::before{
            height: 115px;
            top: -49px;
        }
    }
}

@media (max-width:321px) {
    .c_serve{
        &::before{
            height: 112px;
            top: -46px;
        }
    }
}

</style>
