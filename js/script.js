(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav toggle open & close
  $('.js-toggle-mobile-nav').on('click', function(e) {
    $('.mobile-nav').toggleClass('is-open').toggleClass('is-closed');
  });


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//    Generic modal
///////////////////////////////////////

  var modal          = $('.js-modal'),
      modalLaunchBtn = $('.js-open-modal'),
      modalCloseBtn  = $('.js-close-modal');

    // opens modal
    function modalOpen(event){
      event.preventDefault();
      // disable scrolling on background content (doesn't work iOS)
      $('body').addClass('disable-scroll');
      // // open modal
      modal.fadeIn('250', function(){
        $(this).removeClass('is-closed').addClass('is-open');
      });
    }

    // closes modal
    function modalClose(event){
      event.preventDefault();
      // enable scrolling
      $('body').removeClass('disable-scroll');
      // close modal with fade
      modal.fadeOut('250', function(){
        $(this).removeClass('is-open').addClass('is-closed');
      });
    }

    // launches modal when offer is clicked
    modalLaunchBtn.on('click', function(event) {
      modalOpen(event);
    });

    // closes modal on close icon click
    modalCloseBtn.on('click', function(event) {
      modalClose(event);
    });

    // closes modal on background click
    modal.on('click', function(event) {
      if (event.target !== this){
        return;
      }
      modalClose(event);
    });

    // closes modal on escape key press
    $(document).keyup(function(event) {
       if (event.keyCode == 27) {
         modalClose(event);
        }
    });


///////////////////////////////////////
//       Offer expiry countdown
///////////////////////////////////////

// loops through each offer on page and sets the current days remaining
$('.js-offer-expires').each(function() {
  // gets the expires date from the object
  var expires = $(this).data('expires');
  $(this).countdown(expires, function(event) {
    if (event.elapsed) {
      // the expired date is in the past so the expired message is removed
      $(this).remove();
    } else if (event.offset.totalDays === 0) {
      // there is 0 days left, just hours, so ends today
      $(this).html(event.strftime('Ending <strong>Today</strong>'));
    } else {
      // there are days left, outputs with either day or days
      $(this).html(event.strftime('Ending in <strong>%-D day%!D</strong>'));
    }
  });
});



///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end