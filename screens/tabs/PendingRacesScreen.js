//import liraries
import React, { Component } from "react";
import { Dimensions } from "react-native";
import PendingRacesList from "../../components/PendingRacesList";
import { TabView, SceneMap } from "react-native-tab-view";
import { fetchUserRacesByUser } from "../../store/userRacesPending";
import { connect } from "react-redux";
import { me } from "../../store/user";

// create a component
class PendingRacesScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: "third", title: "Created Races" },
      { key: "fourth", title: "Invitations" }
    ]
  };

  async componentDidMount() {
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!PENDING mounted')
    await this.props.getUser();
    await this.props.getRaces(this.props.user.id, 'hasStarted', false);
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!PENDING propsraces', this.props.races)

  }

  render() {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', this.props.races)

    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          third: () => (
            <PendingRacesList
              user={this.props.user}
              races={this.props.races}
              isOwnerBool={true}
            />
          ),
          fourth: () => (
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
    races: state.userRacesPending,
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
