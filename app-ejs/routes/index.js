var mysql = require('../bin/dbcon.js');

const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
	mysql.pool.query('SELECT cuisine_name FROM cuisine', function(err, rows, fields){
				const cuisines = rows;
				mysql.pool.query('SELECT recipe_category_name FROM recipe_category', function(err, rows, fields){
					const categories = rows;
					mysql.pool.query('SELECT dietary_restriction_name FROM dietary_restriction', function(err, rows, fields){
						const diets = rows;
						res.render('index', {
						    page: 'Home',
						    menuId: 'home',
						    cuisines: cuisines,
						    categories: categories,
						    diets: diets,
					  	});
					});
				});
			});
  
});

module.exports = router;
