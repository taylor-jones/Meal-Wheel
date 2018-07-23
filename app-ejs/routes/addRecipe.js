const express = require('express');
const router = express.Router();

const cuisines = require('../data/cuisines.json');
const categories = require('../data/recipe-categories.json');
const units = require('../data/units-of-measure.json');

/* GET add recipe page. */
router.get('/', (req, res, next) => {
  res.render('addRecipe', {
    page: 'Add Recipe',
    menuId: 'addRecipe',
    cuisines: cuisines,
    categories: categories,
    units: units
  });
});

module.exports = router;
