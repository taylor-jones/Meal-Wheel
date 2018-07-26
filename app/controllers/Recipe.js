const db = require('../bin/dbcon');


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
    callback(null, rows);
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
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};
