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


module.exports = router;
