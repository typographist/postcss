const { only } = require('../../breakpoints/media-queries');

exports.renderOnly = (atrule, breakpointsMap) => {
  atrule.name = 'media';
  atrule.params = only(atrule, breakpointsMap);
};
