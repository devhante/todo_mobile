import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, ToastAndroid, TextInput, AsyncStorage, TouchableOpacity, Modal } from 'react-native';
import { inject, observer } from 'mobx-react';
import RootStore from '../stores/rootStore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TodoItem from '../components/TodoItem';
import { observable, action } from 'mobx';

type Props = {
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class MainScreen extends Component<Props> {
    @observable private modalVisible = false;
    @observable private content = '';

    @action private setModalVisible = () => {
        this.modalVisible = true;
    }

    @action private setModalInvisible = () => {
        this.modalVisible = false;
        this.content = '';
    }

    constructor(props: Props) {
        super(props);
        this.createAxiosAndGetTodoList();
    };

    private createAxiosAndGetTodoList = async () => {
        const rootStore = this.props.rootStore as RootStore;
        await rootStore.axiosStore.create();
        this.getTodoList();
    }

    private getTodoList = () => {
        const rootStore = this.props.rootStore as RootStore;
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
        const rootStore = this.props.rootStore as RootStore;
        rootStore.searchStore.setSearchWord(value);
    };

    private handlePressDelete = () => {
        ToastAndroid.show('Delete', ToastAndroid.SHORT);
    };

    private handlePressLogout = () => {
        const rootStore = this.props.rootStore as RootStore;
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
        this.setModalVisible();
    }

    private handleCancel = () => {
        this.setModalInvisible();
    }
    
    private handleSave = () => {
        this.addTodo();
        this.setModalInvisible();
    }

    private addTodo = () => {
        const rootStore = this.props.rootStore as RootStore;
        rootStore.axiosStore.instance.post('todo/', {
            content: this.content
        })
        .then((response) => {
            rootStore.todoStore.addTodo(response.data);
        })
        .catch((err) => {
            if(err.response !== undefined) {
                console.log(err.response);
            }
        });
    }

    private handleChangeContent = (value: string) => {
        this.content = value;
    }

    render() {
        const rootStore = this.props.rootStore as RootStore;
        return (
            <View style={styles.container}>
                <View style={styles.navbar}>
                   < View style={styles.searchBox}>
                        <Icon style={styles.searchIcon} name='search' size={20} color='#BD93F9' />
                        <TextInput style={styles.searchInput} placeholder='검색'
                        placeholderTextColor='#BD93F9' underlineColorAndroid='transparent'
                        onChangeText={this.handleChangeSearch} />
                    </View>
                    <Icon style={styles.deleteIcon} name='delete' size={24}
                    color='#BD93F9' onPress={this.handlePressDelete} />
                    <Icon style={styles.logoutIcon} name='exit-to-app' size={24}
                    color='#BD93F9' onPress={this.handlePressLogout} />
                </View>
                <View style={styles.content}>
                    {rootStore.todoStore.todoList.map((item) => (
                        rootStore.searchStore.searchWord.trim() !== ''
                        ? (item.content.includes(rootStore.searchStore.searchWord.trim())
                        ? <TodoItem key={item.id} id={item.id}/> : '' )
                        : <TodoItem key={item.id} id={item.id}/>
                    ))}
                    <TouchableOpacity activeOpacity={0.7} onPress={this.handlePressFab} style={styles.fab}>
                        <Icon name='lens' size={56} color='#BD93F9' />
                        <Icon style={styles.addIcon} name='add' size={24} color='#FFFFFF'/>
                    </TouchableOpacity>
                    <Modal animationType='slide' transparent={false} visible={this.modalVisible}
                    onRequestClose = {this.setModalInvisible} >
                        <View style={styles.container}>
                            <View style={styles.navbar}>
                                <TouchableOpacity activeOpacity={0.7} onPress={this.handleCancel}>
                                    <Text style={styles.navbarButton}>취소</Text>
                                </TouchableOpacity>
                                <Text style={styles.title}>할 일 추가</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={this.handleSave}>
                                    <Text style={styles.navbarButton}>저장</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.content}>
                                <TextInput style={styles.contentInput} placeholder='내용'
                                placeholderTextColor='#BD93F9' underlineColorAndroid='#BD93F9'
                                onChangeText={this.handleChangeContent} />
                            </View>
                        </View>
                    </Modal>
                </View> 
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        backgroundColor: '#282A36',
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        padding: 8,
        backgroundColor: '#282A36',
    },
    content: {
        display: 'flex',
        flexGrow: 1,
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
    searchInput: {
        color: '#BD93F9',
        fontSize: 12,
        fontWeight: "500",
        width: 280,
        padding: 0,
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
    navbarButton: {
        color: '#BD93F9',
        padding: 4,  
    },
    title: {
        flexGrow: 1,
        color: '#F8F8F2',
        textAlign: 'center',
    },
    contentInput: {
        color: '#BD93F9',
        width: '96%',
    }
});