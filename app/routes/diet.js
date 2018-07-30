const express = require('express');
const router = express.Router();

const Diets = require('../controllers/DietaryRestriction');

/* GET dietary restriction admin page. */
router.get('/', (req, res, next) => {
  Diets.getAll((err, diets) => {
    res.render('diet', {
      page: 'Dietary Restrictions',
      requestRoute: 'diets',
      menuId: 'diets',
      data: diets,
      session: req.session,
    });
  });
});


router.post('/', (req, res, next) => {
  Diets.addNew(req.body, (err, result) => {
    res.send(err || result);
  });
});


router.delete('/:id', (req, res, next) => {
  Diets.deleteById(req.params.id, (err, result) => {
    res.send(err || result);
  });
});


router.put('/:id', (req, res, next) => {
  Diets.updateById(req.params.id, req.body.dietary_restriction_name, (err, result) => {
    res.send(err || result);
  });
});


module.exports = router;
