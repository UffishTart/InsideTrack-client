import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { me } from "../../store/user";

const ifHaveSevenDaysData = (createdDate, usingDate) => {
  if (
    createdDate.getFullYear() <= usingDate.getFullYear() &&
    createdDate.getMonth() < usingDate.getMonth()
  ) {
    return true;
  } else {
    const difference = Math.floor(
      (usingDate.getDay() - createdDate.getDay()) / (1000 * 60 * 60 * 24)
    );
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
    this._subscribe();
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
    const userCreatedDate = this.props.user.createdAt;
    const start = new Date(userCreatedDate);

    Pedometer.getStepCountAsync(start, end).then(
      result => {
        if (ifHaveSevenDaysData) {
          this.setState({
            pastStepCount: result.steps,
            days: end.getDate() - start.getDate(),
            startMonth: start.getMonth(),
            endMonth: end.getMonth()
          });
        }
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
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

        <Text>user info: {this.props.user.createdAt}</Text>
        <Text>days:{this.state.days}</Text>
        <Text>state month:{this.state.startMonth}</Text>
        <Text>end month:{this.state.endMonth}</Text>

        <Text>
          Steps taken in the last 24 hours: {this.state.pastStepCount}
        </Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
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

const mapState = ({ user }) => ({ user });
const mapDispatch = dispatch => ({
  getMe: () => dispatch(me())
});

export default connect(
  mapState,
  mapDispatch
)(PedometerSensor);
