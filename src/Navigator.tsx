import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';

const RootSwitch = createSwitchNavigator(
    {
        Login: LoginScreen,
        Auth: AuthLoadingScreen,
        Main: MainScreen
    },
    {
        initialRouteName: 'Auth'
    }
);

export default RootSwitch;
