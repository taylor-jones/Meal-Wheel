const express = require('express');
const router = express.Router();

const Users = require('../controllers/User');
const RecipeSignificanceTypes = require('../controllers/RecipeSignificanceType');



// router.get('/', (req, res, next) => {
//   res.redirect('../');
// });



router.post('/liked-recipe', (req, res, next) => {
  RecipeSignificanceTypes.getByName('liked', (err, type) => {
    Users.addRecipeSignificance({
      user_id: req.session.user.user_id,
      recipe_id: req.body.recipe_id,
      recipe_significance_type_id: type[0].recipe_significance_type_id,
    }, (err, result) => {
      res.send(err || result);
    });
  });
});


router.post('/disliked-recipe', (req, res, next) => {
  RecipeSignificanceTypes.getByName('disliked', (err, type) => {
    Users.addRecipeSignificance({
      user_id: req.session.user.user_id,
      recipe_id: req.body.recipe_id,
      recipe_significance_type_id: type[0].recipe_significance_type_id,
    }, (err, result) => {
      res.send(err || result);
    });
  });
});


router.delete('/liked-recipe', (req, res, next) => {
  RecipeSignificanceTypes.getByName('liked', (err, type) => {
    Users.removeRecipeSignificance({
      user_id: req.session.user.user_id,
      recipe_id: req.body.recipe_id,
      recipe_significance_type_id: type[0].recipe_significance_type_id,
    }, (err, result) => {
      res.send(err || result);
    });
  });
});


router.delete('/disliked-recipe', (req, res, next) => {
  RecipeSignificanceTypes.getByName('disliked', (err, type) => {
    Users.removeRecipeSignificance({
      user_id: req.session.user.user_id,
      recipe_id: req.body.recipe_id,
      recipe_significance_type_id: type[0].recipe_significance_type_id,
    }, (err, result) => {
      res.send(err || result);
    });
  });
});



module.exports = router;
