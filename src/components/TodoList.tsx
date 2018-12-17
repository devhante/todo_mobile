import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TodoItem from '../components/TodoItem';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

@inject(STORE_NAME)
@observer
export default class TodoList extends Component<IStoreInjectedProps> {
    public render() {
        return (
            <ScrollView style={styles.content}>
                {this.props[STORE_NAME]!.todoStore.todoList.map(item =>
                    this.props[STORE_NAME]!.searchStore.searchWord.trim() !==
                    '' ? (
                        item.content.includes(
                            this.props[
                                STORE_NAME
                            ]!.searchStore.searchWord.trim()
                        ) ? (
                            <TodoItem key={item.id} todo={item} />
                        ) : (
                            <React.Fragment key={item.id} />
                        )
                    ) : (
                        <TodoItem key={item.id} todo={item} />
                    )
                )}
                <View style={styles.bottom} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flexGrow: 1,
        width: '100%'
    },
    bottom: {
        height: 52
    }
});
