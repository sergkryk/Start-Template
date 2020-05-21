'use strict';

window.addEventListener('DOMContentLoaded', function () {
  (function () {
    window.smoothScroll();
    window.utils.scrollToRequired();

    var feedback = new window.Feedback(document.querySelector('.feedback'));
    var popupContactUs = new window.PopupContactUs();
    var popupCertificate = new window.PopupCertificate();
    var selectNav = new window.SelectNav();
    var mouseSmoothScroll = new window.MouseSmoothScroll();
    feedback.active();
    popupContactUs.active(mouseSmoothScroll);
    popupCertificate.active(mouseSmoothScroll);
    selectNav.active();
    mouseSmoothScroll.active(document, 80, 12);
    mouseSmoothScroll.start();
    window.mainMouseSmoothScroll = mouseSmoothScroll;
  })();
});
