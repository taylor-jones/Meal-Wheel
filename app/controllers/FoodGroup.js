const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query('SELECT food_group_id, food_group_name FROM food_group', (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

exports.getById = (id, callback) => {
  db.get().query('SELECT food_group_id, food_group_name FROM food_group WHERE food_group_id = ?', id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};
