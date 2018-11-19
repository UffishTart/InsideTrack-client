import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
// import SingleRace from '../../screens/pop-up-screens'

class CurrentRaces extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Text>Name: {this.props.race.name}</Text>
          {/* click into here to load a pop-up-screen to SingleRace.js */}
          <Text>Length: {this.props.race.length}</Text>
        </View>
      </View>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 75,
    paddingTop: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInfo: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    borderWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default CurrentRaces;