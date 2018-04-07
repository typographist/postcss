import { IS_DEVELOPMENT } from './constants';

const excludeReducer = ({ exclude }, ...reducers) => {
  const res = {};

  if (reducers !== undefined) {
    reducers.forEach(item => {
      res[item.name] = item;
    });
  }

  if (!IS_DEVELOPMENT) {
    if (typeof exclude === 'function') {
      delete res[exclude.name];
    }

    if (Array.isArray(exclude)) {
      exclude.forEach(item => {
        delete res[item.name];
      });
    }
  }

  return res;
};

export default excludeReducer;
