import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { uiTheme } from '../consts/styles';

const AddResponse = props => (
  <ThemeProvider uiTheme={uiTheme}>
    <Toolbar
      leftElement="menu"
      centerElement="Надіслати відгук"
      onLeftElementPress={() => props.navigation.openDrawer()}
    />
  </ThemeProvider>
);

AddResponse.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddResponse;
