import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Button } from 'react-native';
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
      <TouchableOpacity onPress={refreshRaces} title='Refresh' style={styles.buttonNewRace} />
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
  },buttonNewRace: {
        alignContent: "center",
        position: "relative",
        justifyContent: "center",
        height: 50,
        width: 200,
        shadowColor: "rgba(0,0,0, .4)", // IOS
        shadowOffset: { height: 5, width: 5 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1 //IOS
      },
    })
