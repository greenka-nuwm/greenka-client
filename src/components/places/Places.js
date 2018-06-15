// import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import { uiTheme } from '../../consts/styles';
import NavigationService from '../../services/NavigationService';

const Places = () => (
  <ThemeProvider uiTheme={uiTheme}>
    <Fragment>
      <StatusBar
        backgroundColor={COLOR.green900}
        barStyle="light-content"
      />

      <Toolbar
        leftElement="arrow-back"
        centerElement="Ваші місця"
        onLeftElementPress={NavigationService.goToHome}
      />
    </Fragment>
  </ThemeProvider>
);

Places.propTypes = {
};

export default Places;
