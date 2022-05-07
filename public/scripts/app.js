// Client facing scripts here

$(document).ready(() => {

  $(document).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#scroll-top').fadeIn();
    } else {
      $('#scroll-top').fadeOut();
    }
  });

  $('#scroll-top').click(() => {
    $(document).scrollTop(0);
  });

});
