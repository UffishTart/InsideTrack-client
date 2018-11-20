import React, { Component } from 'react';
import { View } from 'react-native';
import { me } from '../store/user';
import { fetchSingleRaceFromServer, postANewRace } from '../store/races';
import { postAUserRaceEntry } from '../store/userRaces';
import { getFriendsOfUser } from '../store/userFriend';
import { connect } from 'react-redux';

class StartNewRace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      length: '',
      friendIdArr: [],
    };
  }

  async componentDidMount() {
    await this.props.getUser();
    this.props.getFriends(this.props.user.id);
  }

  async handleSubmit() {
    const newRace = await this.props.postRace(
      this.state.name,
      this.state.length
    );
    this.props.postUserToRace(this.props.user.id, newRace.id, true, true);
    this.state.friendIdArr.map(friendId =>
      this.props.postUserToRace(friendId, newRace.id, false, false)
    );
  }

  render() {
    return <View />;
  }
}

const mapState = state => {
  return {
    race: state.races,
    user: state.user,
    friends: state.friends,
  };
};

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getFriends: userId => getFriendsOfUser(userId),
    getRace: raceId => dispatch(fetchSingleRaceFromServer(raceId)),
    postRace: (name, length) => dispatch(postANewRace(name, length)),
    postUserToRace: (userId, raceId, isOwner, acceptedInvitation) =>
      postAUserRaceEntry(userId, raceId, isOwner, acceptedInvitation),
  };
};

export default connect(
  mapState,
  mapDispatch
)(StartNewRace);
