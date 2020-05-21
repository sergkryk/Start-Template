'use strict';

(function () {
  var BETWEEN_ANIMATION_TIME = 50; // ms
  var KEY_CODE_ESC = 27;
  var DECOR_ELEMENT_HEIGHT = 38;
  var fixedHeader = document.querySelector('.header');

  var setFormDecorHeight = function (decors) {
    var setHeight = function (decor) {
      var count = Math.trunc(decor.parentElement.offsetHeight / DECOR_ELEMENT_HEIGHT);
      decor.style.height = count * DECOR_ELEMENT_HEIGHT + 'px';
    };

    decors.forEach(function (it) {
      setHeight(it);
    });

    decors.forEach(function (it) {
      window.addEventListener('resize', function () {
        setHeight(it);
      });
    });
  };

  var scrollToRequired = function () {
    var delay = 300;
    var offset = 100;
    var $ = window.$;
    document.addEventListener('invalid', function (e) {
      $(e.target).addClass('invalid');
      $('html, body').animate({
        scrollTop: $($('.invalid')[0]).offset().top - offset
      }, delay);
    }, true);
    document.addEventListener('change', function (e) {
      $(e.target).removeClass('invalid');
    }, true);
  };

  var getScrollbarWidth = function () {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);

    var inner = document.createElement('div');
    outer.appendChild(inner);

    var scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  };

  var openPopup = function (element) {
    if (!element || !fixedHeader) {
      return;
    }
    document.documentElement.style.paddingRight = getScrollbarWidth() + 'px';
    fixedHeader.style.width = 'calc(100% - ' + getScrollbarWidth() + 'px)';
    document.documentElement.style.overflow = 'hidden';
    element.style.visibility = 'visible';
    setTimeout(function () {
      element.classList.add('popup--open');
    }, BETWEEN_ANIMATION_TIME);
  };

  var closePopup = function (element) {
    if (!element || !fixedHeader) {
      return;
    }
    setTimeout(function () {
    }, 0);
    document.documentElement.style.paddingRight = '';
    fixedHeader.style.width = '';
    document.documentElement.style.overflow = '';
    if (element.classList.contains('popup--open')) {
      element.classList.remove('popup--open');
    }
    var removeDisplay = function () {
      element.style.visibility = 'hidden';
      element.removeEventListener('transitionend', removeDisplay);
    };
    element.addEventListener('transitionend', removeDisplay);
  };

  window.utils = {
    KEY_CODE_ESC: KEY_CODE_ESC,
    getScrollbarWidth: getScrollbarWidth,
    setFormDecorHeight: setFormDecorHeight,
    scrollToRequired: scrollToRequired,
    openPopup: openPopup,
    closePopup: closePopup,
  };
})();
