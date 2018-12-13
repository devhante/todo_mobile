import axios from "axios";
import { action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { AsyncStorage, Button, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { UserSerializer } from "../serializer";
import RootStore from "../stores/rootStore";

type Props = {
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class ProgressText extends Component<Props> {
    render() {
        const count = this.props.rootStore!.todoStore.todoList.length
        let completedCount = 0;
        this.props.rootStore!.todoStore.todoList.forEach((item) => {
            if(item.isCompleted) {
                completedCount++;
            }
        });

        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {count === 0 ? 0 : Math.ceil(completedCount / count * 10000) / 100}% 완료되었습니다. ({count}개 중 {completedCount}개 완료)
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#F8F8F2',
    },
});