const express = require('express');
const router = express.Router();
const data = require('../data/recipe-categories.json');

/* GET browse page. */
router.get('/', (req, res, next) => {
  res.render('recipeCategory', {
    page: 'Recipe Categories',
    menuId: 'recipe-categories',
    data: data,
  });
});

module.exports = router;
