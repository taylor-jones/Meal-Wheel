const express = require('express');
const router = express.Router();


/* Check if the user is logged in.
  - If so, GET the user profile page.
  - If not, GET the login page.
. */
router.get('/', (req, res, next) => {
  if (req.session.name) {
    res.render('userProfile', {
      page: 'User Profile',
      menuId: 'userProfile',
    });
  } else {
    res.render('login', {
      page: 'Login',
      menuId: 'login',
    });
  }
});

module.exports = router;
