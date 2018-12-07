import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import RootStore from './src/stores/rootStore';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';

const AppNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    Main: MainScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login'
  }
);

const AppContainer = createAppContainer(AppNavigator);

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