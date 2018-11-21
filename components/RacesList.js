import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import RacesListItem from './RacesListItem';

const RacesList = props => {
  const { user, races, isCompleted } = props;
  return (
    <View
      style={
        isCompleted
          ? [styles.flexCont, { backgroundColor: '#D9AFAF' }]
          : [styles.flexCont, { backgroundColor: '#A3DDFA' }]
      }
    >
      <ScrollView>
        {!!races.length &&
          races
            .filter(race => {
              return (race.raceInfo.completedStatus === isCompleted);
            })
            .map(race => {
              return (
                <RacesListItem
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
