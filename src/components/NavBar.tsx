import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { AsyncStorage, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RootStore from '../stores/rootStore';

type Props = {
    navigation: any;
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class NavBar extends Component<Props> {

    private handleChangeSearch = (value: string) => {
        this.props.rootStore!.searchStore.setSearchWord(value);
    };

    private handlePressDelete = () => {
        this.props.rootStore!.deleteStore.allowDelete();
    };

    private handlePressLogout = () => {
        this.props.rootStore!.appStore.logout();
        this.removeAuthToken();
        this.navigateToLogin();
    };

    private removeAuthToken = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
        } catch (error) {
            console.log(error.message);
        }
    }

    private navigateToLogin = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={styles.navbar}>
                <View style={styles.searchBox}>
                    <Icon style={styles.searchIcon} name='search' size={20} color='#BD93F9' />
                    <TextInput style={styles.searchInput} placeholder='검색'
                    placeholderTextColor='#BD93F9' underlineColorAndroid='transparent'
                    onChangeText={this.handleChangeSearch} />
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={this.handlePressDelete}>
                    <Icon style={styles.deleteIcon} name='delete' size={24} color='#BD93F9' />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={this.handlePressLogout}>
                    <Icon style={styles.logoutIcon} name='exit-to-app' size={24} color='#BD93F9' />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        padding: 8,
        backgroundColor: '#282A36',
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        padding: 8,
        backgroundColor: '#44475A',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        color: '#BD93F9',
        fontSize: 12,
        fontWeight: "500",
        width: 280,
        padding: 0,
    },
    deleteIcon: {
        marginLeft: 8,
    },
    logoutIcon: {
        marginLeft: 8,
    },
});