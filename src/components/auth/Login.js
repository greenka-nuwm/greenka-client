import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button, COLOR, ThemeProvider } from 'react-native-material-ui';
import AsyncStorage from 'rn-async-storage';
import { greenView, loginButton, uiTheme } from '../../consts/styles';
import AuthService from '../../services/AuthService';
import NavigationService from '../../services/NavigationService';
import UserService from '../../services/UserService';

const styles = StyleSheet.create({
  logo: {
    fontSize: 52,
    color: COLOR.white,
    alignSelf: 'center',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit = async () => {
    const { username, password } = this.state;
    const data = { username, password };

    try {
      await AuthService.login(data);

      const user = await UserService.getUserProfile();

      await AsyncStorage.setItem('user', JSON.stringify(user));
      // eslint-disable-next-line react/destructuring-assignment
      this.props.navigation.navigate('App');
    } catch (e) {
      this.setState({ password: '' });

      Alert.alert(
        '',
        'Не вдалось увійти',
        [
          {
            text: 'Ок',
            style: 'cancel',
          },
        ],
      );
    }
  };

  handleUsernameChange = username => {
    this.setState({ username });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  render() {
    const { username, password } = this.state;

    return (
      <Fragment>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.3)"
          barStyle="light-content"
          translucent
        />

        <View style={greenView}>
          <Text style={styles.logo}>greenka</Text>

          <TextField
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Логін"
            value={username}
            onChangeText={this.handleUsernameChange}
          />

          <TextField
            secureTextEntry
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Пароль"
            value={password}
            onChangeText={this.handlePasswordChange}
          />

          <ThemeProvider uiTheme={uiTheme}>
            <Button
              raised
              style={loginButton}
              text="Увійти"
              onPress={this.handleSubmit}
            />
          </ThemeProvider>

          <Text
            onPress={NavigationService.goToRegister}
            style={{
              color: COLOR.white,
              marginTop: 8,
              fontSize: 16,
              alignSelf: 'center',
            }}
          >
            Зареєструватися
          </Text>
        </View>
      </Fragment>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
