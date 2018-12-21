import { inject } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AddModal } from '.';
import { COLOR_CONSTANTS } from '../constants';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

@inject(STORE_NAME)
export class AddButton extends Component<IStoreInjectedProps> {
    private handlePressAdd = () => {
        this.props[STORE_NAME]!.modalStore.setModalVisible();
    };

    public render() {
        return (
            <React.Fragment>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.handlePressAdd}
                    style={styles.addButton}
                >
                    <Icon
                        name="lens"
                        size={56}
                        color={COLOR_CONSTANTS.purple}
                    />
                    <Icon
                        style={styles.addIcon}
                        name="add"
                        size={24}
                        color={COLOR_CONSTANTS.white}
                    />
                </TouchableOpacity>
                <AddModal />
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 16,
        bottom: 16
    },
    addIcon: {
        position: 'absolute'
    }
});
