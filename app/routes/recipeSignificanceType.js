const express = require('express');
const router = express.Router();

const RecipeSignificanceTypes = require('../controllers/RecipeSignificanceType');

/* GET recipe significance type admin page. */
router.get('/', (req, res, next) => {
  RecipeSignificanceTypes.getAll((err, recipeSignificanceTypes) => {
    res.render('recipeSignificanceType', {
      page: 'Recipe Significance Types',
      menuId: 'recipe-significance-type',
      data: recipeSignificanceTypes,
    });
  });
});


module.exports = router;
