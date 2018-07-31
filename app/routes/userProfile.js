const express = require('express');
const router = express.Router();


/* Check if the user is logged in.
  - If so, GET the user profile page.
  - If not, GET the login page.
. */
router.get('/', (req, res, next) => {
  let context;

  // if (req.session.user) {
    context = {
      view: 'userProfile',
      page: 'User Profile',
      menuId: 'nav-profile',
    };
  // } else {
  //   context = {
  //     view: 'login',
  //     page: 'Login',
  //     menuId: 'nav-login',
  //   };
  // }

  context.session = req.session;
  res.render(context.view, context);
});


module.exports = router;
