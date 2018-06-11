import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import { uiTheme } from '../consts/styles';

const Info = props => (
  <ThemeProvider uiTheme={uiTheme}>
    <Fragment>
      <StatusBar
        backgroundColor={COLOR.green900}
        barStyle="light-content"
      />

      <Toolbar
        leftElement="arrow-back"
        centerElement="Довідка"
        onLeftElementPress={() => {
          props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        }}
      />
    </Fragment>
  </ThemeProvider>
);

Info.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default Info;
