const express = require('express');
const router = express.Router();
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
            user_name: req.session.user.user_name,
            user_email: req.session.user.user_email,
            menuId: 'nav-profile',
            liked_recipes: likedRecipes,
            disliked_recipes: dislikedRecipes,
            submitted_recipes: submittedRecipes,
            session: req.session,
          };

          res.render(context.view, context);

        });
      });
    });
  } else {
    context = {
      view: 'login',
      page: 'Login',
      menuId: 'nav-login',
      user_name: '',
      user_email: '',
      liked_recipes: {},
      disliked_recipes: {},
      session: null,
    };
    res.render(context.view, context);
  }

});


module.exports = router;
