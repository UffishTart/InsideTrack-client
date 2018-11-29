

import React, { Component } from "react";

import {
  Easing,
  Animated,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import store from "../store";
import { fetchHorsesFromServer } from "../store/horseStore";



class Track extends Component {
  constructor() {
    super();
    this.state = {
      horseLinksNeeded: []
    };
  }

  componentDidMount() {
    this.props.getHorses();
  }

  render() {
    console.log('track props', this.props)
    const { horses, user } = this.props;
    const avatarUrl = horses
      .filter(horse => horse.id === user.horseId)
      .map(horse => horse.imgUrl)[0];
    const horsesInRace = this.props.usersInRace.map(obj => obj.userInfo.horseId)
    return (
      <View
        height={this.props.height}
        width={this.props.width}
        style={{ marginTop: 300, alignItems: "center", paddingBottom: 400 }}
      >
        {horses.filter(horse => horsesInRace.includes(horse.id))}
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: avatarUrl }}
        />
      </View>
    );
  }
}

//make this component available to the app
const mapState = ({ horses }) => ({ horses });
const mapDispatch = dispatch => ({
  getHorses: () => dispatch(fetchHorsesFromServer())
});
export default connect(
  mapState,
  mapDispatch
)(Track);

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#ffe6e6",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    color: "#999",
    display: "flex",
    height: 26,
    lineHeight: 26,
    position: "relative",
    width: "27%"
  }
});
