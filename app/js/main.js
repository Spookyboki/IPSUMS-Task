'use strict'

$('document').ready(function(){

  //Slick

  $('.slider').slick({
    
  })

  //Header

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

  //Hero-slider

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

  //Timeline

  var timelineTextBoxEven = $(".timeline__text__box:even");
  var timelineTextBoxOdd = $(".timeline__text__box:odd");

  timelineTextBoxEven.mouseover(function() {
    for (let i = 0 ; i < timelineTextBoxEven.length; i++) {
      var text = $(this).find('.timeline__text');
      text.css({'display':'block'});
      $(this).css({'transform':'translateY(-156%)','left':'45%'});

      if (window.matchMedia('(max-width: 767px)').matches) {
        $(this).css({'left':'25%'});
      }
    }
  })

  timelineTextBoxEven.mouseout(function() {
    for (let i = 0 ; i < timelineTextBoxEven.length; i++) {
      var text = $(this).find('.timeline__text');
      text.css({'display':'none'});
      $(this).css({'transform':'translateY(-127%)'})
    }
  })

  timelineTextBoxOdd.mouseover(function() {
    for (let i = 0 ; i < timelineTextBoxOdd.length; i++) {
      var text = $(this).find('.timeline__text');
      text.css({'display':'block'});
    }
  })

  timelineTextBoxOdd.mouseout(function() {
    for (let i = 0 ; i < timelineTextBoxOdd.length; i++) {
      var text = $(this).find('.timeline__text');
      text.css({'display':'none'});
    }
  })


  //Accordion
  /* var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
    this.classList.toggle("opened");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
  } */

  var acc = $('.accordion');

  for (var i = 0; i < acc.length; i++) {
    acc.on("click", function() {
      console.log($(this));
      console.log($(this).next());
      
      //console.log(panel);
      $(this).toggleClass('opened');
      
      if ($(this).hasClass('opened')) {
        
        $(this).css({'box-shadow':'0px -17px 36px -24px rgba(157,154,151,1)',
                      'border-left':'1px solid #ddccb8',
                      'border-right':'1px solid #ddccb8',
                      'border-top':'1px solid #ddccb8',
                      'margin-bottom': '-3px'})
        var panel = $(this).next();
        panel.css({'display':'block'});
        panel.css({'box-shadow':'0px 16px 36px -24px rgba(157,154,151,1)'})

        $(this).on('click',function(){
          panel.css({'display':'none'});
          $(this).removeClass('opened');
        })
      } 
    });
  }

  //Select
  var selectedValue = $('.listing__select');
  var choices = $('.choices__appear');
  var values = [];

  selectedValue.change(function() {
    var value = $(this).val();
    values.push(value);

    for (let i = 0; i < values.length; i++) {
      
      var element = '<span class="choice">'+value+'<span class="s s-close"><span class="hide"></span></span></span>';
    }
    choices.append(element);
  })

  var accordionStar = $('.listing__star__img__name');

  var star = accordionStar.find('.s');

  star.on('click',function(){
    $(this).toggleClass('s-empty-star s-full-star');
  })
});