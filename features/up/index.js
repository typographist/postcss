const { up } = require('../../breakpoints/media-queries');

// up :: (Object, Object) -> Void
exports.renderUp = (atrule, breakpointsMap) => {
  atrule.name = 'media';
  atrule.params = up(atrule, breakpointsMap);
};
