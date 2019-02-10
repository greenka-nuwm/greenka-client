import React from 'react';
import { createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AddFeedback from './components/AddFeedback';
import AuthLoading from './components/auth/AuthLoading';
import Enter from './components/auth/Enter';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Info from './components/Info';
import Main from './components/Main';
import Places from './components/places/list/Places';
import AddProblem from './components/places/problems/AddProblem';
import ProblemView from './components/places/problems/ProblemView';
import AddTree from './components/places/trees/AddTree';
import TreeView from './components/places/trees/TreeView';
import Profile from './components/Profile';
import Sidenav from './components/Sidenav';
import NavigationService from './services/NavigationService';

// TODO: refactor to navigation 3

const AppNavigator = createDrawerNavigator({
  Home: Main,
  AddTree,
  TreeView,
  AddProblem,
  ProblemView,
  Places,
  Info,
  AddFeedback,
  Profile,
}, {
  contentComponent: Sidenav,
  backBehavior: 'initialRoute',
});

const AuthNavigator = createStackNavigator(
  {
    Enter,
    Login,
    Register,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Enter',
  },
);

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading,
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

const App = () => <SwitchNavigator ref={NavigationService.setAppNavigator} />;

export default App;
