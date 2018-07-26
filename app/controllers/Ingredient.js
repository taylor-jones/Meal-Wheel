const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query(`
  SELECT 
    i.ingredient_id, 
    i.ingredient_name, 
    fg.food_group_id,
    fg.food_group_name
  FROM ingredient As i
    INNER JOIN food_group AS fg
    ON i.food_group_id = fg.food_group_id;`, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

exports.getById = (id, callback) => {
  db.get().query(`
    SELECT
    i.ingredient_id,
      i.ingredient_name,
      fg.food_group_id,
      fg.food_group_name
    FROM ingredient As i
    INNER JOIN food_group AS fg
      ON i.food_group_id = fg.food_group_id
    WHERE i.ingredient_id = ?
  `, id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};
