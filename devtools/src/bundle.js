(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.RhythmToggleButton = factory());
}(this, (function () { 'use strict';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root$1;

if (typeof self !== 'undefined') {
  root$1 = self;
} else if (typeof window !== 'undefined') {
  root$1 = window;
} else if (typeof global !== 'undefined') {
  root$1 = global;
} else if (typeof module !== 'undefined') {
  root$1 = module;
} else {
  root$1 = Function('return this')();
}

var result = symbolObservablePonyfill(root$1);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

var toggleAdaptiveRhythm = function () { return ({
  type: 'TOGGLE_ADAPTIVE_RHYTHM',
}); };

var toggleFluidRhythm = function () { return ({
  type: 'TOGGLE_FLUID_RHYTHM',
}); };

var setRhythm = function (rhythm) { return ({
  type: 'SET_RHYTHM',
  rhythm: rhythm,
}); };

/**
 * @param {number|array<number>} base
 * @param {number} lineHeight
 * @return {number}
 */
var calcLeading = function (base, lineHeight) {
  if (Array.isArray(base)) {
    return Math.round(base[0] * lineHeight);
  }

  return Math.round(base * lineHeight);
};

var HALF = 0.5;
var BROWSER_VIEWPORT_WIDTH = '100vw';
var BROWSER_DEFAULT_FONT_SIZE = 16;
var FIRST_BREAKPOINT = /^0/;

var constants = {
  HALF: HALF,
  BROWSER_VIEWPORT_WIDTH: BROWSER_VIEWPORT_WIDTH,
  BROWSER_DEFAULT_FONT_SIZE: BROWSER_DEFAULT_FONT_SIZE,
  FIRST_BREAKPOINT: FIRST_BREAKPOINT,
};

var HALF$1 = constants.HALF;

var calcRoot = function (val) { return Math.round(val * HALF$1); };

/**
 *  Whether the parametr is an object?
 *  @param {any} val
 *  @return {boolean}
 */

var isObject = function (val) { return Object.prototype.toString.call(val).slice(8, -1) === 'Object'; };

/**
 *  @param {any} val
 *  @return {boolean}
 */
var isArray = function (val) { return Array.isArray(val); };

var findAll = function (obj, key, memo) {
  var result = memo;
  if (!isArray(memo)) { result = []; }

  /* eslint-disable no-restricted-syntax */
  for (var i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      if (i === key) {
        result.push(obj[i]);
      } else if (isArray(obj[i]) || isObject(obj[i])) {
        findAll(obj[i], key, result);
      }
    }
  }

  return result;
};
/* eslint-enable */

var findAll_1 = findAll;

/**
 * @param {Array<number>|number} base
 * @return {number}
 */

var getBase = function (base) { return (Array.isArray(base) ? base[0] : base); };

/**
 * Check for a number
 * @param {any} num
 * @return {boolean}
 */

/* eslint-disable no-restricted-globals */
var isNumeric = function (num) { return !Number.isNaN(parseFloat(num)) && isFinite(num); };

var makeArray = function (length) { return Array.from({ length: length }, function (item, i) { return i; }); };

var BROWSER_DEFAULT_FONT_SIZE$1 = constants.BROWSER_DEFAULT_FONT_SIZE;

/**
 *
 * @param {number|string} val
 * @return {number}
 */
var percentage = function (val) { return parseFloat(val) / BROWSER_DEFAULT_FONT_SIZE$1 * 100; };

var BROWSER_DEFAULT_FONT_SIZE$2 = constants.BROWSER_DEFAULT_FONT_SIZE;

/**
 * @param {string} inEms
 * @return {number}
 */
var toPx = function (inEms) { return parseFloat(inEms) * BROWSER_DEFAULT_FONT_SIZE$2; };

var ALL_ROUND_BRACKETS = /[()]/g;
var HAS_PX = /-?\b\d+(\.\d+)?px/;
var HAS_REM = /-?\b\d+(\.\d+)?rem/;
var HAS_EM = /-?\b\d+(\.\d+)?em/;
var HAS_PX_OR_EM = /-?\b\d+(\.\d+)?(px|em)/;
var HAS_AT = /-?\b\d+(\.\d+)?(px|em) at -?\d+(\.\d+)??\b/;
var HAS_FONT_SIZE = /^font-size$/;
var HAS_FONT_SIZE_VAL = /\b-?\d+(\.\d+)?(px|em)\b/gi;
var HAS_TARGET = /-?\b\d+(\.\d+)?\b\s*$/g;
var MS_UNIT = /ms/;
var POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER = /^-?\d+(\.\d+)?$/;
var POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE = /^-?\d+(\.\d+)?ms$/;

var regexes = {
  ALL_ROUND_BRACKETS: ALL_ROUND_BRACKETS,
  HAS_PX: HAS_PX,
  HAS_REM: HAS_REM,
  HAS_EM: HAS_EM,
  HAS_PX_OR_EM: HAS_PX_OR_EM,
  HAS_AT: HAS_AT,
  HAS_FONT_SIZE: HAS_FONT_SIZE,
  HAS_FONT_SIZE_VAL: HAS_FONT_SIZE_VAL,
  HAS_TARGET: HAS_TARGET,
  MS_UNIT: MS_UNIT,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER: POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER,
  POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE: POSITIVE_OR_NEGATIVE_FLOATING_POINT_NUMBER_WITH_MS_UNIT_MEASURE,
};

var HAS_PX$1 = regexes.HAS_PX;
var HAS_EM$1 = regexes.HAS_EM;

/**
 * @param {Array<string>|string} base
 * @return {Array<number>|number}
 */
var stripUnit = function (val) {
  var result;

  if (isArray(val)) {
    result = val.map(function (item) { return stripUnit(item); });
  } else if (typeof val === 'string') {
    if (HAS_PX$1.test(val)) {
      result = parseFloat(val);
    }

    if (HAS_EM$1.test(val)) {
      result = toPx(val);
    }
  }

  return result;
};

var stripUnit_1 = stripUnit;

var BROWSER_DEFAULT_FONT_SIZE$3 = constants.BROWSER_DEFAULT_FONT_SIZE;

/**
 * @param {string} inPx
 * @return {number}
 */
var toEm = function (inPx) { return parseFloat(inPx) / BROWSER_DEFAULT_FONT_SIZE$3; };

/**
 *
 * @param {string} string
 */
var toNormalCase = function (string) { return string.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase(); };

/**
 * @param {number} baseSize
 * @param {number} rootSize
 * @return {string}
 */
var toRem = function (baseSize, rootSize) { return getBase(baseSize) / rootSize; };

var helpers = {
  calcLeading: calcLeading,
  calcRoot: calcRoot,
  findAll: findAll_1,
  getBase: getBase,
  isArray: isArray,
  isNumeric: isNumeric,
  isObject: isObject,
  makeArray: makeArray,
  percentage: percentage,
  stripUnit: stripUnit_1,
  toEm: toEm,
  toNormalCase: toNormalCase,
  toPx: toPx,
  toRem: toRem,
};
var helpers_12 = helpers.toNormalCase;

var verticalRhythm = function (state, action) {
  if ( state === void 0 ) state = 'offRhythm';

  switch (action.type) {
    case 'TOGGLE_ADAPTIVE_RHYTHM':
      switch (state) {
        case 'offRhythm':
          return 'singleRhythm';
        case 'singleRhythm':
          return 'doubleRhythm';
        case 'doubleRhythm':
          return 'offRhythm';
        default:
          return state;
      }

    case 'TOGGLE_FLUID_RHYTHM':
      switch (state) {
        case 'offRhythm':
          return 'singleRhythm';
        case 'singleRhythm':
          return 'offRhythm';
        default:
          return state;
      }
    case 'SET_RHYTHM':
      return action.rhythm;
    default:
      return state;
  }
};

var store = createStore(verticalRhythm);

// TOGGLE RHYTHM BUTTON COMPONENT
/**
 * @param {string} elemClassName
 * @param {number} zIndex
 * @param {string} bgColor
 */

var defaultOptions = {
  root: 'adaptive',
  zIndex: 1000,
};

var RhythmToggleButton = function RhythmToggleButton(options) {
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
};

RhythmToggleButton.getOptions = function getOptions (options) {
  return Object.assign({}, defaultOptions, options);
};

RhythmToggleButton.setSingleRhythm = function setSingleRhythm (e) {
  store.dispatch(setRhythm('singleRhythm'));
  e.preventDefault();
};

RhythmToggleButton.setDoubleRhythm = function setDoubleRhythm (e) {
  store.dispatch(setRhythm('doubleRhythm'));
  e.preventDefault();
};

RhythmToggleButton.setOffRhythm = function setOffRhythm (e) {
  store.dispatch(setRhythm('offRhythm'));
  e.preventDefault();
};

RhythmToggleButton.prototype.handleClick = function handleClick () {
  var ref = this.options;
    var root = ref.root;

  if (root === 'adaptive') {
    store.dispatch(toggleAdaptiveRhythm());
  }

  if (root === 'fluid') {
    store.dispatch(toggleFluidRhythm());
  }
};

RhythmToggleButton.prototype.handleKeyDown = function handleKeyDown (e) {
  var ref = this.options;
    var root = ref.root;
  if (e.keyCode in this.keyMap) {
    this.keyMap[e.keyCode] = true;

    var KEY_S = this.keyMap[83];
    var KEY_D = this.keyMap[68];
    var KEY_O = this.keyMap[79];
    var KEY_R = this.keyMap[82];

    if (root === 'adaptive') {
      if (KEY_S && KEY_R) { RhythmToggleButton.setSingleRhythm(e); }
      if (KEY_D && KEY_R) { RhythmToggleButton.setDoubleRhythm(e); }
      if (KEY_O && KEY_R) { RhythmToggleButton.setOffRhythm(e); }
    }

    if (root === 'fluid') {
      if (KEY_S && KEY_R) { RhythmToggleButton.setSingleRhythm(e); }
      if (KEY_O && KEY_R) { RhythmToggleButton.setOffRhythm(e); }
    }
  }
};

RhythmToggleButton.prototype.handleKeyUp = function handleKeyUp (e) {
    var this$1 = this;

  if (e.keyCode in this.keyMap) {
    setTimeout(function () {
      this$1.keyMap[e.keyCode] = false;
    }, 500);
  }
};

RhythmToggleButton.prototype.addTo = function addTo (elem) {
  var parentElem = document.querySelector(elem);
  var renderedBtn = this.render();
  var theFirstChild = parentElem.firstChild;
  parentElem.insertBefore(renderedBtn, theFirstChild);

  var toggleRhythm = function () {
    var state = store.getState();

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
};

RhythmToggleButton.prototype.render = function render () {
    var this$1 = this;

  var ref = this.options;
    var zIndex = ref.zIndex;
  var buttonElem = document.createElement('button');
  var state = store.getState();
  buttonElem.textContent = helpers_12(state);
  buttonElem.style.cssText = "\n      z-index: " + zIndex + ";\n    ";
  buttonElem.setAttribute('data-button', 'typographist');

  buttonElem.addEventListener('click', function () {
    this$1.handleClick();
  });

  store.subscribe(function () {
    var $state = store.getState();
    buttonElem.textContent = helpers_12($state);
  });

  window.addEventListener('keydown', this.handleKeyDown);
  window.addEventListener('keyup', this.handleKeyUp);

  return buttonElem;
};

return RhythmToggleButton;

})));
