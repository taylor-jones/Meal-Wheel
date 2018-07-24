const express = require('express');
const router = express.Router();
const data = require('../data/cuisines.json');

/* GET browse page. */
router.get('/', (req, res, next) => {
  res.render('cuisine', {
    page: 'Cuisines',
    menuId: 'cuisine',
    data: data,
  });
});

module.exports = router;
