import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};
export default class MainScreen extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>This is Main Screen.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282E36',
    },
    text: {
        color: '#F8F8F2',
    },
});