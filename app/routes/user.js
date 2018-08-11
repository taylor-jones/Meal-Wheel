const express = require('express');
const router = express.Router();

const Users = require('../controllers/User');
const RecipeSignificanceTypes = require('../controllers/RecipeSignificanceType');




router.post('/liked-recipe', (req, res, next) => {
  console.log('post liked-recipe', req.body);
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
  console.log('post disliked-recipe', req.body);

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
  console.log('delete liked-recipe', req.body);
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
  console.log('delete disliked-recipe', req.body);
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


router.put('/update', (req, res, next) => {
  const body = req.body;
  Users.getById(body.user_id, (err, user) => {
    if (err) return next(err);
    if (user.length === 1) {
      const record = user[0];

      const context = {
        user_id: body.user_id,
        user_name: body.user_name === undefined ? record.user_name : body.user_name,
        user_email: body.user_email === undefined ? record.user_email : body.user_email,
        user_password: body.user_password === undefined ? record.user_password : body.user_password,
      };

      Users.updateById(context, (err, result) => {
        if (err) return next(err);
        res.send(JSON.stringify(result));
      });
    }
  });
});


module.exports = router;
