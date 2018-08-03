const express = require('express');
const router = express.Router();
const helpers = require('../helpers');

const Cuisines = require('../controllers/Cuisine');
const Categories = require('../controllers/RecipeCategory');
const Diets = require('../controllers/DietaryRestriction');
const Recipes = require('../controllers/Recipe');
const Users = require('../controllers/User');


/* GET browse page. */
router.get('/', (req, res, next) => {
  let userId = 0;

  Categories.getAll((err, categories) => {
    Cuisines.getAll((err, cuisines) => {
      Diets.getAll((err, diets) => {
        Recipes.getAll((err, recipes) => {

          // replace the default user (0) with the session
          //  user, if one exists.
          if (req.session && req.session.user) {
            userId = req.session.user.user_id;
          }

          Users.getById(userId, (err, user) => {
            const context = {
              page: 'Browse',
              menuId: 'browse',
              cuisines: cuisines,
              categories: categories,
              diets: diets,
              recipes: recipes,
              session: req.session,
              likedRecipes: [],
              dislikedRecipes: [],
            };

            // if a session user was found, replace the empty
            //  liked/disliked recipe arrays with the user's
            //  own significant recupe ids.
            if (user[0]) {
              context.likedRecipes = helpers.mapObjectKey(user[0].likedRecipes, 'recipe_id') || context.likedRecipes;
              context.dislikedRecipes = helpers.mapObjectKey(user[0].dislikedRecipes, 'recipe_id') || context.dislikedRecipes;
            }

            res.render('browse', context);
          });
        });
      });
    });
  });
});



module.exports = router;
