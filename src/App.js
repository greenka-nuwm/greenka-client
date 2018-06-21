import React from 'react';
import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator, withNavigation,
} from 'react-navigation';
import AddResponse from './components/AddResponse';
import AuthLoading from './components/auth/AuthLoading';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Info from './components/Info';
import Main from './components/Main';
import Places from './components/places/list/Places';
import AddProblem from './components/places/problems/AddProblem';
import ProblemView from './components/places/problems/ProblemView';
import AddTree from './components/places/trees/AddTree';
import TreeView from './components/places/trees/TreeView';
import Sidenav from './components/Sidenav';
import NavigationService from './services/NavigationService';

const AppNavigator = createDrawerNavigator({
  Home: Main,
  AddTree,
  TreeView,
  AddProblem,
  ProblemView,
  Places,
  Info,
  AddResponse,
}, {
  contentComponent: Sidenav,
  backBehavior: 'initialRoute',
});

const AuthNavigator = withNavigation(createStackNavigator(
  {
    Login,
    Register,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
));

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading,
    App: () => <AppNavigator ref={NavigationService.setAppNavigator} />,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default SwitchNavigator;
