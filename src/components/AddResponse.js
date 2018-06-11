import axios from 'axios';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Keyboard, Alert, StatusBar } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Snackbar from 'react-native-snackbar';
import { NavigationActions } from 'react-navigation';
import { formContainer, uiTheme } from '../consts/styles';

class AddResponse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: '',
    };
  }

  async onSubmit() {
    Keyboard.dismiss();

    // TODO: add endpoint
    try {
      await axios.post('', this.state.response);

      this.setState({ response: '' });

      Snackbar.show({
        title: 'Відгук надіслано',
        duration: Snackbar.LENGTH_SHORT,
      });
    } catch (e) {
      Alert.alert(
        '',
        'Не вдалось надіслати',
        [
          {
            text: 'Ок',
            style: 'cancel',
          },
        ],
      );
    }
  }

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
            onLeftElementPress={() => {
              this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
            }}
            onRightElementPress={() => this.onSubmit()}
          />

          <ScrollView style={formContainer}>
            <TextField
              multiline
              autoFocus
              label=""
              placeholder="Відгук"
              value={this.state.response}
              onChangeText={response => this.setState({ response })}
            />
          </ScrollView>
        </Fragment>
      </ThemeProvider>
    );
  }
}

AddResponse.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default AddResponse;
