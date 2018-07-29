$(function() {

  // uses functions in admin.js
  $('.btn-delete').click(function() {
    window.deleteRecord(this, window.requestRoute);
  });

});
