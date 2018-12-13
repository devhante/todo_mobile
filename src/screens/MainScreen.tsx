import { inject } from 'mobx-react';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AddButton from '../components/AddButton';
import NavBar from '../components/NavBar';
import ProgressText from '../components/ProgressText';
import TodoList from '../components/TodoList';
import { TodoSerializer } from '../serializer';
import RootStore from '../stores/rootStore';

type Props = {
    rootStore?: RootStore;
};

@inject('rootStore')
export default class MainScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.createAxiosAndGetTodoList();
    };

    private createAxiosAndGetTodoList = async () => {
        await this.props.rootStore!.axiosStore.create();
        this.getTodoList();
    }

    private getTodoList = async () => {
        try {
            this.props.rootStore!.loadingStore.startLoading();
            const response = await this.props.rootStore!.axiosStore.instance.get<TodoSerializer[]>('todo/');
            this.props.rootStore!.loadingStore.endLoading();
            this.props.rootStore!.todoStore.setTodoList(response.data);
        } catch (error) {
            this.props.rootStore!.loadingStore.endLoading();
            console.log(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar navigation={this.props.navigation}/>
                <ProgressText />
                <TodoList />
                <AddButton />
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#282A36',
        
    },
    loadingIndicator: {
        position: 'absolute',
    },
});