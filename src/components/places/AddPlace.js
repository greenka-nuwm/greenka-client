import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { AsyncStorage, Dimensions } from 'react-native';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { NavigationActions } from 'react-navigation';
import { uiTheme } from '../../consts/styles';
import { LOCATION } from '../../consts/appConsts';
import TreesService from '../../services/TreesService';
import TreeForm from './TreeForm';
import ProblemForm from './ProblemForm';

class AddPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      place: {
        address: this.props.place.address,
        state: this.props.place.state,
        type: this.props.place.type,
        sort: this.props.place.sort,
        description: this.props.place.description,
        states: [],
        types: [],
        sorts: [],
        allSorts: [],
        showAddressError: false,
        showStateError: false,
      },
      problem: {
        name: this.props.problem.name,
        address: this.props.problem.address,
        type: this.props.problem.type,
        description: this.props.problem.description,
        types: [],
        showNameError: false,
        showAddressError: false,
        showTypeError: false,
      },
      index: 0,
      routes: [
        { key: 'tree', title: 'Дерево' },
        { key: 'problem', title: 'Проблема' },
      ],
    };
  }

  async componentDidMount() {
    const location = JSON.parse(await AsyncStorage.getItem('location'));
    const treesStates = await TreesService.getTreesStates();
    const treesTypes = await TreesService.getTreesTypes();
    const treesSorts = await TreesService.getTreesSorts();
    // const problemsTypes = await ProblemsService.getProblemsTypes();

    this.setState(update(this.state, {
      place: {
        address: {
          location: { $set: location },
        },
        states: { $set: treesStates },
        types: { $set: treesTypes },
        sorts: { $set: treesSorts },
        allSorts: { $set: treesSorts },
      },
      problem: {
        address: {
          location: { $set: location },
        },
        // types: { $set: problemsTypes },
      },
    }));
  }

  handleSubmit() {
    if (this.state.index === 0) {
      this.setState(update(this.state, {
        place: {
          showAddressError: { $set: this.state.place.address.addressString === '' },
          showStateError: { $set: this.state.place.state.value === '' },
        },
      }));

      if (!(this.state.showAddressError || this.state.showStateError)) {
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

      this.setState(update(this.state, {
        place: {
          showAddressError: { $set: false },
          showStateError: { $set: false },
        },
      }));
    }

    if (this.state.index === 1) {
      this.setState(update(this.state, {
        problem: {
          showNameError: { $set: this.state.problem.name === '' },
          showAddressError: { $set: this.state.problem.address.addressString === '' },
          showTypeError: { $set: this.state.problem.type.value === '' },
        },
      }));

      // if (!(this.state.showAddressError || this.state.showStateError)) {
      //   const problem = {
      //   };
      //
      //   ProblemsService.create(problem);
      // }
      //
      // this.setState(update(this.state, {
      //   problem: {
      //     showAddressError: { $set: false },
      //     showStateError: { $set: false },
      //   },
      // }));
    }
  }

  handleIndexChange(index) {
    this.setState(update(this.state, {
      index: { $set: index },
      place: {
        showAddressError: { $set: false },
        showStateError: { $set: false },
      },
      problem: {
        showAddressError: { $set: false },
        showStateError: { $set: false },
      },
    }));
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <Toolbar
            leftElement="close"
            centerElement="Додати місце"
            rightElement={this.state.addressString !== '' ? 'send' : ''}
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

          <TabView
            renderTabBar={props => (
              <TabBar
                {...props}
                style={{ backgroundColor: uiTheme.palette.primaryColor }}
                indicatorStyle={{ backgroundColor: uiTheme.palette.accentColor }}
              />
            )}
            navigationState={this.state}
            renderScene={SceneMap({
              tree: () => <TreeForm {...this.state.place} />,
              problem: () => <ProblemForm {...this.state.problem} />,
            })}
            onIndexChange={index => this.handleIndexChange(index)}
            initialLayout={{
              height: 0,
              width: Dimensions.get('window').width,
            }}
          />
        </Fragment>
      </ThemeProvider>
    );
  }
}

AddPlace.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
  place: PropTypes.shape({
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
  }),
  problem: PropTypes.shape({
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
  }),
};

AddPlace.defaultProps = {
  place: {
    address: { addressString: '', location: LOCATION },
    state: { id: 0, value: '' },
    type: { id: 0, value: '' },
    sort: { id: 0, value: '' },
    description: '',
  },
  problem: {
    name: '',
    address: { addressString: '', location: LOCATION },
    type: { id: 0, value: '' },
    description: '',
  },
};

export default AddPlace;
