const express = require('express');
const router = express.Router();
const helpers = require('../helpers');

const Cuisines = require('../controllers/Cuisine');
const Categories = require('../controllers/RecipeCategory');
const Diets = require('../controllers/DietaryRestriction');
const FoodGroups = require('../controllers/FoodGroup');
const Ingredients = require('../controllers/Ingredient');
const Recipes = require('../controllers/Recipe');
const UnitsOfMeasure = require('../controllers/UnitOfMeasure');
const Users = require('../controllers/User');



/* *************************************
 * GET
 * *************************************/

/* GET add recipe page. */
router.get('/add', (req, res, next) => {
  FoodGroups.getAll((err, foodGroups) => {
    Categories.getAll((err, categories) => {
      Cuisines.getAll((err, cuisines) => {
        UnitsOfMeasure.getAll((err, units) => {
          Ingredients.getAll((err, ingredients) => {
            res.render('addRecipe', {
              page: 'Add Recipe',
              menuClass: '.nav-add-recipe',
              cuisines: cuisines,
              categories: categories,
              ingredients: ingredients,
              units: units,
              foodGroups: foodGroups,
              session: req.session,
              recipe: null,
            });
          });
        });
      });
    });
  });
});



/* GET the edit recipe page */
router.get('/:id/edit', (req, res, next) => {
  FoodGroups.getAll((err, foodGroups) => {
    Categories.getAll((err, categories) => {
      Cuisines.getAll((err, cuisines) => {
        UnitsOfMeasure.getAll((err, units) => {
          Ingredients.getAll((err, ingredients) => {
            Recipes.getById(req.params.id, (err, recipe) => {
              res.render('addRecipe', {
                page: 'Edit Recipe',
                menuClass: '.nav-browse',
                cuisines: cuisines,
                categories: categories,
                ingredients: ingredients,
                units: units,
                foodGroups: foodGroups,
                session: req.session,
                recipe: recipe[0],
              });
            });
          });
        });
      });
    });
  });
});




/* GET an individual recipe page. */
router.get('/:id', (req, res, next) => {
  Recipes.getById(req.params.id, (err, recipe) => {
    recipe[0].ingredients.forEach((ingredient) => {
      ingredient.unit_of_measure_name = helpers.pluralize(ingredient.unit_of_measure_name);
    });

    res.render('singleRecipe', {
      page: recipe.recipe_name,
      menuClass: '.nav-browse',
      recipe: recipe[0],
    });
  });
});




/* GET browse recipes page. */
router.get('/', (req, res, next) => {
  let userId = 0;

  Categories.getAll((err, categories) => {
    Cuisines.getAll((err, cuisines) => {
      Diets.getAll((err, diets) => {
        Recipes.getAll((err, recipes) => {
          // replace the default user (0) with the session
          //  user, if one exists.
          if (req.session && req.session.user) {
            userId = req.session.user.user_id;
          }

          Users.getById(userId, (err, user) => {
            const context = {
              page: 'Browse',
              menuClass: '.nav-browse',
              cuisines: cuisines,
              categories: categories,
              diets: diets,
              recipes: recipes,
              session: req.session,
              likedRecipes: [],
              dislikedRecipes: [],
            };

            // if a session user was found, replace the empty liked/disliked
            //  recipe arrays with the user's own significant recupe ids.
            if (user[0]) {
              context.likedRecipes = helpers.mapObjectKey(user[0].likedRecipes, 'recipe_id') || context.likedRecipes;
              context.dislikedRecipes = helpers.mapObjectKey(user[0].dislikedRecipes, 'recipe_id') || context.dislikedRecipes;
            }

            res.render('browse', context);
          });
        });
      });
    });
  });
});




/* *************************************
 * POST
 * *************************************/

 /* Create a new recipe record, */
router.post('/', (req, res, next) => {
  const recipe = helpers.sanitizeJSON(req.body);

  // give the new recipe to the signed in user, if one exists.
  if (req.session && req.session.user) {
    recipe.user_id = req.session.user.user_id;
  }

  // create the new recipe
  Recipes.addNew(recipe, (err, newRecipe) => {
    recipe.recipe_id = newRecipe.insertId;

    // create any necessary ingredients
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredient.ingredient_id) {
        Ingredients.addNew({
          ingredient_name: ingredient.ingredient_name,
          food_group_id: ingredient.food_group_id,
        }, (err, newIngredient) => {
          if (err) {
            next(err);
          }

          if (newIngredient) {
            // create the recipe-ingredient record(s).
            Recipes.addIngredient({
              recipe_id: recipe.recipe_id,
              ingredient_id: newIngredient.insertId,
              amount: ingredient.amount,
              unit_of_measure_id: ingredient.unit_of_measure_id,
            }, (err, result) => {
              if (err) {
                next(err);
              }

            });
          }
        });

      } else {
        // create the recipe-ingredient record(s).
        Recipes.addIngredient({
          recipe_id: recipe.recipe_id,
          ingredient_id: ingredient.ingredient_id,
          amount: ingredient.amount,
          unit_of_measure_id: ingredient.unit_of_measure_id,
        }, (err, result) => {
          if (err) {
            next(err);
          }
        });
      }
    });

    // create recipe-cuisine record(s).
    recipe.cuisines.forEach((cuisine) => {
      Recipes.addCuisine({
        recipe_id: recipe.recipe_id,
        cuisine_id: cuisine,
      }, (err, result) => {
        if (err) {
          next(err);
        }
      });
    });

    res.send(
      `<strong>Success!</strong> The recipe was successfully created.
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>`
    );
  });
});




/* *************************************
 * PUT
 * *************************************/

/* Update an existing recipce, */
router.put('/', (req, res, next) => {
  const recipe = helpers.sanitizeJSON(req.body);

  // update the recipe
  Recipes.updateById(recipe.recipe_id, recipe, (err, updated) => {
    Recipes.removeIngredientsAll(recipe.recipe_id, (err, ingredientsRemoved) => {
      Recipes.removeCuisinesAll(recipe.recipe_id, (err, cuisinesRemoved) => {

        // create any necessary ingredients
        recipe.ingredients.forEach((ingredient) => {
          if (!ingredient.ingredient_id) {
            Ingredients.addNew({
              ingredient_name: ingredient.ingredient_name,
              food_group_id: ingredient.food_group_id,
            }, (err, newIngredient) => {
              if (err) next(err);
              if (newIngredient) {
                // create the recipe-ingredient record(s).
                Recipes.addIngredient({
                  recipe_id: recipe.recipe_id,
                  ingredient_id: newIngredient.insertId,
                  amount: ingredient.amount,
                  unit_of_measure_id: ingredient.unit_of_measure_id,
                }, (err, result) => {
                  if (err) next(err);
                });
              }
            });

          } else {
            // create the recipe-ingredient record(s).
            Recipes.addIngredient({
              recipe_id: recipe.recipe_id,
              ingredient_id: ingredient.ingredient_id,
              amount: ingredient.amount,
              unit_of_measure_id: ingredient.unit_of_measure_id,
            }, (err, result) => {
              if (err) next(err);
            });
          }
        });

        // create recipe-cuisine record(s).
        recipe.cuisines.forEach((cuisine) => {
          Recipes.addCuisine({
            recipe_id: recipe.recipe_id,
            cuisine_id: cuisine,
          }, (err, result) => {
            if (err) next(err);
          });
        });
      });
    });


    res.send(
      `<strong>Success!</strong> The recipe was successfully updated.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
       </button>`
    );
  });
});



module.exports = router;
