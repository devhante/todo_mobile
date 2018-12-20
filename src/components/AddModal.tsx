import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { ITodoSerializer } from '../serializer';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

@inject(STORE_NAME)
@observer
export default class AddModal extends Component<IStoreInjectedProps> {
    private handleCancel = () => {
        this.props[STORE_NAME]!.modalStore.setModalInvisible();
    };

    private handleSave = () => {
        if (this.props[STORE_NAME]!.modalStore.content.length > 100) {
            this.openAlertFailed();
        } else {
            this.addTodo();
        }
        this.props[STORE_NAME]!.modalStore.setModalInvisible();
    };

    private openAlertFailed = () => {
        Alert.alert(
            '할 일 추가에 실패했습니다.',
            '할 일의 내용이 너무 깁니다. 100자 이내의 내용만 추가할 수 있습니다.',
            [{ text: '확인' }]
        );
    };

    private addTodo = async () => {
        try {
            this.props[STORE_NAME]!.loadingStore.startLoading();
            const response = await this.props[
                STORE_NAME
            ]!.axiosStore.instance.post<ITodoSerializer>('todo/', {
                content: this.props[STORE_NAME]!.modalStore.content
            });
            this.props[STORE_NAME]!.loadingStore.endLoading();
            const newTodoList: ITodoSerializer[] = [
                ...this.props[STORE_NAME]!.todoStore.todoList
            ];
            newTodoList.push(response.data);
            this.props[STORE_NAME]!.todoStore.setTodoList(newTodoList);
        } catch (error) {
            this.props[STORE_NAME]!.loadingStore.endLoading();
            console.log(error);
        }
    };

    private handleChangeContent = (value: string) => {
        this.props[STORE_NAME]!.modalStore.setContent(value);
    };

    public render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.rootStore!.modalStore.isModalVisible}
                onRequestClose={
                    this.props[STORE_NAME]!.modalStore.setModalInvisible
                }
            >
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.handleCancel}
                        >
                            <Text style={styles.navbarButton}>취소</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>할 일 추가</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.handleSave}
                        >
                            <Text style={styles.navbarButton}>저장</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <TextInput
                            style={styles.contentInput}
                            placeholder="내용"
                            placeholderTextColor="#BD93F9"
                            underlineColorAndroid="#BD93F9"
                            onChangeText={this.handleChangeContent}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: '100%',
        backgroundColor: '#282A36'
    },
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        padding: 8,
        backgroundColor: '#282A36'
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    navbarButton: {
        color: '#BD93F9',
        padding: 4
    },
    title: {
        flexGrow: 1,
        color: '#F8F8F2',
        textAlign: 'center'
    },
    contentInput: {
        color: '#BD93F9',
        width: '96%'
    }
});
