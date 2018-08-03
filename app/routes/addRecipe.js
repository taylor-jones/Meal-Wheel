const express = require('express');
const router = express.Router();

const UnitsOfMeasure = require('../controllers/UnitOfMeasure');
const Categories = require('../controllers/RecipeCategory');
const Cuisines = require('../controllers/Cuisine');
const Ingredients = require('../controllers/Ingredient');

/* GET add recipe page. */
router.get('/', (req, res, next) => {
  Categories.getAll((err, categories) => {
    Cuisines.getAll((err, cuisines) => {
      UnitsOfMeasure.getAll((err, units) => {
        Ingredients.getAll((err, ingredients) => {
          res.render('addRecipe', {
            page: 'Add Recipe',
            menuId: 'add-recipe',
            cuisines: cuisines,
            categories: categories,
            ingredients: ingredients,
            units: units,
            session: req.session,
          });
        });
      });
    });
  });
});


module.exports = router;
