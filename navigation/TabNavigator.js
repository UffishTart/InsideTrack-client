
import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import HomeScreen from '../screens/tabs/HomeScreen'
import ProfileScreen from '../screens/tabs/ProfileScreen'
import RacesScreen from '../screens/tabs/RacesScreen'
import PedometerScreen from '../screens/tabs/PedometerScreen'
import { Login } from '../screens/pop-up-screens/AuthFormScreen'

import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
// import Icon from 'react-native-vector-icons/Ionicons' //Need to install

export const SignedOut = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login",
    }
  }
})

const SignedIn = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
    }
  },
  Races: {
    screen: RacesScreen,
    navigationOptions: {
      tabBarLabel: 'My Races',
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'My Steed',
    }
  },
  PedometerTest: {
    screen: PedometerScreen,
    navigationOptions: {
      tabBarLabel: 'Pedometer Test'
    }
  }
})


export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

