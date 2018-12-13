import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddModal from './AddModal';
import RootStore from '../stores/rootStore';

type Props = {
    rootStore?: RootStore;
};

@inject('rootStore')
@observer
export default class AddButton extends Component<Props> {

    private handlePressAdd = () => {
        this.props.rootStore!.modalStore.setModalVisible();
    }

    render() {
        return (
            <React.Fragment>
                <TouchableOpacity activeOpacity={0.7} onPress={this.handlePressAdd} style={styles.addButton}>
                    <Icon name='lens' size={56} color='#BD93F9' />
                    <Icon style={styles.addIcon} name='add' size={24} color='#FFFFFF'/>
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
        bottom: 16,
    },
    addIcon: {
        position: 'absolute',
    },
    
});