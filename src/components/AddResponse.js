import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Alert, Keyboard, ScrollView, StatusBar } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import SnackBar from 'react-native-snackbar';
import { formContainer, uiTheme } from '../consts/styles';
import NavigationService from '../services/NavigationService';

class AddResponse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
    };
  }

  onSubmit = async () => {
    Keyboard.dismiss();

    // TODO: add endpoint
    try {
      await axios.post('', this.state.response);

      this.setState({ response: '' });

      SnackBar.show({
        title: 'Відгук надіслано',
        duration: SnackBar.LENGTH_SHORT,
      });
    } catch (e) {
      Alert.alert(
        '',
        'Не вдалось надіслати',
        [{ text: 'Ок', style: 'cancel' }],
      );
    }
  };

  onChangeText = response => {
    this.setState({ response });
  };

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <StatusBar
            backgroundColor={COLOR.green900}
            barStyle="light-content"
          />

          <Toolbar
            leftElement="close"
            centerElement="Надіслати відгук"
            rightElement={this.state.response !== '' ? 'send' : ''}
            onLeftElementPress={NavigationService.goToHome}
            onRightElementPress={this.onSubmit}
          />

          <ScrollView style={formContainer}>
            <TextField
              multiline
              autoFocus
              label=""
              placeholder="Відгук"
              value={this.state.response}
              onChangeText={this.onChangeText}
            />
          </ScrollView>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default AddResponse;
