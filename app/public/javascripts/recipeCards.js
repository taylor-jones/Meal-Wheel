$(function() {
  const SELECTED_CLASS = 'selected';
  const PARENT_CLASS = '.card-thumbs';


  // handles adding/removing of a liked recipe
  $(document).on('click', '.recipe-like', function() {
    const $el = $(this);

    if ($el.hasClass(SELECTED_CLASS)) {
      removeLikedRecipe($el);
      $el.removeClass(SELECTED_CLASS);
    } else {
      $el.parents(PARENT_CLASS).find('.recipe-dislike').each(function() {
        removeDislikedRecipe(this);
      });
      addLikedRecipe($el);
    }
  });


  // handles adding/removing of a disliked recipe
  $(document).on('click', '.recipe-dislike', function() {
    const $el = $(this);

    if ($el.hasClass(SELECTED_CLASS)) {
      removeDislikedRecipe($el);
      $el.removeClass(SELECTED_CLASS);
    } else {
      $el.parents(PARENT_CLASS).find('.recipe-like').each(function() {
        removeLikedRecipe(this);
      });
      addDislikedRecipe($el);
    }
  });


  // gets the recipe_id of a recipe displayed on a card.
  function getElementRecipeId(element) {
    const cardId = $(element).closest('.card').attr('id');
    return parseInt(cardId.replace(/\D/g, ''));
  }


  function addLikedRecipe(element) {
    const recipeId = getElementRecipeId(element);
    const req = new XMLHttpRequest();

    req.open('POST', '/users/liked-recipe', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        $(element).addClass(SELECTED_CLASS);
      }
    });

    req.send(JSON.stringify({ recipe_id: recipeId }));
  }



  function addDislikedRecipe(element) {
    const recipeId = getElementRecipeId(element);
    const req = new XMLHttpRequest();

    req.open('POST', '/users/disliked-recipe', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        $(element).addClass(SELECTED_CLASS);
      }
    });

    req.send(JSON.stringify({ recipe_id: recipeId }));
  }



  function removeLikedRecipe(element) {
    const recipeId = getElementRecipeId(element);
    const req = new XMLHttpRequest();

    req.open('DELETE', '/users/liked-recipe', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        $(element).removeClass(SELECTED_CLASS);
      }
    });

    req.send(JSON.stringify({ recipe_id: recipeId }));
  }



  function removeDislikedRecipe(element) {
    const recipeId = getElementRecipeId(element);
    const req = new XMLHttpRequest();

    req.open('DELETE', '/users/disliked-recipe', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
      if (req.status >= 200 && req.status < 400) {
        $(element).removeClass(SELECTED_CLASS);
      }
    });

    req.send(JSON.stringify({ recipe_id: recipeId }));
  }


});
