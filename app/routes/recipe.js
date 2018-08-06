const express = require('express');
const router = express.Router();

const helpers = require('../helpers');

const Recipes = require('../controllers/Recipe');


/* GET recipe admin page. */
router.get('/', (req, res, next) => {
  Recipes.getAll((err, recipes) => {
    res.render('recipe', {
      page: 'Recipes',
      menuId: 'recipes',
      data: recipes,
      session: req.session,
    });
  });
});


/* GET an individual recipe page. */
router.get('/:id', (req, res, next) => {
  Recipes.getById(req.params.id, (err, recipe) => {
    recipe[0].ingredients.forEach((ingredient) => {
      ingredient.unit_of_measure_name = helpers.pluralize(ingredient.unit_of_measure_name);
    });

    res.render('singleRecipe', {
      page: recipe.recipe_name,
      menuId: 'recipe',
      recipe: recipe[0],
    });
  });
});


module.exports = router;
