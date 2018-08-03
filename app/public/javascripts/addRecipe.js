$(function() {
  // cache DOM
  const $ingredientName = $('.ingredient-name');
  const $amount = $('.ingredient-amount');
  const $unitOfMeasure = $('.unit-of-measure');

  const $recipeName = $('#recipe-name');
  const $recipeDesc = $('#recipe-description');
  const $recipeInstr = $('#recipe-instructions');
  const $recipeImgUrl = $('#recipe-img-url');
  const $recipeCategory = $('#recipe-category');
  const $recipeCuisines = $('#recipe-cuisines');

  const recipeForm = document.querySelector('#recipe-form');


  /**
   * Initialization
   */

  // initialize typeahead for existing ingredient list items
  initTypeahead();

  // selectpicker options and setup
  $('.selectpicker').selectpicker({
    style: 'btn-select',
    size: 4,
  });



  /**
   * Events
   */

  // handle text changes for ingredients.
  $ingredientName.change(function() {
    const curr = $ingredientName.typeahead('getActive');

    if (curr) {
      const ingName = curr.ingredient_name.toLowerCase();
      const inputName = $ingredientName.val().toLowerCase();

      if (ingName == inputName) {
        // console.log('ingredient match');
      } else {
        // console.log('new ingredient');
      }
    } else {
      // 'nothing is active';
    }
  });



  // adds a new recipe ingredient row
  $('#add-ingredient-row').click(function() {
    let newRow = `
    <div class="form-row mb-1 ingredient-row">
      <div class="input-group">
        <input type="text" class="form-control ingredient-name" name="ingredient_name" placeholder="Ingredient">
        <input type="number" class="form-control form-control-sm" placeholder="Qty" name="amount" min="1" required>

        <select class="custom-select" name="unit_of_measure_id">
          <option value="" selected hidden disabled>Unit</option>
          <option value="null">n/a</option>`;


    // add each unit of meqsure to the select list
    for (let i = 0; i < unitList.length; i++) {
      newRow += `<option value="${unitList[i].unit_of_measure_id}">${unitList[i].unit_of_measure_name}</option>`;
    }

    newRow += `</select>
        <div class="input-group-append">
          <button class="btn btn-danger remove-ingredient" type="button">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>`;

    $('#recipe-ingredients').append(newRow);
    initTypeahead();
  });



  // remove an ingredient from the ingredient list
  $(document).on('click', '.remove-ingredient', function() {
    $(this).parents('.ingredient-row').remove();
  });


  $('#submit-recipe').click(function(event) {
    console.log($recipeCuisines.val());
    let context = {};

    if (recipeForm.checkValidity()) {
      const req = new XMLHttpRequest();
      req.open('POST', '/addRecipe', true);

      req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
          const res = JSON.parse(req.responseText);
          console.log(res);
        }
      });

      context = {
        recipe_name: $recipeName.val(),
        recipe_description: $recipeDesc.val(),
        recipe_instructions: $recipeInstr.val(),
        recipe_image_url: $recipeImgUrl.val(),
        recipe_category_id: $recipeCategory.val(),
        cuisines: $recipeCuisines.val(),
      };
  

      req.send(JSON.stringify(context));
      event.preventDefault();
    }
  });



  /**
   * Functions
   */


  // initialize typeahead for ingredient names
  function initTypeahead() {
    $('.ingredient-name').typeahead({
      source: ingredientList,
      items: 5,
      autoSelect: false,
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



});
