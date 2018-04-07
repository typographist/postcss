import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleRhythm, toggleFluidRhythm } from './verticalRhythm';
import { IS_DEVELOPMENT } from './constants';

import normalizeText from './helpers/normalizeText';

const RhythmToggleButton = ({ rhythm, handleClick }) => (
  <button
    data-name="typographist"
    onClick={handleClick}
    style={{ display: rhythm ? 'block' : 'none' }}
  >
    {normalizeText(rhythm)}
  </button>
);

const mapStateToProps = state => {
  let result = null;
  if (IS_DEVELOPMENT) {
    result = { rhythm: state.verticalRhythm.rhythm };
  } else {
    result = { rhythm: '' };
  }

  return result;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleClick: () => {
    const { root } = ownProps;
    if (IS_DEVELOPMENT) {
      if (!root) {
        dispatch(toggleRhythm());
      }

      if (root === 'fluid') {
        dispatch(toggleFluidRhythm());
      }
    }
  },
});

RhythmToggleButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  rhythm: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RhythmToggleButton);
