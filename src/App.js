import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import Main from './components/Main';
import Sidenav from './components/Sidenav';
import AddPlace from './components/AddPlace';
import Places from './components/Places';
import Info from './components/Info';
import AddResponse from './components/AddResponse';
import { location } from './consts/appConsts';

if (AsyncStorage.getItem('location') != null) {
  AsyncStorage.setItem('location', JSON.stringify(location));
}

const App = createDrawerNavigator({
  Home: {
    screen: Main,
  },
  AddPlace: {
    screen: AddPlace,
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
});

export default App;
