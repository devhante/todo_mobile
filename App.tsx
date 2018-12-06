import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import RootStore from './src/stores/rootStore';

type Props = {};
export default class App extends Component<Props> {
  render() {
    const rootStore = new RootStore();
    return (
      <Provider rootStore={rootStore}>
      </Provider>
    );
  }
}