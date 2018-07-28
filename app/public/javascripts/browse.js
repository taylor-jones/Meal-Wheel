$(function() {
  /**
   * Cache DOM
   */

  const recipes = Array.from(recipeList); // recipeList is declared in browse.ejs
  const $recipeItem = $('.recipe-item');
  const $category = $('#recipe-category');
  const $cuisine = $('#recipe-cuisine');
  const $diet = $('#dietary-restriction');
  const $search = $('#search');


  /**
   * Event Handlers
   */

  $category.change(() => {
    const val = sanitize($category.val());
    let matches = undefined;

    if (val) {
      matches = recipes.filter((recipe) => {
        return recipe.recipe_category_id === val;
      });
    }

    updateRecipeVisibility(matches);
  });



  /**
   * Functions
   */

  /* Displays only the recipes that have an id in an array of recipes,
    unless [matches] is falsy, then it shows all recipes. */
  function updateRecipeVisibility(matches) {
    if (matches) {
      // hide all the items by default, then show the items in the list.
      $recipeItem.hide();

      for (let i = 0; i < matches.length; i++) {
       $(`#recipe-${matches[i].recipe_id}`).show();
      }

    } else {
      $recipeItem.show();
    }
  }


  // checks if a value is numeric.
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  // Converts a value to its actual data type.
  function sanitize(value) {
    if (value === 'null' || undefined) {
      return null;
    } else if (isNumeric(value)) {
      return parseInt(value);
    }
    return value;
  }

});
