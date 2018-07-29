$(function() {
  const $ingredientName = $('#ingredient-name');

  $ingredientName.typeahead({
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



  $ingredientName.change(function() {
    const curr = $ingredientName.typeahead('getActive');

    if (curr) {
      const ingName = curr.ingredient_name.toLowerCase();
      const inputName = $ingredientName.val().toLowerCase();

      if (ingName == inputName) {
        console.log('ingredient match');
      } else {
        console.log('new ingredient');
      }
    } else {
      'nothing is active';
    }
  });



  // adds a new recipe ingredient row
  $('#add-ingredient-row').click(function() {
    const newRow = `
    <div class="form-row">
      <div class="form-group col-md-6">
        <input type="text" name="ingredient_name" class="form-control" id="ingredient-name" required>
      </div>

      <div class="form-group col-sm-6 col-md-2">
        <input type="number" name="amount" class="form-control" value="1" required min="1">
      </div>
      
      <div class="form-group col-sm-6 col-md-4">
        <select class="form-control" name="unit_of_measure_id">
          <option value="null" selected>n/a</option>
          <% for ( let i = 0; i < units.length; i++ ) { %>
            <option value="<%= units[i].unit_of_measure_id %>"><%= units[i].unit_of_measure_name %></option>
          <% } %>
        </select> 
      </div>
    </div>`;

    $('#recipe-ingredients').append(newRow);
  });



  /**
   * Validates the ingredients to make sure that:
   *  - there's at least one ingredient.
   *  - each ingredient has an ingredient name
   */



   /**
    * Creates a new ingredient with the name
    */

});
