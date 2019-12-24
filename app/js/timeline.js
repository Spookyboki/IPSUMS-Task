(function() {

  const timeline = $('.timeline ol')[0],
    elH = $('.timeline li > div'),
    arrows = $('.timeline .arrows .arrow'),
    arrowPrev = $('.timeline .arrows .arrow__prev')[0],
    arrowNext = $('.timeline .arrows .arrow__next')[0],
    firstItem = $('.timeline li:first-child')[0],
    lastItem = $('.timeline li:last-child')[0],
    xScrolling = 280,
    disabledClass = 'disabled';

  $(window).on('load', init);

  function init() {
    setEqualHeights(elH);
    animateTl(xScrolling, arrows, timeline);
  }

  function setEqualHeights(el) {
    let counter = 0;
    for (let i = 0; i < el.length; i++) {
      const singleHeight = el[i].offsetHeight;

      if (counter < singleHeight) {
        counter = singleHeight;
      }
    }

    for (let i = 0; i < el.length; i++) {
      $(el[i]).css('height', `${counter}px`);
    }
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function setBtnState(el, flag = true) {
    if (flag) {
      el.classList.add(disabledClass);
    } else {
      if (el.classList.contains(disabledClass)) {
        el.classList.remove(disabledClass);
      }
      el.disabled = false;
    }
  }

  function animateTl(scrolling, el, tl) {
    let counter = 0;
    for (let i = 0; i < el.length; i++) {
      $(el[i]).on('click', function() {
        if (!arrowPrev.disabled) {
          arrowPrev.disabled = true;
        }
        if (!arrowNext.disabled) {
          arrowNext.disabled = true;
        }
        const sign = (this.classList.contains('arrow__prev')) ? '' : '-';
        if (counter === 0) {
          tl.style.transform = `translateX(-${scrolling}px)`;
        } else {
          const tlStyle = getComputedStyle(tl);
          const tlTransform = tlStyle.getPropertyValue('-webkit-transform') || tlStyle.getPropertyValue('transform');
          const values = parseInt(tlTransform.split(',')[4]) + parseInt(`${sign}${scrolling}`);
          tl.style.transform = `translateX(${values}px)`;
        }

        setTimeout(() => {
          isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
          isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
        }, 1100);

        counter++;
      });
    }
  }
})();
