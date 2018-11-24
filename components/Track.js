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

// create a component

class Track extends Component {
  render() {
    const { Image } = Svg;
    const { data, selectX, selectY, width, height, steps } = this.props;
    const xScale = d3ScaleLinear()
      .domain([-1.0, 5.0])
      .range([100, width]);

    const yScale = d3ScalePoint()
      .domain(d3ArrayExtent(data, selectY))
      .range([280, height]);

    const selectScaledX = datum => {
      console.log("XXXXXXX", xScale(datum.Improvement));
      return xScale(selectX(datum));
    };
    const selectScaledY = datum => {
      console.log("!!! datum.userId", datum.userId);
      console.log("YYYYYY", yScale(datum.userId));
      return yScale(selectY(datum));
    };

    return (
      <Svg width="340" height="400">
        {data.map((o, i) => {
          console.log("!!!!! o", o);
          console.log("!!!!! userId", o.userId);
          console.log("!!!!! selectedX", selectScaledX(o));
          console.log("!!!!! selectedY", selectScaledY(o));
          console.log("-----------------------------------");

          return (
            <Image
              key={i}
              x={selectScaledX(o)}
              y={selectScaledY(o)}
              width="18%"
              height="18%"
              href={require("../assets/CoolClips_peop1281.png")}
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
