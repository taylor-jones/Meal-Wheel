const express = require('express');
const router = express.Router();

const User = require('../controllers/User');

/* GET login page. */
router.get('/', (req, res, next) => {
  res.render('login', {
    page: 'Login',
    menuId: 'login',
    session: req.session,
  });
});


/* process user login */
router.post('/', (req, res, next) => {
  User.getByCredentials(req.body, (err, result) => {
    if (!result[0]) {
      const feedback = 'The login attempt was unsuccessful.';
      res.render('login', {
        page: 'Login',
        menuId: 'login',
        feedback: feedback,
        session: req.session,
      });
    } else {
    // otherwise, the login was successful.
    // setup the session data & redirect to home page.
    req.session.user = result[0];
    res.redirect('../');
    }
  });
});

module.exports = router;
