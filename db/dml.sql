/*
* Meal Wheel DML
* CS340
* Andrew Soback
* Taylor Jones
*/



-- ********************************
-- *  SELECTS
-- ********************************

--
----- Basic SELECT queries to populate lists.
--

-- get a list of all the recipes
SELECT 
  recipe_id, 
  recipe_name 
FROM recipe 
ORDER BY recipe_name;


-- get a list of all the ingredients
SELECT 
  ingredient_id, 
  ingredient_name 
FROM ingredient 
ORDER BY ingredient_name;


-- get a list of all the food groups
SELECT 
  food_group_id,
  food_group_name 
FROM food_group 
ORDER BY food_group_name;  


-- get a list of all the dietary restrictions
SELECT 
  dietary_restriction_id, 
  dietary_restriction_name 
FROM dietary_restriction 
ORDER BY dietary_restriction_name;


-- get a list of all the units of measure
SELECT 
  unit_of_measure_id, 
  unit_of_measure_name 
FROM unit_of_measure 
ORDER BY unit_of_measure_name;


-- get a list of all the cuisines
SELECT 
  cuisine_id, 
  cuisine_name 
FROM cuisine 
ORDER BY cuisine_name;


-- get a list of all the recipe categories
SELECT 
  recipe_category_id, 
  recipe_category_name 
FROM recipe_category 
ORDER BY recipe_category_name;




--
----- SELECT queries to retrieve record totals.
--

-- get the total # of recipes in the database.
SELECT COUNT(recipe_id) AS total_recipes FROM recipe;

-- get the total # of ingredients in the database.
SELECT COUNT(ingredient_id) AS total_ingredients FROM ingredient;

-- get the total # of users in the database.
SELECT COUNT(user_id) AS total_users FROM app_user;





--
----- SELECT queries to retrieve data for individual recipes.
--

-- get the recipe data for a single recipe
SELECT 
  r.recipe_id, 
  r.recipe_name, 
  r.recipe_image, 
  r.recipe_instructions, 
  r.recipe_description, 
  r.user_id, 
  r.recipe_category_id,
  (SELECT COUNT(ri.recipe_id) FROM recipe_ingredient AS ri WHERE ri.recipe_id = r.recipe_id) AS total_ingredients,
  r.created_date
FROM recipe AS r
WHERE r.recipe_id = [selected_recipe_id];


-- get all the recipe-cuisines for a single recipe
SELECT
  c.cuisine_id,
  c.cuisine_name
FROM recipe AS r
  INNER JOIN recipe_cuisine AS rc ON rc.recipe_id = r.recipe_id
  INNER JOIN cuisine AS c ON rc.cuisine_id = c.cuisine_id
WHERE r.recipe_id = [selected_recipe_id];


-- get all the recipe-ingredients for a single recipe
SELECT 
  ri.ingredient_id, 
  i.ingredient_name, 
  ri.amount, 
  u.unit_of_measure_name 
FROM recipe_ingredient AS ri 
  INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id 
  INNER JOIN unit_of_measure AS u ON ri.unit_of_measure_id = u.unit_of_measure_id 
  INNER JOIN ingredient AS i ON ri.ingredient_id = i.ingredient_id 
WHERE ri.recipe_id = [selected_recipe_id] 
ORDER BY ri.amount DESC;





--
----- SELECT queries to retrieve search results
--

-- get all recipes matching a specified text search (based on the ingredient name OR recipe name)
SELECT
  ri.recipe_id,
  r.recipe_name
FROM recipe_ingredient AS ri
  INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id
  INNER JOIN ingredient AS i ON ri.ingredient_id = i.ingredient_id
WHERE ingredient_name LIKE CONCAT('%', [search_input], '%') OR recipe_name LIKE CONCAT('%', [search_input], '%')
GROUP BY r.recipe_id
ORDER BY r.recipe_name;


-- get the total # of resulting ingredients & recipes from a text search (based on the ingredient name OR recipe name)
SELECT 
  COUNT(t.recipe_id) AS total_results
FROM (
  SELECT ri.recipe_id 
  FROM recipe_ingredient AS ri 
    INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id 
    INNER JOIN ingredient AS i ON ri.ingredient_id = i.ingredient_id 
  WHERE ingredient_name LIKE CONCAT('%', [search_input], '%') OR recipe_name LIKE CONCAT('%', [search_input], '%')
  GROUP BY r.recipe_id
) AS t






--
----- SELECT queries to retrieve filter results
--

-- get all recipes that have a specified recipe_category id
SELECT
  r.recipe_id,
  r.recipe_name
