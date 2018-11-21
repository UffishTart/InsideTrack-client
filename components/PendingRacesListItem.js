import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux'
import { updateRaceUserData } from '../store/singleRaceUser'

class PendingRacesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      showPending: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'FasterOne-Regular': require('../assets/FasterOne-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  togglePendingRaceView = () => {
    this.setState({ showPending: !this.state.showPending });
    this.props.joinRace(this.props.race.userId, this.props.race.raceId, { acceptedInvitation: this.state.showPending })
  };

  renderListItem() {
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
        </View>
      </View>
    );
  }

  renderPendingView() {
    const pendingView = this.state.showPending
    return (
      <View>
        {!pendingView ? (
          <View>
            <Button
              onPress={this.togglePendingRaceView}
              title='Join'
            />
          </View>) :
          <View>{this.renderPendingButton}</View>}
      </View>
    );
  }

  renderPendingButton() {
    return (
      <View>
        <Text>Pending...</Text>
        <Button
          onPress={this.togglePendingRaceView}
          title='Leave'
        />
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggleSingleRaceView}>
        <View style={styles.container}>
          <View style={styles.containerInfo}>
            <View style={styles.container}>{this.renderListItem()}</View>
            <View style={styles.container}>{this.renderPendingView()}</View>
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
    paddingHorizontal: 30
  },
  raceTitle: {
    fontFamily: 'FasterOne-Regular',
    fontSize: 30,
    fontStyle: 'italic'
  },
  raceInfo: {
    fontFamily: 'FasterOne-Regular',
    fontSize: 19,
    fontStyle: 'italic'
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
const mapDispatch = dispatch => {
  return {
    joinRace: (userId, raceId, updateObj) =>
      dispatch(updateRaceUserData(userId, raceId, updateObj))
  };
};

export default connect(mapDispatch
)(PendingRacesListItem);
