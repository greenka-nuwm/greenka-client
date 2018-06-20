import update from 'immutability-helper';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import SnackBar from 'react-native-snackbar';
import AsyncStorage from 'rn-async-storage';
import { ACTIVE_FILTERS, LOCATION, TREES_STATES } from '../../../consts/appConsts';
import { formContainer, uiTheme } from '../../../consts/styles';
import NavigationService from '../../../services/NavigationService';
import TreesService from '../../../services/TreesService';
import { locationType, objectType } from '../../../types';
import AddressField from '../AddressField';
import PhotoUploader from '../PhotoUploader';

class AddTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressString: this.props.addressString,
      location: this.props.location,
      state: this.props.state,
      type: this.props.type,
      sort: this.props.sort,
      description: this.props.description,
      states: TREES_STATES.map(state => ({ value: state.value })),
      isDataFetched: false,
      showAddressError: false,
      showStateError: false,
      images: [],
      formDatas: [],
    };
  }

  async componentDidMount() {
    const location = JSON.parse(await AsyncStorage.getItem('location'));
    const types = await TreesService.getTreesTypes();
    const sorts = await TreesService.getTreesSorts();

    this.setState({
      location,
      types,
      sorts,
      allSorts: sorts,
      isDataFetched: true,
    });
  }

  handleSubmit = async () => {
    const showAddressError = this.state.addressString === '';
    const showStateError = this.state.state.value === '';

    this.setState({ showAddressError, showStateError });

    if (!(showAddressError || showStateError)) {
      const tree = {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        tree_state: this.state.state.id + 1,
      };

      if (this.state.type.value) {
        tree.tree_type = this.state.type.id + 1;
      }

      if (this.state.sort.value) {
        tree.tree_sort = this.state.sort.id + 1;
      }

      if (this.state.description) {
        tree.description = this.state.description;
      }

      try {
        const { id } = await TreesService.create(tree);

        this.state.formDatas.forEach(async photo => {
          await TreesService.uploadPhoto(id, photo);
        });

        const location = {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        const activeFilters = JSON.parse(await AsyncStorage.getItem('activeFilters')) || ACTIVE_FILTERS;
        const newFilter = ACTIVE_FILTERS[this.state.state];
        const newFilters = activeFilters.includes(newFilter)
          ? activeFilters.filter(filter => filter !== newFilter)
          : [...activeFilters, newFilter];

        AsyncStorage.setItem('activeFilters', JSON.stringify(newFilters));

        NavigationService.goToHome(location);

        SnackBar.show({
          title: 'Дерево внесено',
          duration: SnackBar.LENGTH_SHORT,
        });
      } catch (e) {
        Alert.alert(
          '',
          'Не вдалось внести дерево',
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

  handleStateChange = (value, index) => {
    this.setState({
      state: { id: index, value },
      showStateError: false,
    });
  };

  handleTypeChange = (value, index) => {
    this.setState({
      type: { id: index, value },
      sort: { id: null, value: '' },
      sorts: this.state.allSorts.filter(sort => sort.treeType === (index + 1)),
    });
  };

  handleSortChange = (value, index) => {
    this.setState({ sort: { id: index, value } });
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
          <Toolbar
            leftElement="close"
            centerElement="Внести дерево"
            rightElement="send"
            onLeftElementPress={NavigationService.goToHome}
            onRightElementPress={this.handleSubmit}
            style={{ container: { elevation: 0 } }}
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

AddTree.propTypes = {
  addressString: PropTypes.string,
  location: locationType,
  state: objectType,
  type: objectType,
  sort: objectType,
  description: PropTypes.string,
};

AddTree.defaultProps = {
  addressString: '',
  location: LOCATION,
  state: { id: 0, value: '' },
  type: { id: 0, value: '' },
  sort: { id: 0, value: '' },
  description: '',
};

export default AddTree;
