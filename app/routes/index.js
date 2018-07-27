const express = require('express');
const router = express.Router();

const Categories = require('../controllers/RecipeCategory');
const Cuisines = require('../controllers/Cuisine');
const Diets = require('../controllers/DietaryRestriction');
const Recipes = require('../controllers/Recipe');


/* GET home page. */
router.get('/', (req, res, next) => {
  Categories.getAll((err, categories) => {
    Cuisines.getAll((err, cuisines) => {
      Diets.getAll((err, diets) => {
        res.render('index', {
          page: 'Home',
          menuId: 'home',
          cuisines: cuisines,
          categories: categories,
          diets: diets,
        });
      });
    });
  });
});



/* GET home page after wheel spin (with recipe) */

/**
 * There's a lot that's not complete with this:
 * 1) There's no DB query to determine the recipe right now. It's
 *    just generating a random number between 1-3, since I know we have
 *    3 recipes in the db right now.
 * 
 * 2) It's not taking into account any of the search parameters yet.
 * 
 * 3) Is this even how we want to handle getting a random recipe?
 *    It seems like it would be nicer to have the post request w/
 *      some AJAX and update the recipeDisplay based on the response,
 *      so we wouldn't have to do a page refresh.
 */

router.post('/', (req, res, next) => {
  const randomRecipe = Math.floor(Math.random() * 3) + 1;

  Categories.getAll((err, categories) => {
    Cuisines.getAll((err, cuisines) => {
      Diets.getAll((err, diets) => {
        Recipes.getById(randomRecipe, (err, recipe) => {
          Recipes.getIngredientsByRecipeId(randomRecipe, (err, ingredients) => {
            res.render('index', {
              page: 'Home',
              menuId: 'home',
              cuisines: cuisines,
              categories: categories,
              diets: diets,
              recipe: recipe[0],
              ingredients: ingredients,
            });
          });
        });
      });
    });
  });
});


module.exports = router;
