import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { StatusBar } from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import AsyncStorage from 'rn-async-storage';
import { ACTIVE_FILTERS, LOCATION } from '../consts/appConsts';
import { uiTheme } from '../consts/styles';
import LocationService from '../services/LocationService';
import ProblemsService from '../services/ProblemsService';
import TreesService from '../services/TreesService';
import GreenkaActionButton from './GreenkaActionButton';
import Map from './Map';
import MapFilters from './MapFilters';

const debounce = require('lodash.debounce');

class Main extends Component {
  constructor(props) {
    super(props);

    this.debounced = debounce(this.handleRegionChangeComplete, 750);

    this.state = {
      location: LOCATION,
      activeFilters: ACTIVE_FILTERS,
      trees: [],
      allTrees: [],
      problems: [],
      // TODO: refactor when API will be done
      // allProblems: [],
    };
  }

  async componentDidMount() {
    let location = JSON.parse(await AsyncStorage.getItem('location')) || LOCATION;
    const activeFilters = JSON.parse(await AsyncStorage.getItem('activeFilters')) || ACTIVE_FILTERS;

    if (LocationService.getLocationPermission()) {
      const position = await LocationService.getCurrentPosition();

      location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      AsyncStorage.setItem('location', JSON.stringify(location));
    }

    const trees = await TreesService.getTreesInRadius(location);
    const filteredTrees = trees.filter(tree => activeFilters.includes(tree.tree_state));
    const problems = await ProblemsService.getProblemsInRadius(location);
    // TODO: refactor when API will be done
    // const filteredProblems = problems
    // .filter(problem => activeFilters.includes(problem.problem_type.name));

    this.setState({
      location,
      trees: filteredTrees,
      allTrees: trees,
      problems,
      // problems: filteredTrees,
      // allProblems: problems,
    });
  }

  handleActiveTreesChange = state => {
    const newFilters = this.state.activeFilters.includes(state.key)
      ? this.state.activeFilters.filter(filter => filter !== state.key)
      : [...this.state.activeFilters, state.key];
    const trees = this.state.allTrees.filter(tree => newFilters.includes(tree.tree_state));

    this.setState({ activeFilters: newFilters, trees });

    AsyncStorage.setItem('activeFilters', JSON.stringify(newFilters));
  };

  handleActiveProblemsChange = name => {
    const newFilters = this.state.activeFilters.includes(name)
      ? this.state.activeFilters.filter(filter => filter !== name)
      : [...this.state.activeFilters, name];
    // TODO: refactor when API will be done
    // const problems = this.state.allProblems
    // .filter(problem => newFilters.includes(problem.problem_type.name));
    // this.setState({ activeFilters: newFilters, problems });

    this.setState({ activeFilters: newFilters });

    AsyncStorage.setItem('activeFilters', JSON.stringify(newFilters));
  };

  handleRegionChangeComplete = async location => {
    const trees = await TreesService.getTreesInRadius(location);
    const filteredTrees = trees
      .filter(tree => this.state.activeFilters.includes(tree.tree_state));

    this.setState({
      location,
      trees: filteredTrees,
      allTrees: trees,
    });

    AsyncStorage.setItem('location', JSON.stringify(location));
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
            style={{ container: { zIndex: 10 } }}
            leftElement="menu"
            centerElement="Greenka"
            onLeftElementPress={this.props.navigation.openDrawer}
          />

          <Map
            location={this.state.location}
            trees={this.state.trees}
            problems={this.state.problems}
            onRegionChange={this.debounced}
          />

          <GreenkaActionButton />

          <MapFilters
            activeFilters={this.state.activeFilters}
            onActiveTreesChange={this.handleActiveTreesChange}
            onActiveProblemsChange={this.handleActiveProblemsChange}
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
