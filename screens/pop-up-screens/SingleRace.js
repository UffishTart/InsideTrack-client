//import liraries
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  ImageBackground,
  Dimensions
} from "react-native";
import PedometerSensor from "../tabs/PedometerScreen";
import CompletedRaceScreen from "../tabs/CompletedRaceScreen";

// create a component
class SingleRace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {!!this.props.race ? (
          <Modal>
            <View style={styles.container}>
              {!!this.props.race.raceInfo.completedStatus ? (
                <CompletedRaceScreen
                  user={this.props.user}
                  raceId={this.props.race.raceId}
                />
              ) : (
                <ImageBackground
                  style={styles.photo}
                  source={require("../../assets/horse-race-track-background-1.jpg")}
                >
                  <PedometerSensor
                    user={this.props.user}
                    raceId={this.props.race.raceId}
                    updateRaceAsComplete={this.props.updateRaceAsComplete}
                  />

                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.toggleSingleRaceView}
                  >
                    <Text style={styles.text}>Back</Text>
                  </TouchableOpacity>
                </ImageBackground>
              )}
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }
}

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
    height: 50,
    width: 100,
    borderColor: "#fbff14",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 15,
    fontStyle: "italic"
  }
  // padding: {
  //   marginTop: 20
  // }
});

//make this component available to the app
export default SingleRace;

// <Button
//                     title="Back"
//                     onPress={this.props.toggleSingleRaceView}
//                   >
//                     Back
//                   </Button>
