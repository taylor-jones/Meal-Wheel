const express = require('express');
const router = express.Router();

const Cuisines = require('../controllers/Cuisine');

/* GET cuisine admin list page. */
router.get('/', (req, res, next) => {
  Cuisines.getAll((err, cuisines) => {
    res.render('cuisine', {
      page: 'Cuisines',
      sidebarId: '#nav-cuisines',
      data: cuisines,
      session: req.session,
    });
  });
});


router.post('/', (req, res, next) => {
  Cuisines.addNew(req.body, (err, result) => {
    res.send(err || result);
  });
});


router.delete('/:id', (req, res, next) => {
  Cuisines.deleteById(req.params.id, (err, result) => {
    res.send(err || result);
  });
});


router.put('/:id', (req, res, next) => {
  Cuisines.updateById(req.params.id, req.body.cuisine_name, (err, result) => {
    res.send(err || result);
  });
});


module.exports = router;
