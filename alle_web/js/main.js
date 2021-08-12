var page_list = ["app", "school_system", "access_control", "library", "price", "health", "newStudent", "appStudentLeave", "news", "team", "contact" , "borrow_book"];

var changePage = function(page) {
  console.log("page => ", page);
  $("#includedContent").load(page + ".html"); 
  if(page_list.indexOf(page) > -1) {
      // $(".ProductList").slideUp();
    }
};

var appchangePage = function(page) {
  console.log("page => ", page);
  $("#app_modal_content").load(page + ".html"); 
};

$(function() {
  var tabs = document.getElementsByClassName("tab");
  console.log("tabs => ", tabs);
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      if (current.length > 0) { 
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
      });
    }
  window.addEventListener("hashchange", function() {
    var hash = location.hash;
    hash = hash.replace("#", "") || "";
    
    if(location.hash === "") {
      changePage("main_slider");
    } else if(page_list.indexOf(hash) > -1) {
    	changePage(hash);
        document.getElementById(hash).click();
    }
  }, false);
  $("#includedContent").load("main_slider.html");
});

$(window).scroll(function() {
  var navbar = document.getElementsByClassName("nav navbar-nav navbar-right");
  if(navbar.length > 1) { // 第二條navbar才是需要偵測active的bar
    var nav = navbar[1];
    var lis = nav.getElementsByTagName("li");
    
    for(var i = 0; i < lis.length; i++) {
      var li = lis[i];
      if(li.className === "active") {
        $("#navbarMenuTitle").text(li.innerText);
        break;
      }
    }
  }
});

var sendMail = function() {
  var form = {
    type : "request",
    version : "1.0",
    format : "json",
    name : "function_name",
    reserved : {}
  };
  
  form.para = {
    unit : document.getElementById('alle_form_unit').value,
    name : document.getElementById('alle_form_name').value,
    phone : document.getElementById('alle_form_phone').value,
    mail : document.getElementById('alle_form_mail').value,
    content : document.getElementById('alle_form_content').value
  }
  
  $.ajax({
    url:"/web-cms_portal/service/oauth_data/mail/insert",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(form),
    success: function (response) {
      var value = response.result.value;
      if(value > 0) {
        alert("我們已收到您的來信，將在上班時間儘速回覆您，謝謝");
        document.getElementById('alle_form_unit').value = "";
        document.getElementById('alle_form_name').value = "";
        document.getElementById('alle_form_phone').value = "";
        document.getElementById('alle_form_mail').value = "";
        document.getElementById('alle_form_content').value = "";
      }
    },
    error: function(error) {
      alert(error.responseJSON.message);
    }
  });
};


(function($) {
  "use strict";

  /*--------------------------
  preloader
  ---------------------------- */
  $(window).on('load', function() {
    var pre_loader = $('#preloader');
    pre_loader.fadeOut('slow', function() {
      $(this).remove();
    });
  });

  /*----------------------------
   Navbar nav
  ------------------------------ */
  // var main_menu = $(".main-menu ul.navbar-nav li ");
  // main_menu.on('click', function() {
  //   main_menu.removeClass("active");
  //   $(this).addClass("active");
  // });


  /*----------------------------
   wow js active
  ------------------------------ */
  new WOW().init();

  $(".navbar-collapse a:not(.dropdown-toggle)").on('click', function() {
    $(".navbar-collapse.collapse").removeClass('in');
  });

  //---------------------------------------------
  //Nivo slider
  //---------------------------------------------
  // $('#ensign-nivoslider').nivoSlider({
  //   effect: 'fade',
  //   slices: 15,
  //   boxCols: 12,
  //   boxRows: 8,
  //   animSpeed: 500,
  //   pauseTime: 5000,
  //   startSlide: 0,
  //   directionNav: true,
  //   controlNavThumbs: false,
  //   pauseOnHover: true,
  //   manualAdvance: false,
  // });

  /*----------------------------
   Scrollspy js
  ------------------------------ */
  var Body = $('body');
  Body.scrollspy({
    target: '.navbar-collapse',
    offset: 80
  });

  /*---------------------
    Venobox
  --------------------- */
  var veno_box = $('.venobox');
  veno_box.venobox();

  /*----------------------------
  Page Scroll
  ------------------------------ */
  var page_scroll = $('a.page-scroll');
  page_scroll.on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 55
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });


  /*----------------------------
   Parallax
  ------------------------------ */
  var well_lax = $('.wellcome-area');
  well_lax.parallax("50%", 0.4);
  var well_text = $('.wellcome-text');
  well_text.parallax("50%", 0.6);

  /*--------------------------
   collapse
  ---------------------------- */
  var panel_test = $('.panel-heading a');
  panel_test.on('click', function() {
    panel_test.removeClass('active');
    $(this).addClass('active');
  });

  /*---------------------
   Testimonial carousel
  ---------------------*/
  var test_carousel = $('.testimonial-carousel');
  test_carousel.owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });
  /*----------------------------
   isotope active
  ------------------------------ */
  // portfolio start
  $(window).on("load", function() {
    var $container = $('.awesome-project-content');
    $container.isotope({
      filter: '*',
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });
    var pro_menu = $('.project-menu li a');
    pro_menu.on("click", function() {
      var pro_menu_active = $('.project-menu li a.active');
      pro_menu_active.removeClass('active');
      $(this).addClass('active');
      var selector = $(this).attr('data-filter');
      $container.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      return false;
    });

  });
  //portfolio end

  /*---------------------
   Circular Bars - Knob
--------------------- */
  if (typeof($.fn.knob) != 'undefined') {
    var knob_tex = $('.knob');
    knob_tex.each(function() {
      var $this = $(this),
        knobVal = $this.attr('data-rel');

      $this.knob({
        'draw': function() {
          $(this.i).val(this.cv + '%')
        }
      });

      $this.appear(function() {
        $({
          value: 0
        }).animate({
          value: knobVal
        }, {
          duration: 2000,
          easing: 'swing',
          step: function() {
            $this.val(Math.ceil(this.value)).trigger('change');
          }
        });
      }, {
        accX: 0,
        accY: -150
      });
    });
  }


})(jQuery);

$(document).ready(function(){
  $("#ProductList").click(function(){
  $(".ProductList").slideToggle();
  });
});
$(document).ready(function(){
  $("#CloseList").click(function(){
  $(".ProductList").slideUp();
  });
});
// When the user scrolls the page, execute myFunction
// window.onscroll = function() {myFunction()};

// Get the navbar
// var navbar = document.getElementById("sticker");

// Get the offset position of the navbar
// var sticky = sticker.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     sticker.classList.add("stick")
//   } else {
//     sticker.classList.remove("stick");
//   }
// } 用了這個好像會壞掉

  /*--------------------------
    Back to top button
  ---------------------------- */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})

