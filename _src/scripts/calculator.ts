import config from './config';
import { 
  CONTAINS_PX, 
  CONTAINS_EM,
  CONTAINS_FONT_SIZE,
  CONTAINS_TARGET,
  BROWSER_DEFAULT_FONT_SIZE, 
  HALF,
} from './constants';

import { 
  isObject,
  calcLeading,
  calcRoot,
  isNumber,
  isValidBase,
  isValidRatio,
  isValidBreakpoint,
  deepFind,
} from './helpers';

const isConfigValid = function(config): boolean {
  const isValidBases = function(bases: string[]): boolean {
    return bases.every(base => isValidBase(base));
  };
  
  const isValidLineHeights = function(lineHeight: any[]): boolean{
    return lineHeight.every(lineHeight => isNumber(lineHeight));
  };
  
  const isValidRatios = function(val: any[]): boolean {
    return val.every(item => isValidRatio(item));
  };
  
  const isValidBreakpoints = function(val: any[]): boolean {
    return val.every(item => isValidBreakpoint(item));
  };

  const bases = deepFind(config, 'base').toString().split(',');
  const lineHeighs = deepFind(config, 'lineHeight');
  const ratios = deepFind(config, 'ratio');
  const breaks = deepFind(config, 'breakpoint');

  return [
    isValidBase(bases),
    isValidLineHeights(lineHeighs),
    isValidRatios(ratios),
    isValidBreakpoints(breaks),
  ].every(Boolean);
};

const getFloatedBase = function(base: string | string[]):number | number[] {
  let result;
  
  if (Array.isArray(base)) {
    result = base.map(item => getFloatedBase(item));
  } else if (typeof base === 'string') {
    if (CONTAINS_PX.test(base)) {
      result = parseFloat(base.trim());
    }

    if (CONTAINS_EM.test(base)) {
      result = parseFloat(base.trim()) * BROWSER_DEFAULT_FONT_SIZE;
    }
  } else if (typeof base === 'number') {
    result = base;
  }
  
  return result;
};

const breakpointToPx = function(breakpoint: string): string {
  if (CONTAINS_EM.test(breakpoint)) {
    return `${parseFloat(breakpoint.trim()) * BROWSER_DEFAULT_FONT_SIZE}px`;
  } 
  return breakpoint;
};

const getBase = function(base: number|number[]): number {
  if (Array.isArray(base)) {
    return base[0];
  } else {
    return base;
  }
};

const parseRatioIfString = function(val: number|string, base: number|number[]):number {
  if (typeof val === 'string') {
    const fontSize = val.match(CONTAINS_FONT_SIZE).toString();
    const target = Number(val.match(CONTAINS_TARGET).toString());
    let result;

    if (CONTAINS_PX.test(fontSize)) {
      result = parseFloat(fontSize);
    } else if (CONTAINS_EM.test(fontSize)) {
      result = parseFloat(fontSize) * BROWSER_DEFAULT_FONT_SIZE;
    }

    return Number(Math.pow((result / getBase(base)), 1 / target).toFixed(5));
  } else if (typeof val === 'number') {
    return val;
  }
};

const parseConfig = function(config) {
  if (!isConfigValid) {
    return;
  }

  const makeDefaultBreakpoint = function(config): object  {
    const breakpoint = new Object();
    const { base } = config;
    
    breakpoint['base'] = getFloatedBase(base);
    breakpoint['lineHeight'] = config.lineHeight;
    breakpoint['ratio'] = parseRatioIfString(config.ratio, breakpoint['base']);
    breakpoint['breakpoint'] = '0px';
    breakpoint['name'] = 'default';
  
    return breakpoint;
  };

  let result = new Array();
  const firstBreakpoint = makeDefaultBreakpoint(config);
  result.push(firstBreakpoint);

  type Breakpoint = {
    base: any,
    ratio: number|string,
    breakpoint: string,
    lineHeight: number,
    name: string
  }

  const setBreakpointsName = function (config: object): Breakpoint[] {
    for (let key in config) {
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        const value = config[key];
        const isBreakpoint = isObject(value) && value.breakpoint;
  
        if (isBreakpoint) {
          result.push(
            {
              ...value, 
              name: key
            });
        }
      }
    }
    return result;
  };
  
  result = setBreakpointsName(config)
    .reduce((
      breakpoints: Breakpoint[],
      item: Breakpoint,
      i: number
    ) => [
      ...breakpoints,
      {
        ...item,
        base: !item.base ? breakpoints[i - 1].base : getFloatedBase(item.base),
        lineHeight: !item.lineHeight ? breakpoints[i - 1].lineHeight : item.lineHeight,
        ratio: !item.ratio ? breakpoints[i - 1].ratio : parseRatioIfString(item.ratio, item.base),
        breakpoint: breakpointToPx(item.breakpoint),
      }
    ], [])
    .map(item => {
        return {
          ...item,
          root: calcRoot(calcLeading(item.base, item.lineHeight)),
        }
    });

  return result;
};

export default parseConfig(config);
