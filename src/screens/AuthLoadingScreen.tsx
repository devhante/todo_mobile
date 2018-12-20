import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    View
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { COLOR_CONSTANTS } from '../constants';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

@inject(STORE_NAME)
@observer
export default class AuthLoadingScreen extends Component<IProps> {
    public componentDidMount() {
        this.checkToken().then(async isTokenExist => {
            try {
                if (isTokenExist) {
                    await this.props[STORE_NAME]!.axiosStore.create();
                    this.props.navigation.navigate('Main');
                } else {
                    this.props.navigation.navigate('Login');
                }
            } catch (error) {
                console.log(error);
            }
        });
    }

    private checkToken = async (): Promise<boolean> => {
        try {
            const response = await AsyncStorage.getItem('authToken');
            if (response !== null) {
                return true;
            }
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

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
