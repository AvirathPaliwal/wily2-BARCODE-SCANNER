import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './screens/Search'
import Transaction from './screens/Transaction'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
export default class App extends Component {
  render() {
    return (
      <AppContaner />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const TabNavigator = createBottomTabNavigator({
  screen1: { screen: Transaction },
  screen2: { screen: Search },
})
const AppContaner = createAppContainer(TabNavigator);
