//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Modal } from "react-native";
import HorseComponent from "../../components/HorseComponent";
import PedometerSensor from "../tabs/PedometerScreen";
import CompletedRaceScreen from "../tabs/CompletedRaceScreen";
import { Container, Text, Button, Footer, FooterTab, Content, Header, Left, Body, Right, Icon, Title } from 'native-base';


// create a component
class SingleRace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        {!!this.props.race ? (
          <Modal>
            <Container style={styles.container}>
              <Content>
                {/* <HorseComponent />*/}
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
                <Button block danger onPress={this.props.toggleSingleRaceView}><Text>Back</Text></Button>
              </Content>
            </Container>
          </Modal>
        ) : null}
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
    backgroundColor: "#2c3e50"

  },
  padding: {
    marginTop: 20
  }
});

//make this component available to the app
export default SingleRace;
