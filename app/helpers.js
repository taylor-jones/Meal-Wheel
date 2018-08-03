// helper functions to be included where needed in the app.


/**
 * @name mapObjectKey
 * @param {array} objArr - array of objects
 * @param {string} key - the name of key to map from each object.
 */
exports.mapObjectKey = (objArr, key) => {
  return objArr.map((obj) => {
    return obj[key];
  });
};

