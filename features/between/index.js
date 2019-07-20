const { between } = require('../../breakpoints/media-queries');

exports.renderBetween = (atrule, makeBreakpointsMap) => {
  atrule.name = 'media';
  atrule.params = between(atrule, makeBreakpointsMap);
};
