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

module.exports = router;
