import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Picker,
  Button,
  StyleSheet,
  Modal,
} from 'react-native';
import { me } from '../store/user';
import {
  fetchRacesDataFromServer,
  fetchSingleRaceFromServer,
  postANewRace,
} from '../store/races';
import { postAUserRaceEntry } from '../store/userRacesPending';
import { getFriendsOfUser } from '../store/userFriend';
import { connect } from 'react-redux';

class StartNewRace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Enter Race Name',
      length: 1,
      friendIdArr: [],
      selectedFriendId: 0,
    };
    this.nameHandleChange = this.nameHandleChange.bind(this);
    this.lengthHandleChange = this.lengthHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFriend = this.addFriend.bind(this);
  }

  async componentDidMount() {
    await this.props.getUser();
    await this.props.getFriends(this.props.user.id);
  }

  nameHandleChange(text) {
    this.setState({
      name: text,
    });
  }

  lengthHandleChange(text) {
    this.setState({
      length: 1,
    });
  }

  addFriend() {
    this.setState({
      friendIdArr: [...this.state.friendIdArr, this.state.selectedFriend],
    });
  }

  async handleSubmit() {
    const newRaceId = await this.props.postRace(
      this.state.name,
      this.state.length
    );
    await this.props.postUserToRace(this.props.user.id, newRaceId, true, true);
    this.state.friendIdArr.map(
      async friendId =>
        await this.props.postUserToRace(friendId, newRaceId, false, false)
    );
  }

  render() {
    return (
      <Modal backgroundColor="blue">
        <View style={styles.container}>
          <View>
            <Text>Start a Race!</Text>
            <TextInput
              placeholder={'Race Name'}
              value={this.state.name}
              onChangeText={this.nameHandleChange}
            />
            <Picker
              selectedValue={this.state.length}
              onValueChange={lengthValue =>
                this.setState({ length: lengthValue })
              }
            >
              <Picker.Item label="Race Length" value={null} />
              <Picker.Item label="Day" value={1} />
              <Picker.Item label="Week" value={7} />
            </Picker>
            <Picker
              selectedValue={this.state.selectedFriend}
              onValueChange={friendValue =>
                this.setState({ selectedFriend: friendValue })
              }
            >
              <Picker.Item label="Please Select A Friend" value={null} />
              {this.props.friends &&
                this.props.friends.map(friend => (
                  <Picker.Item
                    key={friend.friendId}
                    label={friend.friendInfo.userName}
                    value={friend.friendId}
                  />
                ))}
            </Picker>
            <TouchableOpacity onPress={this.addFriend}>
              <Text>Add Friend</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleSubmit}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
          <Button title="go back" onPress={this.props.onPress} />
          {this.props.friends &&
            this.props.friends
              .filter(friend =>
                this.state.friendIdArr.includes(friend.friendId)
              )
              .map(friend => (
                <Text key={friend.friendId}>{friend.friendInfo.userName}</Text>
              ))}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    paddingTop: 220,
    color: 'blue',
    height: 50,
    width: 100,
  },
});

const mapState = state => {
  return {
    race: state.races,
    user: state.user,
    friends: state.userFriend,
  };
};

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me()),
    getFriends: userId => dispatch(getFriendsOfUser(userId)),
    getAllRaces: () => dispatch(fetchRacesDataFromServer()),
    getRace: raceId => dispatch(fetchSingleRaceFromServer(raceId)),
    postRace: (name, length) => dispatch(postANewRace(name, length)),
    postUserToRace: (userId, raceId, isOwner, acceptedInvitation) =>
      dispatch(postAUserRaceEntry(userId, raceId, isOwner, acceptedInvitation)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(StartNewRace);
