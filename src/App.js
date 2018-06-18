import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import AddResponse from './components/AddResponse';
import Info from './components/Info';
import Main from './components/Main';
import Places from './components/places/list/Places';
import AddProblem from './components/places/problems/AddProblem';
import ProblemView from './components/places/problems/ProblemView';
import AddTree from './components/places/trees/AddTree';
import TreeView from './components/places/trees/TreeView';
import Sidenav from './components/Sidenav';
import NavigationService from './services/NavigationService';

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
  ProblemView: {
    screen: ProblemView,
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
