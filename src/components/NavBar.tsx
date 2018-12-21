import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IconButton } from '.';
import { COLOR_CONSTANTS } from '../constants';
import { IStoreInjectedProps, STORE_NAME } from '../stores/rootStore';

interface IProps extends IStoreInjectedProps {
    navigation: any;
}

@inject(STORE_NAME)
@observer
export class NavBar extends Component<IProps> {
    private handleChangeSearch = (value: string) => {
        this.props[STORE_NAME]!.searchStore.setSearchWord(value);
    };

    private handlePressDelete = () => {
        this.props[STORE_NAME]!.deleteStore.changeDeletable();
    };

    private handlePressLogout = () => {
        this.props[STORE_NAME]!.deleteStore.disallowDelete();
        this.removeAuthToken();
        this.navigateToLogin();
    };

    private removeAuthToken = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
        } catch (error) {
            console.log(error.message);
        }
    };

    private navigateToLogin = () => {
        this.props.navigation.navigate('Login');
    };

    public render() {
        return (
            <View style={styles.navbar}>
                <View style={styles.searchBox}>
                    <Icon
                        style={styles.searchIcon}
                        name="search"
                        size={20}
                        color={COLOR_CONSTANTS.purple}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="검색"
                        placeholderTextColor={COLOR_CONSTANTS.purple}
                        underlineColorAndroid="transparent"
                        onChangeText={this.handleChangeSearch}
                    />
                </View>

                <IconButton
                    onPress={this.handlePressDelete}
                    style={styles.deleteIcon}
                    iconName="delete"
                    iconSize={24}
                    iconColor={COLOR_CONSTANTS.purple}
                />
                <IconButton
                    onPress={this.handlePressLogout}
                    style={styles.logoutIcon}
                    iconName="exit-to-app"
                    iconSize={24}
                    iconColor={COLOR_CONSTANTS.purple}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        padding: 8,
        backgroundColor: COLOR_CONSTANTS.background
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        padding: 8,
        backgroundColor: COLOR_CONSTANTS.currentLine
    },
    searchIcon: {
        marginRight: 8
    },
    searchInput: {
        color: COLOR_CONSTANTS.purple,
        fontSize: 12,
        fontWeight: '500',
        width: 280,
        padding: 0
    },
    deleteIcon: {
        marginLeft: 8
    },
    logoutIcon: {
        marginLeft: 8
    }
});
