const express = require('express');
const router = express.Router();

const FoodGroups = require('../controllers/FoodGroup');

/* GET food group admin page. */
router.get('/', (req, res, next) => {
  FoodGroups.getAll((err, foodGroups) => {
    res.render('foodGroup', {
      page: 'Food Groups',
      menuId: 'food-groups',
      data: foodGroups,
      session: req.session,
    });
  });
});


router.post('/', (req, res, next) => {
  FoodGroups.addNew(req.body, (err, result) => {
    res.send(err || result);
  });
});


router.delete('/:id', (req, res, next) => {
  FoodGroups.deleteById(req.params.id, (err, result) => {
    res.send(err || result);
  });
});


router.put('/:id', (req, res, next) => {
  FoodGroups.updateById(req.params.id, req.body.food_group_name, (err, result) => {
    res.send(err || result);
  });
});


module.exports = router;
