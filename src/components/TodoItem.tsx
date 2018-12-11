import React, { Component } from 'react';
import { View, Text, StyleSheet, CheckBox } from 'react-native';
import RootStore from '../stores/rootStore';
import { inject, observer } from 'mobx-react';
import { TodoSerializer } from '../serializer';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
    id: number;
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class TodoItem extends Component<Props> {
    private handleChangeCheckbox = (value: boolean) => {
        if(value === true) {
            this.complete();
        } else {
            this.revert();
        }
    }

    private complete = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            const response = await rootStore.axiosStore.instance.post<TodoSerializer>('todo/' + this.props.id + '/complete/');
            rootStore.todoStore.completeTodo(response.data.id, response.data.completedAt);
        } catch(err) {
            if(err !== undefined) {
                console.log(err.response);
            }
        }
    }

    private revert = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            const response = await rootStore.axiosStore.instance.post<TodoSerializer>('todo/' + this.props.id + '/revert_complete/')
            rootStore.todoStore.revertTodo(response.data.id);
        } catch(err) {
            if(err !== undefined) {
                console.log(err.response);
            }
        }
    }

    render() {
        const rootStore = this.props.rootStore as RootStore;

        let myTodo = new TodoSerializer;
        rootStore.todoStore.todoList.forEach((item) => {
            if(item.id === this.props.id) {
                myTodo = item;
            }
        });

        const created = new Date(myTodo.createdAt);

        const createdYear = created.getFullYear();
        const createdMonth = created.getMonth();
        const createdDate = created.getDate();
        const createdAmpm = created.getHours() < 12 ? '오전' : '오후';
        let createdHour = created.getHours();
        const createdMinute = created.getMinutes();
        const createdSecond = created.getSeconds();
        
        const completed = myTodo.isCompleted ? new Date(myTodo.completedAt) : null;
        
        const completedYear = completed ? completed.getFullYear() : null;
        const completedMonth = completed ? completed.getMonth() : null;
        const completedDate = completed ? completed.getDate() : null;
        const completedAmpm = completed ? completed.getHours() < 12 ? '오전' : '오후' : null;
        let completedHour = completed ? completed.getHours() : null;
        const completedMinute = completed ? completed.getMinutes() : null;
        const completedSecond = completed ? completed.getSeconds() : null;

        if(createdHour > 12) {
            createdHour -= 12;
        }

        if(completedHour != null) {
            if(completedHour > 12) {
                completedHour -= 12;
            }
        }

        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.content}>{myTodo.content}</Text>
                    <Text style={styles.todoText}>{myTodo.user.name}</Text>
                    <Text style={styles.todoText}>
                        {createdYear}년 {createdMonth}월 {createdDate}일 {createdAmpm} {createdHour}시 {createdMinute}분 {createdSecond}초에 생성됨
                    </Text>
                    <Text style={styles.todoText}>
                        {myTodo.isCompleted ? (
                            `${completedYear}년 ${completedMonth}월 ${completedDate}일 ${completedAmpm} ${completedHour}시 ${completedMinute}분 ${completedSecond}초에 완료됨`
                        ) : ('')}
                    </Text>
                </View>
                <View style={styles.right}>
                    <CheckBox style={styles.checkbox} value={myTodo.isCompleted} onValueChange={this.handleChangeCheckbox}/>
                    <Icon style={styles.favor} name='favorite' size={22} color='#BD93F9' />
                    <Text style={styles.favorCount}>1</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 16,
        // borderWidth: 1,
    },
    left: {
        // borderWidth: 1,
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        // borderWidth: 1,
    },
    
    content: {
        color: '#F8F8F2',
        fontSize: 16,
    },
    todoText: {
        color: '#F8F8F2',
        fontSize: 12,
    },
    checkbox: {
        
    },
    favor: {
        padding: 4,
    },
    favorCount: {
        color: '#BD93F9',
        padding: 4,
    }
});