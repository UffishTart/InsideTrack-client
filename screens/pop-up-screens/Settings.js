//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

// create a component
class Settings extends Component {
  state = {

    modalVisible: false

  }

  render() {
    return (
      <Modal >
        <View style={styles.container}>
          <Text>Settings</Text>
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
