//import liraries
import React, { Component } from "react";
import { View, Button, Text, StyleSheet, Modal } from "react-native";
import HorseComponent from "../../components/HorseComponent";
import PedometerSensor from "../tabs/PedometerScreen";
import CompletedRaceScreen from "../tabs/CompletedRaceScreen";

// create a component
class SingleRace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal>
        <View style={styles.container}>
          {!!this.props.race.raceInfo.completedStatus ? (
            <CompletedRaceScreen
              user={this.props.user}
              raceId={this.props.race.raceId}
            />
          ) : (
            <PedometerSensor
              user={this.props.user}
              raceId={this.props.race.raceId}
              updateRaceAsComplete={this.props.updateRaceAsComplete}
            />
          )}
          <Button title="Back" onPress={this.props.toggleSingleRaceView}>
            SingleRace
          </Button>
        </View>
      </Modal>
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
export default SingleRace;