FROM recipe AS r
WHERE r.recipe_category_id = [selected_recipe_category_id] OR [selected_recipe_category_id] IS NULL
ORDER BY r.recipe_name;


-- get all recipes that have a specified cuisine id
SELECT 
  rc.recipe_id, 
  r.recipe_name 
FROM recipe_cuisine AS rc
  INNER JOIN recipe AS r ON rc.recipe_id = r.recipe_id 
WHERE rc.cuisine_id = [selected_cuisine_id] OR [selected_cuisine_id] IS NULL
GROUP BY r.recipe_id 
ORDER BY r.recipe_name;


-- get all recipes that match at least one of the cuisines in a list of recipe cuisine ids
SELECT 
  rc.recipe_id, 
  r.recipe_name 
FROM recipe_cuisine AS rc
  INNER JOIN recipe AS r ON rc.recipe_id = r.recipe_id 
WHERE rc.cuisine_id IN ([selected_cuisine_id]) OR [selected_cuisine_id] IS NULL
GROUP BY r.recipe_id 
ORDER BY r.recipe_name;


-- get all recipes that have a specified ingredient id
SELECT 
  ri.recipe_id, 
  r.recipe_name 
FROM recipe_ingredient AS ri 
  INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id 
  INNER JOIN ingredient AS i ON ri.ingredient_id = i.ingredient_id 
WHERE ri.ingredient_id = [selected_ingredient_id] OR [selected_ingredient_id] IS NULL
GROUP BY r.recipe_id 
ORDER BY r.recipe_name;


-- get all the recipes that have at least one of the ingredients in a list of ingredient ids,
--    unless no ingredients are specified, then return all recipes.
SELECT 
  ri.recipe_id, 
  r.recipe_name 
FROM recipe_ingredient AS ri 
  INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id 
  INNER JOIN ingredient AS i ON ri.ingredient_id = i.ingredient_id 
WHERE ri.ingredient_id IN ([selected_ingredient_id_list]) OR [selected_ingredient_id_list] IS NULL
GROUP BY r.recipe_id 
ORDER BY r.recipe_name;





-- 
----- SELECT queries involving ingredients/recipes with dietary restrictions
--

-- get all restricted ingredients for a specified dietary restriction id
SELECT 
  i.ingredient_id, 
  i.ingredient_name 
FROM ingredient AS i 
  INNER JOIN food_group_dietary_restriction AS fd ON i.food_group_id = fd.food_group_id 
  INNER JOIN dietary_restriction AS dr ON fd.dietary_restriction_id = dr.dietary_restriction_id 
WHERE dr.dietary_restriction_id = [selected_dietary_restriction_id]
ORDER BY i.ingredient_name;


-- get all non-restricted ingredients for a specified dietary restriction id
SELECT 
  ingredient_id, 
  ingredient_name 
FROM ingredient 
WHERE ingredient_id NOT IN (
  SELECT i.ingredient_id 
  FROM ingredient AS i 
    INNER JOIN food_group_dietary_restriction AS fd ON i.food_group_id = fd.food_group_id 
    INNER JOIN dietary_restriction AS dr ON fd.dietary_restriction_id = dr.dietary_restriction_id 
  WHERE dr.dietary_restriction_id = [selected_dietary_restriction_id]
) ORDER BY ingredient_name;


-- get all restricted ingredients that are part of at least one of the dietary restrictions in a list of dietary restriction ids
SELECT 
  i.ingredient_id, 
  i.ingredient_name 
FROM ingredient AS i 
  INNER JOIN food_group_dietary_restriction AS fd ON i.food_group_id = fd.food_group_id 
  INNER JOIN dietary_restriction AS dr ON fd.dietary_restriction_id = dr.dietary_restriction_id 
WHERE dr.dietary_restriction_id IN ([dietary_restriction_id_list])
ORDER BY i.ingredient_name;


-- get all inredients that are NOT part of a list of any specified dietary restriction ids
SELECT
  ingredient_id,
  ingredient_name
FROM ingredient
WHERE ingredient_id NOT IN (
  SELECT i.ingredient_id
  FROM ingredient AS i 
    INNER JOIN food_group_dietary_restriction AS fd ON i.food_group_id = fd.food_group_id 
    INNER JOIN dietary_restriction AS dr ON fd.dietary_restriction_id = dr.dietary_restriction_id 
  WHERE dr.dietary_restriction_id IN ([dietary_restriction_id_list])
) ORDER BY ingredient_name;



-- get all restricted recipes for a specified dietary restriction id
SELECT 
  ri.recipe_id, 
  r.recipe_name 
