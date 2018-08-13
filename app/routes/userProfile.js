const express = require('express');
const router = express.Router();
const helpers = require('../helpers');

const Categories = require('../controllers/RecipeCategory');
const Cuisines = require('../controllers/Cuisine');
const Diets = require('../controllers/DietaryRestriction');
const User = require('../controllers/User');

/* Check if the user is logged in.
  - If so, GET the user profile page.
  - If not, GET the login page.
. */
router.get('/', (req, res, next) => {
  let context;

  if (req.session.user) {
    let id = req.session.user.user_id;
    User.getLikedRecipes(id, (err, likedRecipes) => {
      User.getDislikedRecipes(id, (err, dislikedRecipes) => {
        User.getSubmittedRecipes(id, (err, submittedRecipes) => {
          context = {
            view: 'userProfile',
            page: 'User Profile',
            user_id: req.session.user.user_id,
            user_name: req.session.user.user_name,
            user_email: req.session.user.user_email,
            menuClass: '.nav-profile',
            liked_recipes: likedRecipes,
            disliked_recipes: dislikedRecipes,
            submitted_recipes: submittedRecipes,
            session: req.session,
          };

          context.liked_recipe_ids = helpers.mapObjectKey(context.liked_recipes, 'recipe_id'),
          context.disliked_recipe_ids = helpers.mapObjectKey(context.disliked_recipes, 'recipe_id'),

          res.render(context.view, context);

        });
      });
    });
  } else {
    context = {
      view: 'login',
      page: 'Login',
      menuClass: '.nav-login',
      user_id: 0,
      user_name: '',
      user_email: '',
      liked_recipes: [],
      disliked_recipes: [],
      session: null,
    };
    res.render(context.view, context);
  }
});



router.get('/liked', (req, res, next) => {
  if (req.session.user) {
    let id = req.session.user.user_id;

    User.getLikedRecipes(id, (err, recipes) => {
      console.log(recipes);
      res.send(recipes);
    });
  } else {
    res.send(null);
  }
});


router.get('/disliked', (req, res, next) => {
  if (req.session.user) {
    let id = req.session.user.user_id;

    User.getDislikedRecipes(id, (err, recipes) => {
      console.log(recipes);
      res.send(recipes);
    });
  } else {
    res.send(null);
  }
});


router.get('/submitted', (req, res, next) => {
  if (req.session.user) {
    let id = req.session.user.user_id;

    User.getSubmittedRecipes(id, (err, recipes) => {
      res.send(recipes);
    });
  } else {
    res.send(null);
  }
});


module.exports = router;
