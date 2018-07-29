const express = require('express');
const router = express.Router();

const Ingredients = require('../controllers/Ingredient');

/* GET ingredient admin page. */
router.get('/', (req, res, next) => {
  Ingredients.getAll((err, ingredients) => {
    res.render('ingredient', {
      page: 'Ingredients',
      menuId: 'ingredients',
      data: ingredients,
      session: req.session,
    });
  });
});

module.exports = router;
