import Autocomplete from "react-native-autocomplete-input";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { fetchAllUsers } from "../store/allUsers";
import { addNewFriend } from "../store/userFriend";

const renderUser = user => {
  const { userName } = user;

  return (
    <View>
      <Text style={styles.titleText}>{userName}</Text>
    </View>
  );
};
class FindUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.findUser = this.findUser.bind(this);
    this.addAsFriend = this.addAsFriend.bind(this);
  }

  async componentDidMount() {
    await this.props.getUsers();
  }

  findUser(query) {
    if (query === "") {
      return [];
    }

    const { allUsers } = this.props;
    return allUsers.filter(user => user.userName.search(query) >= 0);
  }

  async addAsFriend(userId, friendId) {
    await this.props.addFriend(userId, friendId);
  }

  render() {
    const { query } = this.state;
    const { user } = this.props;
    const usersToFind = this.findUser(query);
    const comp = (a, b) => a.toLowerCase() === b.toLowerCase();

    return (
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          data={
            usersToFind.length === 1 && comp(query, usersToFind[0].userName)
              ? []
              : usersToFind
          }
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Friend Name Here"
          renderItem={({ userName }) => (
            <TouchableOpacity
              onPress={() => this.setState({ query: userName })}
            >
              <Text style={styles.itemText}>{userName}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {usersToFind.length > 0 ? (
            <View>
              {renderUser(usersToFind[0])}
              <Button
                onPress={() => this.addAsFriend(user.id, usersToFind[0].id)}
                title="Add"
              />
            </View>
          ) : (
              <Text style={styles.infoText}>Enter Name of a Friend</Text>
            )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    width: "80%",
    paddingTop: 25,
  },
  autocompleteContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: "#F5FCFF",
    marginTop: 8,
  },
  infoText: {
    textAlign: "center"
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center"
  },
  directorText: {
    color: "grey",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center"
  },
  openingText: {
    textAlign: "center"
  },
  buttonStyle: {
    borderRadius: 0.5,
    backgroundColor: "#2c3e50",
    color: "white",
    width: 10,
  }
});

const mapState = ({ allUsers, user }) => ({ allUsers, user });
const mapProps = dispatch => ({
  getUsers: () => dispatch(fetchAllUsers()),
  addFriend: (userId, friendId) => dispatch(addNewFriend(userId, friendId))
});
export default connect(
  mapState,
  mapProps
)(FindUsers);
