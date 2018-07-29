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
  if (req.body.taskId == 'getCount') {
    Cuisines.getAll((err, cuisines) => {
      res.send(JSON.stringify(cuisines));
    });
  }
});



router.delete('/:id', (req, res, next) => {
  Cuisines.deleteById(req.params.id, (err, result) => {
    res.send(err || result);
  });
});


module.exports = router;
