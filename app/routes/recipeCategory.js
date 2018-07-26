const express = require('express');
const router = express.Router();
// const data = require('../data/recipe-categories.json');
const RecipeCategories = require('../controllers/RecipeCategory');

/* GET recipe category admin page. */
router.get('/', (req, res, next) => {
  RecipeCategories.getAll((err, recipeCategories) => {
    res.render('recipeCategory', {
      page: 'Recipe Categories',
      menuId: 'recipe-category',
      data: recipeCategories,
    });
  });
});


// router.get('/', (req, res, next) => {
//   res.render('recipeCategory', {
//     page: 'Recipe Categories',
//     menuId: 'recipe-categories',
//     data: data.getAll(),
//   });
// });

module.exports = router;
