import * as constants from './constants';

/**
 *  Whether the parametr is an object?
 *  @param {any} val
 *  @return {boolean}
 */
export const isObject = val => (
  Object.prototype.toString.call(val).slice(8, -1) === 'Object'
);

/**
 *   Whether the parametr is an array?
 *  @param {any} val
 *  @return {boolean}
 */
export const isArray = val => Array.isArray(val);

/**
 * Whether the parametr is an string?
 * @param {any} val
 * @return {boolean} 
 */
export const isBaseString = (val) => {
  try {
    switch (typeof val) {
      case 'string':
        return true;
      default:
        throw new Error('Base value must be a string or Array<string>!');
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

/**
 * 
 * @param {array<any>} bases
 * @return {boolean}
 */
export const allBasesOfString = bases => (
  bases.every(base => isBaseString(base))
);

const isValidBase = (base) => {
  try {
    switch (constants.CONTAINS_PX_OR_EM.test(base)) {
      case true:
        return true;
      default:
        throw new Error(`${base} is incorrect value! Please, use pixels or em.`); 
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

// export const isValidBase = (base) => {
//   switch (allBasesOfString(base)) {
//     case true:
//       return constants.CONTAINS_PX_OR_EM.test(base);
//     default:
//       return false;
//   }
//   // try {
//   //   if (constants.CONTAINS_PX_OR_EM.test(base)) return true;
//   //   throw new Error(`${base} is incorrect value! Please, use pixels or em.`);
//   // } catch (err) {
//   //   console.log(err);
//   //   return false;
//   // }
// };

export const isValidBreakpoint = (val) => {
  try {
    if (constants.CONTAINS_PX_OR_EM.test(val)) return true;
    throw new Error(`${val} is incorrect value! Please, use pixels or em.`);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const isNumber = (val) => {
  try {
    if (typeof val === 'number') return true;
    throw new Error(`${val} is incorrect value! Value must me a number.`);
  } catch (err) {
    console.log(err);
    return false;
  }
};

// export const isValidRatio = (ratio) => {
//   try {
//     switch (typeof ratio) {
//       case 'string':
//         return CONTAINS_AT.test(ratio);
//       case 'number':
//         return true;
//       default:
//         throw new Error('ratio must be string or number');
//     } catch (err) {
//       console.log(err);
//     }
//   }
// };

export const getValidBase = (val) => {
  if (isValidBase(val)) return parseFloat(val);

  return null;
};

export const calcLeading = (base, lineHeight) => {
  if (Array.isArray(base)) {
    return Math.round(base[0] * lineHeight);
  }
  return Math.round(base * lineHeight);
};

export const calcRoot = val => (
  Math.round(val * constants.HALF)
);

export const convertToEm = val => (
  `${val / constants.BROWSER_DEFAULT_FONT_SIZE}em`
);

export const convertToPx = val => (
  `${val / constants.BROWSER_DEFAULT_FONT_SIZE}px`
);

export const makeArray = length => (
  Array.from({ length }, (item, i) => i)
);

export const deepFind = (obj, key, memo) => {
  let result = memo;
  if (!isArray(memo)) result = [];

  for (let i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      if (i === key) {
        result.push(obj[i]);
      } else if (isArray(obj[i]) || isObject(obj[i])) {
        deepFind(obj[i], key, result);
      }
    }
  }

  return result;
};

export const getValidBreakpoint = (val) => {
  let result;

  try {
    if (constants.CONTAINS_PX.test(val)) {
      result = parseFloat(val.trim());
    } else if (constants.CONTAINS_EM.test(val)) {
      result = parseFloat(val.trim()) * constants.BROWSER_DEFAULT_FONT_SIZE;
    } else {
      throw new Error(`${val} is incorrect value! Please, use pixels or ems.`);
    }
  } catch (err) {
    console.log(err);
  }

  return result;
};

