const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query('SELECT cuisine_id, cuisine_name FROM cuisine', (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, rows);
  });
};


exports.getById = (id, callback) => {
  db.get().query('SELECT cuisine_id, cuisine_name FROM cuisine WHERE cuisine_id = ?', id, (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, rows);
  });
};


exports.deleteById = (id, callback) => {
  db.get().query('DELETE FROM cuisine WHERE cuisine_id = ?', id, (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, rows);
  });
};


exports.updateById = (id, name, callback) => {
  db.get().query(
    `UPDATE cuisine SET cuisine_name = ?
    WHERE cuisine_id = ?;
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
    INSERT INTO cuisine SET ?`, { cuisine_name: columns.cuisine_name }, (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, rows);
  });
};
