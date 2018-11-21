//import liraries
import React, { Component } from "react";
import { Dimensions } from "react-native";
import PendingRacesList from "../../components/PendingRacesList";
import { TabView, SceneMap } from "react-native-tab-view";
import { fetchUserRacesByUser } from "../../store/userRaces";
import { connect } from "react-redux";
import { me } from "../../store/user";

// create a component
class PendingRacesScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Created Races" },
      { key: "second", title: "Invitations" }
    ]
  };

  async componentDidMount() {
    await this.props.getUser();
    await this.props.getRaces(this.props.user.id, 'hasStarted', false);
  }

  render() {
    //the request will be for currRaces for this user
    //each of these races will have an id for a key

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: () => (
            <PendingRacesList
              user={this.props.user}
              races={this.props.races}
              isOwnerBool={true}
            />
          ),
          second: () => (
            <PendingRacesList
              user={this.props.user}
              races={this.props.races}
              isOwnerBool={false}
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
)(PendingRacesScreen);
