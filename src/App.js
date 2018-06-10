import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import Main from './components/Main';
import Sidenav from './components/Sidenav';
import AddProblem from './components/places/AddProblem';
import AddTree from './components/places/AddTree';
import Places from './components/places/Places';
import Info from './components/Info';
import AddResponse from './components/AddResponse';
import { ACTIVE_FILTERS, LOCATION } from './consts/appConsts';

if (AsyncStorage.getItem('location') != null) {
  AsyncStorage.setItem('location', JSON.stringify(LOCATION));
}

if (AsyncStorage.getItem('activeFilters') != null) {
  AsyncStorage.setItem('activeFilters', JSON.stringify(ACTIVE_FILTERS));
}

const App = createDrawerNavigator({
  Home: {
    screen: Main,
  },
  AddTree: {
    screen: AddTree,
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

export default App;
