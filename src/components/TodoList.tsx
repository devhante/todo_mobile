import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TodoItem from '../components/TodoItem';
import RootStore from '../stores/rootStore';

type Props = {
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class TodoList extends Component<Props> {
    render() {
        const rootStore = this.props.rootStore as RootStore;
        return (
            <View style={styles.content}>
                {rootStore.todoStore.todoList.map((item) => (
                    rootStore.searchStore.searchWord.trim() !== ''
                    ? (item.content.includes(rootStore.searchStore.searchWord.trim())
                    ? <TodoItem key={item.id} todo={item}/> : <React.Fragment key={item.id} /> )
                    : <TodoItem key={item.id} todo={item}/>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',        
    },  
});