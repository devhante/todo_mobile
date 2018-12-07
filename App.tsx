import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import RootStore from './src/stores/rootStore';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Main: MainScreen
  },
  {
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator)

type Props = {};
export default class App extends Component<Props> {
  render() {
    const rootStore = new RootStore();
    return (
      <Provider rootStore={rootStore}>
        <AppContainer />
      </Provider>
    );
  }
}