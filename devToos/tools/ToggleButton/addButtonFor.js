const { createStore } = require('redux');
const Button = require('./ToggleButton');
const verticalRhythm = require('../../reducers');

const store = createStore(verticalRhythm);

const addButtonFor = (elem, options) => {
  const btn = new Button(options);
  elem.append(btn.render());

  store.subscribe(() => {
    const state = store.getState();

    switch (state) {
      case 'singleRhythm':
        root.setAttribute('data-rhythm', 'single');
        break;
      case 'doubleRhythm':
        root.setAttribute('data-rhythm', 'double');
        break;
      default:
        root.setAttribute('data-rhythm', 'off');
        break;
    }
  });
};

module.exports = addButtonFor;
