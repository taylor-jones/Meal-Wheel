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



});
