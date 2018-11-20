import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Picker, Button, StyleSheet, Modal} from 'react-native';
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
      selectedFriend: {},
      reRender: false
    };
  }

  async componentDidMount() {
    await this.props.getUser();
    await this.props.getFriends(this.props.user.id);
    this.setState({
      reRender: !this.state.reRender
    })
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
          {this.props.friends && this.props.friends.map(friend => 
            <Picker.Item label={friend.friendId.toString()} value={friend.friendId.toString()} />
          )}

          </Picker>
          {/* <Picker selectedValue = {this.props.user}>
            <Picker.Item label = "Steve" value = "steve" />
            <Picker.Item label = "Ellen" value = "ellen" />
            <Picker.Item label = "Maria" value = "maria" />
          </Picker> */}
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

