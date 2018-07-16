/*
* Meal Wheel DML
* CS340
* Andrew Soback
* Taylor Jones
*/

-- Your submission should contain ALL the queries required to implement ALL the
-- functionalities listed in the Project Specs.


-- It should be possible to add entries to every table individually.
-- Every table should be used in at least one select query.
-- Your website needs to have the ability to search using text or filter using a dynamically populated list of properties to filter on.This search / filter functionality should be present for at least one entity.

-- You need to include one delete function in your website, for any of the entities.
-- You need to include one update function in your website, for any of the entities.
-- It should be possible to add and remove things from at least one many - to - many relationship.
-- It should be possible to add things to all relationships.


-------------------------------------------------------------------


-----------------------------------
-- SELECT
-----------------------------------

-- get a list of all the recipe names
SELECT recipe_id, recipe_name FROM recipe ORDER BY recipe_name;

-- get a list of all the ingredient names
SELECT ingredient_id, ingredient_name FROM ingredient ORDER BY ingredient_name;

-- get a list of all the food group names
SELECT food_group_id, food_group_name FROM food_group ORDER BY food_group_name;

-- get a list of all the dietary restriction names
SELECT dietary_restriction_id, dietary_restriction_name FROM dietary_restriction ORDER BY dietary_restriction_name;

-- get a list of all the unit of measure names
SELECT unit_id, unit_name FROM unit_of_measure ORDER BY unit_name;

-- get a list of all the cuisine names
SELECT cuisine_id, cuisine_name FROM cuisine ORDER BY cuisine_name;

-- get a list of all the recipe category names
SELECT recipe_category_id, recipe_category_name FROM recipe_category ORDER BY recipe_category_name;




-- get all the recipe data for a single recipe

-- get all the recipe-ingredient data for a single recipe
SELECT
  ri.recipe_id,
  ri.ingredient_id,
  r.recipe_name,
  i.ingredient_name,
  ri.amount,
  u.unit_of_measure_name
FROM
  recipe_ingredient AS ri
  INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id
  INNER JOIN unit_of_measure AS u ON ri.unit_of_measure_id = u.unit_of_measure_id
  INNER JOIN ingredient AS i ON ri.ingredient_id = i.ingredient_id
WHERE
  ri.recipe_id = [user_selected_recipe_id]
ORDER BY
  ri.amount DESC;


-- get all recipes matching a specified text search

-- get all restricted ingredients for a specified dietary restriction

-- get all restricted recipes for a specified dietary restriction

-- get all non-restricted ingredients for a specified dietary restriction

-- get all non-restricted recipes for a specified dietary restriction





-- get all 'liked' recipes for a single user

-- get all 'disliked' recipes for a single user

-- get all created recipes for a single user

-- get a 'random' recipe based on the user's significant recipes and the user options on the 'Recipe Options' form






-----------------------------------
-- INSERT
-----------------------------------

-- add a new ingredient

-- add a new food group

-- add a new food group-dietary restriction

-- add a new dietary restriction

-- add a new recipe-ingredient

-- add a new recipe

-- add a new unit of measure

-- add a new user

-- add user-recipe significance

-- add a new recipe significance type

-- add a new recipe category

-- add a new cuisine





-----------------------------------
-- UPDATE
-----------------------------------

-- update a recipe's data based on submission of the 'Update Recipe' form

-- update a user's data based on submission of the 'Update User' form

-- update a user's significant recipe




-----------------------------------
-- DELETE
-----------------------------------

-- delete a recipe

-- delete a user

-- delete a user's significant recipe