const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query('SELECT recipe_significance_type_id, recipe_significance_type_name FROM recipe_significance_type', (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

exports.getById = (id, callback) => {
  db.get().query('SELECT recipe_significance_type_id, recipe_significance_type_name FROM recipe_significance_type WHERE recipe_significance_type_id = ?', id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};
