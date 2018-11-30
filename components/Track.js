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
const xScaleRangeGenerator = datum => {
  const improvement = datum.map(el => el.Improvement).sort((a, b) => a - b);
  const range = [];
  range[0] = improvement[0];
  range[1] = improvement[improvement.length - 1] + 1;
  return range;
};
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
    const {
      data,
      selectX,
      selectY,
      horses,
      user,
      usersInRace,
      width,
      height
    } = this.props;

    console.log("!!!!data", data);
    console.log("!!!!horses", horses);

    const xScale = d3ScaleLinear()
      .domain(xScaleRangeGenerator(data))
      .range([370 - width, 13]);

    const yScale = d3ScaleLinear()
      .domain([1, data.length])
      .range([100, height - 350]);

    const selectScaledX = datum => {
      return xScale(selectX(datum));
    };
    const selectScaledY = idx => {
      return yScale(selectY(idx));
    };

    return (
      !!data.length && (
        <View
          height={this.props.height}
          width={this.props.width}
          style={{
            marginTop: 300,
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 400
          }}
        >
          {data.map((user, idx) => {
            console.log("%%%userHorseId", user.horseId);

            console.log("~~~~~~~~");
            const xLocation = selectScaledX(user);
            console.log(":::::X", xLocation);
            const yLocation = selectScaledY(idx);
            const horseUrl = horses.filter(
              horse => horse.id === user.horseId
            )[0].imgUrl;
            console.log(
              "!!!1horse",
              horses.filter(horse => horse.id === user.horseId)[0]
            );

            return (
              <View
                key={idx}
                style={{
                  width: "35%",
                  height: "35%",
                  marginLeft: xLocation,
                  marginTop: yLocation
                }}
              >
                {/* <View
                  style={{
                    width: 40,
                    height: 20,
                    backgroundColor: "white",
                    borderRadius: "15%",
                    justifyContent: "center",
                    fontFamily: "Futura",
                    fontStyle: "italics",
                    borderWidth: 2,
                    borderColor: "black"
                  }}
                > */}
                {/* <Text style={{ alignSelf: "center" }}>{user.userName}</Text>
                </View> */}
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: horseUrl }}
                />
              </View>
            );
          })}
        </View>
      )
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
