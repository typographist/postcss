import * as constants from './constants';

// export const getValidBase = (val) => {
//   if (isValidBase(val)) return parseFloat(val);

//   return null;
// };

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

