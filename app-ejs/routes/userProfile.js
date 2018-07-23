const express = require('express');
const router = express.Router();

/* GET user profile page. */
router.get('/', (req, res, next) => {
  res.render('userProfile', {
    page: 'User Profile',
    menuId: 'userProfile',
  });
});

module.exports = router;
