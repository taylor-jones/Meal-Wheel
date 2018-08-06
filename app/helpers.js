// helper functions to be included where needed in the app.


/**
 * @name mapObjectKey
 * @param {array} objArr - array of objects
 * @param {string} key - the name of key to map from each object.
 * @returns array
 */
exports.mapObjectKey = (objArr, key) => {
  return objArr.map((obj) => {
    return obj[key];
  });
};


/**
 * @name isNumeric
 * @description checks if a primitive value is numeric.
 * @param {primitive} value - a primitve value.
 * @returns boolean
 */
exports.isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};


/**
 * @name sanitize
 * @description formats a value in a db-friendly way depending
 *   on the value's primitive type. If it's numeric, it returns
 *   a number. If it's 'null', null, or underfined, it returns null.
 *   If it's a string, it returns a string.
 * @param {primitive} value - some value to clean up
 * @returns primitive
 */
exports.sanitize = (value) => {
  if (value == 'null' || !value || null) {
    return null;
  } else if (typeof value === 'object') {
    return this.sanitizeObj(value);
  } else if (this.isNumeric(value)) {
    return parseFloat(value);
  }
  return value;
};


/**
 * @name sanitizeObj
 */
exports.sanitizeObj = (obj) => {
  const newObj = {};

  for (let prop in obj) {
    newObj[prop] = this.sanitize(obj[prop]);
  }

  return newObj;
};


/**
 * @name sanitizeJSON
 */
exports.sanitizeJSON = (jsonObj) => {
  const obj = {};

  for (let prop in jsonObj) {
    if (Array.isArray(jsonObj[prop])) {
      const arr = [];

      for (let i = 0; i < jsonObj[prop].length; i++) {
        arr.push(this.sanitize(jsonObj[prop][i]));
      }

      obj[prop] = arr;

    } else {
      obj[prop] = this.sanitize(jsonObj[prop]);
    }
  }

  return obj;
};
