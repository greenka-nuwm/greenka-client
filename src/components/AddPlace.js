import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { uiTheme } from '../consts/styles';

const AddPlace = props => (
  <ThemeProvider uiTheme={uiTheme}>
    <Toolbar
      leftElement="menu"
      centerElement="Додати місце"
      onLeftElementPress={() => props.navigation.openDrawer()}
    />
  </ThemeProvider>
);

AddPlace.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddPlace;
