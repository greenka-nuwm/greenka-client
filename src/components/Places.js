import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { uiTheme } from '../consts/styles';

const Places = props => (
  <ThemeProvider uiTheme={uiTheme}>
    <Toolbar
      leftElement="menu"
      centerElement="Ваші місця"
      onLeftElementPress={() => props.navigation.openDrawer()}
    />
  </ThemeProvider>
);

Places.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default Places;
