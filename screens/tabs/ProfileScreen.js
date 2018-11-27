//import liraries
import React, { Component } from "react";
import HorseComponent from "../../components/HorseComponent";
import { View, Text, StyleSheet, Button } from "react-native";
import FindUsers from "../../components/FindUsers";
import { Container, Header, Left, Body, Right, Icon, Title } from 'native-base';


// create a component
export default class ProfileScreen extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <HorseComponent />
        <FindUsers />
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbff14"
  }
});
