import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { uiTheme } from '../consts/styles';

const Info = props => (
  <ThemeProvider uiTheme={uiTheme}>
    <Toolbar
      leftElement="menu"
      centerElement="Довідка"
      onLeftElementPress={() => props.navigation.openDrawer()}
    />
  </ThemeProvider>
);

Info.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default Info;
