const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query(`
    SELECT 
      recipe_significance_type_id, 
      recipe_significance_type_name 
    FROM recipe_significance_type`, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.getById = (id, callback) => {
  db.get().query(`
    SELECT 
      recipe_significance_type_id, 
      recipe_significance_type_name 
    FROM recipe_significance_type 
    WHERE recipe_significance_type_id = ?`, id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.getByName = (name, callback) => {
  db.get().query(`
    SELECT 
      recipe_significance_type_id, 
      recipe_significance_type_name 
    FROM recipe_significance_type 
    WHERE recipe_significance_type_name = ?`, name, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.deleteById = (id, callback) => {
  db.get().query(`
  DELETE FROM recipe_significance_type
  WHERE recipe_significance_type_id = ?`, id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.updateById = (id, name, callback) => {
  db.get().query(`
    UPDATE recipe_significance_type 
    SET recipe_significance_type_name = ?
    WHERE recipe_significance_type_id = ?;`, [name, id], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.addNew = (columns, callback) => {
  db.get().query(`
    INSERT INTO recipe_significance_type SET ?`, {
    recipe_significance_type_name: columns.recipe_significance_type_name,
  }, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};
