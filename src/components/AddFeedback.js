import React, { Component, Fragment } from 'react';
import { Alert, Keyboard, ScrollView, StatusBar } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import SnackBar from 'react-native-snackbar';
import { formContainer, uiTheme } from '../consts/styles';
import NavigationService from '../services/NavigationService';
import UserService from '../services/UserService';

class AddFeedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedback: '',
    };
  }

  onSubmit = async () => {
    Keyboard.dismiss();

    try {
      await UserService.AddFeedback(this.state.feedback);

      NavigationService.goToHome();

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

  onChangeText = feedback => {
    this.setState({ feedback });
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
            rightElement={this.state.feedback !== '' ? 'send' : ''}
            onLeftElementPress={NavigationService.goToHome}
            onRightElementPress={this.onSubmit}
          />

          <ScrollView style={formContainer}>
            <TextField
              multiline
              autoFocus
              label=""
              placeholder="Відгук"
              value={this.state.feedback}
              onChangeText={this.onChangeText}
            />
          </ScrollView>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default AddFeedback;
