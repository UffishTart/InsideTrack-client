//import liraries
import React, { Component } from 'react';
import { Constants, Ionicons } from 'expo'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AuthFormScreen, { Login, Signup } from '../pop-up-screens/AuthFormScreen'
import { createStackNavigator } from 'react-navigation'
import { Foundation } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import Settings from '../pop-up-screens/Settings';

// create a component
export default class HomeScreen extends Component {
  state = {
    showLogin: false,
    showSettings: false,
  }

  toggleAuthView = () => this.setState({ showLogin: !this.state.showLogin });

  toggleSettingsView = () => this.setState({ showSettings: !this.state.showSettings });

  renderTouchAuth() {
    const authTent = this.state.showLogin ? this.renderAuthForm() : console.log('No auth!')
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.toggleAuthView}>
          <View>{authTent}</View>
        </TouchableOpacity>
      </View>
    )
  }

  renderTouchSettings() {
    const settingsTent = this.state.showSettings ? this.renderSettings() : console.log('No settings!')
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.toggleSettingsView} >
          <View>{settingsTent}</View>
        </TouchableOpacity>
      </View>
    )

  }

  renderAuthForm() {
    // return <AuthFormScreen onPress={this.toggleAuthView.bind(this)} />;
    return (
      <Login />
    )
  }
  renderSettings() {
    return <Settings onPress={this.toggleSettingsView.bind(this)} />;
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.renderTouchAuth()}
        </View>
        <View style={styles.container}>
          {this.renderTouchSettings()}
        </View>
        <View style={styles.container}>
          <Text>uuhhhhh</Text>
        </View>
      </View>
    )
  }
}

// render() {
//   const content = this.state.showLogin && this.renderLogin();
//   // this.renderTopBar()
//   return (<View style={styles.container}>{content}</View>
//   );
// }}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#2c3e50',
  // },
  // topBar: {
  //   flex: 1,
  //   // backgroundColor: 'transparent',
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   // paddingTop: Constants.statusBarHeight / 2,
  // },
  // toggleButton: {
  //   flex: 0.25,
  //   height: 40,
  //   marginHorizontal: 2,
  //   marginBottom: 10,
  //   marginTop: 20,
  //   padding: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }
});

{/* <Button title='Giddy yup'
onPress={() => this.state.navigation.navigate('AuthForm')} /> */}



//make this component available to the app
