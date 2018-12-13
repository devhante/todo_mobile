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
@observer
export default class MainScreen extends Component<Props> {
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

    render() {
        const rootStore = this.props.rootStore as RootStore;
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