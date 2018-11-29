import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader";

//make this component available to the app

export default class Splash extends Component {
  render() {
    const arrayOfPuns = [
      "Hold your horses!",
      "Whoa there!",
      "Whoa Nelly!",
      "Get off your high horse! We're loadin'",
      "Done loading? Neigh!"
    ];
    function randomLine(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    return (
      <View style={styles.container}>
        <View>
          <Bubbles size={10} color="black" />
        </View>
        <Text
          style={{
            fontFamily: "Futura",
            fontStyle: "italic",
            fontSize: 20,
            marginTop: 20
          }}
        >
          {randomLine(arrayOfPuns)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbff14",
    justifyContent: "center",
    alignItems: "center"
  }
});
