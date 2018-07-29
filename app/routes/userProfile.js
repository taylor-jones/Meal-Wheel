const express = require('express');
const router = express.Router();


/* Check if the user is logged in.
  - If so, GET the user profile page.
  - If not, GET the login page.
. */
router.get('/', (req, res, next) => {
  // let context = {};

  // if (req.session.name) {
  //   context = {
  //     view: 'userProfile',
  //     page: 'User Profile',
  //     menuId: 'userProfile',
  //   };

  // } else {
  //   context = {
  //     view: 'login',
  //     page: 'Login',
  //     menuId: 'login',
  //   };
  // }

  // res.render(context.view, context);

  res.render('userProfile', {
    view: 'userProfile',
    page: 'User Profile',
    menuId: 'userProfile',
    session: req.session,
  });
});

module.exports = router;
