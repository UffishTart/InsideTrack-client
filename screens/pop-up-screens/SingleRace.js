//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HorseComponent from '../../components/HorseComponent';

// create a component
class SingleRace extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HorseComponent />
      </View>
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
