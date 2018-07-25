var mysql = require('../bin/dbcon.js');

const express = require('express');
const router = express.Router();


/* GET add recipe page. */
router.get('/', (req, res, next) => {

	mysql.pool.query('SELECT cuisine_id, cuisine_name FROM cuisine', function(err, rows, fields){
		const cuisines = rows;
		mysql.pool.query('SELECT recipe_category_id, recipe_category_name FROM recipe_category', function(err, rows, fields){
			const categories = rows;
			mysql.pool.query('SELECT unit_of_measure_id, unit_of_measure_name FROM unit_of_measure', function(err, rows, fields){
				const units = rows;
				res.render('addRecipe', {
				    page: 'Sumbit a new Recipe',
				    menuId: 'addRecipe',
				    cuisines: cuisines,
				    categories: categories,
				    units: units
			  	});
			});
		});
	});
});

module.exports = router;
