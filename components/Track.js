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
    const { Circle, Image } = Svg;
    //const { Group, Shape, Surface } = ART;
    const { data, selectX, selectY, width, height } = this.props;

    const xScale = d3ScaleLinear()
      .domain(d3ArrayExtent(data, selectX))
      .range([100, width]);

    const yScale = d3ScalePoint()
      .domain(d3ArrayExtent(data, selectY))
      .range([300, height]);

    const selectScaledX = datum => {
      console.log("XXXXXXX", xScale(datum.Improvement));
      return xScale(selectX(datum));
    };
    const selectScaledY = datum => {
      console.log("YYYYYY", yScale(datum.userId));
      return yScale(selectY(datum));
    };

    // Create a d3Line factory for our scales.
    const sparkLine = d3Line()
      .x(selectScaledX)
      .y(selectScaledY);

    // Create a line path of for our data.
    const linePath = sparkLine(data);
    //console.log(linePath);
    return (
      <Svg width="340" height="400">
        {data.map((o, i) => {
          console.log("!!!!! o", o);
          console.log("!!!!! selectedX", selectScaledX(o));
          console.log("!!!!! selectedY", selectScaledY(o));
          console.log("-----------------------------------");
          return (
            <Image
              key={i}
              x={selectScaledX(o)}
              y={selectScaledY(o)}
              width="10%"
              height="10%"
              href={require("../assets/Standard_Horse.jpg")}
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
  // line: {
  //   stroke: "#29b6f6",
  //   strokeWidth: 2
  // }
});

//make this component available to the app
export default Track;

// <Circle
//               key={i}
//               cx={selectScaledX(o)}
//               cy={selectScaledY(o)}
//               r={Math.sqrt(50)}
//               style={{ fill: "white" }}
//             />
