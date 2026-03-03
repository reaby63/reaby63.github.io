<script setup>
defineProps({
    info: {
        type: Object,
        default: () => {}
    },
    webId: {
        type: String,
        default: ''
    }
});
</script>
<template>
    <div v-if="info" :class="$style.c_contain">
        <ul
            v-if="info.basic.info.email||
                info.basic.info.mobile||
                info.basic.info.url"
        >
            <li v-if="info.basic.info.email">
                <span>
                    <img src="/images/biz/B02250218/mail.svg" alt="pic">
                </span>
                <span>
                    <a :href="`mailto:${info.basic.info.email}`" title="前往寄信">
                        {{ info.basic.info.email }}
                    </a>
                </span>
            </li>
            <li
                v-if="info.basic.info.mobile"
                :class="$style.phone"
            >
                <span>
                    <img src="/images/biz/B02250218/phone.svg" alt="icon">
                </span>
                <span>
                    <a :href="`tel:${info.basic.info.mobile}`" title="撥打電話">
                        {{ info.basic.info.mobile }}
                    </a>
                </span>
            </li>
            <li
                v-if="info.basic.info.url"
                :class="$style.web"
            >
                <span>
                    <img src="/images/biz/B02250218/web.svg" alt="icon">
                </span>
                <span>
                    <a
                        :href="info.basic.info.url"
                        title="前往網站"
                        target="_blank"
                    >
                        {{ info.basic.info.url }}
                    </a>
                </span>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" module>
.c_contain ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.c_contain ul li {
    padding: 11px 6px;
    border-bottom: solid 1px #cacaca;
    line-height: 1em;
}

.c_contain ul li span {
    font-weight: 400;
    font-size: 15px;
    word-wrap: break-word;
    display: inline-block;
    vertical-align: top;
}

.c_contain ul li span:last-child {
    width: calc(100% - 55.5px);
}

.c_contain ul li span:first-child {
    margin-right: 27.5px;
}

.c_contain ul li span:first-child img {
    width: 24px;
}

.c_contain ul li:first-child {
    padding-top: 0;
}

.c_contain ul li:last-child {
    border-bottom: 0px;
}

.c_contain a {
    color: #434343;
    text-decoration: none;
    transition: all 0.3s;
}

.c_contain a:hover {
    opacity: 0.9;
}

.phone span:last-child {
    position: relative;
    top: 5px;
}

.web span:last-child {
    position: relative;
    top: 5px;
}
</style>
