import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground, Button } from 'react-native';
import RacesListItem from './RacesListItem';

{/* <View</View></View>
      style={
        isCompleted
          ? [styles.flexCont, { backgroundColor: '#D9AFAF' }]
          : [styles.flexCont, { backgroundColor: '#A3DDFA' }]
      }
    > */}

const RacesList = props => {
  const { user, races, isCompleted, refreshRaces, updateRaceAsComplete } = props;
  return (
    <View
      style={[styles.backgroundImage]}
    >
      <Button onPress={refreshRaces} title='Refresh' />
      <ScrollView>
        {!!races.length &&
          races
            .filter(race => {
              return race.raceInfo.completedStatus === isCompleted;
            })
            .map(race => {
              return (
                <RacesListItem
                  key={race.raceId}
                  user={user}
                  race={race}
                  updateRaceAsComplete={updateRaceAsComplete}
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
