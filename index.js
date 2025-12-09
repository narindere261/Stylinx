/**
 * @format
 */
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...',]); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
