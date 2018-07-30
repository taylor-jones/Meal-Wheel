const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query('SELECT recipe_category_id, recipe_category_name FROM recipe_category', (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.getById = (id, callback) => {
  db.get().query('SELECT recipe_category_id, recipe_category_name FROM recipe_category WHERE recipe_category_id = ?', id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};


exports.deleteById = (id, callback) => {
  db.get().query('DELETE FROM recipe_category WHERE recipe_category_id = ?', id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.updateById = (id, name, callback) => {
  db.get().query(
    `UPDATE recipe_category SET recipe_category_name = ?
    WHERE recipe_category_id = ?;
    `, [name, id], (err, rows) => {
      if (err) return callback(err, null);
      callback(null, rows);
    });
};


exports.addNew = (columns, callback) => {
  db.get().query(`
    INSERT INTO recipe_category SET ?`, {
    recipe_category_name: columns.recipe_category_name,
  }, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};
