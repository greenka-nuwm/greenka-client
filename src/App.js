import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import Main from './components/Main';
import Sidenav from './components/Sidenav';
import AddPlace from './components/AddPlace';
import Places from './components/Places';
import Info from './components/Info';
import AddResponse from './components/AddResponse';

if (AsyncStorage.getItem('location') != null) {
  AsyncStorage.setItem('location', JSON.stringify({
    latitude: 48.379433,
    longitude: 31.16557990000001,
    latitudeDelta: 18,
    longitudeDelta: 18,
  }));
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
