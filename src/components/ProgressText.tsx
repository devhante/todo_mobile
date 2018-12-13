import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import RootStore from "../stores/rootStore";

type Props = {
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class ProgressText extends Component<Props> {

    @computed
    get count() {
        return this.props.rootStore!.todoStore.todoList.length;
    };

    @computed
    get completedCount() {
        let value = 0;
        this.props.rootStore!.todoStore.todoList.forEach((item) => {
            if(item.isCompleted) {
                value++;
            }
        });
        return value;
    }

    @computed
    get percent() {
        if(this.count === 0) {
            return 0;
        } else {
            return Math.ceil(this.completedCount / this.count * 10000) / 100;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.percent}% 완료되었습니다. ({this.count}개 중 {this.completedCount}개 완료)
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
        padding: 8,
    },
    text: {
        color: '#F8F8F2',
    },
});