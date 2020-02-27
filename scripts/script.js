$(document).on('ready', function () {
  if (!("ontouchstart" in document.documentElement)) {
    document.documentElement.className += " no-touch";
  }

  locations = $('.location').length;
  x = 8;
  $('.location:lt(' + x + ')').show();
  $('.btn-more').click(function() {
    if ($(window).width() < 768) {
      x = (x + 2 <= locations) ? x + 2 : locations;
    }
    else {
      x = (x + 4 <= locations) ? x + 4 : locations;
    }      
    $('.location:lt('+x+')').show();
    if (x == locations) {
      $('.btn-more').hide();
    }
  });
  if (locations < 8) {
    $('.btn-more').hide();
  }

  function close_accordion_section() {
    $('.accordion .accordion-section-title').removeClass('active');
    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
  }

  $('.accordion-section-title').click(function(e) {
    var currentAttrValue = $(this).attr('href');
    if($(e.target).is('.active')) {
      close_accordion_section();
    } else {
      close_accordion_section();
      $(this).addClass('active');
      $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
    }
    e.preventDefault();
  });

  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
  });

  $('input[name="messagetype"]').click(function () {
    $(this).tab('show');
  });

  $('.brigde-block').bind('touchstart touchend', function(e) {
    e.preventDefault();
  });

});

$(window).on('load', function() {
  $('#custom-scroll').mCustomScrollbar({
    theme: 'minimal-dark'
  });

});

$(window).on('resize', function() {

});

$(function(){
  $("#bgndVideo").YTPlayer();
});

$(function(){
  $(".datepicker").datepicker();
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#blah').attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}