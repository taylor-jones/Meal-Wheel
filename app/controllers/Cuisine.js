const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query('SELECT cuisine_id, cuisine_name FROM cuisine', (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

exports.getById = (id, callback) => {
  db.get().query('SELECT cuisine_id, cuisine_name FROM cuisine WHERE cuisine_id = ?', id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};

exports.deleteById = (id, callback) => {
  db.get().query('DELETE FROM cuisine WHERE cuisine_id = ?', id, (err) => {
    if (err) return callback(err, null);
    callback(null, true);
  });
};