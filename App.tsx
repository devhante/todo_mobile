/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Icon style={styles.icon} name="list-ul" size={60} color="#6200EE" />
          <Text>To-do List App</Text>
        </View>
        <View style={styles.bottom}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    flexGrow: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    margin: 16,
  }
});
