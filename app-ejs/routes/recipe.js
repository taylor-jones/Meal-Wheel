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
  let recipe;

  for (let i = 0; i < data.length; i++) {
    if (data[i].recipe_id === Number(req.params.id)) {
      recipe = data[i];
    }
  }

  res.render('singleRecipe', {
    page: recipe.recipe_name,
    menuId: 'recipe',
    data: recipe,
  });
});

module.exports = router;
