/** @format */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import './src/services/interceptors/interceptors';

// console.disableYellowBox = true;
// NativeModules.ExceptionsManager = null;

AppRegistry.registerComponent(appName, () => App);
