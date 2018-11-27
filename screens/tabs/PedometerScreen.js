import Expo from "expo";
import React from "react";
import { Pedometer, Svg } from "expo";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,

  TouchableOpacity,

  Dimensions
} from "react-native";
import { connect } from "react-redux";

import {
  putUpdatedPedometerData,
  fetchRaceUserData,
  putDailyAverage
} from "../../store/singleRaceUser";
import Track from "../../components/Track";

import { fetchSingleRaceFromServer } from "../../store/races";
import { fetchUserRacesByUser } from "../../store/userRaces";
import StatusTable from "../../components/StatusTable";

import { Container, Button, Footer, FooterTab, Content, Header, Left, Body, Right, Icon, Title } from 'native-base';


//Helper function to generate the table row array;
const arrayGenerater = userRaceInstance => {
  const instanceArr = [];
  instanceArr.push(userRaceInstance.userInfo.userName);
  instanceArr.push(userRaceInstance.percentImprovement);
  instanceArr.push(userRaceInstance.dailyAverage);
  instanceArr.push(userRaceInstance.place);
  return instanceArr;
};

const trimedObjGenerater = userRaceInstance => {
  return {
    userName: userRaceInstance.userInfo.userName,
    userId: Number(userRaceInstance.userInfo.id),
    Improvement: Number(userRaceInstance.percentImprovement),
    dailyAverage: Number(userRaceInstance.dailyAverage),
    place: Number(userRaceInstance.place),
    horseId: userRaceInstance.userInfo.horseId
  };
};

//Helper funtion that can check if user have 7 full days info to generate the average steps
const ifHaveSevenDaysData = (createdDate, usingDate) => {
  if (
    createdDate.getFullYear() <= usingDate.getFullYear() &&
    createdDate.getMonth() < usingDate.getMonth()
  ) {
    return true;
  } else {
    const difference = usingDate.getDate() - createdDate.getDate();
    return difference > 6;
  }
};

const endDateSetUp = (start, end, raceLength) => {
  if (end.getTime() - start.getTime() > raceLength * 24 * 60 * 60 * 1000) {
    end.setDate(start.getDate() + raceLength);
  }
  return end;
};

const endGameDate = (start, raceLength) => {
  const end = new Date();
  end.setDate(start.getDate() + raceLength + 1);
  return end;
};

