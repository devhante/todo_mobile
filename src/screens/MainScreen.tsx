import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import RootStore from '../stores/rootStore';

type Props = {
    rootStore: RootStore;
};

@inject('rootStore')
@observer
export default class MainScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
        const rootStore = this.props.rootStore;
        rootStore.axiosStore.create();
    }

    render() {
        const rootStore = this.props.rootStore;

        return (
            <View style={styles.container}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282E36',
    },
    text: {
        color: '#F8F8F2',
    },
});