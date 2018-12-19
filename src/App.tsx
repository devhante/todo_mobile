import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import { createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import RootStore from './stores/rootStore';

const RootSwitch = createSwitchNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        Main: {
            screen: MainScreen
        }
    },
    {
        initialRouteName: 'Login'
    }
);

export default class App extends Component {
    public rootStore = new RootStore();
    public render() {
        return (
            <Provider rootStore={this.rootStore}>
                <RootSwitch />
            </Provider>
        );
    }
}
