const express = require('express');
const router = express.Router();
const User = require('../controllers/User');

/* GET new user page. */
router.get('/', (req, res, next) => {
  res.render('newUser', {
    page: 'Sign Up',
    menuId: 'new-user',
    session: req.session,
  });
});

router.post('/', (req, res, next) => {
  let credentials = req.body;
  User.addNew(credentials, (err, result) => {
    if (err) {
      const feedback = 'This username is already taken.';
      res.render('newUser', {
        page: 'Sign Up',
        menuId: 'new-user',
        session: req.session,
        feedback: feedback,
      });
    } else {
      User.getByCredentials(credentials, (err, result) => {
        if (!result[0]) {
          const feedback = 'Something seems to have gone wrong.';
          res.render('newUser', {
            page: 'Sign Up',
            menuId: 'new-user',
            session: req.session,
            feedback: feedback,
          });
        } else {
          // otherwise, the login was successful.
          // setup the session data & redirect to home page.
          req.session.cookie.maxAge = 14 * 24 * 60 * 60 * 1000;
          req.session.user = result[0];
          res.redirect('../');
        }
      });
    }
  });
});


module.exports = router;
