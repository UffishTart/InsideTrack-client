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
        {/* <TouchableOpacity>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: "50%",
              backgroundColor: "white",
              marginBottom: 10,
              marginLeft: 10
            }}
          >
            <TouchableOpacity
              onPress={refreshRaces}
              style={{
                alignItems: "center",
                alignContent: "center",
                marginTop: -9,
                marginRight: -10
              }}
            />
            <Text
              style={{
                fontFamily: "Futura",
                fontSize: 40,
                color: "blue",
                marginLeft: 3,
                marginTop: 1
              }}
            >
              ↺
            </Text>
          </View>
        </TouchableOpacity> */}
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
