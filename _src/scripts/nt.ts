import breakpoitsConfig from './breakpoints.config';
import { 
  HALF, 
  BROWSER_VIEWPORT_WIDTH, 
  CONTAINS_PX,
 } from './constants';
import { isArray } from './helpers';

const calcFontSize = function (
  val: number, 
  base: any, 
  ratio: number): number {
  const baseHigh = Math.pow(ratio, 1) * base[0];

  for (let i = 1; i < base.length; i++) {
    while (base[i] / 1 < base[0] / 1) {
      base[i] = Math.pow(ratio, 1) * base[i];
    }

    while (base[i] / 1 >= baseHigh / 1) {
      base[i] = Math.pow(ratio, -1) * base[i];
    }

    base.sort();
    const roundedBase = Math.round((val / base.length - Math.floor(val / base.length)) * base.length);
    return Math.round( Math.pow(ratio, Math.floor(val / base.length)) * base[roundedBase] );
  }
};

const convertFontSizeInRem = function(fontSize: number, breakpoint): string {
  return `${(fontSize / breakpoint.root).toFixed(5)}rem`;
};

const nt = (
  val: number,
  breakpointName?: string
) => {
  const base:number | number[] = breakpoitsConfig[0].base;
  const ratio: string | number = breakpoitsConfig[0].ratio;
  let result: string;

  if (typeof base === 'string' && typeof ratio === 'number') {
    const fontSize:number = Math.round( Math.pow(ratio, val) * parseFloat(base) );

    if (!breakpointName) {
      const breakpoint = breakpoitsConfig.find( item => item.name === 'default');
      result = convertFontSizeInRem(fontSize, breakpoint);
    } else {
      const breakpoint = breakpoitsConfig.find( item => item.name === breakpointName );
      result = convertFontSizeInRem(fontSize, breakpoint);
    }
  }
  
  if (isArray(base) && typeof ratio === 'number') {
    const fontSize:number =  calcFontSize(val, base, ratio);

    if (!breakpointName) {
      const breakpoint = breakpoitsConfig.find(item => item.name === 'default');
      result = convertFontSizeInRem(fontSize, breakpoint);
    } else {
      const breakpoint = breakpoitsConfig.find( item => item.name === breakpointName );
      result = convertFontSizeInRem(fontSize, breakpoint);
    }
  }

  return result;
};

export default nt;