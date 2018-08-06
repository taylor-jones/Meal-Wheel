$(function() {
  const BASE_INGREDIENT_COUNT = 3;

  // cache DOM
  const $ingredientName = $('.ingredient-name');
  const $recipeId = $('#recipe-id');
  const $recipeName = $('#recipe-name');
  const $recipeDesc = $('#recipe-description');
  const $recipeInstr = $('#recipe-instructions');
  const $recipeImgUrl = $('#recipe-image-url');
  const $recipeCategory = $('#recipe-category');
  const $recipeCuisines = $('#recipe-cuisines');
  const $userId = $('#user-id');
  const $foodGroupSelector = $('#food-group-selector');

  const recipeForm = document.querySelector('#recipe-form');
  const $dbResponse = $('#db-response');


  /**
   * Initialization
   */

  // initialize typeahead for existing ingredient list items
  initTypeahead();
  initPopover();

  // selectpicker options and setup
  $('.selectpicker').selectpicker({
    style: 'btn-select',
    size: 4,
  });


  // check if a current recipe exists.
  // if so, set the form up for editing the recipe.

  // TODO: make the changes needed to load a current recipe
  //   and set it up for editing rather than creating.
  if (currentRecipe) {
    loadExistingReipce();
  } else {
    console.log('adding');
  }



  /**
   * Events
   */

  $(document).on('change', '#food-group-selector', function() {
    $(`#food-group-selector [value="${$(this).val()}"`).prop({ selected: true });
  });


  $(document).on('blur', '.ingredient-name', function() {
    const $el = $(this);
    const ingredientId = $el.prev().prev().val();
    const foodGroupId = $el.prev().val();

    // if the ingredient doesn't exist yet,
    //  prompt for the food group.
    if (!ingredientId || !foodGroupId) {
      $el.popover('show');
    } else {
      $el.popover('hide');
    }
  });



  $(document).on('change', '.ingredient-name', function() {
    const $el = $(this);
    const curr = $el.typeahead('getActive');

    if (curr) {
      const ingName = curr.ingredient_name.toLowerCase();
      const inputName = $el.val().toLowerCase();

      if (ingName == inputName) {
        // existing ingredient
        $el.prev().val(curr.food_group_id);
        $el.prev().prev().val(curr.ingredient_id);
      } else {
        // new ingredient.
        $el.prev().val(null);
        $el.prev().prev().val(null);
      }
    } else {
      // not active
      $el.prev().val(null);
      $el.prev().prev().val(null);
    }
  });



  $(document).delegate('#food-group-select', 'click', function(e) {
    e.preventDefault();
    const element = $(this).parents('.popover');
    $(element).popover('hide');
  });

  $(document).delegate('#food-group-cancel', 'click', function(e) {
    e.preventDefault();
    const element = $(this).parents('.popover');
    $(element).popover('hide');
  });



  // adds a new recipe ingredient row
  $('#add-ingredient-row').click(function() {
    addIngredientRow();
  });



  // remove an ingredient from the ingredient list
  $(document).on('click', '.remove-ingredient', function() {
    $(this).parents('.ingredient-row').remove();
  });


  // add the recipe to the db.
  $('#submit-recipe').click(function(event) {
    if (recipeForm.checkValidity()) {
      /* check for a recipe id. If one exists,
        this is a PUT. Otherwise, it's a POST */
      const method = $('#recipe-id').val() ? 'PUT' : 'POST';
      const req = new XMLHttpRequest();

      req.open(method, '/recipes', true);
      req.setRequestHeader('Content-Type', 'application/json');
      req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
          const res = req.responseText;

          $dbResponse.html(req.responseText);
          $dbResponse.addClass('show');

          setTimeout(function() {
            $dbResponse.removeClass('show');
          }, 5000);

          console.log(res);
        }
      });

      const context = {
        recipe_id: $recipeId.val(),
        recipe_name: $recipeName.val(),
        recipe_description: $recipeDesc.val(),
        recipe_instructions: $recipeInstr.val(),
        recipe_image_url: $recipeImgUrl.val(),
        recipe_category_id: $recipeCategory.val(),
        cuisines: $recipeCuisines.val(),
        ingredients: getIngredients(),
        user_id: $userId.val(),
      };

      req.send(JSON.stringify(context));
      event.preventDefault();
    }
  });




  /**
   * Functions
   */

   // loads an existing recipe into the form fields.
  function loadExistingReipce() {
    const curr = currentRecipe;

    $recipeId.val(curr.recipe_id);
    $recipeName.val(curr.recipe_name);
    $recipeDesc.val(curr.recipe_description);
    $recipeInstr.val(curr.recipe_instructions);
    $recipeImgUrl.val(curr.recipe_image_url);
    $recipeCategory.selectpicker('val', curr.recipe_category_id);

    curr.cuisines.forEach((cuisine) => {
      $recipeCuisines.selectpicker('val', cuisine.cuisine_id);
    });

    for (let i = 0; i < curr.ingredients.length; i++) {
      if (i >= BASE_INGREDIENT_COUNT) {
        addIngredientRow();
      }

      const $row = $('#recipe-ingredients').children(`.ingredient-row:nth-of-type(${i+1})`);
      $row.find('.ingredient-id').val(curr.ingredients[i].ingredient_id);
      $row.find('.food-group-id').val(curr.ingredients[i].food_group_id);
      $row.find('.ingredient-name').val(curr.ingredients[i].ingredient_name);
      $row.find('.amount').val(curr.ingredients[i].amount);
      $row.find('.unit-of-measure').val(curr.ingredients[i].unit_of_measure_id);
    }
  }



  // adds a new ingredient row to the UI
  function addIngredientRow() {
    const $lastRow = $('.ingredient-row:last');
    const $newRow = $lastRow.clone();

    $newRow.find('input').val('').text('');
    $lastRow.after($newRow);

    // re-initialize typehead and popover so that they
    //  function for the newly added row.
    initTypeahead();
    initPopover();
  }


  // returns an array of ingredient ids corresponding
  //  to the ingredients in the recipe.
  function getIngredients() {
    const ingredients = [];

    $('.ingredient-row').each(function() {
      const $el = $(this);

      ingredients.push({
        ingredient_id: $el.find('.ingredient-id').val() || null,
        ingredient_name: $el.find('.ingredient-name').val(),
        food_group_id: $el.find('.food-group-id').val(),
        amount: $el.find('.amount').val(),
        unit_of_measure_id: $el.find('.unit-of-measure').val(),
      });
    });

    return ingredients;
  }


  // initialize typeahead for ingredient names
  // NOTE: This needs to be called each time a new ingredient row is added.
  function initTypeahead() {
    $('.ingredient-name').typeahead({
      source: ingredientList,
      items: 5,
      autoSelect: false,
      selectOnBlur: true,
      changeInputOnSelect: true,
      changeInputOnMove: true,
      displayText: (item) => {
        return item.ingredient_name;
      },
      sorter: (items) => {
        const curr = $ingredientName.val();

        return items.sort(function(a, b) {
          if (curr == a.ingredient_name) {
            return -1;
          } else if (curr == b.ingredient_name) {
            return 1;
          } else if (curr.toLowerCase() == a.ingredient_name.toLowerCase()) {
            return -1;
          } else if (curr.toLowerCase() == b.ingredient_name.toLowerCase()) {
            return 1;
          } else if (a.ingredient_name < b.ingredient_name) {
            return -1;
          } else if (a.ingredient_name > b.ingredient_name) {
            return 1;
          }
          return 0;
        });
      },
    });
  }


  // initialize popover for the existing ingredients
  // NOTE: This needs to be called each time a new ingredient row is added.
  function initPopover() {
    $('.ingredient-name').popover({
        placement: 'left',
        title: 'Food Group',
        trigger: 'manual',
        html: true,
        content: function() {
          let content = '';
          content = $('#popover-food-group').html();
          return content;
        },
      })
      .on('shown.bs.popover', function() {
        // reset the food group selection
        $foodGroupSelector.children().removeAttr('selected');
        $foodGroupSelector.children().first().attr('selected', true);
      })
      .on('hidden.bs.popover', function() {
        const $el = $(this);
        const $parents = $el.parents('.ingredient-row');
        const $foodGroupId = $parents.find('.food-group-id');

        // set the food group id for the current ingredient
        if (!$foodGroupId.val()) {
          $foodGroupId.val($foodGroupSelector.val());
        }

        // if a food group wasn't selected, move focus back
        //  to the ingredient name. otherwise, move to the amount.
        if (!$foodGroupId.val()) {
          $el.focus();
        } else {
          $parents.find('.amount').focus();
        }
      });
  }

});
