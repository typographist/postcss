// import config from './config';
// import isConfigValid from './isConfigValid';
// import * as constants from './constants';
// import { calcRoot, calcLeading } from './helpers';

// const getFloatedBase = (base) => {
//   if (Array.isArray(base)) {
//     return base.map(item => getFloatedBase(item));
//   } else if (typeof base === 'string') {
//     if (constants.CONTAINS_PX.test(base)) {
//       return parseFloat(base.trim());
//     }

//     if (constants.CONTAINS_EM.test(base)) {
//       const result = parseFloat(base) * constants.BROWSER_DEFAULT_FONT_SIZE;

//       return result;
//     }
//   } else if (typeof base === 'number') {
//     return base;
//   }
// };

// const breakpointToPx = (breakpoint) => {
//   if (constants.CONTAINS_EM.test(breakpoint)) {
//     return `${parseFloat(breakpoint.trim()) * constants.BROWSER_DEFAULT_FONT_SIZE}px`;
//   }

//   return breakpoint;
// };

// const getBase = (base) => {
//   if (Array.isArray(base)) {
//     return base[0];
//   }

//   return base;
// };

// const parseRatioIfString = (ratio) => {
//   if (typeof ratio === 'string') {
//     const fontSize = ratio.match(constants.CONTAINS_FONT_SIZE).toString();
//     const target = Number(ratio.match(constants.CONTAINS_TARGET).toString());
//     let result;

//     if (constants.CONTAINS_PX.test(fontSize)) {
//       result = parseFloat(fontSize);
//     } else if (constants.CONTAINS_EM.test(fontSize)) {
//       result = parseFloat(fontSize) * constants.BROWSER_DEFAULT_FONT_SIZE;
//     }

//     return Number((result / getBase(base)) ** (1 / target)).toFixed(5);
//   } else if (typeof ratio === 'number') {
//     return ratio;
//   }
// };

// const parseConfig = (configObject) => {
//   if (!isConfigValid(configObject)) {
//     return;
//   }

//   const makeDefaultBreakpoint = (object) => {
//     const breakpoint = {};
//     const { base } = object;

//     breakpoint.base = getFloatedBase(base);
//     breakpoint.lineHeight = object.lineHeight;
//     breakpoint.ratio = parseRatioIfString(object.ratio, breakpoint.base);
//     breakpoint.breakpoint = '0px';
//     breakpoint.name = 'default';

//     return breakpoint;
//   };

//   let result = [];
//   const firstBreakpoint = makeDefaultBreakpoint(config);
//   result.push(firstBreakpoint);

//   const setBreakpointsName = (object) => {
//     for (let key in object) {
//       if (Object.prototype.hasOwnProperty.call(object, key)) {
//         const value = object[key];
//         const isBreakpoint = isObject(value) && value.breakpoint;
  
//         if (isBreakpoint) {
//           result.push(
//             {
//               ...value, 
//               name: key
//             });
//         }
//       }
//     }
//     return result;
//   };

//   result = setBreakpointsName(config)
//     .reduce((breakpoints, item, i) => ([
//       ...breakpoints,
//       {
//         ...item,
//         base: !item.base ? breakpoints[i - 1].base : getFloatedBase(item.base),
//         lineHeight: !item.lineHeight ? breakpoints[i - 1].lineHeight : item.lineHeight,
//         ratio: !item.ratio ? breakpoints[i - 1].ratio : parseRatioIfString(item.ratio, item.base),
//         breakpoint: breakpointToPx(item.breakpoint),
//       },
//     ]), []).map(item => (
//       {
//         ...item,
//         root: calcRoot(calcLeading(item.base, item.lineHeight)),
//       }
//     ));

//   return result;
// };

// export default parseConfig(config);
