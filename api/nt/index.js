const isArray = require('../../helpers/isArray');

const calcFontSize = (target, base, ratio) => {
  if (isArray(base) || base.length === 1) {
    return Math.round((ratio ** target) * base);
  }

  const cloneBase = base.slice();
  const baseHigh = (ratio ** 1) * cloneBase[0];

  for (let i = 1; i < cloneBase.length; i + 1) {
    while (cloneBase[i] / 1 < cloneBase[0] / 1) {
      cloneBase[i] *= (ratio ** 1);
    }
    while (cloneBase[i] / 1 >= baseHigh / 1) {
      cloneBase[i] *= (ratio ** -1);
    }
  }
  cloneBase.sort();
  const roundedBase = Math.round(
    ((target / cloneBase.length) - Math.floor(target / cloneBase.length)) * cloneBase.length,
  );

  return Math.round((ratio ** Math.floor(target / cloneBase.length)) * cloneBase[roundedBase]);
};

const nt = (target, breakpoint) => {
  let result = null;
  if (!calculator) return;
  if (breakpoint === undefined) {

    // const defaultBreakpoint = calculator()[0];
    // console.log(base);
    // const base = defaultBreakpoint.base;
    // const ratio = defaultBreakpoint.ratio;
    // result = calcFontSize(target, base, ratio);
  }

  return result;
};

module.exports = nt;

// import calculator from './calculator';
// import { 
//   HALF, 
//   BROWSER_VIEWPORT_WIDTH, 
//   CONTAINS_PX,
//  } from './constants';
// import { isArray } from './helpers';

// const calcFontSize = function (
//   target: number, 
//   base: any, 
//   ratio: number): number {
//     let cloneBase = base.slice();
    
//     const baseHigh = Math.pow(ratio,1) * cloneBase[0];
//     for (let i = 1; i < cloneBase.length; i++) {
//       while (cloneBase[i] / 1 < cloneBase[0] / 1) {
//         cloneBase[i] = Math.pow(ratio, 1) * cloneBase[i];
//       }
    
//       while (cloneBase[i] / 1 >= baseHigh / 1) {
//         cloneBase[i] = Math.pow(ratio, -1) * cloneBase[i];
//       }
//     }
    
//     cloneBase.sort();
//     const roundedBase = Math.round((target / cloneBase.length - Math.floor(target / cloneBase.length)) * cloneBase.length);
    
//     return Math.round( Math.pow(ratio, Math.floor(target / cloneBase.length)) * cloneBase[roundedBase]);
// };

// const convertFontSizeInRem = function(fontSize: number, breakpoint): string {
//   return `${(fontSize / breakpoint.root).toFixed(5)}rem`;
// };

// const nt = (
//   target: number,
//   breakpointName?: string
// ) => {
//   const base:number | number[] = calculator[0].base;
//   const ratio: number = calculator[0].ratio;
//   let result: string;

//   if (Array.isArray(base)) {
//     const fontSize:number =  calcFontSize(target, base, ratio);

//     if (!breakpointName) {
//       const breakpoint = calculator.find(item => item.name === 'default');
//       result = convertFontSizeInRem(fontSize, breakpoint);
//     } else {
//       const breakpoint = calculator.find( item => item.name === breakpointName );
//       result = convertFontSizeInRem(fontSize, breakpoint);
//     }
//   }

//   if (typeof base === 'number') {
//     const fontSize:number = Math.round( Math.pow(ratio, target) * base );

//     if (!breakpointName) {
//       const breakpoint = calculator.find( item => item.name === 'default');
//       result = convertFontSizeInRem(fontSize, breakpoint);
//     } else {
//       const breakpoint = calculator.find( item => item.name === breakpointName );
//       result = convertFontSizeInRem(fontSize, breakpoint);
//     }
//   }


//   return result;
// };

// export default nt;
