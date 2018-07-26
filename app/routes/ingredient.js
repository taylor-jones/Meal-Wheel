const express = require('express');
const router = express.Router();
// const data = require('../data/ingredients.json');

const Ingredients = require('../controllers/Ingredient');

/* GET ingredient admin page. */
router.get('/', (req, res, next) => {
  Ingredients.getAll((err, ingredients) => {
    res.render('ingredient', {
      page: 'Ingredients',
      menuId: 'ingredients',
      data: ingredients,
    });
  });
});

module.exports = router;
