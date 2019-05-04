"use strict";

(function ($, window, document) {

  $(window).on("load", function () {
    /* Loaded */
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({ 'overflow': 'visible' });

    /* Scrolling Animate */
    $(".navbar-nav a.nav-link, a[href='#top'], .anchor").mPageScroll2id({
      offset: 60,
      scrollSpeed: 800
    });
  });

  /* Dropdown menu */
  jQuery('li.dropdown').find('.nav-link').each(function () {
    jQuery(this).on('click', function () {
      if (jQuery(window).width() < 991) {
        jQuery('.dropdown-menu').slideToggle();
      }
      return false;
    });
  });

  /* Shuffle filter */
  var TS_shuffle = [];

  function init() {
    $('body .init-filter').each(function (i) {
      var elm = $(this).data('shuffle-id', i);
      TS_shuffle[i] = new Shuffle(elm.find('.js-shuffle').get(0), {
        itemSelector: '.masonry-item',
        sizer: '.my-sizer-element',
        speed: 650
      });
    });
  }

  $(document).on('click', '.filters-button-group button', function (e) {
    e.preventDefault();
    var button = $(this).closest('button'),
        groups = void 0,
        i = void 0;
    if (!button.hasClass('active')) {
      button.addClass('active').siblings().removeClass('active');
      groups = button.data('target');

      i = button.closest('.init-filter').data('shuffle-id');

      if (typeof TS_shuffle[i] !== 'undefined') {
        TS_shuffle[i].filter(function (element) {
          if (groups === '*') {
            return true;
          } else {
            return $(element).hasClass(groups);
          }
        });
      }
    }
    return false;
  });

  $(document).ready(init);
  /* End Shuffle filter */

  /* PhotoSwipe */
  $('.ps-gallery').each(function () {
    var $pswp = $('.pswp')[0];
    var image = [];
    var $pic = $(this),
        getItems = function getItems() {
      var items = [];
      $pic.find('a').each(function () {

        var $href = $(this).attr('data-src'),
            $size = $(this).data('size').split('x'),
            $width = $size[0],
            $height = $size[1];

        var item = {
          src: $href,
          w: $width,
          h: $height,
          el: $(this),
          msrc: $(this).find('img').attr('src'),
          title: $(this).attr('data-caption')
        };
        items.push(item);
      });
      return items;
    };

    var items = getItems();

    $.each(items, function (index, value) {
      image[index] = new Image();
      image[index].src = value['src'];
    });

    $pic.on('click', 'div', function (event) {

      event.preventDefault();
      var $index = $(this).index();

      var options = {
        index: $index,
        bgOpacity: 0.9,
        showHideOpacity: false,
        galleryUID: $(this).parents('.psgal').attr('id'),
        getThumbBoundsFn: function getThumbBoundsFn(index) {
          var image = items[index].el.find('img'),
              offset = image.offset();
          return { x: offset.left, y: offset.top, w: image.width() };
        }
      };

      var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
      lightBox.init();
    });
  });
  /* End photoSwipe */

  $(window).scroll(function () {
    /* Sticky */
    var topBar = $('.navbar');
    if ($(this).scrollTop() > 0) {
      topBar.addClass('sticky');
    } else {
      topBar.removeClass('sticky');
    }

    /* Scroll Top */
    var offset = 500;
    var duration = 400;
    if ($(this).scrollTop() > offset) {
      $('.scroll-to-top').fadeIn(duration);
    } else {
      $('.scroll-to-top').fadeOut(duration);
    }
  });

  /* Youtube video */
  $(".youtube").each(function () {

    var videoId = $(this).data('video-id');

    $(document).on('click', '.youtube', function () {
      // Create an iFrame with autoplay set to true
      var iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1&rel=0";
      if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

      // The height and width of the iFrame should be the same as parent
      var iframe = $('<iframe/>', { 'frameborder': '0', 'class': 'youtube-cust', 'src': iframe_url, 'width': $(this).width(), 'height': $(this).height() });

      // Replace the YouTube thumbnail with YouTube HTML5 Player
      $(this).replaceWith(iframe);
    });
  });
  /* End youtube video */

  /* Slick Carousel */
  $('.slick-js').slick();

  /* Search form */
  $('.collapse').on('click', '.search-toggle', function (e) {
    $('.top-form-control').toggleClass('show');
    // Button toggle icon
    if ($(this).hasClass('closed')) {
      $(this).removeClass('closed').addClass('opened');
    } else {
      $(this).removeClass('opened').addClass('closed');
    }
    e.preventDefault();
  });
  /* End search form */

  /* Copiright Get Full Year */
  $(function () {
    var temp_date = new Date();
    var year = temp_date.getFullYear();
    $('.temp-date').html(year + "&nbsp");
  });
})(jQuery, window, document);
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
