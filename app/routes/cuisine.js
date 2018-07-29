const express = require('express');
const router = express.Router();

const Cuisines = require('../controllers/Cuisine');

/* GET cuisine admin list page. */
router.get('/', (req, res, next) => {
  Cuisines.getAll((err, cuisines) => {
    res.render('cuisine', {
      page: 'Cuisines',
      menuId: 'cuisine',
      data: cuisines,
      session: req.session,
    });
  });
});

router.post('/', (req, res, next) => {
  Cuisines.getCount((err, rows) => {
    const c_count = rows;
    res.send({ cuisineCount: c_count });
  }); 
});

module.exports = router;
