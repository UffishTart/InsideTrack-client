//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ART } from "react-native";
import { extent as d3ArrayExtent } from "d3-array";
import {
  scaleLinear as d3ScaleLinear,
  scalePoint as d3ScalePoint
} from "d3-scale";
import { line as d3Line } from "d3-shape";
import { Svg } from "expo";

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
  render() {
    const { Image } = Svg;
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
          console.log("!!!!! selectedX", selectScaledX(o));
          console.log("!!!!! selectedY", selectScaledY(i + 1));
          console.log("-----------------------------------");

          return (
            <Image
              key={i}
              x={selectScaledX(o)}
              y={selectScaledY(i + 1)}
              width="40%"
              height="40%"
              href={pathPhoto[i]}
            />
          );
        })}
      </Svg>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default Track;
