$(document).ready(function () {

    function observeAnimation(selector, fadeInClass) {

        const fadeOutClass = fadeInClass.replace("fadein", "fadeout");

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                const $target = $(entry.target);

                if (entry.isIntersecting) {

                    // 進入畫面才執行 fadein
                    if (!$target.hasClass(fadeInClass)) {

                        $target
                            .removeClass(fadeOutClass)
                            .addClass(fadeInClass);

                    }

                } else {

                    // 完全離開畫面才執行 fadeout
                    if (!$target.hasClass(fadeOutClass)) {

                        $target
                            .removeClass(fadeInClass)
                            .addClass(fadeOutClass);

                    }

                }

            });

        }, {
            threshold: 0
        });

        $(selector).each(function () {
            observer.observe(this);
        });

    }

    observeAnimation("#h_right", "fadein_bot_top");
    observeAnimation("#header_bg", "fadein_bot_bottom");
    observeAnimation("#h_photo_box", "fadein");
    observeAnimation("#work_title", "fadein_r_l");
    observeAnimation("#app_left", "fadein_bot_top");
    observeAnimation("#app_right", "fadein_bot_top");
    observeAnimation("#illus", "fadein_bot_top");
    observeAnimation("#footer", "fadein_bot_top");

});