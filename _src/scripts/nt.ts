import calculator from './calculator';
import { 
  HALF, 
  BROWSER_VIEWPORT_WIDTH, 
  CONTAINS_PX,
 } from './constants';
import { isArray } from './helpers';

const calcFontSize = function (
  target: number, 
  base: any, 
  ratio: number): number {
    let cloneBase = base.slice();
    
    var baseHigh = Math.pow(ratio,1) * cloneBase[0];
    for (var i = 1; i < cloneBase.length; i++) {
      // shift up if value too low
      while (cloneBase[i]/1 < cloneBase[0]/1) {
        cloneBase[i] = Math.pow(ratio,1) * cloneBase[i];
      }
      // Shift down if too high
      while (cloneBase[i]/1 >= baseHigh/1) {
        cloneBase[i] = Math.pow(ratio,-1) * cloneBase[i];
      }
    }
    // Sort bases
    cloneBase.sort();
  
    // Figure out what base to use with modulo
    var roundedBase = Math.round((target / cloneBase.length - Math.floor(target / cloneBase.length)) * cloneBase.length);
  
    // Return
    return Math.round( Math.pow(ratio,Math.floor(target / cloneBase.length)) * cloneBase[roundedBase]);
};

const convertFontSizeInRem = function(fontSize: number, breakpoint): string {
  return `${(fontSize / breakpoint.root).toFixed(5)}rem`;
};

const nt = (
  target: number,
  breakpointName?: string
) => {
  const base:number | number[] = calculator[0].base;
  const ratio: number = calculator[0].ratio;
  let result: string;

  if (Array.isArray(base)) {
    const fontSize:number =  calcFontSize(target, base, ratio);

    if (!breakpointName) {
      const breakpoint = calculator.find(item => item.name === 'default');
      result = convertFontSizeInRem(fontSize, breakpoint);
    } else {
      const breakpoint = calculator.find( item => item.name === breakpointName );
      result = convertFontSizeInRem(fontSize, breakpoint);
    }
  }

  if (typeof base === 'number') {
    const fontSize:number = Math.round( Math.pow(ratio, target) * base );

    if (!breakpointName) {
      const breakpoint = calculator.find( item => item.name === 'default');
      result = convertFontSizeInRem(fontSize, breakpoint);
    } else {
      const breakpoint = calculator.find( item => item.name === breakpointName );
      result = convertFontSizeInRem(fontSize, breakpoint);
    }
  }


  return result;
};

export default nt;