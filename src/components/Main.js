import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import AsyncStorage from 'rn-async-storage';
import { ACTIVE_FILTERS, LOCATION } from '../consts/appConsts';
import { uiTheme } from '../consts/styles';
import NavigationService from '../services/NavigationService';
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
      allProblems: [],
      isDataFetched: false,
    };
  }

  async componentDidMount() {
    NavigationService.goToProfile();
    const isSkippedLogin = Boolean(JSON.parse(
      await AsyncStorage.getItem('isSkippedLogin'),
    ));

    let location = this.props.navigation.getParam('location', null);

    if (location == null) {
      location = JSON.parse(await AsyncStorage.getItem('location'));
    }

    const activeFilters = JSON.parse(await AsyncStorage.getItem('activeFilters'));
    const trees = JSON.parse(await AsyncStorage.getItem('trees'));
    const filteredTrees = trees.filter(tree => activeFilters.includes(tree.tree_state));
    const problems = JSON.parse(await AsyncStorage.getItem('problems'));
    const filteredProblems = problems
      .filter(problem => activeFilters.includes(problem.problem_type.name));

    this.setState({
      isDataFetched: true,
      isSkippedLogin,
      location,
      trees: filteredTrees,
      allTrees: trees,
      problems: filteredProblems,
      allProblems: problems,
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
    const problems = this.state.allProblems
      .filter(problem => newFilters.includes(problem.problem_type.name));

    this.setState({ activeFilters: newFilters, problems });

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

  handleUserLocationChange = location => {
    this.setState({ location });
  };

  render = () => (
    <ThemeProvider uiTheme={uiTheme}>
      <Fragment>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.3)"
          barStyle="light-content"
          translucent
        />

        <Toolbar
          style={{ container: { zIndex: 10 } }}
          leftElement={!this.state.isSkippedLogin ? 'menu' : ''}
          centerElement="greenka"
          rightElement={this.state.isSkippedLogin ? 'exit-to-app' : ''}
          onLeftElementPress={this.props.navigation.openDrawer}
          onRightElementPress={NavigationService.goToLogin}
        />

        {this.state.isDataFetched &&
        <Map
          location={this.state.location}
          trees={this.state.trees}
          problems={this.state.problems}
          onRegionChange={this.debounced}
        />
        }

        {this.state.isDataFetched &&
        <GreenkaActionButton
          isSkippedLogin={this.state.isSkippedLogin}
          onUserLocationChange={this.handleUserLocationChange}
        />
        }

        <MapFilters
          activeFilters={this.state.activeFilters}
          onActiveTreesChange={this.handleActiveTreesChange}
          onActiveProblemsChange={this.handleActiveProblemsChange}
        />
      </Fragment>
    </ThemeProvider>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default Main;
