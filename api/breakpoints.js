// import calculator from './calculator';
// import {
//   CONTAINS_PX,
//   CONTAINS_EM,
//   BROWSER_DEFAULT_FONT_SIZE,
// } from './constants';
// import { getValidBreakpoint, convertToEm } from './helpers';

// export const above = function(breakVal) {
//   if (!parseFloat(breakVal)) {
//     const breakpoint = calculator.find(item => item.name === breakVal.trim());
//     return convertToEm(getValidBreakpoint(breakpoint.breakpoint));
//   }

//   return convertToEm(getValidBreakpoint(breakVal));

//         /*
//         @media screen and (min-width: result) {
//           @content;
//         }
//         */
// };

// export const below = (breakVal) => {
//   if (!parseFloat(breakVal)) {
//     const breakpoint = calculator.find(item => item.name === breakVal.trim());
//     return convertToEm(getValidBreakpoint(breakpoint.breakpoint));
//   }

//   return convertToEm(getValidBreakpoint(breakVal));

//         /*
//         @media screen and (max-width: result) {
//           @content;
//         }
//         */
// };

// export const between = (breakVal1, breakVal2) => {
//   let result = new Object();

//   if (!parseFloat(breakVal1) && !parseFloat(breakVal2)) {
//     const breakpoint1 = calculator.find(item => item.name === breakVal1.trim());
//     const breakpoint2 = calculator.find(item => item.name === breakVal2.trim());

//     result['firtBreakValue'] = convertToEm(getValidBreakpoint(breakpoint1.breakpoint));
//     result['lastBreakValue'] = convertToEm(getValidBreakpoint(breakpoint2.breakpoint) -1);

//   } else {
//     result['firstBreakValue'] = convertToEm(getValidBreakpoint(breakVal1));
//     result['lastBreakValue'] = convertToEm(getValidBreakpoint(breakVal2) -1);
//   }

//   return result;

//   /*
//     @media screen and (min-with: firstbreakValue) and (max-width: lastBreakValue) {
//       @content;
//     }
//   */
// };

// // На счёт неё надо подумать. Её может заментиь between и она не принимает значения в пикселях

// // export const only = (breakVal: string) => {
// //         let result;
// //         const breakpoint = config.find(item => item.name === breakVal);

// //         const getNextBreakpoint = (breakpoint: object) => {
// //           const index = config.indexOf(breakpoint);

// //           if (index >= 0 && index < config.length) {
// //               const rawBreak = parseFloat(config[index + 1].breakpoint) - 1;
// //               return rawBreak + 'px';
// //           }
// //         };

// //         result['firstBreak'] = convertToEm(breakpoint.breakpoint);
// //         result['lastBreak'] = convertToEm(getNextBreakpoint(breakpoint));

// //         return result;
// // };

