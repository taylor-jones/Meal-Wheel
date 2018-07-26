const mysql = require('mysql');

// This variable needs to be set in ./bin/www.
// The deafult is DEVELOPMENT.
const dbs = {
  // for use with OSU mySQL db
  production: {
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_onid',
    password: 'password',
    database: 'cs340_onid',
  },
  // for use with local mySQL db
  development: {
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'database',
  },
};

exports.DEVELOPMENT = 'development';
exports.PRODUCTION = 'production';

const state = {
  pool: null,
  mode: null,
};

exports.connect = (mode, done) => {
  state.pool = mysql.createPool({
    connectionLimit: 100,
    host: dbs[mode].host,
    user: dbs[mode].user,
    password: dbs[mode].password,
    database: dbs[mode].database,
    multipleStatements: true,
  });

  state.mode = mode;
  done();
};


exports.get = () => state.pool;
