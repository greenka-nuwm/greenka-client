import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, ScrollView, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import { formContainer, uiTheme } from '../../consts/styles';
import { LOCATION } from '../../consts/appConsts';
import ProblemsService from '../../services/ProblemsService';
import AddressField from './AddressField';

class AddProblem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      address: this.props.address,
      type: this.props.type,
      description: this.props.description,
      types: [],
      showNameError: false,
      showAddressError: false,
      showTypeError: false,
    };
  }

  async componentDidMount() {
    const location = JSON.parse(await AsyncStorage.getItem('location'));
    const types = await ProblemsService.getProblemsTypes();

    this.setState({ address: { location }, types });
  }

  handleSubmit() {
    const showNameError = this.state.name === '';
    const showAddressError = this.state.address.addressString === '';
    const showTypeError = this.state.type.value === '';

    this.setState({ showNameError, showAddressError, showTypeError });

    if (!(showNameError || showAddressError || showTypeError)) {
      const problem = {
      };

      ProblemsService.create(problem);
    }
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <Toolbar
            leftElement="close"
            centerElement="Описати проблему"
            rightElement="send"
            onLeftElementPress={() => {
              this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
            }}
            onRightElementPress={() => this.handleSubmit()}
            style={{
              container: {
                elevation: 0,
              },
            }}
          />

          <ScrollView style={formContainer}>
            <View>
              <TextField
                multiline
                label="Назва*"
                value={this.state.name}
                error={this.state.showNameError ? 'Вкажіть ім\'я' : ''}
                onChangeText={value => {
                  this.updateState(value, 'name');
                  this.setState({ showNameError: false });
                }}
              />
            </View>

            <AddressField
              address={this.state.address}
              showAddressError={this.state.showAddressError}
            />

            <View>
              <Dropdown
                label="Тип*"
                value={this.state.type.value}
                error={this.state.showTypeError ? 'Вкажіть тип проблеми' : ''}
                data={this.state.types}
                onChangeText={(value, index) => {
                  this.setState({
                    type: { id: index, value },
                    showTypeError: false,
                  });
                }}
              />
            </View>

            <View>
              <TextField
                multiline
                label="Додатковий опис"
                value={this.state.description}
                onChangeText={description => this.setState({ description })}
              />
            </View>
          </ScrollView>
        </Fragment>
      </ThemeProvider>
    );
  }
}

AddProblem.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string,
  address: PropTypes.shape({
    addressString: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
  }),
  type: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  }),
  description: PropTypes.string,
};

AddProblem.defaultProps = {
  name: '',
  address: { addressString: '', location: LOCATION },
  type: { id: 0, value: '' },
  description: '',
};

export default AddProblem;
