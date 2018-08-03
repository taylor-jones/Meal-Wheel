$(function() {
  const $ingredientName = $('.ingredient-name');

  // initialize typeahead for existing ingredient list items
  initTypeahead();


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



  // selectpicker options and setup
  $('.selectpicker').selectpicker({
    style: 'btn-select',
    size: 4,
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



  $(document).on('click', '.remove-ingredient', function() {
    $(this).parents('.ingredient-row').remove();
  });



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


  /**
   * Validates the ingredients to make sure that:
   *  - there's at least one ingredient.
   *  - each ingredient has an ingredient name
   */



  /**
   * Creates a new ingredient with the name
   */

});
