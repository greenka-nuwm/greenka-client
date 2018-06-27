import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { COLOR } from 'react-native-material-ui';
import AsyncStorage from 'rn-async-storage';
import { ACTIVE_FILTERS, LOCATION, PROBLEMS_ICONS, TREES_STATES } from '../../consts/appConsts';
import { uiTheme } from '../../consts/styles';
import LocationService from '../../services/LocationService';
import ProblemsService from '../../services/ProblemsService';
import TreesService from '../../services/TreesService';

class AuthLoading extends Component {
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    const isSkippedLogin = Boolean(JSON.parse(
      await AsyncStorage.getItem('isSkippedLogin'),
    ));
    let location = JSON.parse(await AsyncStorage.getItem('location')) || LOCATION;

    if (LocationService.getLocationPermission()) {
      const position = await LocationService.getCurrentPosition();

      location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }

    await AsyncStorage.setItem('location', JSON.stringify(location));

    const activeFilters = JSON.parse(await AsyncStorage.getItem('activeFilters'));

    if (activeFilters == null) {
      await AsyncStorage.setItem('activeFilters', JSON.stringify(ACTIVE_FILTERS));
    }

    const trees = await TreesService.getTreesInRadius(location);
    const problems = await ProblemsService.getProblemsInRadius(location);

    await AsyncStorage.setItem('trees', JSON.stringify(trees));
    await AsyncStorage.setItem('problems', JSON.stringify(problems));
    const treesIcons = {};
    const problemsIcons = {};

    await Promise.all(TREES_STATES.map(async state => {
      treesIcons[state.key] = await state.getImageSource();
    }));
    await Promise.all(Object.keys(PROBLEMS_ICONS).map(async key => {
      problemsIcons[key] = await PROBLEMS_ICONS[key].getImageSource();
    }));

    await AsyncStorage.setItem('treesIcons', JSON.stringify(treesIcons));
    await AsyncStorage.setItem('problemsIcons', JSON.stringify(problemsIcons));

    this.props.navigation.navigate(isSkippedLogin || token ? 'App' : 'Auth');
    // this.props.navigation.navigate(isSkippedLogin || token ? 'AddProblem' : 'AddProblem');
  }

  render() {
    return (
      <Fragment>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.3)"
          barStyle="light-content"
          translucent
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: uiTheme.palette.primaryColor,
          }}
        >
          <ActivityIndicator size="large" color={COLOR.white} />
        </View>
      </Fragment>
    );
  }
}

AuthLoading.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthLoading;
