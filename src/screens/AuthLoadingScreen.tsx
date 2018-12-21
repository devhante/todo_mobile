import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { COLOR_CONSTANTS } from '../constants';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

@inject(STORE_NAME)
@observer
export default class AuthLoadingScreen extends Component<IProps> {
    public async componentDidMount() {
        const authToken = await this.props[
            STORE_NAME
        ]!.keychainStore.getKeychain();
        try {
            if (authToken) {
                await this.props[STORE_NAME]!.axiosStore.create();
                this.props.navigation.navigate('Main');
            } else {
                this.props.navigation.navigate('Login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    public render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    style={styles.loadingIndicator}
                    size="large"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_CONSTANTS.background
    },
    loadingIndicator: {
        position: 'absolute'
    }
});
