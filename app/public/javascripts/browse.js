$(function() {
  /**
   * Cache DOM
   */

  const recipes = recipeList; // recipeList is declared in browse.ejs
  const $recipeItem = $('.recipe-item');
  const $category = $('#recipe-category');
  const $cuisine = $('#recipe-cuisine');
  const $diet = $('#dietary-restriction');
  const $search = $('#search');


  /**
   * Event Handlers
   */

  $category.change(() => {
    updateRecipeDisplay();
  });

  $cuisine.change(() => {
    updateRecipeDisplay();
  });

  $diet.change(() => {
    updateRecipeDisplay();
  });


  
  /**
   * Functions
   */

  function getCategoryFilter() {
    const val = sanitize($category.val());
    let matches = undefined;

    if (val) {
      matches = recipes.filter((recipe) => {
        return recipe.recipe_category_id === val;
      });
    }

    return matches || recipes;
  }


  function getCuisineFilter() {
    const val = sanitize($cuisine.val());
    let matches = undefined;

    if (val) {
      matches = recipes.filter((recipe) => {
        return recipe.cuisines.some((cuisine) => {
          return cuisine.cuisine_id === val;
        });
      });
    }

    return matches || recipes;
  }


  function getDietFilter() {
    const val = sanitize($diet.val());
    let matches = undefined;

    if (val) {
      matches = recipes.filter((recipe) => {
        return recipe.restrictedDiets.every((diet) => {
          return diet.dietary_restriction_id != val;
        });
      });
    }

    return matches || recipes;
  }



  // looks at each of the recipe filters and shows only the
  //   recipes which meet the criteria of all the filters.
  function updateRecipeDisplay() {
    // hide all the recipes by default.
    $recipeItem.hide();

    // then show only the recipes which match all filters.
    const filters = [
      getCategoryFilter(),
      getCuisineFilter(),
      getDietFilter(),
    ];

    const matches = recipes.filter((r) => {
      return filters.every((f) => {
        return f.some((el) => el.recipe_id === r.recipe_id);
      });
    });

    for (let i = 0; i < matches.length; i++) {
      $(`#recipe-${matches[i].recipe_id}`).show();
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
