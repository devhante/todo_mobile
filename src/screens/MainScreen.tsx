import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AddButton from '../components/AddButton';
import NavBar from '../components/NavBar';
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
            const response = await this.props.rootStore!.axiosStore.instance.get<TodoSerializer[]>('todo/');
            this.props.rootStore!.todoStore.setTodoList(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar navigation={this.props.navigation}/>
                <TodoList />
                <AddButton />  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        backgroundColor: '#282A36',
    }
});