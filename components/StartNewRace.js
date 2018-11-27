import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  Picker,
  StyleSheet,
  Modal
} from "react-native";
import { me } from "../store/user";
import {
  fetchRacesDataFromServer,
  fetchSingleRaceFromServer,
  postANewRace
} from "../store/races";
import { postAUserRaceEntry } from "../store/userRacesPending";
import { getFriendsOfUser } from "../store/userFriend";
import { connect } from "react-redux";
import Friends from './Friends'
import { Container, Text, Button, H1, H3, Form, Footer, FooterTab, Content, Header, Input, Item, Left, Body, Right, Icon, Title } from 'native-base';


class StartNewRace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ' Enter Race Name',
      length: 1,
      friendIdArr: [],
      selectedFriendId: 0,
      showFriends: false
    };
    this.nameHandleChange = this.nameHandleChange.bind(this);
    this.lengthHandleChange = this.lengthHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.getUser();
    await this.props.getFriends(this.props.user.id);
  }

  nameHandleChange(text) {
    this.setState({
      name: text
    });
  }

  lengthHandleChange() {
    this.setState({
      length: 1
    });
  }

  onValueChange = (friendValue) => this.setState({ selectedFriend: friendValue })

  addFriend() {
    this.setState({
      friendIdArr: [...this.state.friendIdArr, this.state.selectedFriend]
    });
  }

  toggleFriendsView = () =>
    this.setState({ showFriends: !this.state.showFriends });

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

  // onPress={this.props.onPress}>

  render() {
    const friendsTent = this.state.showFriends
      ? this.renderFriendsPage()
      : null;
    return (
      <Modal animationType="slide">
        <Header>
          <Left>
            <Button transparent onPress={this.props.onPress}>
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Text style={{ alignSelf: 'center' }}>New Race</Text>
          </Body>
          <Right />
        </Header>
        <Container>
          <Content>
            <Content style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
              <Item rounded>
                <Input placeholder={"Race Name"}
                  value={this.state.name}
                  onChangeText={this.nameHandleChange}
                />
              </Item>
              <Picker
                selectedValue={this.state.length}
                onValueChange={lengthValue =>
                  this.setState({ length: lengthValue })
                }
                style={{ marginBottom: -70, marginTop: 10 }}
              >
                <Picker.Item label="Race Length" value={null} />
                <Picker.Item label="Day" value={1} />
                <Picker.Item label="Week" value={7} />
              </Picker>
              <Button rounded success
                style={{ alignSelf: 'center', marginTop: 40 }}
                onPress={this.toggleFriendsView}>
                <Text>Select Friends</Text>
              </Button>
              <View>{friendsTent}</View>
              <Button block primary onPress={this.handleSubmit} style={{ alignSelf: 'center', marginTop: 150 }}>
                <Text>Submit</Text>
              </Button>
            </Content>
          </Content>
        </Container >
      </Modal>
    );
  }


  renderFriendsPage() {
    return <Friends
      addFriend={this.addFriend}
      onValueChange={this.onValueChange}
      friendIdArr={this.state.friendIdArr}
      selectedFriendId={this.state.selectedFriendId}
      friends={this.props.friends}
      selectedFriend={this.state.selectedFriend}
      addFriend={this.addFriend.bind(this)}
      toggleFriendsView={this.toggleFriendsView.bind(this)} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  picker: {
    paddingTop: 220,
    color: "blue",
    height: 50,
    width: 100
  }
});

const mapState = state => {
  return {
    race: state.races,
    user: state.user,
    friends: state.userFriend
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
      dispatch(postAUserRaceEntry(userId, raceId, isOwner, acceptedInvitation))
  };
};

export default connect(
  mapState,
  mapDispatch
)(StartNewRace);
