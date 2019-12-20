'use strict'

$('document').ready(function(){

  $('.slider').slick({
    
  })

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

  var nextBtn = $('.slick-next');
  var prevBtn = $('.slick-prev')

  nextBtn.html('<span class="s s-right-arrow"><span class="hide">hidden</span></span>');

  prevBtn.html('<span class="s s-left-arrow"><span class="hide">hidden</span></span>');

  var current = $('.current');
  var content = $('.hero__content');
  var arrowImg = $('.hero__arrow__image');

  nextBtn.mouseover(function() {
    for (let i = 0; i < content.length; i++) {
      var img = current.next().find('img').attr('src');
      arrowImg.find('img').attr("src", img);
      arrowImg.css({'display':'block'});
    }
  })

  nextBtn.mouseout(function() {
    for (let i = 0; i < content.length; i++) {
      var img = current.next().find('img').attr('src');
      arrowImg.find('img').attr("src", '');
      arrowImg.css({'display':'none'});
    }
  })

  nextBtn.on('click', function() {
    current = current.next();
  })

  prevBtn.mouseover(function() {
    for (let i = 0; i < content.length; i++) {
      var img = current.prev().find('img').attr('src');
      arrowImg.find('img').attr("src", img);
      arrowImg.css({'display':'block'});
    }
  })

  prevBtn.mouseout(function() {
    for (let i = 0; i < content.length; i++) {
      var img = current.prev().find('img').attr('src');
      arrowImg.find('img').attr("src", '');
      arrowImg.css({'display':'none'});
    }
  })

  prevBtn.on('click', function() {
    current = current.prev();
  })
});