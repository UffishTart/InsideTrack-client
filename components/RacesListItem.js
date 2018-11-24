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
                <Text>{this.props.race.raceInfo.length}</Text>
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
