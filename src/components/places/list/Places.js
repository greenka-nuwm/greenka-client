import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Dimensions, StatusBar, View } from 'react-native';
import { ThemeProvider, Toolbar } from 'react-native-material-ui';
import { TabBar, TabView } from 'react-native-tab-view';
import AsyncStorage from 'rn-async-storage';
import { ACTIVE_FILTERS } from '../../../consts/appConsts';
import { uiTheme } from '../../../consts/styles';
import LocationService from '../../../services/LocationService';
import NavigationService from '../../../services/NavigationService';
import UserService from '../../../services/UserService';
import ProblemsList from './ProblemsList';

import TreesList from './TreesList';

class Places extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trees: [],
      problems: [],
      isDataFetched: false,
      navigationState: {
        index: 0,
        routes: [
          { key: 'trees', title: 'Дерева' },
          { key: 'problems', title: 'Проблеми' },
        ],
      },
    };
  }

  async componentDidMount() {
    let trees = await UserService.getUserTrees();
    let problems = await UserService.getUserProblems();

    trees = await this.getArrayWithAddress(trees);
    problems = await this.getArrayWithAddress(problems);

    this.setState({
      trees,
      problems,
      isDataFetched: true,
    });
  }

  getArrayWithAddress = async array => (
    Promise.all(array.map(async item => {
      const {
        adminArea,
        feature,
        locality,
        streetName,
        streetNumber,
      } = await LocationService.geocodePosition({
        longitude: item.longitude,
        latitude: item.latitude,
      });
      const address = [feature, streetName, streetNumber, locality, adminArea]
        .filter(x => x)
        .join(', ');

      return { ...item, address };
    }))
  );

  goToMap = (place, type) => async () => {
    const location = {
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    const activeFilters = await AsyncStorage.getItem('activeFilters');

    const newFilter = type === 'tree'
      ? ACTIVE_FILTERS[place.tree_state - 1]
      : place.problem_type.name;

    const newFilters = activeFilters.includes(newFilter)
      ? activeFilters.filter(filter => filter !== newFilter)
      : [...activeFilters, newFilter];

    AsyncStorage.setItem('activeFilters', JSON.stringify(newFilters));

    NavigationService.goToHome(location);
  };

  handleIndexChange = index => {
    this.setState({
      navigationState: {
        index,
        routes: this.state.navigationState.routes,
      },
    });
  };

  renderTabBar = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: uiTheme.palette.primaryColor }}
      indicatorStyle={{ backgroundColor: uiTheme.palette.accentColor }}
    />
  );

  // renderPager = props => (
  //  <PagerExperimental {...props} GestureHandler={GestureHandler} />
  // );

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'trees':
        return <TreesList trees={this.state.trees} goToMap={this.goToMap} />;
      case 'problems':
        return <ProblemsList problems={this.state.problems} goToMap={this.goToMap} />;
      default:
        return null;
    }
  };

  renderPage = () => (
    <ThemeProvider uiTheme={uiTheme}>
      <Fragment>
        <StatusBar
          backgroundColor="rgba(0, 0, 0, 0.3)"
          barStyle="light-content"
          translucent
        />

        <Toolbar
          leftElement="arrow-back"
          centerElement="Ваші місця"
          onLeftElementPress={NavigationService.goToHome}
          style={{ container: { elevation: 0 } }}
        />

        <TabView
          renderTabBar={this.renderTabBar}
          // renderPager={this.renderPager}
          navigationState={this.state.navigationState}
          renderScene={this.renderScene}
          onIndexChange={this.handleIndexChange}
          initialLayout={{
            height: 0,
            width: Dimensions.get('window').width,
          }}
          useNativeDriver
        />
      </Fragment>
    </ThemeProvider>
  );

  render = () => (
    this.state.isDataFetched
      ? this.renderPage()
      : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={uiTheme.palette.primaryColor} />
        </View>
      )
  );
}

export default Places;
