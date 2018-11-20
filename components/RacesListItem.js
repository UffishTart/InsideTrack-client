import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import SingleRace from '../screens/pop-up-screens/SingleRace';
// import SingleRace from '../../screens/pop-up-screens'

class RacesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSingleRace: false,
    };
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
          <TouchableOpacity onPress={this.toggleSingleRaceView}>
            <Text>Name: {this.props.race.raceInfo.name}</Text>
            {/* click into here to load a pop-up-screen to SingleRace.js */}
            <Text>Length: {this.props.race.raceInfo.length}</Text>
            <View>{singleRaceContent}</View>
          </TouchableOpacity>
        </View>
        <View />
      </View>
    );
  }

  renderSingleRace() {
    return (
      <SingleRace
        toggleSingleRaceView={this.toggleSingleRaceView.bind(this)}
        raceId={this.props.race.raceId}
        user={this.props.user}
      />
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggleSingleRace}>
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
    paddingBottom: 75,
    paddingTop: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInfo: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    borderWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default RacesListItem;
