const express = require('express');
const router = express.Router();

const Cuisines = require('../controllers/Cuisine');
const Categories = require('../controllers/RecipeCategory');
const Diets = require('../controllers/DietaryRestriction');
const Recipes = require('../controllers/Recipe');


/* GET browse page. */
router.get('/', (req, res, next) => {
  Categories.getAll((err, categories) => {
    Cuisines.getAll((err, cuisines) => {
      Diets.getAll((err, diets) => {
        Recipes.getAll((err, recipes) => {
          res.render('browse', {
            page: 'Browse',
            menuId: 'browse',
            cuisines: cuisines,
            categories: categories,
            diets: diets,
            recipes: recipes,
            session: req.session,
          });
        });
      });
    });
  });
});


module.exports = router;
