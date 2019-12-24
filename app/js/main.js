'use strict'

let shoppingCart = [];

$('document').ready(function() {

  //Slick

  $('.slider').slick({

  })

  //Header

  let hamburgerIcon = $('.hamburger__javascript');
  let dropNav = $('.header__nav');
  let headerDropIcon = $('.header__drop__icon');

  hamburgerIcon.on('click', () => {

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

  $(window).scroll(() => {

    let header = $('.header__javascript');
    let scroll = $(window).scrollTop();

    if (scroll > 0) {
      header.addClass('active');
    }

    else {
      header.removeClass('active');
    }
  })

  //Hero-slider
  let nextBtn = $('.slick-next');
  let prevBtn = $('.slick-prev')

  nextBtn.html('<span class="s s-right-arrow"><span class="hide">hidden</span></span>');

  prevBtn.html('<span class="s s-left-arrow"><span class="hide">hidden</span></span>');

  let current = $('.current');
  let content = $('.hero__content');
  let arrowImg = $('.hero__arrow__image');

  nextBtn.mouseover(() => {
    for (let i = 0; i < content.length; i++) {
      let img = current.next().find('img').attr('src');
      arrowImg.find('img').attr("src", img);
      arrowImg.css({'display': 'block'});
    }
  })

  nextBtn.mouseout(() => {
    for (let i = 0; i < content.length; i++) {
      let img = current.next().find('img').attr('src');
      arrowImg.find('img').attr("src", '');
      arrowImg.css({'display': 'none'});
    }
  })

  nextBtn.on('click', () => {
    current = current.next();
  })

  prevBtn.mouseover(() => {
    for (let i = 0; i < content.length; i++) {
      let img = current.prev().find('img').attr('src');
      arrowImg.find('img').attr("src", img);
      arrowImg.css({'display': 'block'});
    }
  })

  prevBtn.mouseout(() => {
    for (let i = 0; i < content.length; i++) {
      let img = current.prev().find('img').attr('src');
      arrowImg.find('img').attr("src", '');
      arrowImg.css({'display': 'none'});
    }
  })

  prevBtn.on('click', () => {
    current = current.prev();
  })

  //Timeline

  let timelineTextBoxEven = $(".timeline__text__box:even");
  let timelineTextBoxOdd = $(".timeline__text__box:odd");

  timelineTextBoxEven.mouseover(function() {
    for (let i = 0; i < timelineTextBoxEven.length; i++) {
      let text = $(this).find('.timeline__text');
      text.css({'display': 'block'});
      $(this).css({'transform': 'translateY(-156%)', 'left': '45%'});

      if (window.matchMedia('(max-width: 767px)').matches) {
        $(this).css({'left': '25%'});
      }
    }
  })

  timelineTextBoxEven.mouseout(function() {
    for (let i = 0; i < timelineTextBoxEven.length; i++) {
      let text = $(this).find('.timeline__text');
      text.css({'display': 'none'});
      $(this).css({'transform': 'translateY(-127%)'})
    }
  })

  timelineTextBoxOdd.mouseover(function() {
    for (let i = 0; i < timelineTextBoxOdd.length; i++) {
      let text = $(this).find('.timeline__text');
      text.css({'display': 'block'});
    }
  })

  timelineTextBoxOdd.mouseout(function() {
    for (let i = 0; i < timelineTextBoxOdd.length; i++) {
      let text = $(this).find('.timeline__text');
      text.css({'display': 'none'});
    }
  })

  // Accordion
  let acc = $('.accordion');
  let i;

  for (i = 0; i < acc.length; i++) {
    $(acc[i]).on('click', function(e) {
      // Not expanding item if clicked on increment or decrement icon or on add
      // button
      if (!$(e.target).hasClass('qty__arrows__inc')
        && !$(e.target).hasClass('qty__arrows__dec')
        && !$(e.target).hasClass('item__btn')) {
        this.classList.toggle('accordion--opened');
        let panel = $(this).next();
        if ($(panel).css('display') === 'block') {
          $(panel).css('display', 'none');
        } else {
          $(panel).css('display', 'block');
        }
      }
    });
  }

  //Select
  let selectedValue = $('.listing__select');
  let choices = $('.choices__appear');

  //Making new element
  selectedValue.change(function() {
    let value = $(this).val();
    let element = '<span class="choice">' + value + '<span class="s s-close choice--close"><span class="hide"></span></span></span>';

    choices.append(element);

    const close = $('.choice--close');
    $(close[close.length - 1]).on('click', e => {
      $(e.currentTarget).parent().remove();
    });
  });

  let accordionStar = $('.listing__star__img__name');

  let star = accordionStar.find('.s');

  star.on('click', function() {
    $(this).toggleClass('s-empty-star s-full-star');
  });

  $('.qty__arrows__inc').on('click', e => {
    const el = $($(e.currentTarget).parent().prev()[0]);
    let val = parseInt(el.html());
    val += 1;
    el.html(val < 100 ? val : 100);
  });

  $('.qty__arrows__dec').on('click', e => {
    const el = $($(e.currentTarget).parent().prev()[0]);
    let val = parseInt(el.html());
    val -= 1;
    el.html(val > 0 ? val : 0);
  });

  $('.item__btn').on('click', e => {
    const accordion = $(e.target).closest('.row');
    let data = {
      id: accordion.find('.item__tag').html(),
      brand: accordion.find('.brand__name').html(),
      name: accordion.find('.brand__sub__name').html(),
      price: accordion.find('.item__wholesale').html(),
      quantity: parseInt(accordion.find('.qty__number').html()),
      image: accordion.find('.accordion__img').attr('src'),
    };

    if (data.quantity > 0) {
      let unique = true;
      let newData = data;

      shoppingCart.forEach(item => {
        if (item.id === data.id) {
          unique = false;
          item.quantity += data.quantity;
          newData = item;
        }
      });

      if (unique) {
        shoppingCart.push(data);
      }

      $('.item__number').html(shoppingCart.length);

      $('.arrow__box').find('.brand__name').html(newData.brand);
      $('.arrow__box').find('.brand__sub__name').html(newData.name);
      $('.arrow__box').find('.item__tag').html(newData.id);
      $('.arrow__box').find('.item__img').attr('src', newData.image);

      $('.arrow__box').addClass('arrow__box--visible');

      setTimeout(() => {
        $('.arrow__box').removeClass('arrow__box--visible');
      }, 3000);

      renderCartBox();

    }
  });

  $('.s-shopping-cart-icon').on('click', () => {
    // Dont open cart if there are no items in it
    if (shoppingCart.length > 0) {
      $('.arrow__box').addClass('arrow__box--visible');
      $('.listing__cart').addClass('listing__cart--visible');
    }
  });

  $('.s-close-cart').on('click', () => {
    $('.arrow__box').removeClass('arrow__box--visible');
  });

});

//Adding new item in box
function renderCartBox() {

  $('.listing__cart__box').empty();

  let sum = 0;

  shoppingCart.forEach(item => {
    $('.listing__cart__box').append(`
    <div class="item">
      <span class="s s-close cart__item--remove"><span class="hide">hide</span></span>
      <p class="item__brand__name accordion__brand__name">
        <span class="brand__name blue uppercase bolded">${item.brand}</span><br>
        <span class="item__ brand__sub__name brand__sub__name brown">
        ${item.name}</span></p>
      <div class="item__price">${item.price}</div>
      <div class="item__qty">
        <span class="number">${item.quantity}</span>
        <span class="item__id">${item.id}</span>
        <span>
          <span class="s s-up-arrow item__qty__inc"><span class="hide">hide</span></span>
          <span class="s s-dwon-arrow item__qty__dec"><span class="hide">hide</span></span>
        </span>
      </div>
    </div>`);

    const price = item.price.replace('$', '')
      .replace('.', '')
      .replace(',', '');
    sum += parseFloat(price) * item.quantity;
  });
  $('.sum').html('$' + formatMoney(sum / 100));

  //Quantity increasing
  $('.item__qty__inc').on('click', e => {
    const id = $(e.target).closest('.item').find('.item__id').html();
    shoppingCart.forEach(item => {
      if (item.id === id) {
        item.quantity = item.quantity < 100 ? item.quantity + 1 : item.quantity;
      }
    });
    renderCartBox();
  });

  //Quantity decresing
  $('.item__qty__dec').on('click', e => {
    const id = $(e.target).closest('.item').find('.item__id').html();
    shoppingCart.forEach(item => {
      if (item.id === id) {
        item.quantity = item.quantity > 1 ? item.quantity - 1 : item.quantity;
      }
    });
    renderCartBox();
  });

  //Removing item from cart
  $('.cart__item--remove').on('click', e => {
    const id = $(e.target).parent().find('.item__id').html();
    shoppingCart = shoppingCart.filter(item => {
      return item.id === id ? false : true;
    });
    renderCartBox();
  });
}

//Formating money
function formatMoney(number, decPlaces, decSep, thouSep) {
  decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSep = typeof decSep === "undefined" ? "." : decSep;
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  let sign = number < 0 ? "-" : "";
  let i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  let j = (j = i.length) > 3 ? j % 3 : 0;

  return sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}
