const os = require('os');
const HappyPack = require('happypack');

const maxThreads = os.cpus().length - 2;
const happyThreadPool = HappyPack.ThreadPool({
  size: maxThreads,
});

const createHappyPackPlugin = (id, loaders) =>
  new HappyPack({
    id,
    loaders,
    // threadPool: happyThreadPool,
    verbose: process.env.HAPPY_VERBOSE === '1',
  });

module.exports = createHappyPackPlugin;
