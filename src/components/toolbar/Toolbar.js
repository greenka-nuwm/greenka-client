import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar } from 'react-native-material-ui';

const GreenkaToolbar = props => <Toolbar {...props} />;

GreenkaToolbar.propTypes = {
  leftElement: PropTypes.string.isRequired,
  centerElement: PropTypes.string.isRequired,
  rightElement: PropTypes.string,
  onLeftElementPress: PropTypes.func.isRequired,
  onRightElementPress: PropTypes.func,
};

GreenkaToolbar.defaultProps = {
  rightElement: null,
  onRightElementPress: null,
};

export default GreenkaToolbar;
