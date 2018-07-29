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
 */

router.post('/', (req, res, next) => {
  const randomRecipe = Math.floor(Math.random() * 3) + 1;
  // const randomRecipe = 0;    // for testing when no matching recipe can be found

  // console.log(req.body);

  Recipes.getById(randomRecipe, (err, recipe) => {
    res.send({
      recipe: recipe[0],
    });
  });
});


module.exports = router;