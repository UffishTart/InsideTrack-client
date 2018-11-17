import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
// import SingleRace from '../../screens/pop-up-screens'

class PastRaces extends Component {
  render() {
    return (
      <View>
        <Text> A Past Race </Text>
        {/* click into here to load a pop-up-screen to SingleRace.js */}
      </View>
    )
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
export default PastRaces