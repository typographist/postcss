import config from './config';
import {  BROWSER_DEFAULT_FONT_SIZE, HALF, } from './constants';
import { 
  isObject, 
  calcLeading, 
  calcRoot, 
  isValidBase,
  isArray,
} from './helpers';

const isAllBaseBalid = function(val: string[]): boolean {
  return val.every(item => isValidBase(item))
}

const getFloatedBase = function(base: string | string[]):string | string[] {
  let result;
  
  if (Array.isArray(base) && isAllBaseBalid(base)) {
    result = base.map(item => parseFloat(item.trim()));
  } else if (typeof base === 'string') {
    result = parseFloat(base.trim());
  }
  
  return result;
};

// Создадим первый объект и положим в него значения
const makeDefaultBreakpoint = function(): object  {
  const breakpoint = new Object();
  const { base } = config;

  // Грязный хак с нулём стокой
  // иначе валится ошибка  Cannot read property 'base' of undefined
  breakpoint['base'] = getFloatedBase(base) || '0';
  breakpoint['lineHeight'] = config.lineHeight;
  breakpoint['ratio'] = config.ratio;
  breakpoint['breakpoint'] = 0;
  breakpoint['name'] = 'default';
  breakpoint['root'] = calcLeading(breakpoint);

  return breakpoint;
};

let breakpointsConfig = new Array();
const defaultBreakpoint = makeDefaultBreakpoint();
breakpointsConfig.push(defaultBreakpoint);

const setBreakpointsName = function (config: object): object[] {
  for (let key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      const value = config[key];
      const isBreakpoint = isObject(value) && value.breakpoint;

      if (isBreakpoint) {
        breakpointsConfig.push(Object.assign(value, { name: key }));
      }
    }
  }
  return breakpointsConfig;
};

breakpointsConfig = setBreakpointsName(config);

breakpointsConfig.map((item, i) => {
  if (!item.base) {
    return Object.assign(item, { 
      base: breakpointsConfig[i - 1].base
    });
  }
  return item;

}).map(item => {
    const isBaseNotArray = item.base && !isArray(item.base);

    if (isBaseNotArray) {
      return Object.assign(item, { 
        base: parseFloat(item.base)
      });
    }
  return item;

}).map((item, i) => {
    if (!item.lineHeight) {
      return Object.assign(item, {
        lineHeight: breakpointsConfig[i - 1].lineHeight
      });
    }
    return item;

}).map((item, i) => {
    if (!item.ratio) {
      return Object.assign(item, {
        ratio: breakpointsConfig[i - 1].ratio
      });
    }
    return item;

}).map(item => Object.assign(item, {
    root: calcRoot(item)
}));

const breakpoins = breakpointsConfig;
export default breakpoins;

// ToDo
// 1) Валидировать LineHeight (проверка начисло с точкой), вывести сообщение об ошибке.
// 2) Валидировать объект содержажий brekpoint , вывести сообщение об ошибке.