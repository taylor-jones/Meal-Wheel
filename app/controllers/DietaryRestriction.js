const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query('SELECT dietary_restriction_id, dietary_restriction_name FROM dietary_restriction', (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }

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

exports.deleteById = (id, callback) => {
  db.get().query('DELETE FROM dietary_restriction WHERE dietary_restriction_id = ?', id, (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, rows);
  });
};


exports.updateById = (id, name, callback) => {
  db.get().query(
    `UPDATE dietary_restriction SET dietary_restriction_name = ?
    WHERE dietary_restriction_id = ?;
    `, [name, id], (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, rows);
    });
};


exports.addNew = (columns, callback) => {
  db.get().query(`
    INSERT INTO dietary_restriction SET ?`, {
    dietary_restriction_name: columns.dietary_restriction_name,
  }, (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, rows);
  });
};
