import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Button } from "react-native";
import PendingRacesListItem from "./PendingRacesListItem";
// import { Button } from 'native-base'

const PendingRacesList = props => {
  const {
    user,
    races,
    isOwnerBool,
    toggleStart,
    refreshRaces,
    getPendingRaces
  } = props;
  return (
    <View>
      <Button onPress={refreshRaces} title="Refresh" />
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  flexCont: {
    flex: 1
  }
});
