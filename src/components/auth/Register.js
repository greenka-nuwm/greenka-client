import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Button, COLOR, ThemeProvider } from 'react-native-material-ui';
import SnackBar from 'react-native-snackbar';
import { formContainer, uiTheme } from '../../consts/styles';
import AuthService from '../../services/AuthService';

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    color: COLOR.white,
    alignSelf: 'center',
  },
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  handleSubmit = async () => {
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ passwordConfirm: '' });

      Alert.alert(
        '',
        'Паролі не збігаються!',
        [
          {
            text: 'Ок',
            style: 'cancel',
          },
        ],
      );
    } else {
      const data = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };

      try {
        await AuthService.register(data);

        this.props.navigation.navigate('Login');

        SnackBar.show({
          title: 'Вітаємо! Вас зареєстровано!',
          duration: SnackBar.LENGTH_SHORT,
        });
      } catch (e) {
        Alert.alert(
          '',
          'Не вдалось зареєструватися',
          [
            {
              text: 'Ок',
              style: 'cancel',
            },
          ],
        );
      }
    }
  };

  handleUsernameChange = username => {
    this.setState({ username });
  };

  handleFirstNameChange = firstName => {
    this.setState({ firstName });
  };

  handleLastNameChange = lastName => {
    this.setState({ lastName });
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  handlePasswordConfirmChange = passwordConfirm => {
    this.setState({ passwordConfirm });
  };

  render() {
    return (
      <Fragment>
        <StatusBar
          backgroundColor={COLOR.green900}
          barStyle="light-content"
        />

        <ScrollView
          style={{
            ...formContainer,
            paddingTop: 10,
            flex: 1,
            backgroundColor: uiTheme.palette.primaryColor,
          }}
          contentContainerStyle={{
            justifyContent: 'center',
          }}
        >
          <Text style={styles.title}>Реєстрація</Text>

          <TextField
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Логін*"
            value={this.state.username}
            onChangeText={this.handleUsernameChange}
          />

          <TextField
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Ім'я"
            value={this.state.firstName}
            onChangeText={this.handleFirstNameChange}
          />

          <TextField
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Прізвище"
            value={this.state.lastName}
            onChangeText={this.handleLastNameChange}
          />

          <TextField
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Email"
            value={this.state.email}
            onChangeText={this.handleEmailChange}
          />

          <TextField
            secureTextEntry
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Пароль*"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
          />

          <TextField
            secureTextEntry
            textColor={COLOR.white}
            baseColor={COLOR.white}
            tintColor={COLOR.white}
            label="Підтвердження паролю*"
            value={this.state.passwordConfirm}
            onChangeText={this.handlePasswordConfirmChange}
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
              text="Зареєструватися"
              onPress={this.handleSubmit}
            />
          </ThemeProvider>
        </ScrollView>
      </Fragment>
    );
  }
}

Register.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Register;
