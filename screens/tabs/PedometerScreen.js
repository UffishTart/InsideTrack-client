import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { me } from "../../store/user";
import {putUpdataedPedometerData, fetchRaceUserData, putUpdatedPedometerData} from '../../store/singleRaceUser'
//Helper funtion that can check if user have 7 full days info to generate the average steps
const ifHaveSevenDaysData = (createdDate, usingDate) => {
  if (
    createdDate.getFullYear() <= usingDate.getFullYear() &&
    createdDate.getMonth() < usingDate.getMonth()
  ) {
    return true;
  } else {
    const difference = usingDate.getDate() - createdDate.getDate();
    return difference >= 7;
  }
};
class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    averageSteps: 0,
    currentStepCount: 0,
    days: 0,
    startMonth: 0,
    endMonth: 0
  };

  async componentDidMount() {
    await this.props.getMe();
    await this.props.fetchRaceUserData(1)
    await this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const createdDate = this.props.user.createdAt;
    const userStartDate = new Date(createdDate);
    let start;
    //If user have 7 days data, set the start date to 7 days ago
    if (ifHaveSevenDaysData(userStartDate, end)) {
      start = new Date();
      start.setDate(end.getDate() - 7);

      //if not, set the date to the day user was created in the database
    } else {
      start = userStartDate;
    }

    Pedometer.getStepCountAsync(start, end).then(
      result => {
        let daysChecking = ifHaveSevenDaysData(start, end)
          ? 7
          : end.getDate() - start.getDate();
        let average = ifHaveSevenDaysData(start, end)
          ? Math.round(result.steps / daysChecking)
          : this.props.user.estimatedAverage;
        this.setState({
          pastStepCount: result.steps,
          days: daysChecking,
          averageSteps: average,
          startMonth: start.getMonth(),
          endMonth: end.getMonth()
        });
        
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    ).then(() => this.props.putUpdatedPedometerData(this.state.pastStepCount, this.props.user.id, 1));
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    const { createdAt } = this.props.user;

    return (
      <View style={styles.container}>
        <Text>
          Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
        <Text>user info: {createdAt}</Text>
        <Text>average steps: {this.state.averageSteps}</Text>
        <Text>days:{this.state.days}</Text>
        <Text>state month:{this.state.startMonth}</Text>
        <Text>end month:{this.state.endMonth}</Text>
        <Text>
          Steps taken in the last 24 hours: {this.state.pastStepCount}
        </Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
        <Text>Users</Text>
        <View>
          {this.props.singleRaceUser.map(user => {
            return ( 
              <View key={user.userId}>
                <Text>{user.place}</Text>
              </View>
            )
          })}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapState = ({ user, singleRaceUser }) => ({ user, singleRaceUser });
const mapDispatch = dispatch => ({
  getMe: () => dispatch(me()),
  fetchRaceUserData: (raceId) => dispatch(fetchRaceUserData(raceId)),
  putUpdatedPedometerData: (dayPedoOutput, userId, raceId) => dispatch(putUpdatedPedometerData(dayPedoOutput, userId, raceId))
});

export default connect(
  mapState,
  mapDispatch
)(PedometerSensor);
