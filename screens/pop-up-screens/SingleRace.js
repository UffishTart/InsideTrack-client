//import liraries
import React, { Component } from "react";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ImageBackground,
  Dimensions,
  ScrollView,
  Text
} from "react-native";
import LoopAnimation from "react-native-LoopAnimation";
import PedometerSensor from "../tabs/PedometerScreen";
import CompletedRaceScreen from "../tabs/CompletedRaceScreen";
import { Button, Header, Left, Container, Body, Right } from "native-base";
import Splash from "../../components/Splash";
// create a component
class SingleRace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: false
    };
  }

  render() {
    // setTimeout(() => this.setState({ showImage: true }), 7000);
    // if (!this.state.showImage) {
    //   return (
    //     <Modal>
    //       <Splash />
    //     </Modal>
    //   );
    // }
    return (
      <Container>
        {!!this.props.race ? (
          <Modal>
            <Header>
              <Left>
                <Button transparent onPress={this.props.toggleSingleRaceView}>
                  <Text>Back</Text>
                </Button>
              </Left>
              <Body>
                <Text style={{ alignSelf: "center" }}>
                  {this.props.race.raceInfo.name}
                </Text>
              </Body>
              <Right />
            </Header>
            <View style={styles.container}>
              <View style={{ flex: 1 }}>
                <LoopAnimation
                  source={require("../../assets/crowd-plus-track-longer.png")}
                  duration={60000}
                />
                <PedometerSensor
                  user={this.props.user}
                  raceId={this.props.race.raceId}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </Container>
    );
  }
}
//

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#2c3e50",
    flexWrap: "nowrap"
  },
  photo: {
    width: "100%",
    height: Dimensions.get("window").height,
    flex: 1,
    justifyContent: "center"
  },

  button: {
    backgroundColor: "#fff",
    height: "8%",
    width: "22%",
    borderColor: "#fbff14",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//make this component available to the app
export default SingleRace;
