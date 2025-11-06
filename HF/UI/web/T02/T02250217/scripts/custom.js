// device
const device = new getDevice(1280, (size) => {
  console.log('螢幕更新:', size);
}, false);

// 偵測是否為行動裝置
console.log(device.isMobile().any); // true/false

// 偵測是否為觸控裝置
console.log(device.isTouchDevice()); // true/false

// 取得螢幕尺寸
console.log(device.getWindowSize()); 

// store
const useStore = new LocalStore('useData',{
  isPlicyShow: false,
  isFocus: false
});

const $store = useStore.get();
const $cookie = document.querySelector('.c-cookie');
const $fixedFocusBtns = document.querySelectorAll('.c-btn\\:global\\|fixed-focus');

// menu
function goBlock(event, block) {
    event.preventDefault();
    
    const el = document.querySelector(block);
    
    if (el) {
        window.scrollTo({
            top: el.offsetTop,
            behavior: 'smooth'
        });
    } else {
        console.error(`找不到 ID 為 ${block} 的元素。`);
    }
}

// policy
(function policy() {
  !$store.isPlicyShow && $cookie.classList.add('an-in');
})();

const closeCookie = () => {
  $cookie.classList.add('an-out');

  useStore.update({isPlicyShow: true});

  setTimeout(() => {
    $cookie.classList.remove('an-in');
  }, 1000);
}

// fixed focus
(function fixedFocus() {
  $store.isFocus && $fixedFocusBtns.forEach(btn => btn.classList.add('is-focus'));
})();

const toggleFocus = () => {
  const newFocusStatus = !useStore.get().isFocus;
  useStore.update({ isFocus: newFocusStatus });
  $fixedFocusBtns.forEach(btn => {
    btn.classList.toggle('is-focus', newFocusStatus);
  });
}

// lightbox scroll
let lbxScroll = (ele) => {
  const settingEle = $(ele);
  let lastScrollTop = 0;

  let init = $('.lbx-content').scrollTop();

  if (init != 0) {
    settingEle.removeClass('is-top').addClass('is-move');
  } else {
    settingEle.addClass('is-top').removeClass('is-move');
  }

  $('.lbx-content').scroll(function () {
    let threshold = $(document).height() - $('.lbx-content').height() - $('footer').height();

    if ($('.lbx-content').scrollTop() > 0) {
      settingEle.addClass('is-show').removeClass('is-top');

      if ($('.lbx-content').scrollTop() >= threshold) {
        settingEle.removeClass('is-move').addClass('is-end');
      } else {
        settingEle.addClass('is-move').removeClass('is-end');
      }
    } else {
      settingEle.removeClass('is-show').removeClass('is-move').addClass('is-top');
    }

    let scroll = $('.lbx-content').scrollTop();

    if (scroll >= 10 && scroll < lastScrollTop) {
      settingEle.addClass('is-fadein');
    } else {
      settingEle.removeClass('is-fadein');
    }

    lastScrollTop = scroll;
  });
}


// lightbox
const openPrivacyLbx = () => FetchLightbox.open({
  page: "./privacy-policy.html",
  cssClass: "c-lbx:privacy",
  init: () => {}
});

const openRecruitmentLbx = () => FetchLightbox.open({
  page: "./fixed-recruitment.html",
  cssClass: "c-lbx:recruitment",
  init: () => {
    jhuangpingCollapsible.init({
      isSingleOpen: true
    });
  }
});

