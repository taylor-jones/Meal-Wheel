const express = require('express');
const router = express.Router();

const helpers = require('../helpers');

const UnitsOfMeasure = require('../controllers/UnitOfMeasure');
const Categories = require('../controllers/RecipeCategory');
const Cuisines = require('../controllers/Cuisine');
const Ingredients = require('../controllers/Ingredient');
const FoodGroups = require('../controllers/FoodGroup');
const Recipes = require('../controllers/Recipe');

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
              message: null,
            });
          });
        });
      });
    });
  });
});


router.post('/', (req, res, next) => {
  const recipe = helpers.sanitizeJSON(req.body);
  let errCheck = '';

  // console.log(recipe);
  // res.send(errCheck);
  
  // setup the recipe user_id
  if (req.session && req.session.user) {
    recipe.user_id = req.session.user.user_id;
  } else {
    recipe.user_id = null;
  }


  // create the new recipe
  Recipes.addNew(recipe, (err, newRecipe) => {
    recipe.recipe_id = newRecipe.insertId;

    // create any necessary ingredients
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredient.ingredient_id) {
        Ingredients.addNew({
          ingredient_name: ingredient.ingredient_name,
          food_group_id: ingredient.food_group_id,
        }, (err, newIngredient) => {
          if (err) {
            next(err);
          }

          if (newIngredient) {
            // create the recipe-ingredient record(s).
            Recipes.addIngredient({
              recipe_id: recipe.recipe_id,
              ingredient_id: newIngredient.insertId,
              amount: ingredient.amount,
              unit_of_measure_id: ingredient.unit_of_measure_id,
            }, (err, result) => {
              if (err) {
                next(err);
              }

            });
          }
        });
      } else {

        // create the recipe-ingredient record(s).
        Recipes.addIngredient({
          recipe_id: recipe.recipe_id,
          ingredient_id: ingredient.ingredient_id,
          amount: ingredient.amount,
          unit_of_measure_id: ingredient.unit_of_measure_id,
        }, (err, result) => {
          if (err) {
            next(err);
          }
        });
      }
    });


    // create recipe-cuisine record(s).
    recipe.cuisines.forEach((cuisine) => {
      Recipes.addCuisine({
        recipe_id: recipe.recipe_id,
        cuisine_id: cuisine,
      }, (err, result) => {
        if (err) {
          next(err);
        }
      });
    });


    res.send('success and refresh');
  });
});


module.exports = router;
