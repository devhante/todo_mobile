import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TodoItem } from '.';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

@inject(STORE_NAME)
@observer
export class TodoList extends Component<IStoreInjectedProps> {
    public render() {
        const todoList = this.props[STORE_NAME]!.todoStore.todoList;
        const searchWord = this.props[STORE_NAME]!.searchStore.searchWord;

        return (
            <ScrollView style={styles.content}>
                {(searchWord !== ''
                    ? todoList.filter(item => {
                          return item.content.includes(searchWord);
                      })
                    : todoList
                ).map(item => (
                    <TodoItem key={item.id} todo={item} />
                ))}
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
