const express = require('express');
const router = express.Router();
const data = require('../data/dietary-restrictions.json');

/* GET browse page. */
router.get('/', (req, res, next) => {
  res.render('diet', {
    page: 'Dietary Restrictions',
    menuId: 'diets',
    data: data,
  });
});

module.exports = router;
