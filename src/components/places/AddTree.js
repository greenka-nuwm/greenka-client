import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, ScrollView, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import { formContainer, uiTheme } from '../../consts/styles';
import { LOCATION } from '../../consts/appConsts';
import TreesService from '../../services/TreesService';
import AddressField from './AddressField';

class AddTree extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    this.state = {
      address: this.props.address,
      state: this.props.state,
      type: this.props.type,
      sort: this.props.sort,
      description: this.props.description,
      states: [],
      types: [],
      sorts: [],
      allSorts: [],
      showAddressError: false,
      showStateError: false,
    };
  }

  async componentDidMount() {
    const location = JSON.parse(await AsyncStorage.getItem('location'));
    const states = await TreesService.getTreesStates();
    const types = await TreesService.getTreesTypes();
    const sorts = await TreesService.getTreesSorts();

    this.setState({
      address: {
        location,
      },
      states,
      types,
      sorts,
      allSorts: sorts,
    });
  }

  handleSubmit() {
    const showAddressError = this.state.address.addressString === '';
    const showStateError = this.state.state.value === '';

    this.setState({ showAddressError, showStateError });

    if (!(showAddressError || showStateError)) {
      const tree = {
        latitude: this.state.address.location.latitude,
        longitude: this.state.address.location.longitude,
        tree_state: this.state.state.id,
      };

      if (this.state.type.value) {
        tree.tree_type = this.state.type.id;
      }

      if (this.state.sort.value) {
        tree.tree_sort = this.state.sort.id;
      }

      if (this.state.description) {
        tree.description = this.state.description;
      }

      TreesService.create(tree);
    }
  }

  handleAddressChange(address) {
    this.setState({ address, showAddressError: false });
  }

  handleStateChange(value, index) {
    this.setState({
      state: { id: index, value },
      showStateError: false,
    });
  }

  handleTypeChange(value, index) {
    this.setState({
      type: { id: index, value },
      sort: { id: null, value: '' },
      sorts: this.state.allSorts.filter(sort => sort.treeType === (index + 1)),
    });
  }

  handleSortChange(value, index) {
    this.setState({ sort: { id: index, value } });
  }

  handleDescriptionChange(description) {
    this.setState({ description });
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <Toolbar
            leftElement="close"
            centerElement="Внести дерево"
            rightElement="send"
            onLeftElementPress={() => {
              this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Home' }));
            }}
            onRightElementPress={this.handleSubmit}
            style={{
              container: {
                elevation: 0,
              },
            }}
          />

          <ScrollView style={formContainer}>
            <AddressField
              address={this.state.address}
              showAddressError={this.state.showAddressError}
              onAddressChange={this.handleAddressChange}
            />

            <View>
              <Dropdown
                label="Стан*"
                value={this.state.state.value}
                error={this.state.showStateError ? 'Вкажіть стан дерева' : ''}
                data={this.state.states}
                onChangeText={this.handleStateChange}
              />
            </View>

            <View>
              <Dropdown
                label="Вид дерева"
                value={this.state.type.value}
                data={this.state.types}
                onChangeText={this.handleTypeChange}
              />
            </View>

            <View>
              <Dropdown
                label="Порода дерева"
                value={this.state.sort.value}
                data={this.state.sorts}
                onChangeText={this.handleSortChange}
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
}

AddTree.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  address: PropTypes.shape({
    addressString: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
  }),
  state: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  }),
  type: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  }),
  sort: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
  }),
  description: PropTypes.string,
};

AddTree.defaultProps = {
  address: { addressString: '', location: LOCATION },
  state: { id: 0, value: '' },
  type: { id: 0, value: '' },
  sort: { id: 0, value: '' },
  description: '',
};

export default AddTree;
