import React, { Component } from "react";
import { Svg } from "expo";

const TrackWithCircle = props => {
  const { data } = props;
  const { Circle } = Svg;

  return (
    <Svg width="340" height="300">
      {data.map((o, i) => {
        const { userId, Improvement } = o;
        return (
          <Circle
            key={i}
            cx={/*{String((Improvement / 11) * 340)}*/ String(170 - 10 * i)}
            cy={String((300 / 4) * (i + 1))}
            r={Math.sqrt(10)}
            style={{ fill: "steelblue" }}
          />
        );
      })}
    </Svg>
  );
};

export default TrackWithCircle;
