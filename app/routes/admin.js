const express = require('express');
const router = express.Router();

/* GET admin page. */
router.get('/', (req, res, next) => {
  res.render('admin', {
    page: 'Admin',
    menuId: 'admin',
    session: req.session,
  });
});



module.exports = router;
