'use strict'

$('document').ready(function(){

  var hamburgerIcon = $('.hamburger__javascript');
  var dropNav = $('.header__nav');
  var headerDropIcon = $('.header__drop__icon');
  
  hamburgerIcon.on('click', function(){
    
    dropNav.toggleClass('nav__show');
    $(this).toggleClass('transform');

    if ($(this).hasClass('transform')) {
      headerDropIcon.removeClass('s-hamburger');
      headerDropIcon.addClass('s-close');
    }

    else {
      headerDropIcon.addClass('s-hamburger');
      headerDropIcon.removeClass('s-close');
    }
  })

  $(window).scroll(function() {

    var header = $('.header__javascript');
    var scroll = $(window).scrollTop();

    if (scroll > 0) {
      header.addClass('active');
    }

    else {
      header.removeClass('active');
    }
  })
   
});