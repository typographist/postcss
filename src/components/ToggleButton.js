const { createStore } = require('redux');
const { toggleRhythm, setRhythm } = require('../actions');
const { toNormalCase } = require('../../helpers');
const verticalRhythm = require('../reducers');
require('../devTools.scss');

const store = createStore(verticalRhythm, 'offRhythm');

// BUTTON COMPONENT
/**
 * @param {string} elemClassName
 * @param {number} zIndex
 * @param {string} bgColor
 */

const defaultOptions = {
  elemClassName: 'toggle-button',
  zIndex: 1000,
  bgColor: 'black',
};

class Button {
  constructor(options = defaultOptions) {
    this.options = { ...defaultOptions, ...options };

    /**
     * @param {number} 83 - Single rhythm key
     * @param {number} 68 - Double rhythm key
     * @param {number} 79 - Off rhythm key
     * @param {number} 82 - Rhythm key
     */
    this.keyMap = {
      83: false,
      68: false,
      79: false,
      82: false,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  static setSingleRhythm(e) {
    store.dispatch(setRhythm('singleRhythm'));
    e.preventDefault();
  }

  static setDoubleRhythm(e) {
    store.dispatch(setRhythm('doubleRhythm'));
    e.preventDefault();
  }

  static setOffRhythm(e) {
    store.dispatch(setRhythm('offRhythm'));
    e.preventDefault();
  }

  static handleClick() {
    store.dispatch(toggleRhythm());
  }

  handleKeyDown(e) {
    if (e.keyCode in this.keyMap) {
      this.keyMap[e.keyCode] = true;

      const KEY_S = this.keyMap[83];
      const KEY_D = this.keyMap[68];
      const KEY_O = this.keyMap[79];
      const KEY_R = this.keyMap[82];

      if (KEY_S && KEY_R) Button.setSingleRhythm(e);
      if (KEY_D && KEY_R) Button.setDoubleRhythm(e);
      if (KEY_O && KEY_R) Button.setOffRhythm(e);
    }
  }

  handleKeyUp(e) {
    if (e.keyCode in this.keyMap) {
      setTimeout(() => {
        this.keyMap[e.keyCode] = false;
      }, 500);
    }
  }

  render() {
    const { elemClassName, zIndex, bgColor } = this.options;
    const buttonElem = global.document.createElement('button');
    const state = store.getState();
    buttonElem.textContent = toNormalCase(state);
    buttonElem.style.cssText = `
      z-index: ${zIndex};
      background-color: ${bgColor};
    `;
    buttonElem.classList.add(elemClassName);

    buttonElem.addEventListener('click', () => {
      Button.handleClick();
    });

    store.subscribe(() => {
      const $state = store.getState();
      buttonElem.textContent = toNormalCase($state);
    });

    global.window.addEventListener('keydown', this.handleKeyDown);
    global.window.addEventListener('keyup', this.handleKeyUp);

    return buttonElem;
  }
}

const root = global.document.getElementById('root');
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

addButtonFor(root, {
  zIndex: 2000,
});
