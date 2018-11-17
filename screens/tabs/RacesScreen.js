//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CurrentRaces from '../../components/CurrentRaces'
import PastRaces from '../../components/PastRaces'


// create a component
class Races extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CurrentRaces />
        {/* map function? */}
        <PastRaces />
        {/* swipe into here somehow? will be a PastRacesWrapper maybe? basically loading
        different components by swiping... */}
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
export default Races;