FROM recipe_ingredient AS ri 
  INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id 
  INNER JOIN (
    SELECT i.ingredient_id 
    FROM ingredient AS i 
      INNER JOIN food_group_dietary_restriction AS fd ON i.food_group_id = fd.food_group_id 
      INNER JOIN dietary_restriction AS dr ON fd.dietary_restriction_id = dr.dietary_restriction_id 
    WHERE dr.dietary_restriction_id = [selected_dietary_restriction_id] -- not using OR IS NULL here, so we don't restrict all recipes
  ) AS i ON ri.ingredient_id = i.ingredient_id 
GROUP BY r.recipe_id 
ORDER BY r.recipe_name;


-- get all non-restricted recipes for a specified dietary restriction id
SELECT 
  recipe_id, 
  recipe_name 
FROM recipe 
WHERE recipe_id NOT IN (
  SELECT ri.recipe_id 
  FROM recipe_ingredient AS ri 
    INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id 
    INNER JOIN (
      SELECT i.ingredient_id 
      FROM ingredient AS i 
        INNER JOIN food_group_dietary_restriction AS fd ON i.food_group_id = fd.food_group_id 
        INNER JOIN dietary_restriction AS dr ON fd.dietary_restriction_id = dr.dietary_restriction_id 
      WHERE dr.dietary_restriction_id = [selected_dietary_restriction_id] -- not using OR IS NULL here, so we don't restrict all recipes
    ) AS i ON ri.ingredient_id = i.ingredient_id 
  GROUP BY r.recipe_id 
  ORDER BY r.recipe_name
);


-- get all restrictred recipes based on a list of specified dietary restriction ids
SELECT 
  ri.recipe_id, 
  r.recipe_name 
FROM recipe_ingredient AS ri 
  INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id 
  INNER JOIN (
    SELECT i.ingredient_id 
    FROM ingredient AS i 
      INNER JOIN food_group_dietary_restriction AS fd ON i.food_group_id = fd.food_group_id 
      INNER JOIN dietary_restriction AS dr ON fd.dietary_restriction_id = dr.dietary_restriction_id 
    WHERE dr.dietary_restriction_id IN ([dietary_restriction_id_list])
  ) AS i ON ri.ingredient_id = i.ingredient_id 
GROUP BY r.recipe_id 
ORDER BY r.recipe_name;


-- get all non-restricted recipes based on a list of specified dietary restriction ids
SELECT 
  recipe_id, 
  recipe_name 
FROM recipe 
WHERE recipe_id NOT IN (
  SELECT ri.recipe_id 
  FROM recipe_ingredient AS ri 
    INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id 
    INNER JOIN (
      SELECT i.ingredient_id 
      FROM ingredient AS i 
        INNER JOIN food_group_dietary_restriction AS fd ON i.food_group_id = fd.food_group_id 
        INNER JOIN dietary_restriction AS dr ON fd.dietary_restriction_id = dr.dietary_restriction_id 
      WHERE dr.dietary_restriction_id IN ([dietary_restriction_id_list])
    ) AS i ON ri.ingredient_id = i.ingredient_id 
  GROUP BY r.recipe_id 
  ORDER BY r.recipe_name
);




--
----- SELECT queries to retrieve user-related recipes
--

-- get all 'liked' recipes for a single user
SELECT
  r.recipe_id,
  r.recipe_name
FROM recipe AS r
  INNER JOIN user_significant_recipe AS sr ON sr.recipe_id = r.recipe_id
  INNER JOIN app_user AS u ON u.user_id = [logged_in_user_id]
WHERE sr.recipe_significance_type_id = 1
ORDER BY r.recipe_name;


-- get all 'disliked' recipes for a single user
SELECT
  r.recipe_id,
  r.recipe_name
FROM recipe AS r
  INNER JOIN user_significant_recipe AS sr ON sr.recipe_id = r.recipe_id
  INNER JOIN app_user AS u ON u.user_id = [logged_in_user_id]
WHERE sr.recipe_significance_type_id = 2
ORDER BY r.recipe_name;


-- get all recipes not 'disliked' by a specified user
SELECT
  recipe_id,
  recipe_name
FROM recipe
WHERE recipe_id NOT IN (
  SELECT r.recipe_id
  FROM recipe AS r
    INNER JOIN user_significant_recipe AS sr ON sr.recipe_id = r.recipe_id
    INNER JOIN app_user AS u ON u.user_id = [logged_in_user_id]
  WHERE sr.recipe_significance_type_id = 2
) ORDER BY recipe_name;



