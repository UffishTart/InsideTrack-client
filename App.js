import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createRootNavigator } from './navigation/TabNavigator';
import { isSignedIn } from './navigation/AsyncStorageAuth'
import { auth } from './store/user'

class App extends React.Component {
  constructor(props){
    super()
    this.state = {
      signedIn: false,
      checkedSignIn: false
    }
  }

  async componentDidMount() {
    const status = await isSignedIn()
    if (status) 
    this.setState({
      signedIn: status,
      checkedSignIn: true
    })
  }
  render() {
    const Navigator = createRootNavigator(this.state.signedIn)
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Navigator />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App

  // state = {
  //   isLoadingComplete: true,
  // };

  // render() {
  //   if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
  //     return (
  //       <AppLoading
  //         startAsync={this._loadResourcesAsync}
  //         onError={this._handleLoadingError}
  //         onFinish={this._handleFinishLoading}
  //       />
  //     );
  //   } else {