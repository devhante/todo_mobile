import { inject } from 'mobx-react';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { AddButton, NavBar, ProgressText, TodoList } from '../components';
import { COLOR_CONSTANTS } from '../constants';
import { ITodoSerializer } from '../models';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

interface IProps extends IStoreInjectedProps {
    navigation: NavigationScreenProp<{}>;
}

@inject(STORE_NAME)
export default class MainScreen extends Component<IProps> {
    public componentDidMount() {
        this.getTodoList();
    }

    private getTodoList = async () => {
        try {
            this.props[STORE_NAME]!.loadingStore.startLoading();
            const response = await this.props[
                STORE_NAME
            ]!.axiosStore.instance.get<ITodoSerializer[]>('todo/');
            this.props[STORE_NAME]!.loadingStore.endLoading();
            this.props[STORE_NAME]!.todoStore.setTodoList(response.data);
        } catch (error) {
            this.props[STORE_NAME]!.loadingStore.endLoading();
            console.log(error);
        }
    };

    public render() {
        return (
            <View style={styles.container}>
                <NavBar navigation={this.props.navigation} />
                <ProgressText />
                <TodoList />
                <AddButton />
                {this.props[STORE_NAME]!.loadingStore.isLoading ? (
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size="large"
                    />
                ) : null}
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
        backgroundColor: COLOR_CONSTANTS.background
    },
    loadingIndicator: {
        position: 'absolute'
    }
});
