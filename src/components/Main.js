import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { uiTheme } from '../consts/styles';

const Main = props => (
  <ThemeProvider uiTheme={uiTheme}>
    <Toolbar
      leftElement="menu"
      centerElement="Greenka"
      onLeftElementPress={() => props.navigation.openDrawer()}
    />
  </ThemeProvider>
);

Main.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default Main;
