const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query('SELECT ingredient_id, ingredient_name, food_group_id FROM ingredient', (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

exports.getById = (id, callback) => {
  db.get().query('SELECT ingredient_id, ingredient_name, food_group_id FROM ingredient WHERE ingredient_id = ?', id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};
