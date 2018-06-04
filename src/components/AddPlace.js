import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import {
  View,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown';
import {
  Button,
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';
import { TextField } from 'react-native-material-textfield';
import RNGooglePlaces from 'react-native-google-places';
import { uiTheme } from '../consts/styles';
import { LOCATION } from '../consts/appConsts';
import TreesService from '../services/TreesService';
import AddPlaceModal from './AddPlaceModal';

const styles = StyleSheet.create({
  buttonText: {
    color: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    height: 100,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
});

class AddPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {
        title: this.props.place.title,
        address: this.props.place.address,
        state: this.props.place.state,
        type: this.props.place.type,
        sort: this.props.place.sort,
        description: this.props.place.description,
      },
      titleError: false,
      addressError: false,
      stateError: false,
      treesTypes: [],
      treesSorts: [],
      allTreesSorts: [],
      treesStates: [],
      modalVisible: false,
    };
  }

  async componentDidMount() {
    const treesTypes = await TreesService.getTreesTypes();
    const treesSorts = await TreesService.getTreesSorts();
    const treesStates = await TreesService.getTreesStates();

    this.setState({
      treesTypes,
      treesSorts,
      treesStates,
      allTreesSorts: treesSorts,
    });

    const location = await AsyncStorage.getItem('location');

    this.setState(update(this.state, {
      place: {
        address: {
          location: {
            $set: JSON.parse(location),
          },
        },
      },
    }));
  }

  getForm() {
    return (
      <ScrollView>
        <View>
          <TextField
            multiline
            label="Назва*"
            value={this.state.place.title}
            error={this.state.titleError ? 'Вкажіть ім\'я' : ''}
            onChangeText={value => {
              this.updateState(value, 'title');
              this.setState({ titleError: false });
            }}
          />
        </View>

        <View>
          <View>
            <TouchableOpacity onPress={() => this.openSearchModal()}>
              <TextField
                multiline
                editable={false}
                label="Адреса*"
                value={this.state.place.address.addressString}
                error={this.state.addressError ? 'Вкажіть адресу' : ''}
              />
            </TouchableOpacity>
          </View>

          <View>
            <MapView
              style={StyleSheet.absoluteFillObject}
              region={this.state.place.address.location}
            />

            <Button
              style={{ text: styles.buttonText, container: styles.buttonContainer }}
              upperCase={false}
              text="Позначити місце на карті*"
              onPress={() => this.toggleModalVisibility()}
            />

            <Modal
              animationType="slide"
              visible={this.state.modalVisible}
              onRequestClose={() => this.toggleModalVisibility()}
            >
              <AddPlaceModal
                address={this.state.place.address}
                onClose={() => this.toggleModalVisibility()}
                onSubmit={address => this.handleModalSubmit(address)}
              />
            </Modal>
          </View>
        </View>

        <View>
          <Dropdown
            label="Стан*"
            value={this.state.place.state.value}
            error={this.state.stateError ? 'Вкажіть стан дерева' : ''}
            data={this.state.treesStates}
            onChangeText={(value, index) => {
              this.updateState({ id: index, value }, 'state');
              this.setState({ stateError: false });
            }}
          />
        </View>

        <View>
          <Dropdown
            label="Вид дерева"
            value={this.state.place.type.value}
            data={this.state.treesTypes}
            onChangeText={(value, index) => {
              this.updateState({ id: index, value }, 'type');
              this.updateState({ id: null, value: '' }, 'sort');
              this.setState({
                treesSorts: this.state.allTreesSorts.filter(sort => sort.treeType === (index + 1)),
              });
            }}
          />
        </View>

        <View>
          <Dropdown
            label="Порода дерева"
            value={this.state.place.sort.value}
            data={this.state.treesSorts}
            onChangeText={(value, index) => this.updateState({ id: index, value }, 'sort')}
          />
        </View>

        <View>
          <TextField
            multiline
            label="Додатковий опис"
            value={this.state.place.description}
            onChangeText={value => this.updateState(value, 'description')}
          />
        </View>
      </ScrollView>
    );
  }

  handleModalSubmit(address) {
    this.updateState(address, 'address');
    this.toggleModalVisibility();
  }

  handleSubmit() {
    this.setState({
      titleError: this.state.place.title === '',
      addressError: this.state.place.address.addressString === '',
      stateError: this.state.place.state.value === '',
    });

    if (!(this.state.titleError || this.state.addressError || this.state.stateError)) {
      const tree = {
        latitude: this.state.place.address.location.latitude,
        longitude: this.state.place.address.location.longitude,
        tree_state: this.state.place.state.id,
      };

      if (this.state.place.type.value) {
        tree.tree_type = this.state.place.type.id;
      }

      if (this.state.place.sort.value) {
        tree.tree_sort = this.state.place.sort.id;
      }

      if (this.state.place.description) {
        tree.description = this.state.place.description;
      }

      TreesService.create(tree);
    }
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        this.updateState(place.address, 'addressString', 'address');
        this.setState(update(this.state, {
          place: {
            address: {
              location: {
                latitude: { $set: place.latitude },
                longitude: { $set: place.longitude },
              },
            },
          },
        }));
        this.setState({ addressError: false });
      })
      .catch(error => console.log(error.message));
  }

  toggleModalVisibility() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  updateState(value, propName, parentPropName = null) {
    const newProperty = parentPropName
      ? { [parentPropName]: { [propName]: { $set: value } } }
      : { [propName]: { $set: value } };
    const newState = update(this.state, {
      place: newProperty,
    });

    this.setState(newState);
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <Toolbar
            leftElement="menu"
            centerElement="Додати місце"
            rightElement={this.state.addressString !== '' ? 'send' : ''}
            onLeftElementPress={() => this.props.navigation.openDrawer()}
            onRightElementPress={() => this.handleSubmit()}
          />

          <View style={styles.formContainer}>
            {this.getForm()}
          </View>
        </Fragment>
      </ThemeProvider>
    );
  }
}

AddPlace.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
  place: PropTypes.shape({
    title: PropTypes.string,
    address: PropTypes.shape({
      addressString: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        latitudeDelta: PropTypes.number,
        longitudeDelta: PropTypes.number,
      }),
    }),
    state: {
      id: PropTypes.number,
      value: PropTypes.string,
    },
    type: {
      id: PropTypes.number,
      value: PropTypes.string,
    },
    sort: {
      id: PropTypes.number,
      value: PropTypes.string,
    },
    description: PropTypes.string,
  }),
};

AddPlace.defaultProps = {
  place: {
    title: '',
    address: { addressString: '', location: LOCATION },
    state: { id: null, value: '' },
    type: { id: null, value: '' },
    sort: { id: null, value: '' },
    description: '',
  },
};

export default AddPlace;
