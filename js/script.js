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
      modalCloseBtn  = $('.js-close-modal'),
      modalCloseAreas  = $('.modal__content, .js-modal');

  modalLaunchBtn.click(function(){

    var targetModal = $(this).attr('data-modal');
    var modalItem = $(this).attr('data-modal-item');

    if(modalItem){
      $('.modal__item').addClass('modal__item-inactive');
      $('#modal__item-' + modalItem ).removeClass('modal__item-inactive');
    }

    // disable scrolling on background content (doesn't work iOS)
    $('body').addClass('disable-scroll');
    // // open modal
    $('#modal-' + targetModal).fadeIn('250', function(){
      $(this).removeClass('is-closed').addClass('is-open');
    });

  });

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

  // closes modal on close icon click
  modalCloseBtn.on('click', function(event) {
    modalClose(event);
  });

  // closes modal on background click
  modalCloseAreas.on('click', function(event) {
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


  function GetQueryStringParams(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam){
        return sParameterName[1];
      }
    }
  }​


  // launches modal if query string
  var modalQuery = GetQueryStringParams('modal');

  if (modalQuery) {
    var targetModal = modalQuery;
    $('body').addClass('disable-scroll');
    $('#modal-' + targetModal).fadeIn('250', function(){
      $(this).removeClass('is-closed').addClass('is-open');
    });
  }


  ///////////////////////////////////////
  //    Modal Carousel
  ///////////////////////////////////////

  function modal_slider_next(){
    var parent    = $('#modal__slider');
    var current   = parent.find('.slide').not(".modal__item-inactive");
    var next = current.next('.slide');

    if( next.length == 0 ) {
      var next = parent.find('.slide').first();
    }
    current.addClass('modal__item-inactive');
    next.removeClass('modal__item-inactive');
  }

  function modal_slider_previous(){
    var parent    = $('#modal__slider');
    var current   = parent.find('.slide').not(".modal__item-inactive");
    var previous = current.prev('.slide');

    if( previous.length == 0 ) {
      var previous = parent.find('.slide').last();
    }
    current.addClass('modal__item-inactive');
    previous.removeClass('modal__item-inactive');
  }


  $('#modal_slider--next').click(function(){ modal_slider_next(); });
  $('#modal_slider--previous').click(function(){ modal_slider_previous(); });

  $(document).on('keyup', function(e) {
    if(e.which === 37){
      modal_slider_previous();
    }else if(e.which === 39) {
      modal_slider_next();
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




///////////////////////////////////////
//       SVG Animation triggers
///////////////////////////////////////


$('.title-banner .decoration').addClass('animate');


$(window).scroll(function(){
  var scrolltop = $(document).scrollTop();
  var topoffset = ( $(window).height() ) * 0.2 ;
  $('.decoration__trigger').each(function(){
    var targetoffset = $(this).offset().top - topoffset;
    if(scrolltop >= targetoffset ){
      $(this).addClass('decoration-triggered');
      $(this).find('.decoration').addClass('animate');
    }
  });
});




///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end