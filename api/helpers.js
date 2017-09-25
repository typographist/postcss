// import * as constants from './constants';

// // export const getValidBase = (val) => {
// //   if (isValidBase(val)) return parseFloat(val);

// //   return null;
// // };


// export const getValidBreakpoint = (val) => {
//   let result;

//   try {
//     if (constants.CONTAINS_PX.test(val)) {
//       result = parseFloat(val.trim());
//     } else if (constants.CONTAINS_EM.test(val)) {
//       result = parseFloat(val.trim()) * constants.BROWSER_DEFAULT_FONT_SIZE;
//     } else {
//       throw new Error(`${val} is incorrect value! Please, use pixels or ems.`);
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   return result;
// };

