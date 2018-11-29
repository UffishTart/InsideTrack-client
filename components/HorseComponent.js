//import liraries
//Will require some type of Three js import -- loading in a JSON object
//Need for resizing probably depending on component? We'll see
import React, { Component } from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import {
  Content,
  Container,
  Card,
  CardItem,
  Header,
  Left,
  Body,
  Right,
  Icon
} from "native-base";

// create a component
class HorseComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.props.user.hasOwnProperty("horse")
      ? console.log("the url", this.props.user.horse.imgUrl)
      : null;
    return (
      // <Text>Your Horse!</Text>
      <Container>
        <ImageBackground
          source={require("../assets/checkered-flag.png")}
          style={styles.backgroundImage}
        >
          <Header>
            <Body>
              <Text style={{ alignSelf: "center" }}>Your Steed</Text>
            </Body>
          </Header>
          <Card
            style={{
              marginLeft: 20,
              marginRight: 20
            }}
          >
            <CardItem cardBody />
            <CardItem
              cardBody
              style={{
                shadowOffset: { height: 5, width: 5 },
                shadowOpacity: 1,
                borderWidth: 10,
                borderColor: "black"
              }}
            >
              {this.props.user.hasOwnProperty("horse") ? (
                <Image
                  style={{ height: 250, width: null, flex: 1 }}
                  source={{ uri: this.props.user.horse.imgUrl }}
                />
              ) : null}
            </CardItem>
          </Card>
        </ImageBackground>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});

//make this component available to the app
export default HorseComponent;
