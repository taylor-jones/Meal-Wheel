const express = require('express');
const router = express.Router();

const UnitsOfMeasure = require('../controllers/UnitOfMeasure');
const Categories = require('../controllers/RecipeCategory');
const Cuisines = require('../controllers/Cuisine');


/* GET add recipe page. */
router.get('/', (req, res, next) => {
  Categories.getAll((err, categories) => {
    Cuisines.getAll((err, cuisines) => {
      UnitsOfMeasure.getAll((err, units) => {
        res.render('addRecipe', {
          page: 'Submit a new Recipe',
          menuId: 'addRecipe',
          cuisines: cuisines,
          categories: categories,
          units: units,
        });
      });
    });
  });
});


module.exports = router;
