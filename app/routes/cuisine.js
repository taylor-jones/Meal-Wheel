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
	else if(req.body.taskId == 'delete'){
		console.log("delete button test successful. Cuisine id:");
		console.log(req.body.deleteId);
		Cuisines.deleteById(req.body.deleteId);
		
	}
});

module.exports = router;
