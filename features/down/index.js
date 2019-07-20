const { down } = require('../../breakpoints/media-queries');

exports.renderDown = (atrule, breakpointsMap) => {
  atrule.name = 'media';
  atrule.params = down(atrule, breakpointsMap);
};
