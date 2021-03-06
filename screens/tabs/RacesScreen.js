//import liraries
import React, { Component } from "react";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import RacesList from "../../components/RacesList";
import { TabView, SceneMap } from "react-native-tab-view";
import { fetchUserRacesByUser } from "../../store/userRaces";
import { fetchPendingUserRacesByUser } from "../../store/userRacesPending";
import { connect } from "react-redux";
import { me } from "../../store/user";
import { putARace } from "../../store/races";

// create a component
class Races extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Current Races" },
        { key: "second", title: "Past Races" }
      ]
    };
    this.refreshRaces = this.refreshRaces.bind(this);
  }

  async componentDidMount() {
    await this.props.getUser();
    await this.props.getRaces(this.props.user.id, "acceptedInvitation", true);
  }

  refreshRaces = async () => {
    await this.props.getPendingRaces(this.props.user.id, "hasStarted", false);
    await this.props.getRaces(this.props.user.id, "acceptedInvitation", true);
  };
  render() {
    const filteredRaces = this.props.races.filter(
      race => !!race.raceInfo.hasStarted
    );

    return (
      <ImageBackground
        source={require("../../assets/checkered-flag.png")}
        style={styles.backgroundImage}
      >
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: () => (
              <RacesList
                user={this.props.user}
                races={filteredRaces}
                isCompleted={false}
                updateRaceAsComplete={this.props.updateRaceAsComplete}
                refreshRaces={this.refreshRaces}
              />
            ),
            second: () => (
              <RacesList
                user={this.props.user}
                races={filteredRaces}
                isCompleted={true}
                updateRaceAsComplete={this.props.updateRaceAsComplete}
                refreshRaces={this.refreshRaces}
              />
            )
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
        />
      </ImageBackground>
    );
  }
}

const mapState = state => {
  return {
    races: state.userRaces,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getRaces: (userId, queryType, queryIndicator) =>
      dispatch(fetchUserRacesByUser(userId, queryType, queryIndicator)),
    updateRaceAsComplete: (raceId, updateObj) =>
      dispatch(putARace(raceId, updateObj)),
    getPendingRaces: (userId, queryType, queryIndicator) =>
      dispatch(fetchPendingUserRacesByUser(userId, queryType, queryIndicator))
  };
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});

export default connect(
  mapState,
  mapDispatch
)(Races);
