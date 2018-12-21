import React, { Component } from 'react';
import { RegisteredStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IStoreInjectedProps } from '../stores/rootStore';

interface IProps extends IStoreInjectedProps {
    onPress: () => void;
    style: RegisteredStyle<any>;
    iconName: string;
    iconSize: number;
    iconColor: string;
}

export class IconButton extends Component<IProps> {
    public render() {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={this.props.onPress}>
                <Icon
                    style={this.props.style}
                    name={this.props.iconName}
                    size={this.props.iconSize}
                    color={this.props.iconColor}
                />
            </TouchableOpacity>
        );
    }
}
