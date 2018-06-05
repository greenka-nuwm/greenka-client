import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import { uiTheme } from '../consts/styles';

const Places = props => (
  <ThemeProvider uiTheme={uiTheme}>
    <Fragment>
      <Toolbar
        leftElement="arrow-back"
        centerElement="Ваші місця"
        onLeftElementPress={() => {
          props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        }}
      />
    </Fragment>
  </ThemeProvider>
);

Places.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default Places;