-- get the total # of 'liked' recipes for a specified user
SELECT 
  COUNT(recipe_id) AS total_liked_recipes
FROM user_significant_recipe
WHERE recipe_significance_type_id = 1 AND user_id = [logged_in_user_id];


-- get the total # of 'disliked' recipes for a specified user
SELECT 
  COUNT(recipe_id) AS total_liked_recipes
FROM user_significant_recipe
WHERE recipe_significance_type_id = 2 AND user_id = [logged_in_user_id];


-- get all created recipes for a single user
SELECT
  r.recipe_id,
  r.recipe_name
FROM recipe AS r
WHERE r.user_id = [logged_in_user_id]
ORDER BY r.recipe_name;


-- get all recipes not owned by any user
SELECT
  r.recipe_id,
  r.recipe_name
FROM recipe AS r
WHERE r.user_id IS NULL
ORDER BY r.recipe_name;






--
----- SELECT queries to get the 'random' recipe
--


/*  get a 'random' recipe based on the following:
    - any specified required ingredients
    - any specified recipe category
    - any specified dietary restrictions
    - any specified recipe cuisines
    - any 'disliked' recipes as specified by the signed in user
   
   Then, order the results randomly and only get the top record returned,
    which should simulate a 'random' return.

  This query will be used to process the Meal Wheel 'Spin', taking into
    account all allowable options for the returned recipe.
*/

SELECT
  recipe_id, 
  recipe_name, 
  recipe_image, 
  recipe_instructions, 
  recipe_description, 
  user_id, 
  recipe_category_id,
  (SELECT COUNT(ri.recipe_id) FROM recipe_ingredient AS ri WHERE ri.recipe_id = recipe_id) AS total_ingredients
FROM recipe
WHERE

  -- make sure it fits any specified ingredients (if provided).
  recipe_id IN (
    SELECT ri.recipe_id
    FROM recipe_ingredient AS ri
      INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id
      INNER JOIN ingredient AS i ON ri.ingredient_id = i.ingredient_id
    WHERE ri.ingredient_id IN ([required_ingredient_id_list]) OR [required_ingredient_id_list] IS NULL
  ) 
  
  -- make sure it fits the specified recipe category (if provided)
  AND recipe_id IN (
    SELECT r.recipe_id
    FROM recipe AS r
    WHERE r.recipe_category_id = [required_category_id] OR [required_category_id] IS NULL
  ) 

  -- make sure it's NOT restricted BY ANY dietary restrictions (IF provided).
  AND recipe_id IN (
    SELECT recipe_id
    FROM recipe
    WHERE recipe_id NOT IN (
      SELECT ri.recipe_id
        FROM recipe_ingredient AS ri
          INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id
          INNER JOIN (
            SELECT i.ingredient_id
            FROM ingredient AS i
              INNER JOIN food_group_dietary_restriction AS fd ON i.food_group_id = fd.food_group_id
              INNER JOIN dietary_restriction AS dr ON fd.dietary_restriction_id = dr.dietary_restriction_id
            WHERE dr.dietary_restriction_id IN ([dietary_requirement_id_list])
          ) AS i ON ri.ingredient_id = i.ingredient_id
      )
  ) 

  -- make sure it fits any recipe cuisines (if provided)
  AND recipe_id IN (
    SELECT rc.recipe_id
    FROM recipe_cuisine AS rc
      INNER JOIN recipe AS r ON rc.recipe_id = r.recipe_id
    WHERE rc.cuisine_id IN ([required_cuisine_id_list]) OR [required_cuisine_id_list] IS NULL
  ) 

  -- make sure its not 'disliked' by a signed in user (if user is signed in)
  AND recipe_id NOT IN (
    SELECT r.recipe_id
    FROM recipe AS r
      INNER JOIN user_significant_recipe AS sr ON sr.recipe_id = r.recipe_id
      INNER JOIN app_user AS u ON u.user_id = [logged_in_user_id]
    WHERE sr.recipe_significance_type_id = 2
  )


GROUP BY recipe_id
ORDER BY RAND()
LIMIT 1;





-- ********************************
-- *  INSERTS
-- ********************************

-- add a new user
INSERT INTO app_user (user_name, user_email, user_password)
VALUES ([user_name_input], [user_email_input], [user_password_input]);


-- add a new cuisine
INSERT INTO cuisine (cuisine_name)
VALUES [cuisine_input];


-- add a new dietary restriction
INSERT INTO dietary_restriction (dietary_restriction_name)
VALUES [dietary_restriction_input];


