import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { ActionButton, ThemeProvider, Toolbar } from 'react-native-material-ui';
import { NavigationActions } from 'react-navigation';
import { uiTheme } from '../consts/styles';
import LocationService from '../services/LocationService';
import Map from './Map';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
});

class Main extends Component {
  componentDidMount() {
    AsyncStorage.getItem('location').then((location) => {
      this.setState({
        location: JSON.parse(location),
      });
    });

    if (LocationService.getLocationPermission()) {
      this.setLocationToState();
    }
  }

  setLocationToState() {
    LocationService.getCurrentPosition().then((position) => {
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
      <View style={styles.container}>
        <ThemeProvider uiTheme={uiTheme}>
          <Toolbar
            leftElement="menu"
            centerElement="Greenka"
            onLeftElementPress={() => this.props.navigation.openDrawer()}
          />
        </ThemeProvider>

        {this.state && this.state.location && <Map {...this.state.location} />}

        <ThemeProvider uiTheme={uiTheme}>
          <ActionButton onPress={() => this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'AddPlace' }))} />
        </ThemeProvider>
      </View>
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
