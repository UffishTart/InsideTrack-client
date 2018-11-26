//import liraries
//Will require some type of Three js import -- loading in a JSON object
//Need for resizing probably depending on component? We'll see
import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Content, Card, CardItem, Left, Body, Right, Icon } from 'native-base';


// create a component
class HorseComponent extends Component {
  render() {
    return (
      // <Text>Your Horse!</Text>
      <Card>
        <CardItem style={{ backgroundColor: "#fbff14" }}>
          <Image style={{ height: 200, width: null, flex: 1 }}
            source={require('../assets/horse-avatar.gif')}></Image>
        </CardItem>
      </Card>
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
