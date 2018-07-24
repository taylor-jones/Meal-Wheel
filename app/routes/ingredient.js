const express = require('express');
const router = express.Router();
const data = require('../data/ingredients.json');

/* GET browse page. */
router.get('/', (req, res, next) => {
  res.render('ingredient', {
    page: 'Ingredients',
    menuId: 'ingredients',
    data: data,
  });
});

module.exports = router;
