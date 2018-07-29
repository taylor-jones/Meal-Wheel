const express = require('express');
const router = express.Router();

const UnitsOfMeasure = require('../controllers/UnitOfMeasure');


/* GET unit of measure admin page. */
router.get('/', (req, res, next) => {
  UnitsOfMeasure.getAll((err, unitsOfMeasure) => {
    res.render('unitOfMeasure', {
      page: 'Units of Measure',
      menuId: 'unit-of-measure',
      data: unitsOfMeasure,
      session: req.session,
    });
  });
});


module.exports = router;
