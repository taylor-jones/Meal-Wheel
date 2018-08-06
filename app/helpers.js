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




exports.pluralize = (term) => {
  if (term) {
    const len = term.length;

    const lastThree = term.substr(-3);
    const c3 = lastThree.substr(0, 1);
    const c2 = lastThree.substr(1, 1);
    const c1 = lastThree.substr(2, 1);

    if (c1 == 'y' && c2 != 'e') {
      // word ends in y (and not ey) - remove last letter and add ies to end
      return `${term.substr(0, len - 1)}ies`;
    } else if ((c2 == 's' && (c1 == 's' || c1 == 'h')) || (c1 == 's' && c2 == 'c') || (c1 == 's' || c1 == 'x' || c1 == 'z')) {
      // word ends in: ss, sh, ch, s, x, or z - add es to the end
      if (term == 'ox') {
        return 'oxen';
      } else {
        return `${term}es`;
      }
    } else if (c1 == 'f') {
      // term ends in f - remove last letter and add "ves" to end
      return `${term.substr(0, len - 1)}ves`;
    } else if (c1 == 'e' && c2 == 'f' && c3 != 'f') {
      // term ends in fe - remove the last 2 letters and add "ves" to end
      return `${term.substr(0, len - 2)}ves`;
    } else {
      // term doesn't meed any of the above criteria - add s to end
      return `${term}s`;
    }
  }
};
