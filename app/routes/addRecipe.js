const express = require('express');
const router = express.Router();

const UnitsOfMeasure = require('../controllers/UnitOfMeasure');
const Categories = require('../controllers/RecipeCategory');
const Cuisines = require('../controllers/Cuisine');
const Ingredients = require('../controllers/Ingredient');
const FoodGroups = require('../controllers/FoodGroup');

/* GET add recipe page. */
router.get('/', (req, res, next) => {
  FoodGroups.getAll((err, foodGroups) => {
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
              foodGroups: foodGroups,
              session: req.session,
            });
          });
        });
      });
    });
  });
});



router.post('/', (req, res, next) => {
  console.log(req.body);

  // check all the ignredients to see if any ingredients need to be created.
  


  res.send('foo');
});


module.exports = router;
