import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { updateRaceUserData } from '../store/singleRaceUser';

class PendingRacesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'FasterOne-Regular': require('../assets/FasterOne-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  togglePendingRaceView = () => {
    this.props.joinRace(this.props.race.userId, this.props.race.raceId, {
      acceptedInvitation: !this.props.race.acceptedInvitation,
    });
    this.props.getPendingRaces(this.props.user.id, 'hasStarted', false);
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

  renderListItem() {
    return (
      <View>
        <View>
          {this.state.fontLoaded ? (
            <View>
              <Text style={styles.raceTitle}>
                Name:
                <Text style={styles.raceInfo}>
                  <Text>{'  '}</Text>
                  <Text>{this.props.race.raceInfo.name}</Text>
                </Text>
              </Text>
              <Text style={styles.raceTitle}>
                Length:
                <Text style={styles.raceInfo}>
                  <Text>{'  '}</Text>
                  <Text>
                    {this.determineRaceLength(this.props.race.raceInfo.length)}
                  </Text>
                </Text>
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  }

  renderOwnerView() {
    return (
      <View>
        <Button
          onPress={() => this.props.toggleStart(this.props.race.raceId)}
          title="Start"
        />
      </View>
    );
  }

  renderPendingView() {
    const pendingView = this.props.race.acceptedInvitation;
    return (
      <View>
        {!pendingView ? (
          <View>
            <Button onPress={this.togglePendingRaceView} title="Join" />
          </View>
        ) : (
          <View>{this.renderPendingButton()}</View>
        )}
      </View>
    );
  }

  renderPendingButton() {
    return (
      <View>
        <Text>Pending...</Text>
        <Button onPress={this.togglePendingRaceView} title="Leave" />
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggleSingleRaceView}>
        <View style={styles.container}>
          <View style={styles.containerInfo}>
            <View style={styles.container}>{this.renderListItem()}</View>
            {!!this.props.race.isOwner ? (
              <View style={styles.container}>{this.renderOwnerView()}</View>
            ) : (
              <View style={styles.container}>{this.renderPendingView()}</View>
            )}
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
const mapDispatch = dispatch => {
  return {
    joinRace: (userId, raceId, updateObj) =>
      dispatch(updateRaceUserData(userId, raceId, updateObj)),
  };
};

export default connect(
  null,
  mapDispatch
)(PendingRacesListItem);