const openAdvertisingLbx = () => FetchLightbox.open({
  page: "./fixed-advertising.html",
  cssClass: "c-lbx:adv",
  init: () => {
    let advTextSwiper = new Swiper('.lbx-text.swiper-container', {
      spaceBetween: 0,
      slidesPerView: 1,
      speed: 3000,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
  }
});

const openNewsLbx = () => FetchLightbox.open({
  page: "./news.html",
  cssClass: "c-lbx:news",
  init: () => {}
});

const openPlanALbx = () => FetchLightbox.open({
  page: "./srv-plan-a.html",
  cssClass: "c-lbx:srv|plan-a",
  init: () => {
    jhuangpingTab.initAll();

    $('.c-lbx\\:srv\\|plan-a .c-btn\\:global\\|fixed-gotop').click(function () {
      let scrollBlock = $('#lbx1').is(':visible') ? $('.lbx-content') : $('.c-body')

      scrollBlock.animate({
        scrollTop: 0
      }, 500, 'swing');
    });

    lbxScroll('.c-lbx\\:srv\\|plan-a .c-btn\\:global\\|fixed-gotop')
  }
});

const openPlanBLbx = () => FetchLightbox.open({
  page: "./srv-plan-b.html",
  cssClass: "c-lbx:srv|plan-b",
  init: () => {
    imgfit.init();

    $('.c-lbx\\:srv\\|plan-b .c-btn\\:global\\|fixed-gotop').click(function () {
      $('.lbx-content').animate({
        scrollTop: 0
      }, 500, 'swing');
    });

    lbxScroll('.c-lbx\\:srv\\|plan-b .c-btn\\:global\\|fixed-gotop')
  }
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      FetchLightbox.closeAll(500);
    }
});


$(document).ready(function () {

// scroll
jhuangPingJqTool.scroll();
jhuangPingJqTool.click({
  gotop: {
    enable: true,
    bk: '.l-wp\\:html',
    btn: '.js-gotop',
  },
  back: {
    enable: true,
    ele: '.js-back',
  },
});

// imgfit
imgfit.init();

jhuangpingTab.initAll();
// const newsTabs = new jhuangpingTab(".js-news-tab", {
//   defaultIndex: 0,
//   eventType: "click",
//   effect: "fade",
// });

// const srvTabs = new jhuangpingTab(".js-tab\\:srv", {
//   defaultIndex: 0,
//   eventType: "click",
//   effect: "fade",
// });

const newsPages = new Pagination(".js-page\\:news");
const srvPages = new Pagination(".js-page\\:srv");

$('.headline__btn').click(function () {
  $('.hd-mobile .menu').toggleClass('is-open');
});

$('.hd-mobile .toggle').click(function () {
  $('.hd-mobile .menu').removeClass('is-open');
});

// swiper
let menuCommunity = new Swiper('.hd-mobile .js-swiper-community .swiper-container', {
  slidesPerView: 4,
  spaceBetween: 8,
  loop: true
});

let fixedCommunity = $('.js-swiper\\:fixed .swiper-slide').length;
  fixedCommunity > 1 ? $('.js-swiper\\:fixed').removeClass('is-item-only') : $('.js-swiper\\:fixed').addClass('is-item-only');
  let fixedSwiper = new Swiper('.js-swiper\\:fixed .swiper-container', {
    slidesPerView: 4,
    spaceBetween: 13,
    direction: 'vertical',
    loop: fixedCommunity > 1 ? true : false,
    // navigation: {
    //     nextEl: '.js-swiper\\:fixed .js-btn-next',
    //   },
  });

let bnItem = $('.c-bn .swiper-slide').length;
bnItem > 1 ? $('.c-bn').removeClass('is-slide-only') : $('.c-bn').addClass('is-slide-only');
let bannerSwiper = new Swiper('.c-bn .swiper-container', {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: bnItem > 1 ? true : false,
    autoplay: bnItem > 1 ? true : false,
    speed: 3000,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    pagination: {
      el: ".c-bn .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">0' + (index + 1) + "</span>";
      },
    },
    navigation: {
    nextEl: '.c-bn .js-swiper\\:next',
    prevEl: '.c-bn .js-swiper\\:prev'
  },
  });

let contactSwiper = new Swiper('.js-swiper\\:con', {
  spaceBetween: 50,
  slidesPerView: 2,
  navigation: {
    nextEl: '.js-swiper\\:con + .btn-group .js-swiper\\:next',
    prevEl: '.js-swiper\\:con + .btn-group .js-swiper\\:prev'
  },
  breakpoints: {
    1920: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
    992: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
})

});
