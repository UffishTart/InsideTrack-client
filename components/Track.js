//import liraries
import React, { Component } from 'react';

import { scaleLinear as d3ScaleLinear } from 'd3-scale';
import { Easing, Animated, StyleSheet } from 'react-native';
import { Svg } from 'expo';

const { Image, Text, G } = Svg;
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

// create range that can space users out
const xScaleRangeGenerator = datum => {
  const improvement = datum.map(el => el.Improvement).sort((a, b) => a - b);
  const range = [];
  range[0] = improvement[0];
  range[1] = improvement[improvement.length - 1] + 0.7;
  return range;
};

const pathPhoto = [
  require('../assets/CoolClips_peop1281.png'),
  require('../assets/rcLnXB56i.png'),
  require('../assets/horse3.png'),
];

class Track extends Component {
  constructor() {
    super();
    this.horseAnimatedValue = new Animated.Value(0);
    this.textAnimatedValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.animate();
  }

  animate() {
    this.horseAnimatedValue.setValue(0);
    this.textAnimatedValue.setValue(0);
    Animated.parallel([
      Animated.timing(this.horseAnimatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }).start(),
      Animated.timing(this.textAnimatedValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
      }).start(),
    ]);
  }

  render() {
    const { Image } = Svg;
    const { data, selectX, selectY, width, height, steps } = this.props;
    const xScale = d3ScaleLinear()
      .domain(xScaleRangeGenerator(data))
      .range([0, width - 2]);

    const yScale = d3ScaleLinear()
      .domain([1, data.length])
      .range([150, height - 350]);

    const selectScaledX = datum => {
      return xScale(selectX(datum));
    };
    const selectScaledY = idx => {
      return yScale(selectY(idx));
    };

    return (
      <Svg width="340" height="600">
        {data.map((o, i) => {
          const xLocation = selectScaledX(o);
          const tagLocation = selectScaledX(o) + 1;
          const yLocation = selectScaledY(i + 1);
          const horseMotion = this.horseAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, xLocation],
          });

          const tagMotion = this.textAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, tagLocation],
          });
          return (
            <G key={i}>
              <AnimatedText
                x={tagMotion}
                y={selectScaledY(i + 1) + 55}
                style={styles.textContainer}
                fontSize="12"
                fontWeight="bold"
                fill="black"
              >
                {o.userName}
              </AnimatedText>
              <AnimatedText
                x={tagMotion}
                y={selectScaledY(i + 1) + 65}
                fontSize="12"
                fontWeight="bold"
                fill="black"
              >
                {o.Improvement}
              </AnimatedText>

              <AnimatedImage
                x={horseMotion}
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

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#eee',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    color: '#999',
    display: 'flex',
    height: 26,
    lineHeight: 26,
    position: 'relative',
  },
});
