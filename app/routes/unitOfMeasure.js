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


router.post('/', (req, res, next) => {
  UnitsOfMeasure.addNew(req.body, (err, result) => {
    res.send(err || result);
  });
});


router.delete('/:id', (req, res, next) => {
  UnitsOfMeasure.deleteById(req.params.id, (err, result) => {
    res.send(err || result);
  });
});


router.put('/:id', (req, res, next) => {
  UnitsOfMeasure.updateById(
    req.params.id, 
    req.body.unit_of_measure_name,
    req.body.unit_of_measure_abbrev,
     (err, result) => {
    res.send(err || result);
  });
});


module.exports = router;
