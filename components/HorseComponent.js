//import liraries
//Will require some type of Three js import -- loading in a JSON object
//Need for resizing probably depending on component? We'll see
import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// create a component
class HorseComponent extends Component {
  render() {
    return (
      // <Text>Your Horse!</Text>
      <Image
        style={{ width: 400, height: 200 }}
        source={require("../assets/horseRunning.gif")}
      />
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default HorseComponent;
