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

exports.deleteById = (id, callback) => {
  db.get().query('DELETE FROM food_group WHERE food_group_id = ?', id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.updateById = (id, name, callback) => {
  db.get().query(
    `UPDATE food_group SET food_group_name = ?
    WHERE food_group_id = ?;
    `, [name, id], (err, rows) => {
      if (err) return callback(err, null);
      callback(null, rows);
    });
};


exports.addNew = (columns, callback) => {
  db.get().query(`
    INSERT INTO food_group SET ?`, {
    food_group_name: columns.food_group_name,
  }, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};
