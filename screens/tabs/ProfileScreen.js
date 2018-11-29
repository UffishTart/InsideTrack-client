//import liraries
import React, { Component } from "react";
import HorseComponent from "../../components/HorseComponent";
import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity
} from "react-native";
import FindUsers from "../../components/FindUsers";
import { Container, Header, Left, Body, Right, Icon, Title } from "native-base";
import HorseStore from "../pop-up-screens/HorseStore";
import { connect } from "react-redux";
import { me, updateHorse } from "../../store/user";
import axios from "axios";
// create a component
class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      showStore: false,
      fullUserInfo: {}
    };
    this.toggleStore = this.toggleStore.bind(this);
  }

  async componentDidMount() {
    const user = await this.props.getUser();
    const res = await axios.get(
      `https://inside-track-server-boil.herokuapp.com/api/users/${
        this.props.user.id
      }`
    );
    this.setState({ fullUserInfo: res.data });
  }

  async toggleStore() {
    const res = await axios.get(
      `https://inside-track-server-boil.herokuapp.com/api/users/${
        this.props.user.id
      }`
    );
    this.setState({
      showStore: !this.state.showStore,
      fullUserInfo: res.data
    });
  }

  render() {
    console.log("user on local state", this.state.fullUserInfo);
    return (
      <Container style={{ backgroundColor: "#fff", flex: 1 }}>
        <ImageBackground
          source={require("../../assets/checkered-flag.png")}
          style={styles.backgroundImage}
        >
          <HorseComponent user={this.state.fullUserInfo} />
          <KeyboardAvoidingView disabled>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                alignContent: "center",
                position: "relative",
                justifyContent: "center",
                height: 50,
                width: 50,
                borderBottomColor: "black",
                borderTopColor: "black",
                borderWidth: 2,
                borderRadius: "50%",
                shadowColor: "rgba(0,0,0, .4)", // IOS
                shadowOffset: { height: 5, width: 5 }, // IOS
                shadowOpacity: 1, // IOS
                shadowRadius: 1, //IOS
                backgroundColor: "#fbff14",
                marginBottom: 0,
                marginLeft: 20
              }}
              onPress={this.toggleStore}
            >
              <Text style={{ fontSize: 30 }}> 🐎</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <FindUsers />
          {this.state.showStore ? (
            <HorseStore
              toggleStore={this.toggleStore}
              getUser={this.props.getUser}
            />
          ) : null}
        </ImageBackground>
      </Container>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbff14"
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  updateHorse: (userId, horseId) => dispatch(updateHorse(userId, horseId))
});

export default connect(
  mapState,
  mapDispatch
)(ProfileScreen);
