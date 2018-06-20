import update from 'immutability-helper';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Alert, ScrollView, StatusBar, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import SnackBar from 'react-native-snackbar';
import AsyncStorage from 'rn-async-storage';
import { ACTIVE_FILTERS, LOCATION } from '../../../consts/appConsts';
import { formContainer, uiTheme } from '../../../consts/styles';
import NavigationService from '../../../services/NavigationService';
import ProblemsService from '../../../services/ProblemsService';
import { locationType, objectType } from '../../../types';
import AddressField from '../AddressField';
import PhotoUploader from '../PhotoUploader';

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
      images: [],
      formDatas: [],
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

  handleSubmit = async () => {
    const showAddressError = this.state.addressString === '';
    const showTypeError = this.state.type.value === '';

    this.setState({ showAddressError, showTypeError });

    if (!(showAddressError || showTypeError)) {
      const problem = {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        problem_type: this.state.type.id + 1,
      };

      if (this.state.description) {
        problem.description = this.state.description;
      }

      try {
        const { id } = await ProblemsService.create(problem);

        this.state.formDatas.forEach(async photo => {
          await ProblemsService.uploadPhoto(id, photo);
        });

        const location = {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        const activeFilters = JSON.parse(await AsyncStorage.getItem('activeFilters')) || ACTIVE_FILTERS;
        const newFilter = this.state.type.name;
        const newFilters = activeFilters.includes(newFilter)
          ? activeFilters.filter(filter => filter !== newFilter)
          : [...activeFilters, newFilter];

        AsyncStorage.setItem('activeFilters', JSON.stringify(newFilters));

        NavigationService.goToHome(location);

        SnackBar.show({
          title: 'Проблему внесено',
          duration: SnackBar.LENGTH_SHORT,
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
      addressString: address.fullAddress,
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

  handleImageDelete = index => {
    this.setState(update(this.state, {
      images: { $splice: [[index, 1]] },
    }));
  };


  handleAddImage = (uri, formData) => {
    this.setState(update(this.state, {
      images: { $push: [uri] },
      formDatas: { $push: [formData] },
    }));
  };

  renderPage() {
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

            <PhotoUploader
              images={this.state.images}
              onImageDelete={this.handleImageDelete}
              onAddImage={this.handleAddImage}
            />
          </ScrollView>
        </Fragment>
      </ThemeProvider>
    );
  }

  render() {
    return (
      this.state.isDataFetched
        ? this.renderPage()
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
  location: locationType,
  type: objectType,
  description: PropTypes.string,
};

AddProblem.defaultProps = {
  addressString: '',
  location: LOCATION,
  type: { id: 0, value: '' },
  description: '',
};

export default AddProblem;
