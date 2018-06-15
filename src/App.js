import React from 'react';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import Main from './components/Main';
import TreeView from './components/places/trees/TreeView';
import Sidenav from './components/Sidenav';
import AddProblem from './components/places/AddProblem';
import AddTree from './components/places/trees/AddTree';
import Places from './components/places/Places';
import Info from './components/Info';
import AddResponse from './components/AddResponse';
import { ACTIVE_FILTERS, LOCATION } from './consts/appConsts';
import NavigationService from './services/NavigationService';

if (AsyncStorage.getItem('location') != null) {
  AsyncStorage.setItem('location', JSON.stringify(LOCATION));
}

if (AsyncStorage.getItem('activeFilters') != null) {
  AsyncStorage.setItem('activeFilters', JSON.stringify(ACTIVE_FILTERS));
}

const TopLevelNavigator = createDrawerNavigator({
  Home: {
    screen: Main,
  },
  AddTree: {
    screen: AddTree,
  },
  TreeView: {
    screen: TreeView,
  },
  AddProblem: {
    screen: AddProblem,
  },
  Places: {
    screen: Places,
  },
  Info: {
    screen: Info,
  },
  AddResponse: {
    screen: AddResponse,
  },
}, {
  contentComponent: Sidenav,
  backBehavior: 'initialRoute',
});

const App = () => <TopLevelNavigator ref={NavigationService.setTopLevelNavigator} />;

export default App;
