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
	if (req.body.taskId == 'getCount'){
		Cuisines.getAll((err, cuisines) => {
	    res.send(JSON.stringify(cuisines));
  	}); 
	}
});

router.delete('/', (req, res, next) => {
	Cuisines.deleteById((err, result) => {
		if (!err) {
			console.log('record deleted');
			this.get('/', (req, res, next));
		}
	});
});


module.exports = router;
