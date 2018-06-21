import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Alert, StatusBar, StyleSheet, Text, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button, COLOR, ThemeProvider } from 'react-native-material-ui';
import { formContainer, uiTheme } from '../../consts/styles';

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
    // const data = {
    //   username: this.state.username,
    //   password: this.state.password,
    // };

    try {
      // TODO: fix this
      // await AuthService.login(data);

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

  goToRegisterPage = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <Fragment>
        <StatusBar
          backgroundColor={COLOR.green900}
          barStyle="light-content"
        />

        <View
          style={{
            ...formContainer,
            flex: 1,
            justifyContent: 'center',
            backgroundColor: uiTheme.palette.primaryColor,
          }}
        >
          <Text style={styles.logo}>greenka</Text>

          <TextField
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Логін"
            value={this.state.username}
            onChangeText={this.handleUsernameChange}
          />

          <TextField
            secureTextEntry
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Пароль"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
          />

          <ThemeProvider uiTheme={uiTheme}>
            <Button
              raised
              style={{
                container: {
                  marginTop: 10,
                  height: 40,
                },
                text: {
                  color: uiTheme.palette.primaryColor,
                },
              }}
              text="Увійти"
              onPress={this.handleSubmit}
            />
          </ThemeProvider>

          <Text
            onPress={this.goToRegisterPage}
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
