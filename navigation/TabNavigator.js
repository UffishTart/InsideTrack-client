
import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import HomeScreen from '../screens/tabs/HomeScreen'
import ProfileScreen from '../screens/tabs/ProfileScreen'
import RacesScreen from '../screens/tabs/RacesScreen'
// import TabBarIcon from '../components/TabBarIcon';

// import AuthFormScreen from './screens/ToucableOpacities/AuthFormScreen'
// Login, Signup

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
// import Icon from 'react-native-vector-icons/Ionicons' //Need to install

export class TabNavigator extends React.Component {
  render() {
    return (
      <BottomTabNavigator />
    );
  }
}


const BottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarVisible: false
      // tabBarIcon: () => (
      //   <Icon
      //     name="ios-home" color={tintColor} size={24} />
      // )
    }
  },
  Races: {
    screen: RacesScreen,
    navigationOptions: {
      tabBarLabel: 'My Races',
      tabBarVisible: false
      // tabBarIcon: () => (
      //   <Icon
      //     name="ios-home" color={tintColor} size={24} />
      // )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: 'My Steed',
      // tabBarIcon: () => (
      //   <Icon
      //     name="ios-home" color={tintColor} size={24} />
      // )
    }
  }
})


export default BottomTabNavigator

// export default createBottomTabNavigator({
//   AuthForm: {
//     screen: AuthForm,
//     navigationOptions: {
//       tabBarLabel: 'AuthForm',
//       // tabBarIcon: () => (
//       //   <Icon />
//       //   // name="ios-home" color={tintColor} size={24} 
//       // )
//     }
//   }
// })
// }, initialRouteName: 'AuthForm',
// order: [AuthForm],
// //navigation for complete tab navigator
// navigationOptions: {
//   tabBarVisible: true
// },
//   tabBarOptions: {
//     activeTintColor: 'red',
//     inactiveTintColor: 'grey'
//   }
// });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

{/* <View style={styles.container}>
  <Text>Open up App.js to start working on your app!</Text>
  <AuthForm />
</View> */}