const express = require('express');
const router = express.Router();

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


module.exports = router;
