//import liraries
import React, { Component } from "react";
import {
  scaleLinear as d3ScaleLinear,
  scalePoint as d3ScalePoint
} from "d3-scale";
import { Easing, Animated } from "react-native";
import { Svg } from "expo";
//const AnimatedG = Animated.createAnimatedComponent(G);

// create range that can space users out
const xScaleRangeGenerator = datum => {
  const improvement = datum.map(el => el.Improvement).sort((a, b) => a - b);
  const range = [];
  range[0] = improvement[0];
  range[1] = improvement[improvement.length - 1] + 0.7;
  return range;
};

const pathPhoto = [
  require("../assets/CoolClips_peop1281.png"),
  require("../assets/rcLnXB56i.png"),
  require("../assets/horse3.png")
];

class Track extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }
  // componentDidMount () {
  //   this.animate()
  // }

  // animate() {
  //   this.animatedValue.setValue(0);
  //   Animated.timing(this.animatedValue, {
  //     toValue: 1,
  //     duration: 1000,
  //     easing: Easing.bounce
  //   }).start();
  // }
  render() {
    const { Image, Text, G } = Svg;
    const { data, selectX, selectY, width, height, steps } = this.props;
    const xScale = d3ScaleLinear()
      .domain(xScaleRangeGenerator(data))
      .range([0, width - 2]);

    const yScale = d3ScaleLinear()
      .domain([1, data.length])
      .range([-20, height - 540]);

    const selectScaledX = datum => {
      return xScale(selectX(datum));
    };
    const selectScaledY = idx => {
      return yScale(selectY(idx));
    };

    return (
      <Svg width="340" height="400">
        {data.map((o, i) => {
          console.log("!!!!! userId", o.userId);
          console.log("!!!!! Improvement", o.Improvement);
          console.log("!!!!! selectedX", selectScaledX(o) + 0.5);
          console.log("!!!!! selectedY", selectScaledY(i + 1) - 6);
          console.log("-----------------------------------");

          return (
            <G key={i}>
              <Text
                x={selectScaledX(o) + 0.5}
                y={selectScaledY(i + 1) + 55}
                fontSize="12"
                fontWeight="bold"
                fill="black"
              >
                {o.userName}
              </Text>
              <Text
                x={selectScaledX(o) + 0.5}
                y={selectScaledY(i + 1) + 65}
                fontSize="12"
                fontWeight="bold"
                fill="black"
              >
                {o.Improvement}
              </Text>
              <Image
                x={selectScaledX(o)}
                y={selectScaledY(i + 1)}
                width="40%"
                height="40%"
                href={pathPhoto[i]}
              />
            </G>
          );
        })}
      </Svg>
    );
  }
}

//make this component available to the app
export default Track;
