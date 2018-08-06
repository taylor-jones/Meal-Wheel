const express = require('express');
const router = express.Router();

const Ingredients = require('../controllers/Ingredient');
const FoodGroups = require('../controllers/FoodGroup');

/* GET ingredient admin page. */
router.get('/', (req, res, next) => {
  Ingredients.getAll((err, ingredients) => {
    FoodGroups.getAll((err, foodGroups) => {
      res.render('ingredient', {
        page: 'Ingredients',
        sidebarId: '#nav-ingredients',
        data: ingredients,
        foodGroups: foodGroups,
        session: req.session,
      });
    });
  });
});


router.post('/', (req, res, next) => {
  console.log(req.body);
  Ingredients.addNew(req.body, (err, result) => {
    res.send(err || result);
  });
});


router.delete('/:id', (req, res, next) => {
  Ingredients.deleteById(req.params.id, (err, result) => {
    res.send(err || result);
  });
});


router.put('/:id', (req, res, next) => {
  Ingredients.updateById(req.params.id, req.body, (err, result) => {
    res.send(err || result);
  });
});


module.exports = router;
