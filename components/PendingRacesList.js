import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import PendingRacesListItem from './PendingRacesListItem';

const PendingRacesList = props => {
  const { user, races, isOwnerBool, toggleStart, getPendingRaces } = props;
  return (
    <View>
      <ScrollView>
        {!!races.length &&
          races
            .filter(race => {
              return race.isOwner === isOwnerBool;
            })
            .map(race => {
              return (
                <PendingRacesListItem
                  key={race.raceId}
                  user={user}
                  race={race}
                  toggleStart={toggleStart}
                  getPendingRaces={getPendingRaces}
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
})