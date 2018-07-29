const db = require('../bin/dbcon');

exports.getCount = (callback) => {
  db.get().query(
    `SELECT COUNT(recipe_id) AS total_recipes FROM recipe;`, (err, rows) => {
      if (err) return callback(err, 3); //only in case it does not work, still can use the first 3 recipes
      else{
        var recipe_count = rows[0].total_recipes;
        callback(null, recipe_count);
      }
  });
}

exports.getAll = (callback) => {
  db.get().query(`
  SELECT 
    r.recipe_id, 
    r.recipe_name, 
    r.recipe_image_url, 
    r.recipe_instructions, 
    r.recipe_description, 
    r.user_id, 
    r.recipe_category_id,
    (SELECT COUNT(ri.recipe_id) FROM recipe_ingredient AS ri WHERE ri.recipe_id = r.recipe_id) AS total_ingredients,
    r.created_date
  FROM recipe AS r;`, (err, rows) => {
    if (err) return callback(err, null);

    let pending = rows.length;

    for (let i in rows) {
      const row = rows[i];

      this.getIngredients(row.recipe_id, (err, ingredients) => {
        this.getCuisines(row.recipe_id, (err, cuisines) => {
          this.getDietaryRestrictions(row.recipe_id, (err, restrictedDiets) => {
            row.ingredients = ingredients;
            row.cuisines = cuisines;
            row.restrictedDiets = restrictedDiets;
            // this blocks the funciton from returning until
            //  after all the recipes have been processed.
            if (0 === --pending) {
              callback(null, rows);
            }
          });
        });
      });
    }
  });
};


exports.getById = (id, callback) => {
  db.get().query(`
  SELECT
    r.recipe_id,
    r.recipe_name,
    r.recipe_image_url,
    r.recipe_instructions,
    r.recipe_description,
    r.user_id,
    r.recipe_category_id,
    (SELECT COUNT(ri.recipe_id) FROM recipe_ingredient AS ri WHERE ri.recipe_id = r.recipe_id) AS total_ingredients,
    r.created_date
  FROM recipe AS r
  WHERE r.recipe_id = ?;
  `, id, (err, rows) => {
    if (err) return callback(err);

    let pending = rows.length;

    for (let i in rows) {
      const row = rows[i];

      this.getIngredients(row.recipe_id, (err, ingredients) => {
        this.getCuisines(row.recipe_id, (err, cuisines) => {
          this.getDietaryRestrictions(row.recipe_id, (err, restrictedDiets) => {
            row.ingredients = ingredients;
            row.cuisines = cuisines;
            row.restrictedDiets = restrictedDiets;
            // this blocks the funciton from returning until
            //  after all the recipes information has been gathered
            if (0 === --pending) {
              callback(null, rows);
            }
          });
        });
      });
    }
  });
};


exports.getIngredients = (id, callback) => {
  db.get().query(`
    SELECT
      ri.ingredient_id,
      i.ingredient_name,
      ri.amount,
      u.unit_of_measure_name
    FROM recipe_ingredient AS ri
      INNER JOIN recipe AS r ON ri.recipe_id = r.recipe_id
      INNER JOIN unit_of_measure AS u ON ri.unit_of_measure_id = u.unit_of_measure_id
      INNER JOIN ingredient AS i ON ri.ingredient_id = i.ingredient_id
    WHERE ri.recipe_id = ?
    ORDER BY ri.amount DESC;
  `, id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};


exports.getDietaryRestrictions = (id, callback) => {
  db.get().query(`
    SELECT DISTINCT
      d.dietary_restriction_id,
      d.dietary_restriction_name
    FROM dietary_restriction AS d
    INNER JOIN food_group_dietary_restriction AS fd ON d.dietary_restriction_id = fd.dietary_restriction_id
    INNER JOIN ingredient AS i ON i.food_group_id = fd.food_group_id
    WHERE i.ingredient_id IN(
      SELECT ri.ingredient_id FROM recipe_ingredient AS ri WHERE ri.recipe_id = ?)
    ORDER BY d.dietary_restriction_name;
  `, id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};


exports.getCuisines = (id, callback) => {
  db.get().query(`
    SELECT
      c.cuisine_id,
      c.cuisine_name
    FROM recipe AS r
      INNER JOIN recipe_cuisine AS rc ON rc.recipe_id = r.recipe_id
      INNER JOIN cuisine AS c ON rc.cuisine_id = c.cuisine_id
    WHERE r.recipe_id = ?;
  `, id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};
