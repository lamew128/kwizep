// Client facing scripts here

$(document).ready(() => {

  $(document).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#scroll-top').fadeIn();
    } else {
      $('#scroll-top').fadeOut();
    }
  });

  $('#scroll-top').on('click', () => {
    $(document).scrollTop(0);
  });

  $('.clipboard').on('click', function() {
    $("body").append($temp);
    $temp.val($url).select();
    document.execCommand("copy");
    $temp.remove();
    $("p").text("URL copied!");
  })

});
