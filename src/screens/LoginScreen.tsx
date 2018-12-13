import axios from "axios";
import { action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, Button, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { UserSerializer } from "../serializer";
import RootStore from "../stores/rootStore";

type Props = {
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class LoginScreen extends Component<Props> {

    @observable
    private username: string;

    @observable
    private password: string;

    constructor(props: Props) {
        super(props);
        this.username = '';
        this.password = '';
        this.checkToken();
    }

    @action
    private handleChangeUsername = (value: string) => {
        this.username = value;
    }

    @action
    private handleChangePassword = (value: string) => {
        this.password = value;
    }

    private checkToken = async () => {
        try {
            const response = await AsyncStorage.getItem('authToken');
            if (response !== null) {
                this.navigateToMain();
            }
        } catch (error) {
            console.log(error);
        }
    }

    private handlePressLogin = async () => {
        try {
            this.props.rootStore!.loadingStore.startLoading();
            const response = await axios.post<UserSerializer>('https://practice.alpaca.kr/api/users/login/', {
                username: this.username,
                password: this.password
            });
            await AsyncStorage.setItem('authToken', response.data.authToken);
            this.props.rootStore!.loadingStore.endLoading();
            this.navigateToMain();
        } catch (error) {
            this.props.rootStore!.loadingStore.endLoading();
            console.log(error);
            this.toastLoginFailed();
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
                        <Icon style={styles.icon} name="done" size={60} color='#BD93F9' />
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
                        <Button color='#BD93F9' title="Login" onPress={this.handlePressLogin} />
                    </View>
                </View>
                {this.props.rootStore!.loadingStore.isLoading ? (
                    <ActivityIndicator style={styles.loadingIndicator} size='large'/>
                ) : (
                    <React.Fragment />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282A36',
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
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
    loadingIndicator: {
        position: 'absolute',
    },
});