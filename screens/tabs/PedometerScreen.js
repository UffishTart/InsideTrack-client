import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { me } from "../../store/user";
import {
  putUpdatedPedometerData,
  fetchRaceUserData,
  putDailyAverage
} from "../../store/singleRaceUser";
import { fetchSingleRaceFromServer } from "../../store/races";
import { Table, TableWrapper, Row, Rows } from "react-native-table-component";
import Track from "../../components/Track";

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
    place: Number(userRaceInstance.place)
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
      days: 0
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
      await this.props.updateRaceAsComplete(this.props.raceId, {
        completedStatus: true
      });
      this.props.navigation.navigate("SingleRace");
    }
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
      !!racingUserData.length && (
        <View style={styles.tableContainer}>
          <Text style={styles.text}>
            Steps taken during the game: {this.state.stepCountDuringGame}{" "}
          </Text>
          <Text style={styles.text}>
            Average steps: {this.state.averageSteps}{" "}
          </Text>

          <Table borderStyle={{ borderColor: "#017EC2" }}>
            <Row
              data={tableData.tableHead}
              flexArr={[2, 2, 2, 1]}
              style={styles.head}
              textStyle={styles.text}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={tableData.tableInfo}
                style={styles.row}
                flexArr={[2, 2, 2, 1]}
                heightArr={[28, 28]}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
          <ImageBackground
            style={styles.photo}
            source={require("../../assets/trackPhoto.jpg")}
          >
            <Track
              data={racingUserData}
              selectX={datum => datum.Improvement}
              selectY={datum => datum.userId}
              steps={this.state.pastStepCount}
              width={300}
              height={350}
            />
          </ImageBackground>
        </View>
      )
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
  tableContainer: {
    flex: 1,
    fontSize: 10,
    width: "100%",
    height: "50%",
    paddingTop: 20
  },
  head: { height: 40, backgroundColor: "#014D7F" },
  wrapper: { flexDirection: "row" },
  row: { height: 28, backgroundColor: "#9AE0FF" },
  text: { textAlign: "center" },
  photo: { width: "100%", height: "80%", paddingTop: 10 }
});

const mapState = ({ singleRaceUser, races }) => ({
  singleRaceUser,
  races
});
const mapDispatch = dispatch => ({
  fetchRaceUserData: raceId => dispatch(fetchRaceUserData(raceId)),
  putUpdatedPedometerData: (dayPedoOutput, userId, raceId) =>
    dispatch(putUpdatedPedometerData(dayPedoOutput, userId, raceId)),
  getSingleRace: raceId => dispatch(fetchSingleRaceFromServer(raceId)),
  updateAverage: (steps, userId, raceId) =>
    dispatch(putDailyAverage(steps, userId, raceId))
});

export default connect(
  mapState,
  mapDispatch
)(PedometerSensor);
