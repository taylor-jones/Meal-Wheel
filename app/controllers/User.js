const db = require('../bin/dbcon');


exports.getAll = (callback) => {
  db.get().query(`
    SELECT 
      user_id,
      user_name,
      user_email,
      user_password 
    FROM app_user`, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.getById = (id, callback) => {
  db.get().query(`
    SELECT 
      user_id, 
      user_name, 
      user_email, 
      user_password 
    FROM app_user 
    WHERE user_id = ?`, id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.deleteById = (id, callback) => {
  db.get().query(`
    DELETE FROM app_user 
    WHERE user_id = ?`, id, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.updateById = (context, callback) => {
  db.get().query(`
    UPDATE app_user SET ?`, {
    user_name: context.user_name,
    user_email: context.user_email,
    user_password: context.user_password,
  }, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.addNew = (context, callback) => {
  db.get().query(`
    INSERT INTO app_user SET ?`, {
    user_name: context.user_name,
    user_email: context.user_email,
  }, (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


exports.getByCredentials = (context, callback) => {
  console.log('checking credientials');
  console.log(context);

  db.get().query(`
  SELECT 
    user_id,
    user_name,
    user_email
  FROM app_user
  WHERE user_password = ?
  AND (user_name = ? OR user_email = ?);`, [
      context.user_password,
      context.user_name,
      context.user_email,
    ], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};
