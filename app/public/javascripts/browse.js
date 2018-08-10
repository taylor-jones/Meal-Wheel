$(function() {
  /**
   * Cache DOM
   */
  const recipes = recipeList; // recipeList is declared in browse.ejs
  const ingredients = ingredientList // declared in browse.ejs
  const cuisines = cuisineList;
  const categories = categoryList;
  const diets = dietList;

  const $recipeItem = $('.recipe-item');
  const $category = $('#recipe-category');
  const $cuisine = $('#recipe-cuisine');
  const $diet = $('#dietary-restriction');
  const $search = $('#search');
  const $typeahead = $('.twitter-typeahead');
  const $clear = $('.form-control-clear');

  // array of all the recipe components
  let searchList = buildSearchList();
  let $contingentFilter;



  // setup the recipe item seach.
  const recipeSearch = new Bloodhound({
      datumTokenizer: (data) => Bloodhound.tokenizers.whitespace(data.name),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: searchList,
      sorter: (a, b) => {
        const curr = $search.val();

        if (curr == a.name) {
          return -1;
        } else if (curr == b.name) {
          return 1;
        } else if (curr.toLowerCase() == a.name.toLowerCase()) {
          return -1;
        } else if (curr.toLowerCase() == b.name.toLowerCase()) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
    },
  });

  // initialize the bloodhound suggestion engine
  recipeSearch.initialize();


  // instantiate the typeahead UI
  $search.typeahead(null, {
    displayKey: 'name',
    name: 'search-items',
    source: recipeSearch.ttAdapter(),
    templates: {
      suggestion: (data) => {
        return `
          <div class="search-item">
            <div class="search-item-name">${data.name}</div>
            <div class="search-item-type search-item-${data.typeName.toLowerCase()}">${data.typeName}</div>
          </div>`;
      },
      empty: [`<div class="search-empty">Hmm..No matches could be found.</div>`].join('\n'),
    },
  });


  // handle a search selection
  $search.bind('typeahead:select', function(ev, item) {
    getSearchResults(item);
  });


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


  // clear any of the filters
  $clear.click(function() {
    clearFilter($(this).next());
    updateRecipeDisplay();
  });




  /**
   * Functions -- Filters
   */

   // returns the recipes that pass through the category filter.
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


  // returns the recipes that pass through the cuisine filter.
  function getCuisineFilter() {
    const val = sanitize($cuisine.val());
    let matches;

    if (val) {
      matches = recipes.filter((recipe) => {
        return recipe.cuisines.some((cuisine) => {
          return cuisine.cuisine_id === val;
        });
      });
    }

    return matches || recipes;
  }


  // returns the recipes that pass through the diet filter.
  function getDietFilter() {
    const val = sanitize($diet.val());
    let matches;

    if (val) {
      matches = recipes.filter((recipe) => {
        return recipe.restrictedDiets.every((diet) => {
          return diet.dietary_restriction_id != val;
        });
      });
    }

    return matches || recipes;
  }


  // returns the recipes that pass through the ingredient filter.
  function getIngredientFilter(selection) {
    let matches;

    if (selection) {
      matches = recipes.filter((recipe) => {
        return recipe.ingredients.some((ingredient) => {
          return ingredient.ingredient_id == selection.id;
        });
      });
    }

    return matches || recipes;
  }


  // returns the recipe(s) that have a qualifying match with the search query.
  function getSearchResults(item) {
    if (item.typeName == 'Recipe') {
      // go directly to the recipe page.
      window.location.href = `/recipes/${item.id}`;
    } else if (item.typeName == 'Ingredient') {
      // show only the recipes that have this ingredient.
      const matches = getIngredientFilter(item);
      updateRecipeDisplay(matches);
    } else if (item.typeName == 'Cuisine') {
      // show only the recipes that have this cuisine.
      $contingentFilter = $cuisine;
      $cuisine.val(item.id);
      $cuisine.change();
    } else if (item.typeName == 'Category') {
      // show only the recipes that have this category.
      $contingentFilter = $category;
      $category.val(item.id);
      $category.change();
    } else if (item.typeName == 'Diet') {
      // show only the recipes that aren't restricted by this diet.
      $contingentFilter = $diet;
      $diet.val(item.id);
      $diet.change();
    }
  }


  // uses all of the recipe data to build the searchable array.
  function buildSearchList() {
    const searchList = [];

    recipes.forEach((recipe) => {
      searchList.push({
        id: recipe.recipe_id,
        name: recipe.recipe_name,
        typeName: 'Recipe',
        recipe_category_id: recipe.recipe_category_id,
        cuisines: recipe.cuisines,
        restrictedDiets: recipe.restrictedDiets,
      });
    });

    ingredients.forEach((ingredient) => {
      searchList.push({
        id: ingredient.ingredient_id,
        name: ingredient.ingredient_name,
        typeName: 'Ingredient',
      });
    });

    categories.forEach((category) => {
      searchList.push({
        id: category.recipe_category_id,
        name: category.recipe_category_name,
        typeName: 'Category',
      });
    });

    cuisines.forEach((cuisine) => {
      searchList.push({
        id: cuisine.cuisine_id,
        name: cuisine.cuisine_name,
        typeName: 'Cuisine',
      });
    });

    diets.forEach((diet) => {
      searchList.push({
        id: diet.dietary_restriction_id,
        name: diet.dietary_restriction_name,
        typeName: 'Diet',
      });
    });

    return searchList;
  }



  // clears one or more of the browse filters
  function clearFilter($element) {
    if ($element.is('.twitter-typeahead')) {
      $search.typeahead('val', '');
    } else {
      $element.prop('selectedIndex', 0);
    }

    if ($contingentFilter) {
      const $temp = $contingentFilter;
      $contingentFilter = null;
      clearFilter($temp);
    }
  }


  // looks at each of the recipe filters and shows only the
  //   recipes which meet the criteria of all the filters.
  function updateRecipeDisplay(optional) {
    // hide all the recipes by default.
    $recipeItem.hide();

    // then show only the recipes which pass through all filters.
    const filters = [
      getCategoryFilter(),
      getCuisineFilter(),
      getDietFilter(),
      optional || recipes,
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
