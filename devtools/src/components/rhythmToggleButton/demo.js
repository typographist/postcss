import { createStore } from 'redux';
import {
  toggleAdaptiveRhythm,
  toggleFluidRhythm,
  setRhythm,
} from '../../actions';
import { toNormalCase } from '../../../../helpers';
import verticalRhythm from '../../reducers';
import '../../styles/main.scss';

const store = createStore(verticalRhythm);

// TOGGLE RHYTHM BUTTON COMPONENT
/**
 * @param {string} elemClassName
 * @param {number} zIndex
 * @param {string} bgColor
 */

const defaultOptions = {
  root: 'adaptive',
  zIndex: 1000,
};

class RhythmToggleButton {
  constructor(options) {
    this.options = RhythmToggleButton.getOptions(options);

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

  handleClick() {
    const { root } = this.options;

    if (root === 'adaptive') {
      store.dispatch(toggleAdaptiveRhythm());
    }

    if (root === 'fluid') {
      store.dispatch(toggleFluidRhythm());
    }
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
        if (KEY_S && KEY_R) RhythmToggleButton.setSingleRhythm(e);
        if (KEY_D && KEY_R) RhythmToggleButton.setDoubleRhythm(e);
        if (KEY_O && KEY_R) RhythmToggleButton.setOffRhythm(e);
      }

      if (root === 'fluid') {
        if (KEY_S && KEY_R) RhythmToggleButton.setSingleRhythm(e);
        if (KEY_O && KEY_R) RhythmToggleButton.setOffRhythm(e);
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

  addTo(elem) {
    const parentElem = document.querySelector(elem);
    const renderedBtn = this.render();
    const theFirstChild = parentElem.firstChild;
    parentElem.insertBefore(renderedBtn, theFirstChild);

    const toggleRhythm = () => {
      const state = store.getState();

      switch (state) {
        case 'singleRhythm':
          parentElem.setAttribute('data-rhythm', 'single');
          break;
        case 'doubleRhythm':
          parentElem.setAttribute('data-rhythm', 'double');
          break;
        default:
          parentElem.setAttribute('data-rhythm', 'off');
          break;
      }
    };

    store.subscribe(toggleRhythm);
  }

  render() {
    const { zIndex } = this.options;
    const buttonElem = document.createElement('button');
    const state = store.getState();
    buttonElem.textContent = toNormalCase(state);
    buttonElem.style.cssText = `
      z-index: ${zIndex};
    `;
    buttonElem.classList.add('typographist-button');

    buttonElem.addEventListener('click', () => {
      this.handleClick();
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

const button = new RhythmToggleButton({
  root: 'fluid',
});

button.addTo('.wrap');
