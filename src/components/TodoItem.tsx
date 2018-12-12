import React, { Component } from 'react';
import { View, Text, StyleSheet, CheckBox, TouchableOpacity, Alert } from 'react-native';
import RootStore from '../stores/rootStore';
import { inject, observer } from 'mobx-react';
import { TodoSerializer } from '../serializer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AxiosResponse } from 'axios';
import { observable, action, reaction } from 'mobx';

type Props = {
    todo: TodoSerializer;
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class TodoItem extends Component<Props> {
    @observable isDeleted = false;

    private handleDelete = () => {
        Alert.alert('할 일 삭제하기', '정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
        [
            {text: '취소', onPress: this.cancelDeleteTodo, style: 'cancel'},
            {text: '확인', onPress: this.deleteTodo},
        ],
        );
    }

    @action
    private cancelDeleteTodo = () => {
        this.isDeleted = false;
    }

    private deleteTodo = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            const response = await rootStore.axiosStore.instance.delete('todo/' + this.props.todo.id + '/') as AxiosResponse<TodoSerializer>;
            rootStore.todoStore.deleteTodo(response.data.id);
        } catch(err) {
            if(err !== undefined) {
                console.log(err.response);
            }
        }
    }

    private handleChangeCheckbox = (value: boolean) => {
        if(value === true) {
            this.completeTodo();
        } else {
            this.revertTodo();
        }
    }

    private completeTodo = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            const response = await rootStore.axiosStore.instance.post<TodoSerializer>('todo/' + this.props.todo.id + '/complete/');
            rootStore.todoStore.completeTodo(response.data.id, response.data.completedAt);
        } catch(err) {
            if(err !== undefined) {
                console.log(err.response);
            }
        }
    }

    private revertTodo = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            const response = await rootStore.axiosStore.instance.post<TodoSerializer>('todo/' + this.props.todo.id + '/revert_complete/')
            rootStore.todoStore.revertTodo(response.data.id);
        } catch(err) {
            if(err !== undefined) {
                console.log(err.response);
            }
        }
    }
    
    private handleFavor = async () => {
        const rootStore = this.props.rootStore as RootStore;
        try {
            const response = await rootStore.axiosStore.instance.post<TodoSerializer>('todo/' + this.props.todo.id + '/add_like/');
            rootStore.todoStore.setLike(response.data.id, response.data.like);
        } catch(err) {
            if(err !== undefined) {
                console.log(err.response);
            }
        }
    }

    render() {
        const rootStore = this.props.rootStore as RootStore;

        const created = new Date(this.props.todo.createdAt);

        const createdYear = created.getFullYear();
        const createdMonth = created.getMonth();
        const createdDate = created.getDate();
        const createdAmpm = created.getHours() < 12 ? '오전' : '오후';
        let createdHour = created.getHours();
        const createdMinute = created.getMinutes();
        const createdSecond = created.getSeconds();
        
        const completed = this.props.todo.isCompleted ? new Date(this.props.todo.completedAt) : null;
        
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
                    <Text style={styles.content}>{this.props.todo.content}</Text>
                    <Text style={styles.todoText}>{this.props.todo.user.name}</Text>
                    <Text style={styles.todoText}>
                        {createdYear}년 {createdMonth}월 {createdDate}일 {createdAmpm} {createdHour}시 {createdMinute}분 {createdSecond}초에 생성됨
                    </Text>
                    <Text style={styles.todoText}>
                        {this.props.todo.isCompleted ? (
                            `${completedYear}년 ${completedMonth}월 ${completedDate}일 ${completedAmpm} ${completedHour}시 ${completedMinute}분 ${completedSecond}초에 완료됨`
                        ) : ('')}
                    </Text>
                </View>
                <View style={styles.right}>
                    {rootStore.deleteStore.isDeletable ? (
                        <CheckBox style={styles.checkbox} value={this.isDeleted} onValueChange={this.handleDelete}/>
                    ) : (
                        <React.Fragment>
                            <CheckBox style={styles.checkbox} value={this.props.todo.isCompleted} onValueChange={this.handleChangeCheckbox}/>
                            <TouchableOpacity activeOpacity={0.7} onPress={this.handleFavor}>
                                <Icon style={styles.favor} name='favorite' size={22} color='#BD93F9' />
                            </TouchableOpacity>
                            <Text style={styles.favorCount}>{this.props.todo.like}</Text>
                        </React.Fragment>
                    ) }
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