const calcLeading = (base, lineHeight) => {
  if (Array.isArray(base)) {
    return Math.round(base[0] * lineHeight);
  }
  return Math.round(base * lineHeight);
};

export default calcLeading;
