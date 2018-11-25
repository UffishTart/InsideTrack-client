import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import RacesListItem from './RacesListItem';

const RacesList = props => {
  const { user, races, isCompleted, updateRaceAsComplete } = props;
  return (
    <ImageBackground source={require('../assets/checkered-flag.png')} style={styles.backgroundImage} >
      <View
        style={[styles.backgroundImage]}
      >
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
    </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});
