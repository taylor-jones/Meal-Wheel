const express = require('express');
const router = express.Router();
const data = require('../data/recipes.json');

/* GET browse page. */
router.get('/', (req, res, next) => {
  res.render('recipe', {
    page: 'Recipes',
    menuId: 'recipes',
    data: data,
  });
});

router.get('/:id', (req, res, next) => {
  res.render('singleRecipe', {
    page: data[req.params.id].recipe_name,
    menuId: 'recipe',
    data: data[req.params.id],
  });
});

module.exports = router;
