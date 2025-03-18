// init demo
$(function(){
  $('#biruTabs').biruTabs({
    share:true,
    share_link: {
      "link_one":"https://facebook.com/nakome",
      "link_two":"https://twitter.com/nakome",
      "link_three":"http://codepen.com/nakome",
      "link_four":"http://instagram.com/nakome"
    },
    share_text: {
      "link_one":"<small>Facebook</small>",
      "link_two":"<small>Twitter</small>",
      "link_three":"<small>Codepen</small>",
      "link_four":"<small>Instagram</small>"
    }
  });
  
  $('#biruTabs2').biruTabs({delay:2000});
});




/*
* 
* biruTabs.js  1.0v
*
* Copyright 2013 @nakome & @aryandhani
* Licensed under the Apache License v2.0
* http://www.apache.org/licenses/LICENSE-2.0
*
*			Defaults:
*			-> delay: false,
*			-> speed: 500,
*			-> complete: false,
*			-> fluid: false,
*			-> share: false,
*     -> share_link: {
*     ->   "link_one":"http://",
*     ->   "link_two":"http://",
*     ->   "link_three":"http://",
*     ->   "link_four":"http://"
*     -> },
*     -> share_text: {
*     ->   "link_one":"one", also you can put icons
*     ->   "link_two":"two",also you can put icons
*     ->   "link_three":"three",also you can put icons
*     ->   "link_four":"four+"also you can put icons
*     -> }
*/
;(function($, biru) {
  
  'use-strict';
  
  //  if not jQuery not get error.
  if(!$) return biru;
  
  
  // if mobile use touchstart
  // if not use click
  function mobilecheck() {
    var check = false;
    (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }
  
  var biruTabs = function() {
    this.el = biru;
    this.items = biru;
    this.sizes = [];
    this.max = [0,0];
    this.current = 0;
    this.interval = biru;
    this.options = {
      speed: 800,
      delay: biru,
      complete: biru,
      fluid: true,
      share: biru,
      share_link: {
        "link_one":"#",
        "link_two":"#",
        "link_three":"#",
        "link_four":"#"
      },
      share_text: {
        "link_one":"one",
        "link_two":"two",
        "link_three":"three",
        "link_four":"four"
      }
    };
    
    var self = this;
    // Init function 
    this.init = function(el, options) {
      this.el = el;
      this.ul = el.children('ul');
      this.max = [el.outerWidth(), el.outerHeight()];
      this.items = this.ul.children('li')
      .each(this.getWidth);
      // Get options
      this.options = $.extend(this.options, options);
      // Get actions
      this.getSlide();
      // if true show share links
      if(this.options.share) this.getShare();
      return this;
    };
    
    //  Get width
    this.getWidth = function(index) {
      var el = $(this),
          width = el.outerWidth(), height = el.outerHeight();
      self.sizes[index] = [width, height];
      if(width > self.max[0]) self.max[0] = width;
      if(height > self.max[1]) self.max[1] = height;
    };
    
    //  Get slide
    this.getSlide = function() {
      this.el.css({
        overflow: 'hidden',
        width: self.max[0],
        // height: this.items.first().outerHeight()
      });
      this.ul.css({
        width: (this.items.length * 100) + '%',
        position: 'relative'
      });
      // Divide in same parts 
      this.items.css('width', (100 / this.items.length) + '%');
      
      if(this.options.delay !== biru) {
        this.start();
        this.el.hover(this.stop, this.start);
      }
      
      // show tabs
      this.tabs();
      
      //  if resize divide in same parts
      if(this.options.fluid) {
        var resize = function() { 
          self.el.css('width', Math.min(Math.round(
            self.el.outerWidth() * 100), 100) + '%');
          self.el.parent().css('width', Math.min(Math.round(
            self.el.outerWidth() * 100), 100) + '%');
        };
        resize();
        $(window).resize(resize);
      }
    };
    
    
      
    this.getShare = function(){
      html = '<ul class="shareMe">'+
        '<li><a href="'+
        this.options.share_link.link_one+'">'+
        this.options.share_text.link_one+
        '</a></li>'+
        '<li><a href="'+
        this.options.share_link.link_two+'">'+
        this.options.share_text.link_two+
        '</a></li>'+
        '<li><a href="'+
        this.options.share_link.link_three+'">'+
        this.options.share_text.link_three+
        '</a></li>'+
        '<li><a href="'+
        this.options.share_link.link_four+'">'+
        this.options.share_text.link_four+
        '</a></li>'+
        '</ul>';
      this.el.parent().append(html);
    };
    
    //  Move biruSlide 
    this.move = function(index, cb) {
      
      // On finish go to start
      if(!this.items.eq(index).length) index = 0;
      if(index < 0) index = (this.items.length - 1);
      
      var target = this.items.eq(index);
      var obj = {height: target.outerHeight()};
      var speed = cb ? 5 : this.options.speed;
      
      if(!this.ul.is(':animated')){
        // Find dot a make active
        self.el.find('.tab:eq('+index+')')
        .addClass('active')
        .siblings()
        .removeClass('active');
        
        // Animate slide
        this.el.animate(obj, speed) 
        && this.ul.animate($.extend({
          left: '-' + index + '00%'
        }, obj), speed, function(data) {
          self.current = index;
          $.isFunction(self.options.complete) 
          && self.options.complete(self.el);
        });
      }
    };
    
		//  Autoplay
		this.start = function() {
			self.interval = setInterval(function() {
				self.move(self.current + 1);
			}, self.options.delay);
		};
		
		//  Stop autoplay
		this.stop = function() {
			self.interval = clearInterval(self.interval);
			return self;
		};
    
    this.tabs = function(){
      this.el
      .addClass('has-tabs')
      .find('.tab')
      .on(mobilecheck() ? 'touchstart' : 'click',
          function() {
        self.move($(this).index());
      });
    };
    
  };
  
  //  Create a jQuery plugin
  $.fn.biruTabs = function(elem) {
    var el = this.length;
    return this.each(function(index) {
      var _self = $(this),
          slide = new biruTabs,
          instance = slide.init(_self, elem);
      _self.data('biruSlide' + (el > 1 ? '-' + (index + 1) : ''), instance);
    });
  };
})(window.jQuery, false);