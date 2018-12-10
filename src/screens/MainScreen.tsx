import React, { Component } from 'react';
import { StyleSheet, Text, View, ToastAndroid, TextInput, AsyncStorage, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import RootStore from '../stores/rootStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
    rootStore: RootStore;
};

@inject('rootStore')
@observer
export default class MainScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
        const rootStore = this.props.rootStore;
        rootStore.axiosStore.create().then(() => {
            this.getTodoList();
        });
    };

    private getTodoList = () => {
        const rootStore = this.props.rootStore;
        rootStore.axiosStore.instance.get('todo/')
        .then((response) => {
            rootStore.todoStore.setTodoList(response.data);
        })
        .catch((err) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
        });
    }

    private handleChangeSearch = (value: string) => {
        const rootStore = this.props.rootStore;
        rootStore.searchStore.setSearchWord(value);
    };

    private handlePressDelete = () => {
        ToastAndroid.show('Delete', ToastAndroid.SHORT);
    };

    private handlePressLogout = () => {
        const rootStore = this.props.rootStore;
        rootStore.appStore.logout();
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

    private handlePressFab = () => {
        ToastAndroid.show('FAB', ToastAndroid.SHORT);
    }

    render() {
        const rootStore = this.props.rootStore;
        return (
            <View style={styles.container}>
                <View style={styles.navbar}>
                    <View style={styles.searchBox}>
                        <Icon style={styles.searchIcon} name='search' size={20} color='#BD93F9' />
                        <TextInput style={styles.searchText} placeholder='검색'
                        placeholderTextColor='#BD93F9' underlineColorAndroid='transparent'
                        onChangeText={this.handleChangeSearch} />
                    </View>
                    <Icon style={styles.deleteIcon} name='delete' size={24}
                    color='#BD93F9' onPress={this.handlePressDelete} />
                    <Icon style={styles.logoutIcon} name='exit-to-app' size={24}
                    color='#BD93F9' onPress={this.handlePressLogout} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentText}>
                        {rootStore.todoStore.todoList.map((item) => (
                            rootStore.searchStore.searchWord.trim() !== ''
                            ? (item.content.includes(rootStore.searchStore.searchWord.trim())
                            ? <Text key={item.id}>{item.content}</Text> : '' )
                            : <Text key={item.id}>{item.content}</Text>
                        ))}
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={this.handlePressFab} style={styles.fab}>
                    <Icon name='lens' size={56} color='#BD93F9' />
                    <Icon style={styles.addIcon} name='add' size={24} color='#FFFFFF'/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        backgroundColor: '#282E36',
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        padding: 8,
        backgroundColor: '#282E36',
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        padding: 8,
        backgroundColor: '#44475A',
    },
    deleteIcon: {
        marginLeft: 8,
    },
    logoutIcon: {
        marginLeft: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchText: {
        color: '#BD93F9',
        fontSize: 12,
        fontWeight: "500",
        width: 280,
        padding: 0,
    },
    contentText: {
        color: '#F8F8F2',
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 16,
        bottom: 16,
    },
    addIcon: {
        position: 'absolute',
    },
});