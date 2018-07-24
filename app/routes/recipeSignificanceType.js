const express = require('express');
const router = express.Router();
const data = require('../data/recipe-significance-types.json');

/* GET browse page. */
router.get('/', (req, res, next) => {
  res.render('recipeSignificanceType', {
    page: 'Recipe Significance Types',
    menuId: 'recipe-significance',
    data: data,
  });
});

module.exports = router;
