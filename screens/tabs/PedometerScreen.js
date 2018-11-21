import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { me } from "../../store/user";
import {
  putUpdatedPedometerData,
  fetchRaceUserData
} from "../../store/singleRaceUser";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";

//Helper function to generate the table row array;
const arrayGenerater = userRaceInstance => {
  const instanceArr = [];
  instanceArr.push(userRaceInstance.userInfo.userName);
  instanceArr.push(userRaceInstance.percentImprovement);
  instanceArr.push(userRaceInstance.dailyAverage);
  instanceArr.push(userRaceInstance.place);
  return instanceArr;
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

const endDateSetUp = (start, end) => {
  console.log("!!!!! start", start);
  console.log("!!!!! end", end);

  if (end.getTime() - start.getTime() > 24 * 60 * 60 * 1000)
    end.setDate(start.getDate() + 1);
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
    let startForAverage;
    //If user have 7 days data, set the start date to 7 days ago
    if (ifHaveSevenDaysData(userStartDate, end)) {
      startForAverage = new Date();
      startForAverage.setDate(end.getDate() - 7);

      //if not, set the date to the day user was created in the database
    } else {
      startForAverage = userStartDate;
    }

    Pedometer.getStepCountAsync(startForAverage, end)
      .then(
        result => {
          let daysChecking = ifHaveSevenDaysData(startForAverage, end)
            ? 7
            : end.getDate() - startForAverage.getDate();
          let average = ifHaveSevenDaysData(startForAverage, end)
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
        this.props.putUpdatedPedometerData(
          this.state.pastStepCount,
          this.props.user.id,
          1
        )
      );

    // const startTimeOfRace = new Date(this.props.singleRaceInfo.startTime);
    // const endTimeForStopGame = endDateSetUp(startTimeOfRace, end);
    // Pedometer.getStepCountAsync(startTimeOfRace, endTimeForStopGame).then(
    //   result => {
    //     this.setState({ stepCountDuringGame: result.steps });
    //   },
    //   error => {
    //     this.setState({
    //       stepCountDuringGame: "Could not get stepCount: " + error
    //     });
    //   }
    // );
    // .then(() =>
    //   this.props.putUpdatedPedometerData(
    //     this.state.pastStepCount,
    //     this.props.user.id,
    //     1
    //   )
    // );
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

    return (
      <View style={styles.tableContainer}>
        <Text style={styles.text}>
          Steps taken during the game: {this.state.pastStepCount}{" "}
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
  text: { textAlign: "center" }
});

const mapState = ({ singleRaceUser }) => ({
  singleRaceUser
});
const mapDispatch = dispatch => ({
  fetchRaceUserData: raceId => dispatch(fetchRaceUserData(raceId)),
  putUpdatedPedometerData: (dayPedoOutput, userId, raceId) =>
    dispatch(putUpdatedPedometerData(dayPedoOutput, userId, raceId))
});

export default connect(
  mapState,
  mapDispatch
)(PedometerSensor);
