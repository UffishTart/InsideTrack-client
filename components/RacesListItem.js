import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import SingleRace from '../screens/pop-up-screens/SingleRace';
import { Font } from 'expo';

// import SingleRace from '../../screens/pop-up-screens'

class RacesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSingleRace: false,
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'FasterOne-Regular': require('../assets/FasterOne-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  toggleSingleRaceView = () => {
    this.setState({ showSingleRace: !this.state.showSingleRace });
  };

  determineRaceLength = length => {
    if (length === 15) {
      return '15 Minutes';
    } else if (length === 30) {
      return '30 Minutes';
    } else if (length === 60) {
      return '1 Hour';
    } else if (length === 180) {
      return '3 Hours';
    } else if (length === 360) {
      return '6 Hour';
    } else if (length === 720) {
      return '12 Hours';
    } else if (length === 1440) {
      return '1 Day';
    } else {
      return '1 Week';
    }
  };

  renderTouchSingleRace() {
    const singleRaceContent = this.state.showSingleRace
      ? this.renderSingleRace()
      : null;
    return (
      <View>
        <View>
          {this.state.fontLoaded ? (
            <Text style={styles.raceTitle}>
              Name:
              <Text style={styles.raceInfo}>
                <Text>{'  '}</Text>
                <Text>{this.props.race.raceInfo.name}</Text>
              </Text>
            </Text>
          ) : null}
          {this.state.fontLoaded ? (
            <Text style={styles.raceTitle}>
              Length:
              <Text style={styles.raceInfo}>
                <Text>{'  '}</Text>
                <Text>
                  {this.determineRaceLength(this.props.race.raceInfo.length)}
                </Text>
              </Text>
            </Text>
          ) : null}
          <View>{singleRaceContent}</View>
        </View>
      </View>
    );
  }

  renderSingleRace() {
    return (
      <SingleRace
        toggleSingleRaceView={this.toggleSingleRaceView.bind(this)}
        race={this.props.race}
        user={this.props.user}
        updateRaceAsComplete={this.props.updateRaceAsComplete}
      />
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggleSingleRaceView}>
        <View style={styles.container}>
          <View style={styles.containerInfo}>
            <View style={styles.container}>{this.renderTouchSingleRace()}</View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  raceTitle: {
    fontFamily: 'FasterOne-Regular',
    fontSize: 30,
    fontStyle: 'italic',
  },
  raceInfo: {
    fontFamily: 'FasterOne-Regular',
    fontSize: 19,
    fontStyle: 'italic',
  },
  containerInfo: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    borderWidth: 10,
    borderColor: '#232321',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default RacesListItem;