class PedometerSensor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      averageSteps: 0,
      stepCountDuringGame: 0,
      days: 0,
      hasCompleted: false,
      showStatus: false
    };
  }

  async componentDidMount() {
    await this.props.fetchRaceUserData(this.props.raceId);
    await this.props.getSingleRace(this.props.raceId);
    const gameStartTime = new Date(this.props.races[0].startTime);
    const timeOpenApp = new Date();
    const endTimeOfGame = endGameDate(
      gameStartTime,
      this.props.races[0].length + 1
    );
    if (timeOpenApp < endTimeOfGame) {
      await this._subscribe();
    } else {
      this.setState({ hasCompleted: true });
    }
  }

  async componentWillUnmount() {
    const gameStartTime = new Date(this.props.races[0].startTime);
    const timeOpenApp = new Date();
    const endTimeOfGame = endGameDate(
      gameStartTime,
      this.props.races[0].length + 1
    );
    if (timeOpenApp < endTimeOfGame) {
      this._unsubscribe();
    } else {
      await this.props.updateRaceAsComplete(this.props.raceId, {
        completedStatus: true
      });
      await this.props.getUserRaces(
        this.props.user.id,
        "acceptedInvitation",
        true
      );
    }
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

    const userStartDate = new Date(this.props.user.createdAt);

    const gameStartTime = new Date(this.props.races[0].startTime);

    let startForAverage;
    //If user have 7 days data, set the start date to 7 days ago
    if (ifHaveSevenDaysData(userStartDate, gameStartTime)) {
      const newDate = new Date(gameStartTime);
      startForAverage = newDate;
      startForAverage.setDate(newDate.getDate() - 7);

      //if not, set the date to the day user was created in the database
    } else {
      startForAverage = userStartDate;
    }

    Pedometer.getStepCountAsync(startForAverage, gameStartTime)
      .then(
        result => {
          let daysChecking = ifHaveSevenDaysData(startForAverage, gameStartTime)
            ? 7
            : gameStartTime.getDate() - startForAverage.getDate();

          let average = ifHaveSevenDaysData(startForAverage, gameStartTime)
            ? Math.round(result.steps / daysChecking)
            : this.props.user.estimatedAverage;
          this.setState({
            pastStepCount: result.steps,
            days: daysChecking,
            averageSteps: average
          });
        },
        error => {
          this.setState({
            pastStepCount: "Could not get stepCount: " + error
          });
        }
      )
      .then(() =>
        this.props.updateAverage(
          this.state.averageSteps,
          this.props.user.id,
          this.props.raceId
        )
      );

    const timeOpenApp = new Date();

    const endTimeForStopGame = endDateSetUp(
      gameStartTime,
      timeOpenApp,
      Number(this.props.races[0].length)
    );

    Pedometer.getStepCountAsync(gameStartTime, endTimeForStopGame)
      .then(
        result => {
          this.setState({ stepCountDuringGame: result.steps });
        },
        error => {
          this.setState({
            stepCountDuringGame: "Could not get stepCount: " + error
          });
        }
      )
      .then(() =>
        this.props.putUpdatedPedometerData(
          this.state.stepCountDuringGame,
          this.props.user.id,
          this.props.raceId
        )
      );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  toggleScreen = () => {
    this.setState({ ...this.state, showStatus: !this.state.showStatus });
  };
  render() {
    const tableData = {
      tableHead: ["Players", "Improvement", "Daily Average", "Place"],
      tableInfo: this.props.singleRaceUser
        .filter(el => el.acceptedInvitation)
        .sort((user1, user2) => user1.place - user2.place)
        .map(el => arrayGenerater(el))
    };
    const racingUserData = this.props.singleRaceUser
      .filter(el => el.acceptedInvitation)
      .map(el => trimedObjGenerater(el))
      .sort((user1, user2) => user1.place - user2.place);

    return (
      <View>
        {this.state.hasCompleted ? <Text>This race is over!</Text> : null}

        {this.state.showStatus ? (
          <View style={styles.tableContainer}>
            <StatusTable tableData={tableData} />

            <TouchableOpacity style={styles.button} onPress={this.toggleScreen}>
              <Text style={styles.text}>Back To Game</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.tableContainer}>
            <Track
              data={racingUserData}
              selectX={datum => datum.Improvement}
              selectY={idx => idx}
              steps={this.state.pastStepCount}
              width={Dimensions.get("window").width}
              height={Dimensions.get("window").height}
            />

            <TouchableOpacity style={styles.button} onPress={this.toggleScreen}>
              <Text style={styles.text}>Show Status</Text>
            </TouchableOpacity>
          </View>
        )}
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
  },
  button: {
    backgroundColor: "#fff",
    height: "8%",
    width: "25%",
    borderColor: "#fbff14",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: { textAlign: "center" },
  photo: { width: "100%", height: "80%" }
});

const mapState = ({ singleRaceUser, races, userRaces }) => ({
  singleRaceUser,
  races,
  userRaces
});
const mapDispatch = dispatch => ({
  fetchRaceUserData: raceId => dispatch(fetchRaceUserData(raceId)),
  putUpdatedPedometerData: (dayPedoOutput, userId, raceId) =>
    dispatch(putUpdatedPedometerData(dayPedoOutput, userId, raceId)),
  getSingleRace: raceId => dispatch(fetchSingleRaceFromServer(raceId)),
  updateAverage: (steps, userId, raceId) =>
    dispatch(putDailyAverage(steps, userId, raceId)),
  getUserRaces: (userId, queryType, queryIndicator) =>
    dispatch(fetchUserRacesByUser(userId, queryType, queryIndicator))
});

export default connect(
  mapState,
  mapDispatch
)(PedometerSensor);
