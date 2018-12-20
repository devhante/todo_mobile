import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import RootSwitch from './Navigator';
import RootStore from './stores/rootStore';

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
