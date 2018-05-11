import { DrawerNavigator } from 'react-navigation';
import Main from './components/Main';
import Sidenav from './components/Sidenav';
import AddPlace from './components/AddPlace';
import Places from './components/Places';
import Info from './components/Info';
import AddResponse from './components/AddResponse';

const App = DrawerNavigator({
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
