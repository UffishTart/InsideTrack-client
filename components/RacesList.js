import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import RacesListItem from './RacesListItem';

const RacesList = props => {
  const { races, inProgressBool } = props;
  return (
    <View
      style={
        inProgressBool
          ? [styles.flexCont, { backgroundColor: 'red' }]
          : [styles.flexCont, { backgroundColor: 'blue' }]
      }
    >
      <ScrollView>
        {races &&
          races
            .filter(race => {
              return race.raceInfo.completedStatus !== inProgressBool;
            })
            .map(race => {
              return <RacesListItem key={race.raceInfo.name} race={race} />;
            })}
      </ScrollView>
    </View>
  );
};

export default RacesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  flexCont: {
    flex: 1,
  },
});
