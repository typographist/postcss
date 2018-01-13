const notifier = require('node-notifier');

const logger = error => {
  notifier.notify({
    title: error.plugin,
    message: error.message,
  });

  console.error(`${error.plugin}: ${error.message}`);

  if (typeof this.emit === 'function') {
    this.emit('end');
  }
};

module.exports = logger;
