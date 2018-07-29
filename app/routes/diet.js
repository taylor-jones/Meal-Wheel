const express = require('express');
const router = express.Router();

const Diets = require('../controllers/DietaryRestriction');

/* GET dietary restriction admin page. */
router.get('/', (req, res, next) => {
  Diets.getAll((err, diets) => {
    res.render('diet', {
      page: 'Dietary Restrictions',
      menuId: 'diets',
      data: diets,
      session: req.session,
    });
  });
});

module.exports = router;
