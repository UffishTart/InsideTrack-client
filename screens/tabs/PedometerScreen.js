import Expo from "expo";
import React from "react";
import { Pedometer, Svg } from "expo";
import { StyleSheet, Text, View, Dimensions } from "react-native";
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

import {
  Container,
  Button,
  Footer,
  FooterTab,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title
} from "native-base";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//Helper function to generate the table row array;
const arrayGenerater = userRaceInstance => {
  const instanceArr = [];
  instanceArr.push(userRaceInstance.place);
  instanceArr.push(userRaceInstance.userInfo.userName);
  instanceArr.push(
    userRaceInstance.dailyAverage + userRaceInstance.differenceFromAverage
  );
  instanceArr.push(
    Math.round(
      userRaceInstance.raceInfo.length *
        (userRaceInstance.dailyAverage / 24 / 60)
    )
  );
  instanceArr.push(userRaceInstance.percentImprovement);
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
    return difference >= 7;
  }
};

const endDateSetUp = (start, end, raceLength) => {
  if (end.getTime() - start.getTime() > raceLength * 60 * 1000) {
    end.setTime(start.getTime() + raceLength * 60 * 1000);
  }
  return end;
};

const getEndTime = (start, minutes) => {
  const end = new Date();
  end.setTime(start.getTime() + minutes * 60 * 1000);
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
      hasCompleted: false,
      showStatus: false,
      minsElapsed: 0
    };
  }

  async componentDidMount() {
    await this.props.fetchRaceUserData(this.props.raceId);

    await this.props.getSingleRace(this.props.raceId);
    const gameStartTime = new Date(this.props.races[0].startTime);
    const timeOpenApp = new Date();
    const endTimeOfUpdates = getEndTime(
      gameStartTime,
      this.props.races[0].length + 24 * 60
    );
    const endTimeOfGame = getEndTime(gameStartTime, this.props.races[0].length);
    if (timeOpenApp < endTimeOfUpdates) {
      let minsElapsed = this.props.races[0].length;
      if (endTimeOfGame > timeOpenApp)
        minsElapsed = (timeOpenApp.getTime() - gameStartTime.getTime()) / 60000;
      this.setState({ minsElapsed });
      await this._subscribe();
    } else {
      this.setState({ hasCompleted: true });
    }
  }

  async componentWillUnmount() {
    const gameStartTime = new Date(this.props.races[0].startTime);
    const timeOpenApp = new Date();
    const endTimeOfUpdates = getEndTime(
      gameStartTime,
      24 * 60 + this.props.races[0].length
    );
    if (timeOpenApp < endTimeOfUpdates) {
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
    const timeOpenApp = new Date();

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
          let average = ifHaveSevenDaysData(startForAverage, gameStartTime)
            ? Math.round(result.steps / 7)
            : this.props.user.estimatedAverage;
          this.setState({
            pastStepCount: result.steps,
            averageSteps: average
          });
        },
        error => {
          this.setState({
            pastStepCount: "Could not get stepCount: " + error
          });
        }
      )
      .then(() => {
        this.props.updateAverage(
          this.state.averageSteps,
          this.props.user.id,
          this.props.raceId
        );
      });

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
          this.props.raceId,
          this.state.minsElapsed
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
      tableHead: ["Place", "Player", "Steps Taken", "Average", "Improvement"],
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
          <View
            style={{
              width: Dimensions.get("window").width
            }}
          >
            <StatusTable tableData={tableData} />
            <View>
              <Button
                block
                light
                style={{ height: 40, marginTop: 75 }}
                onPress={this.toggleScreen}
              >
                <Text>Return</Text>
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={{
              width: Dimensions.get("window").width
            }}
          >
            <Track
              data={racingUserData}
              steps={this.state.stepCountDuringGame}
              width={Dimensions.get("window").width}
              height={Dimensions.get("window").height}
              user={this.props.user}
              usersInRace={this.props.singleRaceUser.filter(
                obj => obj.raceId === this.props.raceId
              )}
            />

            <Button
              block
              transparent
              onPress={this.toggleScreen}
              style={{ position: "absolute", marginLeft: 285, marginTop: -45 }}
            >
              <Text style={styles.text}>Show Status</Text>
            </Button>
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
    justifyContent: "center",
    width: "100%"
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
  text: { textAlign: "center", color: "black", fontSize: 14 },
  photo: { width: "100%", height: "80%" }
});

const mapState = ({ singleRaceUser, races, userRaces }) => ({
  singleRaceUser,
  races,
  userRaces
});
const mapDispatch = dispatch => ({
  fetchRaceUserData: raceId => dispatch(fetchRaceUserData(raceId)),
  putUpdatedPedometerData: (dayPedoOutput, userId, raceId, minsElapsed) =>
    dispatch(
      putUpdatedPedometerData(dayPedoOutput, userId, raceId, minsElapsed)
    ),
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
