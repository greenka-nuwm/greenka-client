import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import { uiTheme } from '../consts/styles';
import NavigationService from '../services/NavigationService';

const Info = () => (
  <ThemeProvider uiTheme={uiTheme}>
    <Fragment>
      <StatusBar
        backgroundColor={COLOR.green900}
        barStyle="light-content"
      />

      <Toolbar
        leftElement="arrow-back"
        centerElement="Довідка"
        onLeftElementPress={NavigationService.goToHome}
      />
    </Fragment>
  </ThemeProvider>
);

export default Info;
