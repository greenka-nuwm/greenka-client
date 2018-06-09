import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, View, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import MapView from 'react-native-maps';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { NavigationActions } from 'react-navigation';
import { LOCATION } from '../consts/appConsts';
import { drawerOverlayStyles, uiTheme } from '../consts/styles';
import LocationService from '../services/LocationService';

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

          <ActionButton buttonColor={uiTheme.palette.accentColor}>
            <ActionButton.Item
              buttonColor={COLOR.green300}
              size={50}
              title="Внести дерево"
              onPress={() => {
                this.props.navigation
                  .dispatch(NavigationActions.navigate({ routeName: 'AddTree' }));
              }}
            >
              <Entypo name="tree" style={styles.actionButtonIcon} />
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
