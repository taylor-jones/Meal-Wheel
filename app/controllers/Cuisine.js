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

exports.getCount = (callback) => {
  db.get().query(
    `SELECT COUNT(cuisine_id) AS total_cuisines FROM cuisine;`, (err, rows) => {
      if (err) return callback(err, 0); //only in case it does not work, still can use the first 3 recipes
      else{
        var cuisine_count = rows[0].total_cuisines;
        callback(null, cuisine_count);
      }
  });
};

exports.deleteById = (id, callback) => {
  db.get().query('DELETE FROM cuisine WHERE cuisine_id = ?', id, (err) => {
    if (err) {
      callback(false);
    }
    else {
      callback(true);
    }
  });
};