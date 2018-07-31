const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query(`
    SELECT 
      user_id,
      user_name,
      user_email,
      user_password 
    FROM app_user`, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.getById = (id, callback) => {
  db.get().query(`
    SELECT 
      user_id, 
      user_name, 
      user_email, 
      user_password 
    FROM app_user 
    WHERE user_id = ?;`,
    id, (err, rows) => {
    if (err) return callback(err);

    if (rows.length > 0) {
      let pending = rows.length;

      for (let i in rows) {
        const row = rows[i];

        this.getLikedRecipeIds(row.user_id, (err, likedRecipes) => {
          this.getDislikedRecipeIds(row.user_id, (err, dislikedRecipes) => {
            row.likedRecipes = likedRecipes;
            row.dislikedRecipes = dislikedRecipes;

            if (0 === --pending) {
              callback(null, rows);
            }
          });
        });
      }
    } else {
      callback(null, rows);
    }
  });
};


exports.deleteById = (id, callback) => {
  db.get().query(`
    DELETE FROM app_user 
    WHERE user_id = ?`, id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.updateById = (context, callback) => {
  db.get().query(`
    UPDATE app_user SET ?`, {
    user_name: context.user_name,
    user_email: context.user_email,
    user_password: context.user_password,
  }, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.addNew = (context, callback) => {
  db.get().query(`
    INSERT INTO app_user SET ?`, {
    user_name: context.user_name,
    user_email: context.user_email,
    user_password: context.user_password,
  }, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};



exports.getLikedRecipeIds = (id, callback) => {
  db.get().query(`
  SELECT recipe_id
  FROM user_significant_recipe AS sr
  WHERE sr.user_id = ?
  AND sr.recipe_significance_type_id = (
    SELECT recipe_significance_type_id FROM recipe_significance_type WHERE recipe_significance_type_name = "liked"
  )
  ORDER BY recipe_id;
  `, id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.getDislikedRecipeIds = (id, callback) => {
  db.get().query(`
  SELECT recipe_id
  FROM user_significant_recipe AS sr
  WHERE sr.user_id = ?
    AND sr.recipe_significance_type_id = (
      SELECT recipe_significance_type_id FROM recipe_significance_type WHERE recipe_significance_type_name = "disliked"
    )
  ORDER BY recipe_id;
  `, id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.getByCredentials = (context, callback) => {
  db.get().query(`
  SELECT 
    user_id,
    user_name,
    user_email
  FROM app_user
  WHERE user_password = ?
  AND (user_name = ? OR user_email = ?);`, [
    context.user_password,
    context.user_name,
    context.user_email,
  ], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.addRecipeSignificance = (context, callback) => {
  console.log(context);

  db.get().query(`
    INSERT INTO user_significant_recipe SET ?`, {
    user_id: context.user_id,
    recipe_id: context.recipe_id,
    recipe_significance_type_id: context.recipe_significance_type_id,
  }, (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};


exports.removeRecipeSignificance = (context, callback) => {
  db.get().query(`
    DELETE FROM user_significant_recipe 
    WHERE user_id = ? 
    AND recipe_id = ?
    AND recipe_significance_type_id = ?`, [
    context.user_id,
    context.recipe_id,
    context.recipe_significance_type_id,
  ], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};
