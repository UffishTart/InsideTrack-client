import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import RacesListItem from './RacesListItem'
export default class RacesList extends Component {
  render() {
    const {races, inProgressBool} = this.props

    return (
      <View style={
        this.props.inProgressBool ?
        [styles.flexCont, { backgroundColor: 'red' }] :
        [styles.flexCont, { backgroundColor: 'blue' }]
      }>
        <ScrollView>
          {races && races.filter(race => {
            return race.completedStatus !== inProgressBool
            }
          )
            .map(race => {
              return (
                <RacesListItem key={race.name} race={race} />
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flexCont: {
    flex: 1
  }
});