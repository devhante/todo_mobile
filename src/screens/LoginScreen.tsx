import axios from 'axios';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    ActivityIndicator,
    Button,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationScreenProp } from 'react-navigation';
import { COLOR_CONSTANTS, ENV_CONSTANTS } from '../constants';
import { IUserSerializer } from '../models';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

@inject(STORE_NAME)
@observer
export default class LoginScreen extends Component<IProps> {
    @observable
    private username: string;

    @observable
    private password: string;

    constructor(props: IProps) {
        super(props);
        this.username = '';
        this.password = '';
    }

    @action
    private handleChangeUsername = (value: string) => {
        this.username = value;
    };

    @action
    private handleChangePassword = (value: string) => {
        this.password = value;
    };

    private handlePressLogin = async () => {
        try {
            this.props[STORE_NAME]!.loadingStore.startLoading();
            const response = await axios.post<IUserSerializer>(
                ENV_CONSTANTS.baseURL + 'users/login/',
                {
                    username: this.username,
                    password: this.password
                }
            );
            await this.props[STORE_NAME]!.keychainStore.setKeychain(
                response.data.authToken
            );
            await this.props[STORE_NAME]!.axiosStore.create();
            this.props[STORE_NAME]!.loadingStore.endLoading();
            this.props.navigation.navigate('Main');
        } catch (error) {
            this.props[STORE_NAME]!.loadingStore.endLoading();
            console.log(error);
            this.toastLoginFailed();
        }
    };

    private toastLoginFailed = () => {
        ToastAndroid.show(
            '아이디 또는 비밀번호가 일치하지 않습니다.',
            ToastAndroid.SHORT
        );
    };

    public render() {
        return (
            <View style={styles.container}>
                <React.Fragment>
                    <View style={styles.top}>
                        <Icon
                            style={styles.icon}
                            name="done"
                            size={60}
                            color={COLOR_CONSTANTS.purple}
                        />
                        <Text style={styles.title}>To-do List App</Text>
                    </View>
                    <View style={styles.bottom}>
                        <TextInput
                            style={styles.username}
                            placeholder="Username"
                            placeholderTextColor={COLOR_CONSTANTS.foreground}
                            underlineColorAndroid={COLOR_CONSTANTS.foreground}
                            textContentType="username"
                            secureTextEntry={false}
                            onChangeText={this.handleChangeUsername}
                        />
                        <TextInput
                            style={styles.password}
                            placeholder="Password"
                            placeholderTextColor={COLOR_CONSTANTS.foreground}
                            underlineColorAndroid={COLOR_CONSTANTS.foreground}
                            textContentType="password"
                            secureTextEntry={true}
                            onChangeText={this.handleChangePassword}
                        />
                        <Button
                            color={COLOR_CONSTANTS.purple}
                            title="Login"
                            onPress={this.handlePressLogin}
                        />
                    </View>
                    {this.props[STORE_NAME]!.loadingStore.isLoading ? (
                        <ActivityIndicator
                            style={styles.loadingIndicator}
                            size="large"
                        />
                    ) : null}
                </React.Fragment>
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
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    bottom: {
        flex: 1,
        flexGrow: 1,
        width: 300
    },
    icon: {
        margin: 16
    },
    title: {
        color: COLOR_CONSTANTS.foreground
    },
    username: {
        color: COLOR_CONSTANTS.foreground,
        width: 300,
        marginBottom: 24
    },
    password: {
        color: COLOR_CONSTANTS.foreground,
        width: 300,
        marginBottom: 48
    },
    loadingIndicator: {
        position: 'absolute'
    }
});
