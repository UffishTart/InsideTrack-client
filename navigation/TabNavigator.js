import React, { Component } from 'react'
import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/tabs/HomeScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import RacesScreen from '../screens/tabs/RacesScreen';
import PendingRacesScreen from '../screens/tabs/PendingRacesScreen';
import SingleRace from '../screens/pop-up-screens/SingleRace';
import { Login, Signup } from '../screens/pop-up-screens/AuthFormScreen';
import AuthFormSelect from '../components/AuthFormSelect';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons' //Need to install
import { MaterialIcons } from '@expo/vector-icons';

const tabBarIcon = name => ({ tintColor }) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

const SignedOut = createStackNavigator({
  AuthFormSelect: {
    screen: AuthFormSelect,
    navigationOptions: {
      title: 'Welcome',
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'Sign Up',
    },
  },
  SingleRace: {
    screen: SingleRace,
    navigationOptions: {
      title: 'Single Race',
    },
  },
});

const SignedIn = createMaterialBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarColor: '#fff',
      tabBarIcon: tabBarIcon('home'),
    },
  },
  Races: {
    screen: RacesScreen,
    navigationOptions: {
      tabBarColor: '#fff',
      tabBarIcon: tabBarIcon('directions-run'),
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarColor: '#fff',
      tabBarIcon: tabBarIcon('person'),
    },
  },
  PendingRaces: {
    screen: PendingRacesScreen,
    navigationOptions: {
      tabBarColor: '#fff',
      tabBarIcon: tabBarIcon('mail'),
      title: 'Pending Races'
    }
  }
}, {
    initialRouteName: 'Home',
    activeColor: '#ef1717',
    inactiveColor: 'black',
    barStyle: { backgroundColor: '#fff' },
  });

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn,
      },
      SignedOut: {
        screen: SignedOut,
      },
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
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
