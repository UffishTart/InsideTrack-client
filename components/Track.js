//import liraries
import React, { Component } from "react";

import { scaleLinear as d3ScaleLinear } from "d3-scale";
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

//const { Image, Text, G } = Svg;

// create range that can space users out
const xScaleRangeGenerator = datum => {
  const improvement = datum.map(el => el.Improvement).sort((a, b) => a - b);
  const range = [];
  range[0] = improvement[0];
  range[1] = improvement[improvement.length - 1] + 1;
  console.log("!!!Range", range);
  return range;
};

const pathPhoto = [
  // require("../assets/horse1.png"),
  require("../assets/CoolClips_peop1281.png"),
  require("../assets/rcLnXB56i.png"),
  require("../assets/horse3.png")
];

console.log("pathPhoto arr", pathPhoto);

// const horseUrlMap = [
//   {horseId: 1, requiredHorse: require("../assets/horse1.png")},
//   {horseId: 2, requiredHorse: require("../assets/rcLnXB56i.png")},
//   {horseId: 3, requiredHorse: require("../assets/horse3.png")},
//   {horseId: 4, requiredHorse: require("../assets/CoolClips_peop1281.png")}
// ]
const horseUrlMap = [
  { horseId: 1, requiredHorse: require("../assets/horse-avatar-small.gif") },
  { horseId: 2, requiredHorse: require("../assets/horse-avatar-small.gif") },
  { horseId: 3, requiredHorse: require("../assets/horse-avatar-small.gif") },
  { horseId: 4, requiredHorse: require("../assets/horse-avatar-small.gif") }
];

const horseLinksNeeded = [];

class Track extends Component {
  constructor() {
    super();
    this.state = {
      horseLinksNeeded: []
    };
  }

  componentDidMount() {
    this.props.getHorses();
    this.props.data.forEach(userObj => {
      horseUrlMap.forEach(horseObj => {
        if (userObj.horseId === horseObj.horseId) {
          const newLink = this.state.horseLinksNeeded;
          newLink.push(horseObj.requiredHorse);
          this.setState({
            horseLinksNeeded: [
              ...this.state.horseLinksNeeded,
              horseObj.requiredHorse
            ]
          });
        }
      });
    });
  }

  render() {
    const { horses, user } = this.props;
    const avatarUrl = horses
      .filter(horse => horse.id === user.horseId)
      .map(horse => horse.imgUrl)[0];
    return (
      <View
        height={this.props.height}
        width={this.props.width}
        style={{ marginTop: 300, alignItems: "center", paddingBottom: 400 }}
      >
        {/*<View style={styles.textContainer}>
          <Text>{user.userName}</Text>
          <Text>{this.props.steps}</Text>
    </View>*/}
        <Image
          style={{ width: "60%", height: "100%" }}
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
    // flex: 1,
    // flexWrap:"nowrap",
    backgroundColor: "#fbff14",
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
