//import liraries
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';

// create a component
class Settings extends Component {

  render() {
    return (
      <Modal backgroundColor='yellow'>
        <View style={styles.container}>
          <Button title='hey' onPress={this.props.toggleSettingsView}>Settings</Button>
        </View>
      </Modal>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Settings;
