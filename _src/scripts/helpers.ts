import { 
  CONTAINS_PX, 
  CONTAINS_EM,
  CONTAINS_AT,
  CONTAINS_PX_OR_EM,
  FLOATING_POINT_NUMBER,
  HALF,
  BROWSER_DEFAULT_FONT_SIZE 
} from './constants';

export const isObject = function(val: any): boolean {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Object';
};

export const isArray = function(val: any): boolean {
  return Array.isArray(val);
}

export const isValidBase = function(val: string): boolean {
  try {
    if (CONTAINS_PX_OR_EM.test(val)) return true;
    throw new Error(`${val} is incorrect value! Please, use pixels or em.`);

  } catch(err) {
    console.log(err);
    return false;
  }
};

export const isValidBreakpoint = function(val: string): boolean {
  try {
    if (CONTAINS_PX_OR_EM.test(val)) return true;
    throw new Error(`${val} is incorrect value! Please, use pixels or em.`);

  } catch(err) {
    console.log(err);
    return false;
  }
};

export const isNumber = function(val: number): boolean {
  try {
    if (typeof val === 'number') return true;
    throw new Error(`${val} is incorrect value! Value must me a number.`);
  } catch(err) {
    console.log(err);
    return false;
  }
}

export const isValidRatio = function(ratio: number|string): boolean {
  if (typeof ratio === 'string') {
    return CONTAINS_AT.test(ratio);
  } else if (typeof ratio === 'number') {
    return true;
  }
};

export const getValidBase = function(val: string) {
  if (isValidBase(val)) return parseFloat(val);
  return null;
}

export const calcLeading = function(base: number|number[], lineHeight: number): number {
  if (Array.isArray(base)) {
    return Math.round(base[0] * lineHeight);
  }
  return Math.round(base * lineHeight);
};

export const calcRoot = function(val: number):number {
  return Math.round(val * HALF);
}

export const convertToEm = function(val: number): string {
  return `${val / BROWSER_DEFAULT_FONT_SIZE}em`;
}

export const convertToPx = function(val: number): string {
  return `${val / BROWSER_DEFAULT_FONT_SIZE}px`;
}

export const makeArray = function(length: number): number[] {
  return Array.from({length}, (item, i) => i);
};

export const deepFind = function (obj: any, key: any, memo?: any) {
  if (!isArray(memo)) memo = [];

  for (let i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      if (i === key) {
        memo.push(obj[i]);
      } else if (isArray(obj[i]) || isObject(obj[i])) {
        deepFind(obj[i], key, memo);
      }
    }
  }

  return memo;
}

export const getValidBreakpoint = function(val: string): number {
  let result;
  
  try {
    if (CONTAINS_PX.test(val)) {
      result = parseFloat(val.trim());
    } else if (CONTAINS_EM.test(val)) {
      result = parseFloat(val.trim()) * BROWSER_DEFAULT_FONT_SIZE;
    } else {
      throw new Error(`${val} is incorrect value! Please, use pixels or ems.`)
    }
  } catch(err) {
    console.log(err);
  }

  return result;
};

