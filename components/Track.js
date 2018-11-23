//import liraries
import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ART } from "react-native";
import { extent as d3ArrayExtent } from "d3-array";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
import { line as d3Line } from "d3-shape";
// create a component

class Track extends Component {
  render() {
    const { Group, Shape, Surface } = ART;
    const { data, selectX, selectY, width, height } = this.props;

    const xScale = d3ScaleLinear()
      .domain(d3ArrayExtent(data, selectX))
      .range([0, width]);

    const yScale = d3ScaleLinear()
      .domain(d3ArrayExtent(data, selectY))
      .range([height, 0]);

    console.log("!!! Xscale", xScale(0.23));
    console.log("!!! Yscale", yScale(1));
    const selectScaledX = datum => xScale(selectX(datum));
    const selectScaledY = datum => yScale(selectY(datum));

    // Create a d3Line factory for our scales.
    const sparkLine = d3Line()
      .x(selectScaledX)
      .y(selectScaledY);

    // Create a line path of for our data.
    const linePath = sparkLine(data);
    console.log(linePath);
    return (
      <View>
        {/*<Image source={require("../assets/smallTrack.png")} />*/}
        <Surface width={340} height={300}>
          <Group x={100} y={0}>
            <Shape d={linePath} stroke="#000" strokeWidth={1} />
          </Group>
        </Surface>
      </View>
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
