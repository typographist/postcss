import { createStore } from 'redux';
import { toggleRhythm, setRhythm } from '../../actions';
import { toNormalCase } from '../../../../helpers';
import verticalRhythm from '../../reducers';

const store = createStore(verticalRhythm);

// BUTTON COMPONENT
/**
 * @param {string} elemClassName
 * @param {number} zIndex
 * @param {string} bgColor
 */

const defaultOptions = {
  zIndex: 1000,
  root: 'adaptive',
  bgColor: 'black',
};

class Button {
  constructor(options) {
    this.options = Button.getOptions(options);

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

  static getOptions(options) {
    return Object.assign({}, defaultOptions, options);
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
    const { root } = this.options;
    if (e.keyCode in this.keyMap) {
      this.keyMap[e.keyCode] = true;

      const KEY_S = this.keyMap[83];
      const KEY_D = this.keyMap[68];
      const KEY_O = this.keyMap[79];
      const KEY_R = this.keyMap[82];

      if (root === 'adaptive') {
        if (KEY_S && KEY_R) Button.setSingleRhythm(e);
        if (KEY_D && KEY_R) Button.setDoubleRhythm(e);
        if (KEY_O && KEY_R) Button.setOffRhythm(e);
      }

      if (root === 'fluid') {
        if (KEY_S && KEY_R) Button.setSingleRhythm(e);
        if (KEY_O && KEY_R) Button.setOffRhythm(e);
      }
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
    const { zIndex, bgColor } = this.options;
    const buttonElem = document.createElement('button');
    const state = store.getState();
    buttonElem.textContent = toNormalCase(state);
    buttonElem.style.cssText = `
      z-index: ${zIndex};
      background-color: ${bgColor};
    `;
    buttonElem.classList.add('typographist-button');

    buttonElem.addEventListener('click', () => {
      Button.handleClick();
    });

    store.subscribe(() => {
      const $state = store.getState();
      buttonElem.textContent = toNormalCase($state);
    });

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    return buttonElem;
  }
}

const rhythmToggleButton = (elem, options) => {
  const btn = new Button(options);
  elem.append(btn.render());

  const toggleAdaptiveRhythm = () => {
    const state = store.getState();

    switch (state) {
      case 'singleRhythm':
        elem.setAttribute('data-rhythm', 'single');
        break;
      case 'doubleRhythm':
        elem.setAttribute('data-rhythm', 'double');
        break;
      default:
        elem.setAttribute('data-rhythm', 'off');
        break;
    }
  };

  store.subscribe(toggleAdaptiveRhythm);
};

module.exports = rhythmToggleButton;
