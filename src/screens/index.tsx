import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';

export function registerScreens() {
    Navigation.registerComponent('todomobile.LoginScreen', () => LoginScreen);
    Navigation.registerComponent('todomobile.MainScreen', () => MainScreen);
}