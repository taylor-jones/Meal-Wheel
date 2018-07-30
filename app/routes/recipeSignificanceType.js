const express = require('express');
const router = express.Router();

const RecipeSignificanceTypes = require('../controllers/RecipeSignificanceType');

/* GET recipe significance type admin page. */
router.get('/', (req, res, next) => {
  RecipeSignificanceTypes.getAll((err, recipeSignificanceTypes) => {
    res.render('recipeSignificanceType', {
      page: 'Recipe Significance Types',
      menuId: 'recipe-significance-type',
      data: recipeSignificanceTypes,
      session: req.session,
    });
  });
});


router.post('/', (req, res, next) => {
  RecipeSignificanceTypes.addNew(req.body, (err, result) => {
    res.send(err || result);
  });
});


router.delete('/:id', (req, res, next) => {
  RecipeSignificanceTypes.deleteById(req.params.id, (err, result) => {
    res.send(err || result);
  });
});


router.put('/:id', (req, res, next) => {
  RecipeSignificanceTypes.updateById(req.params.id, req.body.recipe_significance_type_name, (err, result) => {
    res.send(err || result);
  });
});


module.exports = router;
