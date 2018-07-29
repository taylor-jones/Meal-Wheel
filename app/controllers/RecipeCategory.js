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
