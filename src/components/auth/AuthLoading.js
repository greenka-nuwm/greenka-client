import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { COLOR } from 'react-native-material-ui';
import AsyncStorage from 'rn-async-storage';
import { uiTheme } from '../../consts/styles';

class AuthLoading extends Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');

    this.props.navigation.navigate(token ? 'App' : 'Auth');
  }

  render() {
    return (
      <Fragment>
        <StatusBar
          backgroundColor={COLOR.green900}
          barStyle="light-content"
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: uiTheme.palette.primaryColor,
          }}
        >
          <ActivityIndicator size="large" color={COLOR.white} />
        </View>
      </Fragment>
    );
  }
}

AuthLoading.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthLoading;
