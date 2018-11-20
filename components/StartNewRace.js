import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Picker, Button, StyleSheet, Modal} from 'react-native';
import { me } from '../store/user';
import { fetchRacesDataFromServer, fetchSingleRaceFromServer, postANewRace } from '../store/races';
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
      selectedFriendId: 0,
    };
    this.nameHandleChange=this.nameHandleChange.bind(this)
    this.lengthHandleChange=this.lengthHandleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.addFriend=this.addFriend.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser();
    await this.props.getFriends(this.props.user.id);
  }

  nameHandleChange(text) {
    this.setState({
      name: text
    })
  }

  lengthHandleChange(text) {
    this.setState({
      length: text
    })
  }

  addFriend() {
    this.setState({
      friendIdArr: [...this.state.friendIdArr, this.state.selectedFriend]
    })
  }

  async handleSubmit() {
    const newRace = await this.props.postRace(
      this.state.name,
      this.state.length
    );
    await this.props.getAllRaces()
    console.log('reference the race', this.props.race)
    this.props.postUserToRace(this.props.user.id, this.props.race.id, true, true);
    this.state.friendIdArr.map(friendId =>
      this.props.postUserToRace(friendId, this.props.race.id, false, false)
    );
  }

  render() {
    console.log(this.props.friends)
    return (
      <Modal backgroundColor='blue'>
      <View style={styles.container}>
        <View>
          <Text>Start a Race!</Text>
          <TextInput
            placeholder={'Race Name'}
            value={this.state.name}
            onChangeText={this.nameHandleChange}
          />
          <TextInput
            placeholder={'Race Length'}
            value={this.state.length}
            onChangeText={this.lengthHandleChange}
          />
          <Picker
            selectedValue={this.state.selectedFriend}
            onValueChange={(friendValue => this.setState({selectedFriend: friendValue}))}
          >
            <Picker.Item label='Please Select A Friend' value={null} />
          {this.props.friends && this.props.friends.map(friend => 
            <Picker.Item key={friend.friendId.toString()} label={friend.friendId.toString()} value={friend.friendId} />
          )}
          </Picker>
          <TouchableOpacity onPress={this.addFriend}><Text>Add Friend</Text></TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleSubmit}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>  
        <Button title='go back' onPress={this.props.onPress} />
      </View>
      </Modal>
    )
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
    width: 100
  }
})

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
      postAUserRaceEntry(userId, raceId, isOwner, acceptedInvitation),
  };
};

export default connect(
  mapState,
  mapDispatch
)(StartNewRace);

