//import liraries
import React, { Component } from "react";
import { Dimensions } from "react-native";
import RacesList from "../../components/RacesList";
import { TabView, SceneMap } from "react-native-tab-view";
import { fetchUserRacesByUser } from "../../store/userRaces";
import { connect } from "react-redux";
import { me } from "../../store/user";

// create a component
class Races extends Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Current Races" },
      { key: "second", title: "Past Races" }
    ]
  };

  async componentDidMount() {
    await this.props.getUser();
    await this.props.getRaces(this.props.user.id, true);
  }

  render() {
    //the request will be for currRaces for this user
    //each of these races will have an id for a key

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => (
            <RacesList
              user={this.props.user}
              races={this.props.races}
              inProgressBool={true}
            />
          ),
          second: () => (
            <RacesList
              user={this.props.user}
              races={this.props.races}
              inProgressBool={false}
            />
          )
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      />
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
    getRaces: (userId, inviteIndicator) =>
      dispatch(fetchUserRacesByUser(userId, inviteIndicator))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Races);
