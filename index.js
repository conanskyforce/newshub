import {AppRegistry} from 'react-native';
import App from './App';
import NewsPage from './pages/NewsPage';
import FinPage from './pages/FinPage';
import TechPage from './pages/TechPage';
import SettingPage from './pages/SettingPage';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(NewsPage, () => NewsPage);
AppRegistry.registerComponent(FinPage, () => FinPage);
AppRegistry.registerComponent(TechPage, () => TechPage);
AppRegistry.registerComponent(SettingPage, () => TechPage);
