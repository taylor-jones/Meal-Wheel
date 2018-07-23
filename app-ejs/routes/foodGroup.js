const express = require('express');
const router = express.Router();
const data = require('../data/food-groups.json');

/* GET browse page. */
router.get('/', (req, res, next) => {
  res.render('foodGroup', {
    page: 'Food Groups',
    menuId: 'food-groups',
    data: data,
  });
});

module.exports = router;
