import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Button, COLOR, ThemeProvider } from 'react-native-material-ui';
import AsyncStorage from 'rn-async-storage';
import { greenView, loginButton, uiTheme } from '../../consts/styles';
import NavigationService from '../../services/NavigationService';

const styles = StyleSheet.create({
  logo: {
    marginBottom: 10,
    fontSize: 52,
    color: COLOR.white,
    alignSelf: 'center',
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
});

class Enter extends Component {
  skipLogin = async () => {
    await AsyncStorage.setItem('isSkippedLogin', 'true');

    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <Fragment>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.3)"
          barStyle="light-content"
          translucent
        />

        <View style={greenView}>
          <Text style={styles.logo}>greenka</Text>

          <ThemeProvider uiTheme={uiTheme}>
            <Fragment>
              <Button
                raised
                style={loginButton}
                text="Увійти"
                onPress={NavigationService.goToLogin}
              />

              <View style={styles.bottomButtonsContainer}>
                <Button
                  style={{ text: { color: COLOR.white } }}
                  text="Перейти до додатку"
                  onPress={this.skipLogin}
                />

                <Button
                  style={{ text: { color: COLOR.white } }}
                  text="Зареєструватися"
                  onPress={NavigationService.goToRegister}
                />
              </View>
            </Fragment>
          </ThemeProvider>
        </View>
      </Fragment>
    );
  }
}

Enter.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Enter;
