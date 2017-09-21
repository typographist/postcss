/**
 * Is it number?
 * @param {any} val 
 * @return {boolean}
 */
const isNumber = (val) => {
  try {
    if (typeof val === 'number') return true;
    throw new Error(`typeof ${val} === ${typeof val} is incorrect value! Value must me a number.`);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default isNumber;
