import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import { uiTheme } from '../consts/styles';

const AddResponse = props => (
  <ThemeProvider uiTheme={uiTheme}>
    <Fragment>
      <Toolbar
        leftElement="close"
        centerElement="Надіслати відгук"
        onLeftElementPress={() => {
          props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
        }}
      />
    </Fragment>
  </ThemeProvider>
);

AddResponse.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddResponse;
