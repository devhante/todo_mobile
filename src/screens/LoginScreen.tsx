import React, { Component } from 'react';
import { AsyncStorage, ToastAndroid, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { observable, action } from 'mobx';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { inject, observer } from 'mobx-react';
import RootStore from '../stores/rootStore';

type Props = {
    rootStore: RootStore;
};

@inject('rootStore')
@observer
export default class LoginScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
        const rootStore = this.props.rootStore;

        this.getAuthToken((value) => {
            if(value !== 'none') {
                rootStore.appStore.login();
                this.navigateToMain();
            }
        });
    }

    @observable private username: string = '';
    @observable private password: string = '';

    @action
    private handleChangeUsername = (value: string) => {
        this.username = value;
    }

    @action
    private handleChangePassword = (value: string) => {
        this.password = value;
    }

    private handlePressLogin = () => {
        const rootStore = this.props.rootStore;
        axios.post('https://practice.alpaca.kr/api/users/login/', {
            username: this.username,
            password: this.password
        })
        .then((response: AxiosResponse) => {
            this.setAuthToken(response.data.authToken);
            rootStore.appStore.login();
            this.navigateToMain();
        })
        .catch((err: AxiosError) => {
            this.toastLoginFailed();
        });
    }

    private setAuthToken = async (value: string) => {
        try {
            await AsyncStorage.setItem('authToken', value);
        } catch (error) {
            console.log(error.message);
        }
    }

    private getAuthToken = async (callback: (value: string) => void) => {
        try {
            let value = await AsyncStorage.getItem('authToken') || 'none';
            callback(value);
        } catch (error) {
            console.log(error.message);
        }
    }

    private navigateToMain = () => {
        this.props.navigation.navigate('Main');
    }

    private toastLoginFailed = () => {
        ToastAndroid.show('아이디 또는 비밀번호가 일치하지 않습니다.', ToastAndroid.SHORT);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                <View style={styles.top}>
                    <Icon style={styles.icon} name="done" size={60} color='#8BE9FD' />
                    <Text style={styles.title}>To-do List App</Text>
                </View>
                <View style={styles.bottom}>
                    <TextInput style={styles.username} placeholder='Username'
                    placeholderTextColor='#F8F8F2' underlineColorAndroid='#F8F8F2'
                    textContentType='username' secureTextEntry={false}
                    onChangeText={this.handleChangeUsername} />
                    <TextInput style={styles.password} placeholder='Password'
                    placeholderTextColor='#F8F8F2' underlineColorAndroid='#F8F8F2'
                    textContentType='password' secureTextEntry={true}
                    onChangeText={this.handleChangePassword} />
                    <Button color='#8BE9FD' title="Login" onPress={this.handlePressLogin} />
                </View>
                </View>
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
    top: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottom: {
        flex: 1,
        flexGrow: 1,
        width: 300,
    },
    icon: {
        margin: 16,
    },
    title: {
        color: '#F8F8F2',
    },
    username: {
        color: '#F8F8F2',
        width: 300,
        marginBottom: 24,
    },
    password: {
        color: '#F8F8F2',
        width: 300,
        marginBottom: 48,
    },
  });