-- add a new food group
INSERT INTO food_group (food_group_name)
VALUES [food_group_input];


-- add a new food group-dietary restriction
INSERT INTO food_group_dietary_restriction(food_group_id, dietary_restriction_id)
VALUES ([food_group_id_input], [dietary_restriction_id_input]);


-- add a new ingredient
INSERT INTO ingredient (ingredient_name, food_group_id)
VALUES ([ingredient_name_input], [food_group_id_input]);


-- add a new recipe
INSERT INTO recipe (recipe_name, recipe_image, recipe_instructions, recipe_description, user_id, recipe_category_id)
VALUES ([recipe_name_input], [recipe_image_input], [recipe_instructions_input], [recipe_description_input], [user_id_input], [recipe_category_input]);


-- add a new recipe category
INSERT INTO recipe_category (recipe_category_name)
VALUES [recipe_category_input];


-- add a new recipe cuisine
INSERT INTO recipe_cuisine(recipe_id, cuisine_id)
VALUES ([recipe_id_input], [cuisine_id_input]);


-- add a new recipe-ingredient
INSERT INTO recipe_ingredient(recipe_id, ingredient_id, amount, unit_of_measure_id)
VALUES ([recipe_id_input], [ingredient_id_input]);


-- add a new recipe significance type
INSERT INTO recipe_significance_type (recipe_significance_type_name)
VALUES [recipe_significance_type_input];


-- add a new unit of measure
INSERT INTO unit_of_measure (unit_of_measure_name, unit_of_measure_abbrev)
VALUES ([unit_of_measure_name_input], [unit_of_measure_abbrev_input]);


-- add user-recipe significance
INSERT INTO user_significant_recipe (user_id, recipe_id, recipe_significance_type_id)
VALUES ([user_id_input], [recipe_id_input], [recipe_significant_type_id_input]);






-- ********************************
-- *  UPDATES
-- ********************************

-- update a recipe record based on submission of the 'Update Recipe' form
UPDATE recipe SET
  recipe_name = [recipe_name_input],
  recipe_image = [recipe_image_input],
  recipe_instructions = [recipe_instructions_input],
  recipe_description = [recipe_description_input],
  user_id = [user_id_input],
  recipe_category_id = [recipe_category_input]
WHERE recipe_id = [recipe_id_from_update_form];


-- update a recipe-cuisine record based on submission of the 'Update Recipe' form
UPDATE recipe_cuisine SET
  recipe_id = [recipe_id_input],
  cuisine_id = [cuisine_id_input]
WHERE recipe_id = [recipe_id_from_update_form] 
AND cuisine_id = [cuisine_id_from_update_form];


-- update a recipe-ingredient record based on submission of the 'Update Recipe' form
UPDATE recipe_ingredient SET
  recipe_id = [recipe_id_input],
  ingredient_id = [ingredient_id_input],
  amount = [amount_input],
  unit_of_measure_id = [unit_of_measure_id_input]
WHERE recipe_id = [recipe_id_from_update_form] 
AND ingredient_id = [ingredient_id_from_update_form];


-- update a user's data based on submission of the 'Update User' form
UPDATE app_user SET
  user_name = [user_name_input],
  user_email = [user_email_input],
  user_password = [user_password_input]
WHERE user_id = [user_id_from_update_form];


-- update a user significant recipe record.
UPDATE user_significant_recipe SET
  user_id = [user_id_input],
  recipe_id = [recipe_id_input],
  recipe_significance_type_id = [recipe_significance_type_id_input]
WHERE user_id = [logged_in_user_id] 
AND recipe_id = [selected_recipe_id];


-- update a recipe to remove the 'owner', making it a community recipe
UPDATE recipe SET
  user_id = NULL
WHERE recipe_id = [selected_recipe_id];







-- ********************************
-- *  DELETES
-- ********************************

-- delete a recipe
DELETE FROM recipe 
WHERE recipe_id = [selected_recipe_id];


-- delete a recipe-ingredient
DELETE FROM recipe_ingredient 
WHERE recipe_id = [selected_recipe_id]
AND ingredient_id = [selected_ingredient_id];


-- delete a recipe cuisine
DELETE FROM recipe_cuisine 
WHERE recipe_id = [selected_recipe_id]
AND cuisine_id = [selected_cuisine_id];


-- delete a user 
DELETE FROM app_user
WHERE user_id = [logged_in_user_id];


-- delete a user's significant recipe
DELETE FROM user_significant_recipe
WHERE user_id = [logged_in_user_id] 
AND recipe_id = [selected_recipe_id];