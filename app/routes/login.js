const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/', (req, res, next) => {
  console.log(req.session);

  res.render('login', {
    page: 'Login',
    menuId: 'login',
    session: req.session,
  });
});


/* process user login */
router.post('/', (req, res, next) => {
  /* TODO: determine if login credentials are valid.
    If so, ...
      redirect to ... home page? user profile?
      OR maybe show a toast indicating successful login?

    If not, maybe show a toast showing unsuccessfil login attempt?
  */
});

module.exports = router;
