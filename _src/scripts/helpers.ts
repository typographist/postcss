import { CONTAINS_PX, HALF, BROWSER_DEFAULT_FONT_SIZE } from './constants';
import { CONTAINS_EM } from './constants';

export const isObject = function(val: any): boolean {
  return Object.prototype.toString.call(val).slice(8, -1) === 'Object';
};

export const isArray = function(val: any): boolean {
  return Array.isArray(val);
}

export const isValidBase = function(val: string): boolean {
  try {
    if (CONTAINS_PX.test(val)) return true;
    throw new Error(`${val} is incorrect value! Please, use pixels.`);

  } catch(err) {
    console.log(err);
    return false;
  }
};

export const getValidBase = function(val: string) {
  if (isValidBase(val)) return parseFloat(val);
  return null;
}

export const calcLeading = function(val: object): number {
  if (isArray(val['base'])) {
    return Math.round(val['base'][0] * val['lineHeight']);
  }
  return Math.round(parseFloat(val['base']) * val['lineHeight']);
};

export const calcRoot = function(val: object):number {
  return Math.round(calcLeading(val) * HALF);
}

export const convertToEm = function(val: number): string {
  return val / BROWSER_DEFAULT_FONT_SIZE + 'em';
}

export const makeArray = function(length: number): Array<number> {
  return Array.from({length}, (item, i) => i);
};

export const getValidBreakpoint = function(val: string): number {
  let result;
  try {
    if (CONTAINS_PX.test(val)) {
      result = parseFloat(val);
    } else if (CONTAINS_EM.test(val)) {
      result = parseFloat(val) * BROWSER_DEFAULT_FONT_SIZE;
    } else {
      throw new Error(`${val} is incorrect value! Please, use pixels or ems.`)
    }
  } catch(err) {
    console.log(err);
  }

  return result;
};

