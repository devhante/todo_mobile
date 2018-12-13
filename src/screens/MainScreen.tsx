import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { AsyncStorage, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TodoItem from '../components/TodoItem';
import { TodoSerializer } from '../serializer';
import RootStore from '../stores/rootStore';

type Props = {
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class MainScreen extends Component<Props> {

    @observable
    private isModalVisible = false;

    @observable
    private content = '';
    
    @action private setModalVisible = () => {
        this.isModalVisible = true;
    }

    @action private setModalInvisible = () => {
        this.isModalVisible = false;
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

    private getTodoList = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            const response = await rootStore.axiosStore.instance.get<TodoSerializer[]>('todo/');
            rootStore.todoStore.setTodoList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    private handleChangeSearch = (value: string) => {
        const rootStore = this.props.rootStore as RootStore;
        rootStore.searchStore.setSearchWord(value);
    };

    private handlePressDelete = () => {
        const rootStore = this.props.rootStore as RootStore;
        rootStore.deleteStore.allowDelete();
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

    private handlePressAdd = () => {
        this.setModalVisible();
    }

    private handleCancel = () => {
        this.setModalInvisible();
    }
    
    private handleSave = () => {
        this.addTodo();
        this.setModalInvisible();
    }

    private addTodo = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            const response = await rootStore.axiosStore.instance.post<TodoSerializer>('todo/', {
                content: this.content
            });
            rootStore.todoStore.addTodo(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    private handleChangeContent = (value: string) => {
        this.content = value;
    }

    render() {
        const rootStore = this.props.rootStore as RootStore;
        return (
            <View style={styles.container}>
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
                <View style={styles.content}>
                    {rootStore.todoStore.todoList.map((item) => (
                        rootStore.searchStore.searchWord.trim() !== ''
                        ? (item.content.includes(rootStore.searchStore.searchWord.trim())
                        ? <TodoItem key={item.id} todo={item}/> : <React.Fragment key={item.id} /> )
                        : <TodoItem key={item.id} todo={item}/>
                    ))}
                    <TouchableOpacity activeOpacity={0.7} onPress={this.handlePressAdd} style={styles.addButton}>
                    <Icon name='lens' size={56} color='#BD93F9' />
                    <Icon style={styles.addIcon} name='add' size={24} color='#FFFFFF'/>
                    </TouchableOpacity>
                </View>
                <Modal animationType='slide' transparent={false} visible={this.isModalVisible}
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
    addButton: {
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