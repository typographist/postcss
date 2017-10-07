import { CONTAINS_EM } from '../../regex';
import toPx from '../../helpers/toPx';

const getValue = (val) => {
  if (CONTAINS_EM.test(val)) {
    return toPx(val);
  }

  return val;
};

export default getValue;
