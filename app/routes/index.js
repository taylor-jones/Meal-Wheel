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
          session: req.session,
          cuisines: cuisines,
          categories: categories,
          diets: diets,
        });
      });
    });
  });
});


/* 
Spin wheel to get a single recipe based on filters. 
See spinButton event listener function in public/javascripts/home.js
*/
router.post('/', (req, res, next) => {
  const category = req.body.category;
  const cuisine = req.body.cuisine;
  const diet = req.body.diet;

  //controllers/recipe.js
  Recipes.getByFilter(category, cuisine, diet, (err, recipe) => {
    if (!recipe){
      //null response if no recipe is found
      res.send(null);
    }
    else{
      res.send({
        recipe: recipe[0],
      });
    }
    
  });
});

module.exports = router;
