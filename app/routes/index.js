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
  const context = {
    category: req.body.category,
    cuisine: req.body.cuisine,
    diet: req.body.diet,
    user: 0,
  };

  // if user exists, it will be passed to the filter
  //  function to exclude any 'disliked' recipes.
  if (req.session.user) {
    context.user = req.session.user.user_id;
  }

  Recipes.getByFilter(context, (err, recipe) => {
    // home.js handles it whether null or not.
    res.send({ recipe: recipe[0] });
  });
});



// logs the user out and redirects to the home page.
router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});


module.exports = router;
