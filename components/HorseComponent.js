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
      <Image style={{ width: 200, height: 200, resizeMode: "contain" }}
        source={require('../assets/horse-avatar.gif')}></Image>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

//make this component available to the app
export default HorseComponent;
