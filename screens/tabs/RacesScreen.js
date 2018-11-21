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
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!RACE SCREEN: mounted')
    await this.props.getUser();
    await this.props.getRaces(this.props.user.id, 'acceptedInvitation', true);
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!RACEESCRENpropsraces', this.props.races)
  }

  render() {
    const filteredRaces = this.props.races.filter(race => !!race.raceInfo.hasStarted)
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', this.props.races)
    console.log('HELLOHELLOHELLOHELLOHELLO', filteredRaces)

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => (
            <RacesList
              user={this.props.user}
              races={filteredRaces}
              // races={this.props.races}
              isCompleted={false}
            />
          ),
          second: () => (
            <RacesList
              user={this.props.user}
              races={filteredRaces}
              // races={this.props.races}
              isCompleted={true}
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
    getRaces: (userId, queryType, queryIndicator) =>
      dispatch(fetchUserRacesByUser(userId, queryType, queryIndicator))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Races);
