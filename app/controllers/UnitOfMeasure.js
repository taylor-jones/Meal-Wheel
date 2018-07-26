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
