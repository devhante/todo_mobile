import 'es6-symbol/implement';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';
import { registerComponents } from './src/components';

//AppRegistry.registerComponent(appName, () => App);

registerScreens();
registerComponents();

Navigation.startSingleScreenApp({
    screen: {
        screen: 'todomobile.LoginScreen',
        title: 'Login',
        navigatorStyle: { navBarHidden: true },
    }
});