import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import { ACTIVE_FILTERS, LOCATION } from '../consts/appConsts';
import { uiTheme } from '../consts/styles';
import LocationService from '../services/LocationService';
import ProblemsService from '../services/ProblemsService';
import TreesService from '../services/TreesService';
import GreenkaActionButton from './GreenkaActionButton';
import Map from './Map';
import MapFilters from './MapFilters';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: LOCATION,
      activeFilters: ACTIVE_FILTERS,
      trees: [],
      allTrees: [],
      problems: [],
    };
  }

  async componentDidMount() {
    const location = JSON.parse(await AsyncStorage.getItem('location'));

    this.setState({ location });

    if (LocationService.getLocationPermission()) {
      await this.setLocationToState();
    }

    const activeFilters = JSON.parse(await AsyncStorage.getItem('activeFilters'));

    const trees = await TreesService.getTreesInRadius(this.state.location);
    const filteredTrees = trees.filter(tree => activeFilters.includes(tree.tree_state));

    const problems = await ProblemsService.getProblemsInRadius(this.state.location);

    this.setState({
      activeFilters,
      trees: filteredTrees,
      allTrees: trees,
      problems,
    });
  }

  async setLocationToState() {
    const position = await LocationService.getCurrentPosition();

    this.setState({
      location: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
    });

    AsyncStorage.setItem('location', JSON.stringify({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }));
  }

  handleActiveTabsChange = newTab => {
    const newTabs = this.state.activeFilters.includes(newTab.key)
      ? this.state.activeFilters.filter(key => key !== newTab.key)
      : [...this.state.activeFilters, newTab.key];
    const trees = this.state.allTrees.filter(tree => newTabs.includes(tree.tree_state));

    this.setState({ activeFilters: newTabs, trees });

    AsyncStorage.setItem('activeFilters', JSON.stringify(newTabs));
  };

  // handleRegionChange = async location => {
  //   const trees = await TreesService.getTreesInRadius(location);
  //   const filteredTrees = trees
  // .filter(tree => this.state.activeFilters.includes(tree.tree_state));
  //
  //   this.setState({
  //     location,
  //     trees: filteredTrees,
  //     allTrees: trees,
  //   });
  //   AsyncStorage.setItem('location', JSON.stringify(location));
  // };

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <StatusBar
            backgroundColor={COLOR.green900}
            barStyle="light-content"
          />

          <Toolbar
            style={{ container: { zIndex: 10 } }}
            leftElement="menu"
            centerElement="Greenka"
            onLeftElementPress={this.props.navigation.openDrawer}
          />

          <Map
            location={this.state.location}
            trees={this.state.trees}
            problems={this.state.problems}
            // onRegionChange={this.handleRegionChange}
          />

          <GreenkaActionButton />

          <MapFilters
            activeFilters={this.state.activeFilters}
            onActiveTabsChange={this.handleActiveTabsChange}
          />
        </Fragment>
      </ThemeProvider>
    );
  }
}

Main.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default Main;
