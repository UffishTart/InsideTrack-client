import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PendingRacesListItem from './PendingRacesListItem';

const PendingRacesList = props => {
  const { user, races, isOwnerBool } = props;
  console.log(props)
  return (
    <View
      style={
        isOwnerBool
          ? [styles.flexCont, { backgroundColor: '#D9AFAF' }]
          : [styles.flexCont, { backgroundColor: '#A3DDFA' }]
      }
    >
      <ScrollView>
        {!!races.length &&
          races
            .filter(race => {
              return race.isOwner ? race.isOwner !== isOwnerBool : 'null';
            })
            .map(race => {
              return (
                <PendingRacesListItem
                  key={race.raceId}
                  user={user}
                  race={race}
                />
              );
            })}
      </ScrollView>
    </View>
  );
};

export default PendingRacesList;

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
