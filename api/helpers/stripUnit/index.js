import isArray from '../isArray/';
import { CONTAINS_PX, CONTAINS_EM } from '../../regex';
import toPx from '../toPx';

/**
 * @param {Array<string>|string} base
 * @return {Array<number>|number}
 */
const stripUnit = (val) => {
  let result;

  if (isArray(val)) {
    result = val.map(item => stripUnit(item));
  } else if (typeof val === 'string') {
    if (CONTAINS_PX.test(val)) {
      result = parseFloat(val);
    }

    if (CONTAINS_EM.test(val)) {
      result = toPx(val);
    }
  }

  return result;
};

export default stripUnit;
