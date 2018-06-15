import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { AsyncStorage, StatusBar, View } from 'react-native';
import MapView from 'react-native-maps';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ACTIVE_FILTERS, LOCATION } from '../consts/appConsts';
import { drawerOverlayStyles, uiTheme } from '../consts/styles';
import LocationService from '../services/LocationService';
import NavigationService from '../services/NavigationService';
import ProblemsService from '../services/ProblemsService';
import TreesService from '../services/TreesService';
import GreenkaActionButton from './GreenkaActionButton';
import MapFilters from './MapFilters';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: LOCATION,
      activeFilters: ACTIVE_FILTERS,
      icons: [],
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

    const healthy = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.green600);
    const broken = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.yellow600);
    const dying = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.red600);
    const dry = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.orange600);
    const toping = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.purple600);
    const mistletoe = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.blue600);

    const trees = await TreesService.getTreesInRadius(this.state.location);
    const filteredTrees = trees.filter(tree => activeFilters.includes(tree.tree_state));

    const problems = await ProblemsService.getProblemsInRadius(this.state.location);

    this.setState({
      icons: {
        healthy,
        broken,
        dying,
        dry,
        toping,
        mistletoe,
      },
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
            leftElement="menu"
            centerElement="Greenka"
            onLeftElementPress={this.props.navigation.openDrawer}
          />

          <View style={drawerOverlayStyles.container}>
            <MapView
              style={drawerOverlayStyles.mapContainer}
              region={this.state.location}
              // onRegionChangeComplete={this.handleRegionChange}
            >
              {this.state.trees.map(tree => (
                <MapView.Marker
                  key={`marker-${tree.id}`}
                  coordinate={{ longitude: tree.longitude, latitude: tree.latitude }}
                  image={this.state.icons[tree.tree_state]}
                  onPress={() => NavigationService.goToTreeView(tree.id)}
                />
              ))}
              {this.state.problems.map(problem => (
                <MapView.Marker
                  key={`marker-${problem.id}`}
                  coordinate={{ longitude: problem.longitude, latitude: problem.latitude }}
                  onPress={() => NavigationService.goToProblemView(problem.id)}
                />
              ))}
            </MapView>

            <View style={drawerOverlayStyles.mapDrawerOverlay} />
          </View>

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
