import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, View, StyleSheet, StatusBar } from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';
import { ACTIVE_FILTERS, LOCATION } from '../consts/appConsts';
import { drawerOverlayStyles, uiTheme } from '../consts/styles';
import LocationService from '../services/LocationService';
import TreesService from '../services/TreesService';
import MapFilters from './MapFilters';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.onTopRowTabPress = this.onTopRowTabPress.bind(this);

    this.state = {
      location: LOCATION,
      activeFilters: ACTIVE_FILTERS,
      icons: [],
      trees: [],
      allTrees: [],
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
    const dry = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.black);
    const toping = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.purple600);
    const mistletoe = await MaterialCommunityIcon.getImageSource('tree', 26, COLOR.blue600);

    const trees = await TreesService.getAllTrees();

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
      trees,
      allTrees: trees,
    });
  }

  onTopRowTabPress(newTab) {
    const newTabs = this.state.activeFilters.includes(newTab.key)
      ? this.state.activeFilters.filter(key => key !== newTab.key)
      : [...this.state.activeFilters, newTab.key];
    const trees = this.state.allTrees.filter(tree => newTabs.includes(tree.tree_state));

    this.setState({ activeFilters: newTabs, trees });

    AsyncStorage.setItem('activeFilters', JSON.stringify(newTabs));
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
            onLeftElementPress={() => this.props.navigation.openDrawer()}
          />

          <View style={drawerOverlayStyles.container}>
            <MapView
              style={drawerOverlayStyles.mapContainer}
              region={this.state.location}
            >
              {this.state.trees.map(tree => (
                <MapView.Marker
                  key={`marker-${tree.id}`}
                  coordinate={{
                    longitude: tree.longitude,
                    latitude: tree.latitude,
                  }}
                  image={this.state.icons[tree.tree_state]}
                  onPress={() => {
                    this.props.navigation.dispatch(
                      NavigationActions.navigate({ routeName: 'TreeView', params: { tree } }),
                    );
                  }}
                />
              ))}
            </MapView>

            <View style={drawerOverlayStyles.mapDrawerOverlay} />
          </View>

          <View
            style={{
              flex: 1,
              marginBottom: -10,
              marginRight: -10,
            }}
          >
            <ActionButton
              buttonColor={uiTheme.palette.accentColor}
              fixNativeFeedbackRadiusss
            >
              <ActionButton.Item
                buttonColor={COLOR.green300}
                size={50}
                title="Внести дерево"
                onPress={() => {
                  this.props.navigation
                    .dispatch(NavigationActions.navigate({ routeName: 'AddTree' }));
                }}
              >
                <MaterialIcon name="local-florist" style={styles.actionButtonIcon} />
              </ActionButton.Item>

              <ActionButton.Item
                buttonColor={COLOR.red300}
                size={50}
                title="Описати проблему"
                onPress={() => {
                  this.props.navigation
                    .dispatch(NavigationActions.navigate({ routeName: 'AddProblem' }));
                }}
              >
                <MaterialIcon name="report-problem" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          </View>

          <MapFilters
            activeFilters={this.state.activeFilters}
            onActiveTabsChange={this.onTopRowTabPress}
          />
        </Fragment>
      </ThemeProvider>
    );
  }
}

Main.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};

export default Main;
