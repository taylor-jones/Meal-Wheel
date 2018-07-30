const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query('SELECT unit_of_measure_id, unit_of_measure_name, unit_of_measure_abbrev FROM unit_of_measure', (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.getById = (id, callback) => {
  db.get().query('SELECT unit_of_measure_id, unit_of_measure_name, unit_of_measure_abbrev FROM unit_of_measure WHERE unit_of_measure_id = ?', id, (err, rows) => {
    if (err) {
      callback(err);
    } else {
      callback(null, rows);
    }
  });
};


exports.deleteById = (id, callback) => {
  db.get().query('DELETE FROM unit_of_measure WHERE unit_of_measure_id = ?', id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.updateById = (id, name, abbrev, callback) => {
  db.get().query(
    `UPDATE unit_of_measure SET unit_of_measure_name = ?,
    unit_of_measure_abbrev = ? WHERE unit_of_measure_id = ?;
    `, [name, abbrev, id], (err, rows) => {
      if (err) return callback(err, null);
      callback(null, rows);
    });
};


exports.addNew = (columns, callback) => {
  db.get().query(`
    INSERT INTO unit_of_measure SET ?`, {
    unit_of_measure_name: columns.unit_of_measure_name,
    unit_of_measure_abbrev: columns.unit_of_measure_abbrev,
  }, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};
