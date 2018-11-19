//import liraries
import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, Modal } from 'react-native';
import HorseComponent from '../../components/HorseComponent';

// create a component
class SingleRace extends Component {
  render() {
    console.log('SingleRace', 'hello')
    return (
      <Modal>
        <View style={styles.container}>
          <HorseComponent />
          <Button title='hey' onPress={this.props.toggleSingleRaceView}>SingleRace</Button>
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
export default SingleRace;
