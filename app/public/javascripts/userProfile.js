$(function() {

  /**
   * Cache DOM
   */
  const $likedBtn = $('#likedButton');
  const $dislikedBtn = $('#dislikedButton');
  const $submittedBtn = $('#submittedButton');
  const $recipeItem = $('.recipe-item');
  const $recipeItemLiked = $('.recipe-item-liked');
  const $recipeItemDisliked = $('.recipe-item-disliked');
  const $recipeItemSubmitted = $('.recipe-item-submitted');
  const $navLink = $('.btn-nav-link');


  let visibleRecipes = '';

  /**
   * Event Handlers
   */

  $likedBtn.click(function(event) {
    visibleRecipes == 'liked' ? showNone() : showLiked();
  });

  $dislikedBtn.click(function(event) {
    visibleRecipes == 'disliked' ? showNone() : showDisliked();
  });

  $submittedBtn.click(() => {
    visibleRecipes == 'submitted' ? showNone() : showSubmitted();
  });

  // Displays the favorited recipes
  function showLiked() {
    // hide all the recipes
    showNone();
    $likedBtn.addClass('active');
    $recipeItemLiked.show();
    visibleRecipes = 'liked';
  }

  // Displays the disliked recipes
  function showDisliked() {
    // hide all the recipes
    showNone();
    $dislikedBtn.addClass('active');
    $recipeItemDisliked.show();
    visibleRecipes = 'disliked';
  }

  // displays the submitted recipes
  function showSubmitted() {
    showNone();
    $submittedBtn.addClass('active');
    $recipeItemSubmitted.show();
    visibleRecipes = 'submitted';
  }

  function showNone() {
    $recipeItem.hide();
    $navLink.removeClass('active');
    visibleRecipes = '';
  }

});
