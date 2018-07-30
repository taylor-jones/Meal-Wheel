const express = require('express');
const router = express.Router();

const RecipeCategories = require('../controllers/RecipeCategory');

/* GET recipe category admin page. */
router.get('/', (req, res, next) => {
  RecipeCategories.getAll((err, recipeCategories) => {
    res.render('recipeCategory', {
      page: 'Recipe Categories',
      menuId: 'recipe-category',
      data: recipeCategories,
      session: req.session,
    });
  });
});


router.post('/', (req, res, next) => {
  RecipeCategories.addNew(req.body, (err, result) => {
    res.send(err || result);
  });
});


router.delete('/:id', (req, res, next) => {
  RecipeCategories.deleteById(req.params.id, (err, result) => {
    res.send(err || result);
  });
});


router.put('/:id', (req, res, next) => {
  RecipeCategories.updateById(req.params.id, req.body.recipe_category_name, (err, result) => {
    res.send(err || result);
  });
});


module.exports = router;
