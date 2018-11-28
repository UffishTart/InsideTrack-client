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
import { Svg } from "expo";

//const { Image, Text, G } = Svg;
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

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
    //const { Image } = Svg;
    const { data, selectX, selectY, width, height } = this.props;
    console.log("!!!! Height", height);
    const xScale = d3ScaleLinear()
      .domain(xScaleRangeGenerator(data))
      .range([0, Dimensions.get("window").width]);

    const yScale = d3ScaleLinear()
      .domain([1, data.length])
      .range([100, height - 600]);

    const selectScaledX = datum => {
      return xScale(selectX(datum));
    };

    const selectScaledY = idx => {
      return yScale(selectY(idx));
    };

    return (
      <View height={height}>
        {data.map((o, i) => {
          console.log("!!!!! user i", i);
          const horseMarginLeft = selectScaledX(o);
          console.log("!!!!! horseMarginLeft", horseMarginLeft);
          const tagMarginLeft = selectScaledX(o) - 1;
          console.log("!!!!! tagMarginLeft", tagMarginLeft);
          const yLocation = selectScaledY(i + 1);
          console.log("!!!!! yLocation", yLocation);
          console.log("-------------------------------");
          // const horseMotion = this.horseAnimatedValue.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: [0, horseMarginLeft]
          // });
          // const tagMotion = this.textAnimatedValue.interpolate({
          //   inputRange: [0, 1],
          //   outputRange: [0, tagMarginLeft]
          // });
          // console.log("!!!!! horsemargin", horseMarginLeft);
          return (
            <View key={i} style={{ width: 340, height: 400 }}>
              <Text
                x={tagMarginLeft}
                y={selectScaledY(i + 1) + 25}
                style={styles.textContainer}
                fontSize="12"
                fontWeight="bold"
                fill="black"
              >
                {o.userName}
              </Text>
              {/*<Text
                x={tagMarginLeft}
                y={selectScaledY(i + 1) + 65}
                fontSize="12"
                fontWeight="bold"
                fill="black"
              >
                {o.Improvement}
             </Text>*/}

              <Image
                // styles={{
                //   paddingLeft: { horseMarginLeft },
                //   paddingTop: { yLocation },
                //   width: "100%",
                //   height: "100%"
                // }}
                x={horseMarginLeft}
                y={yLocation}
                source={this.state.horseLinksNeeded[i]}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

//make this component available to the app
export default Track;

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#eee",
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
