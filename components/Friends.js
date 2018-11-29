//import liraries
import React, { Component } from 'react';
import {
  Picker,
  Modal
} from "react-native";
// import Modal from "react-native-modal";
import { Container, Text, Button, H1, H3, Form, Footer, FooterTab, Content, Header, Input, Item, Left, Body, Right, Icon, Title } from 'native-base';

// create a component
class Friends extends Component {
  render() {
    return (
      <Modal animationType='slide'>
        <Header>
          <Left>
            <Button transparent onPress={this.props.toggleFriendsView}>
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Text style={{ alignSelf: 'center' }}>Add Friends</Text>
          </Body>
          <Right />
        </Header>
        <Container>
          <Content>
            <Picker
              selectedValue={this.props.selectedFriend}
              onValueChange={this.props.onValueChange}
              style={{ marginBottom: -10 }}>
              <Picker.Item label="Please Select A Friend" value={null} />
              {this.props.friends &&
                this.props.friends.map(friend => (
                  <Picker.Item
                    key={friend.friendId}
                    label={friend.friendInfo.userName}
                    value={friend.friendId}
                    color= {this.props.friendIdArr.includes(friend.friendId) ? 'green' : 'black'}
                  />
                ))}
            </Picker>
            <Button light onPress={this.props.addFriend} style={{ alignSelf: 'center', }}>
              <Text>Add Friend</Text>
            </Button>
          </Content>
        </Container>
      </Modal >
    );
  }
}

//make this component available to the app
export default Friends;
