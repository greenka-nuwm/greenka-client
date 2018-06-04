import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, View } from 'react-native';
import MapView from 'react-native-maps';
import { ActionButton, ThemeProvider, Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import { LOCATION } from '../consts/appConsts';
import { drawerOverlayStyles, uiTheme } from '../consts/styles';
import LocationService from '../services/LocationService';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: LOCATION,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('location').then(data => {
      this.setState({
        location: JSON.parse(data),
      });
    });

    if (LocationService.getLocationPermission()) {
      this.setLocationToState();
    }
  }

  setLocationToState() {
    LocationService.getCurrentPosition().then(position => {
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
    });
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Fragment>
          <Toolbar
            leftElement="menu"
            centerElement="Greenka"
            onLeftElementPress={() => this.props.navigation.openDrawer()}
          />

          <View style={drawerOverlayStyles.container}>
            <MapView
              style={drawerOverlayStyles.mapContainer}
              region={this.state.location}
            />

            <View style={drawerOverlayStyles.mapDrawerOverlay} />
          </View>

          <ActionButton
            onPress={() => {
              this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'AddPlace' }));
            }}
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
