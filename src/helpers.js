export const compose = (...fns) => (x) =>
  fns.reduceRight((acc, fn) => fn(acc), x);

/* eslint-disable no-unused-vars */
export const head = ([first, ...rest]) => first;
export const tail = ([first, ...rest]) => rest;
/* eslint-enable */

export const type = (x) => Object.prototype.toString.call(x).slice(8, -1);
export const is = (t) => (x) => Object(x) instanceof t;

export const flatten = (list) =>
  list.reduce(
    (acc, item) =>
      Array.isArray(item) ? [...acc, ...flatten(item)] : [...acc, item],
    [],
  );
