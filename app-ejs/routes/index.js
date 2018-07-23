const express = require('express');
const router = express.Router();

const cuisines = require('../data/cuisines.json');
const categories = require('../data/recipe-categories.json');
const diets = require('../data/dietary-restrictions.json');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    page: 'Home',
    menuId: 'home',
    cuisines: cuisines,
    categories: categories,
    diets: diets,
  });
});

module.exports = router;
