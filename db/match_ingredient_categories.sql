/*******************************************************************************
  Finds the ingredient_category_id associated with each ingredient by parsing 
  the ingredient_name and finding the matching ingredient_category_name from 
  ingredient_category. It then updates each record in the ingredient table to 
  have the value of the associated ingredient_category_id.
*********************************************************************************/
UPDATE
  ingredient
  INNER JOIN (
    SELECT
      ingredient_id,
      ingredient_category_id
    FROM
      (
        SELECT
          i.ingredient_id,
          ic.ingredient_category_id
        FROM
          (
            SELECT
              ingredient_id,
              RTRIM(
                REPLACE(
                  SUBSTRING_INDEX(
                    REPLACE(
                      ingredient_name,
                      SUBSTRING(
                        ingredient_name,
                        LOCATE('(', ingredient_name),
                        LENGTH(ingredient_name) - LOCATE(')', REVERSE(ingredient_name)) - LOCATE('(', ingredient_name) + 2
                      ),
                      ''
                    ),
                    ',',
                    1
                  ),
                  '  ',
                  ' '
                )
              ) AS category_name
            FROM
              ingredient
          ) AS i
          INNER JOIN ingredient_category AS ic ON i.category_name = ic.ingredient_category_name
      ) AS m
  ) AS n ON ingredient.ingredient_id = n.ingredient_id
SET
  ingredient.ingredient_category_id = n.ingredient_category_id;