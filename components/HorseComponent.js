//import liraries
//Will require some type of Three js import -- loading in a JSON object
//Need for resizing probably depending on component? We'll see
import React, { Component } from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import { Content, Container, Card, CardItem, Header, Left, Body, Right, Icon } from 'native-base';


// create a component
class HorseComponent extends Component {
  render() {
    return (
      // <Text>Your Horse!</Text>
      <Container>
        <Header>
          <Body>
            <Text style={{ alignSelf: 'center' }}>Your Steed</Text>
          </Body>
        </Header>
        <Card style={{ marginLeft: 20, marginRight: 20 }}>
          <CardItem cardBody>
          </CardItem>
          <CardItem cardBody>
            <Image style={{ height: 200, width: null, flex: 1 }}
              source={require('../assets/horse-avatar.gif')}></Image>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});

//make this component available to the app
export default HorseComponent;
