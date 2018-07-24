const express = require('express');
const router = express.Router();
const data = require('../data/units-of-measure.json');

/* GET browse page. */
router.get('/', (req, res, next) => {
  res.render('unitOfMeasure', {
    page: 'Units of Measure',
    menuId: 'units-of-measure',
    data: data,
  });
});

module.exports = router;
