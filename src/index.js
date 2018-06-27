import { AppRegistry, NativeModules } from 'react-native';
import App from './App';
import './services/interceptors/interceptors';

console.disableYellowBox = true;
NativeModules.ExceptionsManager = null;

AppRegistry.registerComponent('greenka_client', () => App);
