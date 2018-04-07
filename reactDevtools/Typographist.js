import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleRhythm, toggleFluidRhythm, setRhythm } from './verticalRhythm';
import getFirstWord from './helpers/getFirstWord';

class TypographistContainer extends Component {
  static propTypes = {
    rhythm: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
    root: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    83: false,
    68: false,
    79: false,
    82: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  setSingleRhythm = e => {
    this.props.dispatch(setRhythm('singleRhythm'));
    e.preventDefault();
  };

  setDoubleRhythm = e => {
    this.props.dispatch(setRhythm('doubleRhythm'));
    e.preventDefault();
  };

  setOffRhythm = e => {
    this.props.dispatch(setRhythm('offRhythm'));
    e.preventDefault();
  };

  handleClick = () => {
    const { root } = this.props;

    if (!root) {
      this.props.dispatch(toggleRhythm());
    }

    if (root === 'fluid') {
      this.props.dispatch(toggleFluidRhythm());
    }
  };

  handleKeyDown = e => {
    const { root } = this.props;
    if (e.keyCode in this.state) {
      this.state[e.keyCode] = true;

      const KEY_S = this.state[83];
      const KEY_D = this.state[68];
      const KEY_O = this.state[79];
      const KEY_R = this.state[82];

      if (!root) {
        if (KEY_S && KEY_R) this.setSingleRhythm(e);
        if (KEY_D && KEY_R) this.setDoubleRhythm(e);
        if (KEY_O && KEY_R) this.setOffRhythm(e);
      }

      if (root === 'fluid') {
        if (KEY_S && KEY_R) this.setSingleRhythm(e);
        if (KEY_O && KEY_R) this.setOffRhythm(e);
      }
    }
  };

  handleKeyUp = e => {
    const { keyCode } = e;

    if (keyCode in this.state) {
      setTimeout(() => {
        this.setState({ [keyCode]: false });
      }, 500);
    }
  };

  render() {
    const { rhythm, children, className } = this.props;
    return (
      <div
        data-rhythm={rhythm ? getFirstWord(rhythm) : 'off'}
        className={className}
      >
        {children}
      </div>
    );
  }
}

const IS_DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const mapStateToProps = state => {
  let result = null;
  if (IS_DEVELOPMENT) {
    result = { rhythm: state.verticalRhythm.rhythm };
  } else {
    result = { rhythm: '' };
  }

  return result;
};

export default connect(mapStateToProps)(TypographistContainer);
