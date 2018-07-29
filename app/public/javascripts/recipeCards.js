$(function() {

  $('.recipe-like').click(function() {
    $(this).siblings().removeClass('selected');
    $(this).toggleClass('selected');
  });

  $('.recipe-dislike').click(function() {
    $(this).siblings().removeClass('selected');
    $(this).toggleClass('selected');
  });

});
