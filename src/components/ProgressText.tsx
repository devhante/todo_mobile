import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR_CONSTANTS } from '../constants';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

@inject(STORE_NAME)
@observer
export class ProgressText extends Component<IStoreInjectedProps> {
    @computed
    get count() {
        return this.props[STORE_NAME]!.todoStore.todoList.length;
    }

    @computed
    get completedCount() {
        let value = 0;
        this.props[STORE_NAME]!.todoStore.todoList.forEach(item => {
            if (item.isCompleted) {
                value++;
            }
        });
        return value;
    }

    @computed
    get percent() {
        if (this.count === 0) {
            return 0;
        } else {
            return Math.ceil((this.completedCount / this.count) * 10000) / 100;
        }
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {this.percent}% 완료되었습니다. ({this.count}개 중{' '}
                    {this.completedCount}개 완료)
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
        padding: 8
    },
    text: {
        color: COLOR_CONSTANTS.foreground
    }
});
