const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query('SELECT dietary_restriction_id, dietary_restriction_name FROM dietary_restriction', (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

exports.getById = (id, callback) => {
  db.get().query('SELECT dietary_restriction_id, dietary_restriction_name FROM dietary_restriction WHERE dietary_restriction_id = ?', id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};
