const express = require('express');
const router = express.Router();

/* GET add recipe page. */
router.get('/', (req, res, next) => {
  res.render('addRecipe', {
    page: 'Add Recipe',
    menuId: 'addRecipe',
  });
});

module.exports = router;
