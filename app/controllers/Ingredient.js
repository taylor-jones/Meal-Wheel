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
    ON i.food_group_id = fg.food_group_id
  ORDER BY i.ingredient_name;`, (err, rows) => {
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


exports.deleteById = (id, callback) => {
  db.get().query('DELETE FROM ingredient WHERE ingredient_id = ?', id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.updateById = (id, columns, callback) => {
  db.get().query(
    `UPDATE ingredient SET ? WHERE ingredient_id = ?;`, [{
      ingredient_name: columns.ingredient_name,
      food_group_id: columns.food_group_id,
    }, id], (err, rows) => {
      if (err) return callback(err, null);
      callback(null, rows);
    });
};


exports.addNew = (columns, callback) => {
  db.get().query(`
    INSERT INTO ingredient SET ?`, {
    ingredient_name: columns.ingredient_name,
    food_group_id: columns.food_group_id,
  }, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};
