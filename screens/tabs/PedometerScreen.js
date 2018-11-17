import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
export default class PedometerScreen extends Component {
  render() {
    return (
      <View style={styles.main}>  
        <Text>Test Pedometer</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column'
  }
})