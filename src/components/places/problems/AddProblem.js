import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, ScrollView, StatusBar, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import Snackbar from 'react-native-snackbar';
import { LOCATION } from '../../../consts/appConsts';
import { formContainer, uiTheme } from '../../../consts/styles';
import NavigationService from '../../../services/NavigationService';
import ProblemsService from '../../../services/ProblemsService';
import AddressField from '../AddressField';

class AddProblem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressString: this.props.addressString,
      location: this.props.location,
      type: this.props.type,
      description: this.props.description,
      isDataFetched: false,
      showAddressError: false,
      showTypeError: false,
    };
  }

  async componentDidMount() {
    const location = JSON.parse(await AsyncStorage.getItem('location'));
    const types = await ProblemsService.getProblemsTypes();

    this.setState({
      location,
      types,
      isDataFetched: true,
    });
  }

  getPage() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <StatusBar
            backgroundColor={COLOR.green900}
            barStyle="light-content"
          />

          <Toolbar
            leftElement="close"
            centerElement="Описати проблему"
            rightElement="send"
            onLeftElementPress={NavigationService.goToHome}
            onRightElementPress={this.handleSubmit}
            style={{
              container: {
                elevation: 0,
              },
            }}
          />

          <ScrollView style={formContainer}>
            <AddressField
              addressString={this.state.addressString}
              location={this.state.location}
              showAddressError={this.state.showAddressError}
              onAddressChange={this.handleAddressChange}
            />

            <View>
              <Dropdown
                label="Тип*"
                value={this.state.type.value}
                error={this.state.showTypeError ? 'Вкажіть тип проблеми' : ''}
                data={this.state.types}
                onChangeText={this.handleTypeChange}
              />
            </View>

            <View>
              <TextField
                multiline
                label="Додатковий опис"
                value={this.state.description}
                onChangeText={this.handleDescriptionChange}
              />
            </View>
          </ScrollView>
        </Fragment>
      </ThemeProvider>
    );
  }

  handleSubmit = async () => {
    const showAddressError = this.state.addressString === '';
    const showTypeError = this.state.type.value === '';

    this.setState({ showAddressError, showTypeError });

    if (!(showAddressError || showTypeError)) {
      const problem = {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        problem_type: this.state.type.id,
      };

      if (this.state.description) {
        problem.description = this.state.description;
      }

      try {
        await ProblemsService.create(problem);

        this.setState({
          addressString: this.props.addressString,
          location: this.state.userLocation,
          type: this.props.type,
          description: this.props.description,
          showAddressError: false,
          showTypeError: false,
        });

        Snackbar.show({
          title: 'Проблему внесено',
          duration: Snackbar.LENGTH_SHORT,
        });
      } catch (e) {
        Alert.alert(
          '',
          'Не вдалось внести проблему',
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

  handleAddressChange = address => {
    this.setState({
      addressString: address.addressString,
      location: address.location,
      showAddressError: false,
    });
  };

  handleTypeChange = (value, index) => {
    this.setState({
      type: { id: index, value },
      showTypeError: false,
    });
  };

  handleDescriptionChange = description => {
    this.setState({ description });
  };

  render() {
    return (
      this.state.isDataFetched
        ? this.getPage()
        : (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={uiTheme.palette.primaryColor} />
          </View>
        )
    );
  }
}

AddProblem.propTypes = {
  addressString: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
  type: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  }),
  description: PropTypes.string,
};

AddProblem.defaultProps = {
  addressString: '',
  location: LOCATION,
  type: { id: 0, value: '' },
  description: '',
};

export default AddProblem;
