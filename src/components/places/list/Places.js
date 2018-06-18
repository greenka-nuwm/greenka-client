import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Dimensions, StatusBar, View } from 'react-native';
import { COLOR, ThemeProvider, Toolbar } from 'react-native-material-ui';
import { TabBar, TabView } from 'react-native-tab-view';
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

    trees = trees.map(tree => {
      // TODO: refactor to async/await
      // const address = (await LocationService.geocodePosition({
      //   longitude: tree.longitude,
      //   latitude: tree.latitude,
      // })).formattedAddress;

      let address;

      LocationService.geocodePosition({
        longitude: tree.longitude,
        latitude: tree.latitude,
      }).then(formattedAddress => { address = formattedAddress; });

      return { ...tree, address };
    });

    problems = problems.map(problem => {
      // TODO: refactor to async/await
      // const address = (await LocationService.geocodePosition({
      //   longitude: problem.longitude,
      //   latitude: problem.latitude,
      // })).formattedAddress;

      let address;

      LocationService.geocodePosition({
        longitude: problem.longitude,
        latitude: problem.latitude,
      }).then(formattedAddress => { address = formattedAddress; });

      return { ...problem, address };
    });

    this.setState({
      trees,
      problems,
      isDataFetched: true,
    });
  }

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
        return <TreesList trees={this.state.trees} />;
      case 'problems':
        return <ProblemsList problems={this.state.problems} />;
      default:
        return null;
    }
  };

  renderPage = () => (
    <ThemeProvider uiTheme={uiTheme}>
      <Fragment>
        <StatusBar
          backgroundColor={COLOR.green900}
          barStyle="light-content"
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
